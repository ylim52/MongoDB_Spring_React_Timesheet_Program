package com.bfs.timesheet.domain.response;

import com.bfs.timesheet.domain.pojo.Detail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TimesheetResponse {
    private String weekendEnding;
    private int totalBillingHour;
    private int totalCompensatedHour;
    private String submissionStatus;
    private String applicationStatus;
    private int floatingDay;
    private int vacationDay;
    private String approvedTimesheetLink;
    private String unapprovedTimesheetLink;
    private List<Detail> detailList;
}
