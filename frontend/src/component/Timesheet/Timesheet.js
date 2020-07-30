import React, { Component } from 'react';
import axios from 'axios';
import MyCalendar from './Calendar/Calendar';
import Details from './Details/Details';
import Upload from './Upload/Upload';


class Timesheet extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            timesheet: props.location.query? props.location.query.timesheet: {},
            isTimesheetEmpty: props.location.query? false:true

        };

    }

    
    componentDidMount(){
        console.log("lllll");
        
        if(this.state.isTimesheetEmpty===true){
            let a = '/api/timesheet/current';
            console.log("mmm subimit quiz");
            axios.get(a).then(res => {
                console.log("mm aaa");
                    console.log(res);
                    this.setState({
                      timesheet: res.data  
                    });
            });
        }
    }

    

    //this.setState({ timesheet.weekendending:date })
    setDate = (newsheet) =>{
        this.setState({
            timesheet : newsheet
        });
    }

    setDetail = (newdetail) =>{
        let newsheet = this.state.timesheet;
        newsheet.detailList = newdetail;
        
        var billinghour = newdetail.reduce((acc, curr) => {
            return acc = acc + curr.totalhour
        }, 0)
        newsheet.totalBillingHour = billinghour;

        var compendatedhour = newdetail.reduce((acc, curr) => {
            return acc = acc + curr.totalhour + curr.floatingDay*8 + curr.vacationDay*8;
        }, 0)
        newsheet.totalCompensatedHour = compendatedhour;

        this.setState({
            timesheet : newsheet
        });
        console.log(this.state.timesheet);

    }

    

    render(){
        console.log("rendering");
        console.log(this.state.timesheet.weekendEnding);
        return (
        <div>welcome timesheet {this.state.timesheet.weekendEnding}<br/>
            
            <MyCalendar date={this.state.timesheet.weekendEnding} updateSheet={this.setDate}></MyCalendar>
            <div>Total Billing Hours: {this.state.timesheet.totalBillingHour}    Total Compendated Hours: {this.state.timesheet.totalCompensatedHour}</div>
            <Details details={this.state.timesheet.detailList} updateDetail={this.setDetail}></Details>
       
        </div>

        );
    }
}

export default Timesheet;