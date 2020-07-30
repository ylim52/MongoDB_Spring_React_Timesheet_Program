import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from '../../axios-link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { IoIosInformationCircle } from 'react-icons/io';
import './modal.css';
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import * as action from '../../store/action/index';

// import { Redirect } from 'react-router-dom';

export const dayWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const ModalCustom = ({ handleClose, show, children}) => {
//     return (
//       <div className="modal display-block">
//         <section className='modal-main'>
//         {children}                     
//           <button
//             onClick={handleClose}
//           >
//             Close
//           </button>
//         </section>
//       </div>
//     );
// };

export class Summary extends Component {
    state = {
        show: false,
        length: 5
    }

    
    componentDidMount(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const currentDate = (month > 9?month : "0" + month)+"/"+ (day>9? day: "0"+day) +"/"+year;
        console.log("The current year is " + year + " and the current date is " + currentDate);
        // Starting Day is Sunday, index of 0, so Friday is index of 5
        // if(date.getDay() === 5){
        //     this.props.makeTimesheet(currentDate);
        // }
        this.props.getTimesheet();
        this.props.getRemainingDay(year);
    }

    editTimesheet(index){
        this.props.history.push({
            pathname: '/timesheet',
            query:{
                "isTimesheetEmpty": false,
                "timesheet": this.props.timesheets[index]
            }
        });
    
    }

    viewTimesheet(){
        console.log("showing");
        this.setState({
            show: true
        });
    }

    showModal(){
        this.setState({ show: true });
    };
    
    hideModal(){
        this.setState({ show: false });
    };

    showMore(timesheetLength){
        console.log("The length of the timesheet " + timesheetLength);
        let length = this.state.length + 5;
        if(timesheetLength < length){
            length = timesheetLength;
        }
        this.setState({
            length: timesheetLength
        })
    }

    showLess(timesheetLength){
        console.log("The length of the timesheet " + timesheetLength);
        let length = this.state.length;
        if(length % 5 === 0){
           length = length -5; 
        }
        else{
            while(length % 5 !== 0){
                length--;
            }
        }
        console.log(length);
        this.setState({
            length: length
        })
    }

    render(){
        let timesheets = [];
        var timesheetLength = 5;
        if ( !this.props.loading) {
            timesheets = this.props.timesheets.slice(0, this.state.length).map( (timesheet, index) => (
                    <tr key={timesheet.weekendEnding}>
                        <td>{timesheet.weekendEnding}</td>
                        <td>{timesheet.totalBillingHour}</td>
                        <td>
                            {timesheet.submissionStatus}
                            {timesheet.submissionStatus === "Incomplete"?
                            <Tooltip title= {timesheet.approvedTimesheetLink.length !== 0? "Items due: Proof of Approved TimeSheet": ""}>
                                <IconButton aria-label="information">
                                    <IoIosInformationCircle/>
                                </IconButton>
                            </Tooltip> 
                            : null}
                            {timesheet.applicationStatus === "Not Approved" && timesheet.submissionStatus === "Complete"?
                            <Tooltip title= {timesheet.submissionStatus === "Complete"? "Approval denied by Admin, please contact your HR manager": ""}>
                                <IconButton aria-label="information">
                                    <IoIosInformationCircle/>
                                </IconButton>
                            </Tooltip> 
                            : null}
                        </td>
                        <td>{timesheet.applicationStatus}</td>
                        <td>
                        {timesheet.applicationStatus === "Approved"?
                        <div>
                            <Button variant="success" onClick={()=>this.viewTimesheet()}>View</Button>
                            <Modal show={this.state.show} onHide={()=>this.hideModal()}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                                <Modal.Header closeButton>
                                    <Modal.Title><h3>Week Ending: {timesheet.weekendEnding}</h3></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Total Billing Hour: {timesheet.totalBillingHour}</h4>
                                    <h4>Total Compensated Hour: {timesheet.totalCompensatedHour}</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <td>Day of the week</td>
                                                <td>Date</td>
                                                <td>Starting time</td>
                                                <td>Ending time</td>
                                                <td>Total Hour</td>
                                                <td>Floating day</td>
                                                <td>Vacation day</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {timesheet.detailList.map( detail => (
                                            <tr key ={detail.date}>
                                                <td>{dayWeek[new Date(detail.date).getDay()]}</td>
                                                <td>{detail.date}</td>
                                                <td>{detail.starttime}</td>
                                                <td>{detail.endingtime}</td>
                                                <td>{detail.totalhour}</td>
                                                <td>{detail.floatingDay}</td>
                                                <td>{detail.vacationDay}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={()=>this.hideModal()}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* {this.state.show ? 
                            <ModalCustom handleClose={()=>this.hideModal()}>                                
                                <h2>Week Ending: {timesheet.weekendEnding}</h2>
                                <h3>Total Billing Hour: {timesheet.totalBillingHour}</h3>
                                <h3>Total Compensated Hour: {timesheet.totalCompensatedHour}</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Day of the week</td>
                                            <td>Date</td>
                                            <td>Starting time</td>
                                            <td>Ending time</td>
                                            <td>Total Hour</td>
                                            <td>Floating day</td>
                                            <td>Vacation day</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {timesheet.detailList.map( detail => (
                                        <tr key ={detail.date}>
                                            <td>{dayWeek[new Date(detail.date).getDay()]}</td>
                                            <td>{detail.date}</td>
                                            <td>{detail.starttime}</td>
                                            <td>{detail.endingtime}</td>
                                            <td>{detail.totalhour}</td>
                                            <td>{detail.floatingDay}</td>
                                            <td>{detail.vacationDay}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </ModalCustom>: <div></div>} */}
                        </div>: 
                        <Button variant="warning" onClick = {() => this.editTimesheet(index)}>Edit</Button>}
                        </td>
                        <td>    
                        {timesheet.floatingDay > 0 || timesheet.vacationDay > 0 ?
                        <div>
                            {timesheet.floatingDay > 0? timesheet.floatingDay + " Floating Day is required. ": ""}
                            {timesheet.vacationDay > 0? timesheet.vacationDay + " Vacation Day is required": ""}
                        <Tooltip title={(timesheet.floatingDay > 0? "Total floating days left in " + this.props.remainingDay.year + ": " + this.props.remainingDay.floatingDay + " days. ":"") + 
                        (timesheet.vacationDay > 0? "Total vacation days left in" + this.props.remainingDay.year + ": "+ this.props.remainingDay.vacationDay + " days.": "")}>
                            <IconButton aria-label="information">
                                <IoIosInformationCircle/>
                            </IconButton>
                        </Tooltip></div>: null}
                        </td>
                    </tr>
            ) )
            timesheetLength = this.props.timesheets.length;
            
        }
        return <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Week Ending</td>
                        <td>Total Hours</td>
                        <td>Submission Status</td>
                        <td>Application Status</td>
                        <td>Option</td>
                        <td>Comment</td>
                    </tr>
                </thead>
                    <tbody>
                        {timesheets}
                    </tbody>
            </Table>
            {this.state.length < timesheetLength?<Button variant="primary" onClick={()=>this.showMore(timesheetLength)}>Show More</Button>:null}
            {this.state.length > 5?<Button variant="danger" onClick= {()=>this.showLess(timesheetLength)}>Show Less</Button>:null}
            
        </Container>
    }
}

const mapStateToProps = state => {
    return {
        timesheets: state.summary.timesheets,
        loading: state.summary.loading,
        remainingDay: state.summary.remainingDay
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTimesheet: () => dispatch( action.getTimesheet() ),
        getRemainingDay: (year) => dispatch( action.getRemainingDay(year) )
        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Summary );