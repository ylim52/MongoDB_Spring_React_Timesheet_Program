import React, { Component } from 'react';
import moment from 'moment';
import Select from './Input/Select';

const options = ["N/A","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM"
,"12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM"
,"6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM"];

const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const holiday=["06/17/2020","07/03/2020"];

class Details extends Component {

    changeStarttime=(index, value)=>{

        let newDetail = this.props.details;
        if((newDetail[index].floatingDay+newDetail[index].vacationDay)===0){
            newDetail[index].starttime = value;
            if(newDetail[index].starttime!=='N/A' && newDetail[index].endingtime!=='N/A'){
                newDetail[index].totalhour = this.calculateDiff(newDetail[index].starttime, newDetail[index].endingtime);
            }
            this.props.updateDetail(newDetail);
        }
        
        //this.setState({value: event.target.value});
    }

    changeEndtime=(index, value)=>{

        let newDetail = this.props.details;
        if((newDetail[index].floatingDay+newDetail[index].vacationDay)===0){
            newDetail[index].endingtime = value;
            if(newDetail[index].starttime!=='N/A' && newDetail[index].endingtime!=='N/A'){
                newDetail[index].totalhour = this.calculateDiff(newDetail[index].starttime, newDetail[index].endingtime);
            }
            this.props.updateDetail(newDetail);
        }
        //this.setState({value: event.target.value});
    }

    calculateDiff=(start, end)=>{
        var startTime = moment(start, "HH:mm a");
        var endTime = moment(end, "HH:mm a");

        var duration = moment.duration(endTime.diff(startTime));

        var hours = parseInt(duration.asHours());
        return hours;
        
    }

    handleChange=(e)=>{
        let newDetail = this.props.details;
        if(e.target.value==="floating"){
            if(newDetail[e.target.id].floatingDay===0){
                if(newDetail[e.target.id].vacationDay===0){
                    newDetail[e.target.id].floatingDay = 1;
                    newDetail[e.target.id].starttime = 'N/A';
                    newDetail[e.target.id].endingtime = 'N/A';
                    newDetail[e.target.id].totalhour = 0;
                }
            }else{
                newDetail[e.target.id].floatingDay = 0;
            }
        }
        if(e.target.value==="vacation"){
            if(newDetail[e.target.id].vacationDay===0){
                if(newDetail[e.target.id].floatingDay===0){
                    newDetail[e.target.id].vacationDay = 1;
                    newDetail[e.target.id].starttime = 'N/A';
                    newDetail[e.target.id].endingtime = 'N/A';
                    newDetail[e.target.id].totalhour = 0;
                }
            }else{
                newDetail[e.target.id].vacationDay = 0;
            }
        }
        
        this.props.updateDetail(newDetail);
        
    }

    isHoliday= (detail)=>{
        return (
            <tr>
                <td>{weekday[new Date(detail.date).getDay()]}</td>
                <td>{detail.date}</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>0</td>
                <td><input type="radio" value="floating" disabled/></td>
                <td><input type="radio" value="holiday" checked="checked"/></td>
                <td><input type="radio" value="vacation" disabled/></td>
            </tr>
        );
    }

    render(){
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Starting Time</th>
                            <th>Ending Time</th>
                            <th>Total Hour</th>
                            <th>Floating Day</th>
                            <th>Holiday</th>
                            <th>Vacation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.details && this.props.details.map((detail,index) => (
                            holiday.includes(detail.date)? this.isHoliday(detail):
                            <tr>
                                <td>{weekday[new Date(detail.date).getDay()]}</td>
                                <td>{detail.date}</td>
                                <td><Select index={index} value={detail.starttime} changed={this.changeStarttime} options={options}></Select></td>
                                <td><Select index={index} value={detail.endingtime} changed={this.changeEndtime} options={options}></Select></td>
                                <td>{detail.totalhour}</td>
                                <td><input type="radio" value="floating" id={index} checked={detail.floatingDay===1} onClick={this.handleChange}/></td>
                                <td><input type="radio" value="holiday" checked={holiday.includes(detail.date)}/></td>
                                <td><input type="radio" value="vacation" id={index} checked={detail.vacationDay===1} onClick={this.handleChange}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }


}

export default Details;