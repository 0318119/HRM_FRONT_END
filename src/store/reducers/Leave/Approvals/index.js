import {
    GET_EMP_APPROVALS_DATA_START,
    GET_EMP_APPROVALS_DATA_END,
    // =================================================================
    GET_EMP_APPROVALS_ALL_DATA,
    GET_LEAVE_SUMMERY_BY_ID,
    GET_LEAVE_SUMMERY_FILE_BY_ID
} from '../../../actions/types'

const initState = {
    GET_ALL_APPROVALS_DATA: [],
    LEAVE_SUMMERY_DATA: [],
    LEAVE_SUMMERY_FILE: []
}

const Red_Emp_Leaves_Approvals = (state = initState, action) => {
    switch (action.type) {
        case GET_EMP_APPROVALS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_EMP_APPROVALS_ALL_DATA:
            return {
                ...state,
                GET_ALL_APPROVALS_DATA: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_SUMMERY_BY_ID:
            return {
                ...state,
                LEAVE_SUMMERY_DATA: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_SUMMERY_FILE_BY_ID:
            return {
                ...state,
                LEAVE_SUMMERY_FILE: action.payload,
                loading: action.loading,
            };
        case GET_EMP_APPROVALS_DATA_END:
            return {
                ...state,
                GET_ALL_APPROVALS_DATA: action.payload,
                LEAVE_SUMMERY_DATA: action.payload,
                LEAVE_SUMMERY_FILE: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Emp_Leaves_Approvals