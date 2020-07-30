package com.bfs.person.repository;

import com.bfs.person.domain.Customer;
import org.springframework.cache.annotation.Cacheable;

public class MyRepositoryImpl implements MyRepository {

    @Override
    @Cacheable(cacheNames = "customer", key = "#name")
    public Customer getCustomerWithDelay(String name) {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Customer.builder().firstName("LongSleep").lastName("Long").build();
    }
}
