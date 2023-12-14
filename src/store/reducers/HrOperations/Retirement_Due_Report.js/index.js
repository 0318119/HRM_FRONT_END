import {
    GET_Retirement_Due_Report_DATA,
    GET_Retirement_Due_Report_START,
    GET_Retirement_Due_Report_END
} from '../../../actions/types.js'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Retirement_Due_Report = (state = initState, action) => {
    switch (action.type) {
        case GET_Retirement_Due_Report_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Retirement_Due_Report_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case  GET_Retirement_Due_Report_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Retirement_Due_Report