package com.bfs.timesheet.domain.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RemainingDay {

    private String year;
    private int floatingDay;
    private int vacationDay;

}
