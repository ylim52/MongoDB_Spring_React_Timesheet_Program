package com.bfs.person.controller;

import com.bfs.person.config.CloudConfig;
import com.bfs.person.domain.Person;
import com.bfs.person.domain.RemainingDay;
import com.bfs.person.domain.response.IDResponse;
import com.bfs.person.service.PersonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="My Rest Endpoint")
@RequestMapping("/person")
//@CrossOrigin(value = "http://localhost:3000")
public class PersonController {

    @Autowired
    private CloudConfig cloudConfig;

    private PersonService personService;

    @Autowired
    public void setPersonService(PersonService personService) {
        this.personService = personService;
    }

//    @GetMapping("/addperson")
//    @ApiOperation(value = "add Person")
//    public ResponseEntity<String> addPerson() {
//        personService.add();
//        return ResponseEntity.ok("Message from ok");
//    }

    @GetMapping("/get/{id}")
    @ApiOperation(value = "Find Person by ID",response = Person.class)
    public Person getPerson(@PathVariable("id") String id) {
        return personService.findById(id);
    }

    @GetMapping("/getReDay")
    @ApiOperation(value = "Find Remaining Day by ID and Year",response = RemainingDay.class)
    public RemainingDay getRemainingDayById(@RequestParam("id") String id,@RequestParam("year") String year){
        return personService.remainingDayBYUserIDAndYear(id, year);
    }

    @GetMapping("/getAllID")
    public List<IDResponse> getAllUserID(){
        return personService.getAllUserId();
    }

    //useless
    @GetMapping("/message")
    @ApiOperation(value = "List role message")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("Message from " + cloudConfig.getUserRole());
    }

    @GetMapping("/profile")
    @ApiOperation(value = "Profile")
    public Person getPerson(){
        //going to change to be username in the future
        String id = "5ef53ded564c7b329138c44d";
        return personService.findByUsername(id);
    }

    @PutMapping("/profile")
    @ApiOperation(value = "update Profile")
    public Person updateProfile(@RequestBody Person person){
        String id = "5ef53ded564c7b329138c44d";
        personService.updatePerson(person);
        return person;
//        Person persondata = personService.findByUserid(id);
//
//        if(persondata != null) {
//            persondata.setPhone(person.getPhone());
//            persondata.setAddress(person.getAddress());
//            persondata.setEmail(person.getEmail());
//            repository.save(persondata);
//            System.out.println("successful");
//            return persondata;
//
//        }else{
//            return null;
//        }
    }



}


