package com.bfs.person.domain;

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
public class Person {

    @Id

    @ApiModelProperty(notes = "The database generated person ID")

    private String id;


    @ApiModelProperty(notes = "Person username", required = true)

    private String username;

    @ApiModelProperty(notes = "Person first name", required = true)

    private String firstname;

    @ApiModelProperty(notes = "Person last name")

    private String lastname;



    @ApiModelProperty(notes = "Person birth")

    private String birth;



    @ApiModelProperty(notes = "Person position")

    private String position;



    @ApiModelProperty(notes = "Person enrollDate")

    private String enrollDate;



    @ApiModelProperty(notes = "Person phone")

    private String phone;



    @ApiModelProperty(notes = "Person email")

    private String email;

    @ApiModelProperty(notes = "Person address")

    private Address address;



    @ApiModelProperty(notes = "Person emergencycontact")

=======
    @ApiModelProperty(notes = "Person first name", required = true)
    private String firstname;
    @ApiModelProperty(notes = "Person last name")
    private String lastname;

    @ApiModelProperty(notes = "Person birth")
    private String birth;

    @ApiModelProperty(notes = "Person position")
    private String position;

    @ApiModelProperty(notes = "Person enrollDate")
    private String enrollDate;

    @ApiModelProperty(notes = "Person phone")
    private String phone;

    @ApiModelProperty(notes = "Person email")
    private String email;
    @ApiModelProperty(notes = "Person address")
    private Address address;

    @ApiModelProperty(notes = "Person emergencycontact")
>>>>>>> cbaaaec8dcdad1e8d66c9b469ae94b1caed20c8d
    private List<EmergencyContact> emergencycontact;



    @ApiModelProperty(notes = "remaining day")
    private List<RemainingDay> remainingDay;

}
