package com.bfs.timesheet.service;


import com.bfs.timesheet.domain.Timesheet;
import com.bfs.timesheet.domain.pojo.Detail;
import com.bfs.timesheet.domain.request.TimesheetNewRequest;
import com.bfs.timesheet.domain.request.TimesheetRequest;
import com.bfs.timesheet.domain.response.IDResponse;
import com.bfs.timesheet.domain.response.TimesheetResponse;
import com.bfs.timesheet.repository.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class TimesheetService {
    private TimesheetRepository repository;

    @Autowired
    public void setRepository(TimesheetRepository repository) {
        this.repository = repository;
    }

    public List<Timesheet> findByUserId(String id){
        return repository.searchTimesheetByUserid(id);
    }

    public List<Timesheet> findByUserIdAndWeekending(TimesheetRequest request){
        return repository.findByUseridAndWeekendending(request.getUserid(), request.getWeekending());
    }

    public List<Timesheet> getAllTimesheet(){
        return repository.findAll();
    }

    public TimesheetResponse findTop(String id){
        Timesheet timesheet = repository.findTopByUseridOrderByWeekendendingDesc(id);
        TimesheetResponse tr = new TimesheetResponse(timesheet.getWeekendending(),timesheet.getTotalbillinghour(),timesheet.getTotalcompendatedhour(),
                                    timesheet.getSubmissionstatus(), timesheet.getApplicationstatus(), 0, 0, timesheet.getApprovedtimesheetlink(),
                                    timesheet.getUnapprovedtimesheetlink(), timesheet.getDetails());
        return tr;
    }

    public TimesheetResponse findTimesheetByWeekending(String date, String id){
        System.out.println(date);

        Timesheet timesheet =repository.findOneByUseridAndWeekendending(id, date);
        TimesheetResponse tr = null;
        if(timesheet!=null && !timesheet.getApplicationstatus().equals("Approved")){
            tr = new TimesheetResponse(timesheet.getWeekendending(),timesheet.getTotalbillinghour(),timesheet.getTotalcompendatedhour(),
                    timesheet.getSubmissionstatus(), timesheet.getApplicationstatus(), 0, 0, timesheet.getApprovedtimesheetlink(),
                    timesheet.getUnapprovedtimesheetlink(), timesheet.getDetails());
        }
        return tr;
    }

    public List<TimesheetResponse> getAllTimesheetResponse(String id){
        List<Timesheet> timesheets = repository.searchTimesheetByUserid(id);
        List<TimesheetResponse> timesheetResponseList = new ArrayList<>();
        for(Timesheet time: timesheets){
            TimesheetResponse timesheetResponse = new TimesheetResponse();
            timesheetResponse.setWeekendEnding(time.getWeekendending());
            timesheetResponse.setTotalBillingHour(time.getTotalbillinghour());
            timesheetResponse.setTotalCompensatedHour(time.getTotalcompendatedhour());
            timesheetResponse.setSubmissionStatus(time.getSubmissionstatus());
            timesheetResponse.setApplicationStatus(time.getApplicationstatus());
            int floatingDay = 0;
            int vacationDay = 0;
            for(Detail detail: time.getDetails()){
                if(detail.getFloatingDay() > 0){
                    floatingDay++;
                }
                if(detail.getVacationDay() > 0){
                    vacationDay++;
                }
            }
            timesheetResponse.setFloatingDay(floatingDay);
            timesheetResponse.setVacationDay(vacationDay);
            timesheetResponse.setApprovedTimesheetLink(time.getApprovedtimesheetlink());
            timesheetResponse.setUnapprovedTimesheetLink(time.getUnapprovedtimesheetlink());
            List<Detail> detailList = time.getDetails();
            detailList.sort((Detail a, Detail b) -> a.getEndingtime().compareTo(b.getEndingtime()));
            timesheetResponse.setDetailList(detailList);
            timesheetResponseList.add(timesheetResponse);
        }
        timesheetResponseList.sort((TimesheetResponse a, TimesheetResponse b)->b.getWeekendEnding().compareTo(a.getWeekendEnding()));
        return timesheetResponseList;
    }

    // Let's assume the date format is MM/dd/yyyy
    // Thia should have a return type
    public void generateTimesheet(TimesheetNewRequest request){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        // Local US start date: Sunday -> Saturday
        LocalDate localDate = LocalDate.parse(request.getDate(), formatter);
        DayOfWeek firstDayOfWeek = WeekFields.of(Locale.getDefault()).getFirstDayOfWeek();
        LocalDate startOfCurrentWeek = localDate.with(TemporalAdjusters.previousOrSame(firstDayOfWeek));

        DayOfWeek lastDayOfWeek = firstDayOfWeek.plus(6); // or minus(1)
        LocalDate endOfWeek = localDate.with(TemporalAdjusters.nextOrSame(lastDayOfWeek));
        List<Timesheet> timesheetList = repository.findByUseridAndWeekendending(request.getUserid(),request.getDate());
        if(timesheetList.size() == 0){
            LocalDate insertDate = startOfCurrentWeek;
            List<Detail> detailList = new ArrayList<>(0);
            for(int i = 0 ; i< 7; i++){
                Detail detail = Detail.builder().date(insertDate.format(formatter)).
                            starttime("N/A").endingtime("N/A").floatingDay(0).
                            totalhour(0).vacationDay(0).build();
                detailList.add(detail);
                insertDate = insertDate.plusDays(1);
            }
            repository.save(Timesheet.builder().userid(request.getUserid()).weekendending(endOfWeek.format(formatter)).totalbillinghour(0).
                    totalcompendatedhour(0).applicationstatus("N/A").submissionstatus("Not Started").
                    approvedtimesheetlink("").unapprovedtimesheetlink("").details(detailList).build());
        }
    }

    public void generateTimesheetForAllUser(List<IDResponse> userIDList){
        userIDList.forEach(a -> generateTimesheetForUser(a.getUserId()));
    }

    private void generateTimesheetForUser(String userid){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        // Local US start date: Sunday -> Saturday
        LocalDate localDate = LocalDate.now();
        DayOfWeek firstDayOfWeek = WeekFields.of(Locale.getDefault()).getFirstDayOfWeek();
        LocalDate startOfCurrentWeek = localDate.with(TemporalAdjusters.previousOrSame(firstDayOfWeek));

        DayOfWeek lastDayOfWeek = firstDayOfWeek.plus(6); // or minus(1)
        LocalDate endOfWeek = localDate.with(TemporalAdjusters.nextOrSame(lastDayOfWeek));
        List<Timesheet> timesheetList = repository.findByUseridAndWeekendending(userid,endOfWeek.format(formatter));
        // Check if a new timesheet for the ending date has been generated
        if(timesheetList.size() == 0){
            LocalDate insertDate = startOfCurrentWeek;
            List<Detail> detailList = new ArrayList<>(0);
            for(int i = 0 ; i< 7; i++){
                Detail detail = Detail.builder().date(insertDate.format(formatter)).
                        starttime("N/A").endingtime("N/A").floatingDay(0).
                        totalhour(0).vacationDay(0).build();
                detailList.add(detail);
                insertDate = insertDate.plusDays(1);
            }
            repository.save(Timesheet.builder().userid(userid).weekendending(endOfWeek.format(formatter)).totalbillinghour(0).
                    totalcompendatedhour(0).applicationstatus("N/A").submissionstatus("Not Started").
                    approvedtimesheetlink("").unapprovedtimesheetlink("").details(detailList).build());
        }
    }
}
