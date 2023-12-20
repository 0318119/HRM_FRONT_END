import {
    GET_APPOIN_PAYROLL_DATA,
    GET_APPOIN_PAYROLL_INFO_DATA,
    GET_APPOIN_PAYROLL_DATA_START,
    GET_APPOIN_PAYROLL_BANK_BRANCHES_DATA,
    GET_APPOIN_PAYROLL_DATA_SINGLE,
    GET_APPOIN_PAYROLL_DATA_END

} from '../../../actions/types'



const initState = {
    data: [],
    GetInfo: [],
    GetBB: [],
    dataSingle: [],
    loading: false,
}

const Red_AppointPayroll = (state = initState, action) => {
    switch (action.type) {
        case GET_APPOIN_PAYROLL_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_APPOIN_PAYROLL_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_APPOIN_PAYROLL_INFO_DATA:
            return {
                ...state,
                GetInfo: action.payload,
                loading: action.loading,
            };
        case GET_APPOIN_PAYROLL_BANK_BRANCHES_DATA:
            return {
                ...state,
                GetBB: action.payload,
                loading: action.loading,
            };
        case GET_APPOIN_PAYROLL_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_APPOIN_PAYROLL_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_AppointPayroll