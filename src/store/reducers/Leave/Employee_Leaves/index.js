import {
    GET_EMP_LEAVE_DATA_START,
    GET_EMP_LEAVES_DATA,
    GET_EMP_LEAVE_DATA_END,
    GET_EMP_LEAVE_DATA_SINGLE,
    // =================================================================
    GET_EMP_LAVES_NAME_DATA,
    GET_EMP_LEAVES_TYPE_DATA,
    GET_EMP_LEAVES_APPLIED,
    GET_EMP_LEAVES_BALANCED_DAYS,
    GET_EMP_LEAVES_APPLICATIONS,
    GET_EMP_LEAVES_ATTACEMENTS
} from '../../../actions/types'

const initState = {
    AllEmployees: [],
    LEAVE_TYPE: [],
    APPLIED:[],
    BALANCED_DAYS: [],
    GET_LEAVES_APP : [],
    dataSingle: [],
    ATTACEMENTS_DATA : []
}

const Red_Emp_Leaves = (state = initState, action) => {
    switch (action.type) {
        case GET_EMP_LEAVE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_EMP_LAVES_NAME_DATA:
            return {
                ...state,
                AllEmployees: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVES_TYPE_DATA:
            return {
                ...state,
                LEAVE_TYPE: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVES_APPLIED:
            return {
                ...state,
                APPLIED: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVES_BALANCED_DAYS:
            return {
                ...state,
                BALANCED_DAYS: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVES_APPLICATIONS:
            return {
                ...state,
                GET_LEAVES_APP: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVE_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVES_ATTACEMENTS:
            return {
                ...state,
                ATTACEMENTS_DATA: action.payload,
                loading: action.loading,
            };
        case GET_EMP_LEAVE_DATA_END:
            return {
                ...state,
                AllEmployees: action.payload,
                LEAVE_TYPE: action.payload,
                APPLIED: action.payload,
                BALANCED_DAYS: action.payload,
                GET_LEAVES_APP: action.payload,
                dataSingle: action.payload,
                ATTACEMENTS_DATA: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Emp_Leaves