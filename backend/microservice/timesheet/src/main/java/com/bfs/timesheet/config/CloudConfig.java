package com.bfs.timesheet.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@RefreshScope
public class CloudConfig {

    @Value("${user.role}")
    private String userRole;
}
