import {
    GET_IncomeTax_Columns_DATA,
    GET_IncomeTax_Columns_DATA_START,
    GET_IncomeTax_Columns_DATA_SINGLE,
    GET_IncomeTax_Columns_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const IncomeTax_Column = (state = initState, action) => {
    switch (action.type) {
        case GET_IncomeTax_Columns_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_IncomeTax_Columns_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_IncomeTax_Columns_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_IncomeTax_Columns_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default IncomeTax_Column