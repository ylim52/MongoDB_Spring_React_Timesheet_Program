package com.bfs.timesheet.repository;

import com.bfs.timesheet.domain.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TimesheetRepository extends MongoRepository<Timesheet, String> {

    @Query(value = "{'userid': ?0}")
    List<Timesheet> searchTimesheetByUserid(String id);

    List<Timesheet> findByUseridAndWeekendending(String userid, String weekendending);

    Timesheet findTopByUseridOrderByWeekendendingDesc(String userid);

    Timesheet findOneByUseridAndWeekendending(String userid, String weekendending);


}
