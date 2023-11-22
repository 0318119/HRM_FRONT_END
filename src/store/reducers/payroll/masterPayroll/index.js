import {
    GET_MASTER_PAYROLL_DATA,
    GET_MASTER_PAYROLL_DATA_START,
    GET_MASTER_PAYROLL_DATA_SINGLE,
    GET_MASTER_PAYROLL_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const RedMasterPayroll = (state = initState, action) => {
    switch (action.type) {
        case GET_MASTER_PAYROLL_DATA_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_MASTER_PAYROLL_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_MASTER_PAYROLL_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };   
        case GET_MASTER_PAYROLL_DATA_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default RedMasterPayroll;