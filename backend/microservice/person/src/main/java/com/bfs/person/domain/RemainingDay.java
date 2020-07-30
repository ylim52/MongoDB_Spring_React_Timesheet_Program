package com.bfs.person.domain;

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
