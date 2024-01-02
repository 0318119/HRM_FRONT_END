import {
    GET_EMP_APPROVALS_DATA_START,
    GET_EMP_APPROVALS_DATA_END,
    // =================================================================
    GET_EMP_APPROVALS_ALL_DATA,
    GET_EMP_APPROVALS_REJECT_LEAVE,
    GET_EMP_APPROVALS_STEP_BACK_LEAVE,
    GET_EMP_APPROVALS_APPROVED_LEAVE,
} from '../../../actions/types'

const initState = {
    GET_ALL_APPROVALS_DATA: [],
    GET_ALL_REJECTED_LEAVES: [],
    GET_ALL_STEP_BACK_LEAVES: [],
    GET_ALL_APPROVED_LEAVES:[],
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
        case GET_EMP_APPROVALS_REJECT_LEAVE:
            return {
                ...state,
                GET_ALL_REJECTED_LEAVES: action.payload,
                loading: action.loading,
            };
        case GET_EMP_APPROVALS_STEP_BACK_LEAVE:
            return {
                ...state,
                GET_ALL_STEP_BACK_LEAVES: action.payload,
                loading: action.loading,
            };
        case GET_EMP_APPROVALS_APPROVED_LEAVE:
            return {
                ...state,
                GET_ALL_APPROVED_LEAVES: action.payload,
                loading: action.loading,
            };
        case GET_EMP_APPROVALS_DATA_END:
            return {
                ...state,
                GET_ALL_APPROVALS_DATA: action.payload,
                GET_ALL_REJECTED_LEAVES: action.payload,
                GET_ALL_STEP_BACK_LEAVES: action.payload,
                GET_ALL_APPROVED_LEAVES: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Emp_Leaves_Approvals