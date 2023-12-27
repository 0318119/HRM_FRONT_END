import {
    GET_Experience_Report_DATA,
    GET_Experience_Report_START,
    GET_Experience_Report_END
} from '../../../actions/types.js'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Experience_Report = (state = initState, action) => {
    switch (action.type) {
        case GET_Experience_Report_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Experience_Report_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Experience_Report_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Experience_Report