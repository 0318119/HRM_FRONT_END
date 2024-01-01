import {
    GET_Bank_Letter_Report_DATA,
    GET_Bank_Letter_Report_START,
    GET_Bank_Letter_Report_END
} from '../../../actions/types.js'


const initState = {
    data: [],
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