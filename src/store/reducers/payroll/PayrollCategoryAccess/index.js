import {
    GET_Payroll_Catery_Access_DATA,
    GET_Payroll_Catery_Access_START,
    GET_Payroll_Catery_Access_SINGLE,
    GET_Payroll_Catery_Access_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const  Red_PayrollCategoryAccessBank = (state = initState, action) => {
    switch (action.type) {
        case GET_Payroll_Catery_Access_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_Payroll_Catery_Access_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_Payroll_Catery_Access_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };
        case GET_Payroll_Catery_Access_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default  Red_PayrollCategoryAccessBank;