package com.bfs.person.service;

import com.bfs.person.domain.Address;
import com.bfs.person.domain.EmergencyContact;
import com.bfs.person.domain.Person;
import com.bfs.person.domain.RemainingDay;
import com.bfs.person.domain.response.IDResponse;
import com.bfs.person.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService {
    @Autowired
    private PersonRepository repository;

    public List<Person> find(){
        return repository.findByLastname("Smith");
    }

    public List<IDResponse> getAllUserId(){
        List<IDResponse> userId = new ArrayList<>(0);
        List<Person> personList = repository.findAll();
        for(Person person: personList){
            userId.add(IDResponse.builder().userId(person.getId()).build());
        }
        return userId;
    }

    public Person findByUsername(String username){
        return repository.findOneByUsername(username);
    }

    public Person findById(String id){
        return repository.findOneById(id);
    }

    public RemainingDay remainingDayBYUserIDAndYear(String userid, String year){
        Person person = repository.searchPersonById(userid);
        if(person != null){
            for(RemainingDay reDay: person.getRemainingDay()){
                if(reDay.getYear().equals(year)){
                    return reDay;
                }
            }
        }
        return null;
    }

    public void updatePerson(Person newperson){
        repository.save(newperson);
    }
}
