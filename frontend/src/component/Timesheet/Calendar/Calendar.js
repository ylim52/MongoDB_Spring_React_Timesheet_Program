import React, { Component } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isToggleOn: false,
            dispaly: 'none'
        };

        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn,
          display: prevState.isToggleOn ? 'none': 'block'
        }));
      }

      onChange = selecteddate => {
        console.log(selecteddate);
        this.setState({date: selecteddate});
        

        if(selecteddate.getDay()===6){
            
            var str2= (selecteddate.getMonth()<9?"0"+(selecteddate.getMonth()+1) : (selecteddate.getMonth()+1))
                    +"/"+(selecteddate.getDate()<10?"0"+selecteddate.getDate() : selecteddate.getDate())
                    +"/"+selecteddate.getFullYear();
            axios.get("/api/timesheet/getTimesheetByDate?date="+str2).then(res => {
                console.log("mm look");
                    console.log(res);
                    if(res.data!==""){
                        this.props.updateSheet(res.data);
                    }
                    
            });
        }

    }

      render() {
        console.log(this.props.date);
        return (
          <div>
              Week Ending: {this.props.date}
            <button onClick={this.handleClick}>
              Select
            </button>
            {this.state.isToggleOn && <div className="m-test" style={{display: this.state.display, width:"200px"}}>
                <Calendar
                onChange={this.onChange}
                value={this.state.date}
                />
            </div>}
          </div>
        );
      }
    
}

export default MyCalendar;