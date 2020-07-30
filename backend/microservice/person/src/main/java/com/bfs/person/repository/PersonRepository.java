package com.bfs.person.repository;

import com.bfs.person.domain.Person;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends MongoRepository<Person, String> {

    Optional<Person> findByFirstname(String firstName);
    List<Person> findByLastname(String lastName);
    Person findOneById(String id);

    @Query(value = "{'lastname': ?0}", fields = "{'firstname': 1}")
    List<Person> searchPersonByLastname(String lastName);

    @Query(value = "{'id': ?0}")
    Person searchPersonById(String id);

    Person findOneByUsername(String username);

}
