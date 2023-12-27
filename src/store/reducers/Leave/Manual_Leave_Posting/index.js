import {
    GET_MANUAL_LEAVE_POSTING_DATA,
    GET_MANUAL_LEAVE_POSTING_DATA_START,
    GET_MANUAL_LEAVE_POSTING_DATA_SINGLE,
    GET_MANUAL_LEAVE_POSTING_DATA_END,
    // =================================================================
    GET_EMP_DATA,
    GET_LEAVE_TYPE_DATA,
    APPLIED_EMP_DAYS_DATA,
    SET_EMP_BALANCE_DAYS,
    GET_MY_LEAVE_EMP_APPLICATION
} from '../../../actions/types'

const initState = {
    AllEmployees: [],
    leavetype: [],
    appliedDays: [],
    balanceDays:[],
    getLeaceApplications:[],
    loading: false,
}

const Red_Manual_Leave_Posting = (state = initState, action) => {
    switch (action.type) {
        case GET_MANUAL_LEAVE_POSTING_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_EMP_DATA:
            return {
                ...state,
                AllEmployees: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_TYPE_DATA:
            return {
                ...state,
                leavetype: action.payload,
                loading: action.loading,
            };
        case APPLIED_EMP_DAYS_DATA:
            return {
                ...state,
                appliedDays: action.payload,
                loading: action.loading,
            };
        case SET_EMP_BALANCE_DAYS:
            return {
                ...state,
                balanceDays: action.payload,
                loading: action.loading,
            };
        case GET_MY_LEAVE_EMP_APPLICATION:
            return {
                ...state,
                getLeaceApplications: action.payload,
                loading: action.loading,
            };
        case GET_MANUAL_LEAVE_POSTING_DATA_END:
            return {
                ...state,
                AllEmployees: action.payload,
                leavetype: action.payload,
                appliedDays: action.payload,
                balanceDays: action.payload,
                getLeaceApplications: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Manual_Leave_Posting