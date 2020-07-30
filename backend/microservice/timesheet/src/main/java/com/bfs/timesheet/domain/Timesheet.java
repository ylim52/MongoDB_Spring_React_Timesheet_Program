package com.bfs.timesheet.domain;

import com.bfs.timesheet.domain.pojo.Detail;
import com.querydsl.core.annotations.QueryEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@QueryEntity
@Document
public class Timesheet {

    @Id
    @ApiModelProperty(notes = "The database generated timesheet ID")
    private String id;

    @ApiModelProperty(notes = "person's id", required = true)
    private String userid;

    @ApiModelProperty(notes = "week ending date")
    private String weekendending;

    @ApiModelProperty(notes = "total billing hour")
    private int totalbillinghour;

    @ApiModelProperty(notes = "total compendatedhour")
    private int totalcompendatedhour;

    @ApiModelProperty(notes = "submission status")
    private String submissionstatus;

    @ApiModelProperty(notes = "application status")
    private String applicationstatus;

    @ApiModelProperty(notes = "approved timesheet link")
    private String approvedtimesheetlink;

    @ApiModelProperty(notes = "unapproved timesheet link")
    private String unapprovedtimesheetlink;

    @ApiModelProperty(notes = "list of details")
    private List<Detail> details;




}
