import {
    GET_LEAVE_BALANCE_UPLOAD_DATA_START,
    GET_LEAVE_BALANCE_UPLOAD_DATA_END,
    // =================================================================
    GET_LEAVE_BALANCE_UPLOAD_YEAR_DATA
} from '../../../actions/types'

const initState = {
    Years: [],
}

const Red_Leave_Balanced_Upload = (state = initState, action) => {
    switch (action.type) {
        case GET_LEAVE_BALANCE_UPLOAD_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_LEAVE_BALANCE_UPLOAD_YEAR_DATA:
            return {
                ...state,
                Years: action.payload,
                loading: action.loading,
            };
        case GET_LEAVE_BALANCE_UPLOAD_DATA_END:
            return {
                ...state,
                Years: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Leave_Balanced_Upload