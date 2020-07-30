package com.bfs.timesheet.controller;


import com.bfs.timesheet.config.CloudConfig;
import com.bfs.timesheet.domain.Timesheet;
import com.bfs.timesheet.domain.request.TimesheetNewRequest;
import com.bfs.timesheet.domain.response.IDResponse;
import com.bfs.timesheet.domain.response.RemainingDay;
import com.bfs.timesheet.domain.response.TimesheetResponse;
import com.bfs.timesheet.service.PersonClient;
import com.bfs.timesheet.service.TimesheetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="My Rest Endpoint")
@RequestMapping("/timesheet")
//@CrossOrigin(value = "http://localhost:3000")
// Use feign client
public class TimesheetController {

    @Autowired
    private CloudConfig cloudConfig;

    private TimesheetService timesheetService;
    private PersonClient personClient;

    @Autowired
    public void setTimesheetService(TimesheetService timesheetService) {
        this.timesheetService = timesheetService;
    }

    @Autowired
    public void setPersonClient(PersonClient personClient) {
        this.personClient = personClient;
    }

    //    @GetMapping("/addperson")
//    @ApiOperation(value = "add Person")
//    public ResponseEntity<String> addPerson() {
//        personService.add();
//        return ResponseEntity.ok("Message from ok");
//    }

    @GetMapping("/get/{id}")
    @ApiOperation(value = "Find Timesheet by userid")
    public List<Timesheet> getPerson(@PathVariable("id") String id) {
        return timesheetService.findByUserId(id);
    }

    @GetMapping("/current")
    @ApiOperation(value = "List role message")
    public TimesheetResponse getTopTimesheet() {
        System.out.println("heeeldoj");
        String id = "5ef53ded564c7b329138c44d";
        return timesheetService.findTop(id);
    }

    @GetMapping("/getTimesheetByDate")
    @ApiOperation(value = "List role message")
    public TimesheetResponse getTimesheetByWeekending(@RequestParam("date") String date) {
        System.out.println("heeeldoj");
        String id = "5ef53ded564c7b329138c44d";
        return timesheetService.findTimesheetByWeekending(date, id);
    }



    @GetMapping("/getTimesheet")
    @ApiOperation(value = "Find Timesheet by userid")
    public List<TimesheetResponse> getPersonTimesheet(){
        String id = "5ef53ded564c7b329138c44d";
        return timesheetService.getAllTimesheetResponse(id);
    }

//    @GetMapping("/message")
//    @ApiOperation(value = "List role message")
//    public ResponseEntity<String> getMessage() {
//        return ResponseEntity.ok("Message from " + cloudConfig.getUserRole());
//    }


//    @PostMapping("/newTimesheet")
//    @ApiOperation(value = "Add Timesheet by userid and date")
//    public ResponseEntity<String> makeNewTimesheet(@RequestBody TimesheetNewRequest request){
//        timesheetService.generateTimesheet(request);
//        return ResponseEntity.ok("Generate new timesheet for userID " + request.getUserid());
//    }

    @GetMapping("/getPersonDay")
    public RemainingDay getRemainingDay(@RequestParam("year") String year){
        String id = "5ef53ded564c7b329138c44d";
        return personClient.getRemainingDay(id, year);
    }

//    @GetMapping("/add")
//    @ApiOperation(value = "List role message")
//    public void add() {
//        System.out.println("add");
//        timesheetService.add();
//    }

    @Scheduled(cron="0 0/30 9-17 * * FRI")
    // cron = "[Seconds] [Minutes] [Hours] [Day of month] [Month] [Day of week] [Year]"
    // Execute every 30 minutes from Nine-to-Five on Friday
    public void addNewTimesheetForUser()
    {
        System.out.println("Generate new timesheet for all user");
        List<IDResponse> list = personClient.getAllID();
        timesheetService.generateTimesheetForAllUser(list);
    }

}


