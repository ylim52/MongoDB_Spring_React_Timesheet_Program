package com.bfs.person.repository;


import com.bfs.person.domain.Customer;

public interface MyRepository {

    Customer getCustomerWithDelay(String name);
}
