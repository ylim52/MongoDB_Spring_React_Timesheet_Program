package com.bfs.person.repository;


import com.bfs.person.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface CustomerRepository extends MongoRepository<Customer, String>, MyRepository {

    List<Customer> findByFirstName(String firstName);
    List<Customer> findByLastName(String lastName);

    @Query(value = "{'lastName': ?0}", fields = "{'firstName': 1}")
    List<Customer> searchCustomerByLastName(String lastName);
}
