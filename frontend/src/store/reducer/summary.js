import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

// const updateObject = (oldObject, updatedProperties) => {
//     return {
//         ...oldObject,
//         ...updatedProperties
//     };
// };

const initialState = {
    loading: false,
    timesheets: [],
    remainingDay: {},
    editStatus: []
};

const getTimesheetStart = ( state, action ) => {
    return updateObject( state, { 
        loading: true 
    } );
};

const getTimesheetSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        timesheets: action.timesheets
    });
};

const getTimesheetFail = ( state, action ) => {
    return updateObject( state, { loading: false, 
    } );
};

const getRemainingDayStart = ( state, action ) => {
    return updateObject( state, { 
        loading: true 
    } );
};

const getRemainingDaySuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        remainingDay: action.remainingDay
    });
};

const getRemainingDayFail = ( state, action ) => {
    return updateObject( state, { loading: false, 
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.TIMESHEET_FETCH_START: return getTimesheetStart( state, action );
        case actionTypes.TIMESHEET_FETCH_SUCCESS: return getTimesheetSuccess( state, action );
        case actionTypes.TIMESHEET_FETCH_FAIL: return getTimesheetFail( state, action );

        case actionTypes.REMAINING_DAY_FETCH_START: return getRemainingDayStart( state, action );
        case actionTypes.REMAINING_DAY_FETCH_SUCCESS: return getRemainingDaySuccess( state, action );
        case actionTypes.REMAINING_DAY_FETCH_FAIL: return getRemainingDayFail( state, action );
        default: return state;
    }
};
export default reducer;