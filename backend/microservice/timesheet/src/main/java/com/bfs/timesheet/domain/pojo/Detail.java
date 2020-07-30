package com.bfs.timesheet.domain.pojo;

import com.querydsl.core.annotations.QueryEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Detail {


    private String date;
    private String starttime;

    private String endingtime;

    private int totalhour;

    private int floatingDay;

    private int vacationDay;
}
