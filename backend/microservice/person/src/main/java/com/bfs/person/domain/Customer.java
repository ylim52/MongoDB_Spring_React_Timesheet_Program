package com.bfs.person.domain;

import com.querydsl.core.annotations.QueryEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@QueryEntity
@Document
public class Customer {

    @Id
    @ApiModelProperty(notes = "The database generated customer ID")
    private String id;

    @ApiModelProperty(notes = "Customer first name", required = true)
    private String firstName;
    @ApiModelProperty(notes = "Customer last name")
    private String lastName;
}
