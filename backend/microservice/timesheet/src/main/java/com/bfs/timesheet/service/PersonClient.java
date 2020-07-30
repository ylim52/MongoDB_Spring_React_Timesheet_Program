package com.bfs.timesheet.service;

import com.bfs.timesheet.domain.response.IDResponse;
import com.bfs.timesheet.domain.response.RemainingDay;
import feign.RequestLine;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name="person")
public interface PersonClient {
    @RequestLine("GET")
    @RequestMapping("/person/getReDay")
    RemainingDay getRemainingDay(@RequestParam String id, @RequestParam String year);

    @RequestLine("GET")
    @RequestMapping("/person/getAllID")
    List<IDResponse> getAllID();
}
