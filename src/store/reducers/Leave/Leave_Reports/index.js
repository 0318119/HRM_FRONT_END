import {
    GET_LEAVE_REPORT_BALANCE_DATA_START,
    GET_LEAVE_REPORT_BALANCE_DATA_END,
    // =================================================================
    GET_LEAVE_REPORT_BALANCE_LEAVE_TYPES,
    GET_LEAVE_REPORT_BALANCE_LEAVE_CAT,
    GET_LEAVE_REPORT_BALANCE_LEAVE_EMP,
    GET_LEAVE_REPORT_BALANCE_LEAVE_YEAR
} from '../../../actions/types'

const initState = {
    LEAVE_TYPES: [],
    EMP_DATA: [],
    LEAVE_CAT: [],
    YEAR_DATA:[]
}

const Red_Leave_Reports = (state = initState, action) => {
    switch (action.type) {
        case GET_LEAVE_REPORT_BALANCE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_LEAVE_REPORT_BALANCE_LEAVE_EMP:
            return {
                ...state,
                EMP_DATA: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_REPORT_BALANCE_LEAVE_CAT:
            return {
                ...state,
                LEAVE_CAT: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_REPORT_BALANCE_LEAVE_TYPES:
            return {
                ...state,
                LEAVE_TYPES: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_REPORT_BALANCE_LEAVE_YEAR:
            return {
                ...state,
                YEAR_DATA: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_REPORT_BALANCE_DATA_END:
            return {
                ...state,
                EMP_DATA: action.payload,
                LEAVE_TYPES: action.payload,
                LEAVE_CAT: action.payload,
                YEAR_DATA: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Leave_Reports