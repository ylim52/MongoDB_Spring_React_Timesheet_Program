import * as actionTypes from './actionTypes';
// import axios from '../../axios-link';
import axios from 'axios';

export const getTimesheetSuccess = ( timesheets ) => {
    return {
        type: actionTypes.TIMESHEET_FETCH_SUCCESS,
        timesheets: timesheets
    };
};

export const getTimesheetFail = ( error ) => {
    return {
        type: actionTypes.TIMESHEET_FETCH_FAIL,
        error: error
    };
};

export const getTimesheetStart = () => {
    return {
        type: actionTypes.TIMESHEET_FETCH_START
    };
};

export const getTimesheet = () => {
    return dispatch => {
        dispatch(getTimesheetStart());
        axios.get("/api/timesheet/getTimesheet")
        .then(function (response) {
            console.log("Get timesheet for user");
            console.log(response);
            const timesheets = [];
                for ( let key in response.data ) {
                    timesheets.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
            dispatch(getTimesheetSuccess(timesheets));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(getTimesheetFail(error));
        });
    };
};

// export const makeTimesheet = (date) =>{
//     const timesheetNewRequest = {
//         
//         date: date
//     };

//     axios.post("/timesheet/newTimesheet",timesheetNewRequest)
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// }

export const getRemainingDaySuccess = ( remainingDay ) => {
    return {
        type: actionTypes.REMAINING_DAY_FETCH_SUCCESS,
        remainingDay: remainingDay
    };
};

export const getRemainingDayFail = ( error ) => {
    return {
        type: actionTypes.REMAINING_DAY_FETCH_FAIL,
        error: error
    };
};

export const getRemainingDayStart = () => {
    return {
        type: actionTypes.REMAINING_DAY_FETCH_START
    };
};

export const getRemainingDay = (year) =>{
    return dispatch => {
        dispatch(getRemainingDayStart());
        axios.get("/api/timesheet/getPersonDay?year=" +year)
        .then(function (response) {
            console.log("Get remaning day for user");
            console.log(response);
            const remainingDay = {
                ...response.data
            }
            dispatch(getRemainingDaySuccess(remainingDay));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(getRemainingDayFail(error));
        });
    };
}

export const updateEditStatus = (editStatus) =>{
    return {
        type: actionTypes.UPDATE_EDIT_STATUS,
        editStatus: editStatus
    };
}