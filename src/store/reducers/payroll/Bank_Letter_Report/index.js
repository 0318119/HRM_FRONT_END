import {
    GET_Bank_Letter_Report_DATA,
    GET_Bank_Letter_Report_Bank_Data,
    GET_Bank_Letter_Report_Payroll_Data,
    GET_Bank_Letter_Report_Type_Data,
    GET_Bank_Letter_Report_Region_Data,
    GET_Bank_Letter_Report_START,
    GET_Bank_Letter_Report_END
} from '../../../actions/types'


const initState = {
    data: [],
    getType:[],
    getPayroll :[],
    getRegion:[],
    getBank:[],
    dataSingle: [],
    loading: false,
}

const Red_Bank_Letter_Report = (state = initState, action) => {
    switch (action.type) {
        case GET_Bank_Letter_Report_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Bank_Letter_Report_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Bank_Letter_Report_Bank_Data:
            return {
                ...state,
                getBank: action.payload,
                loading: action.loading, 
            };
        case GET_Bank_Letter_Report_Payroll_Data:
            return {
                ...state,
                getPayroll: action.payload,
                loading: action.loading,
            };
        case GET_Bank_Letter_Report_Type_Data:
            return {
                ...state,
                getType: action.payload,
                loading: action.loading,
            };
        case GET_Bank_Letter_Report_Region_Data:
            return {
                ...state,
                getRegion: action.payload,
                loading: action.loading,
            };
        case GET_Bank_Letter_Report_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Bank_Letter_Report