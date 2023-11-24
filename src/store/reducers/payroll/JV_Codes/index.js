import {
    GET_JV_Code_DATA,
    GET_JV_Code_DATA_START,
    GET_JV_Code_DATA_SINGLE,
    GET_JV_Code_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const JV_Codes = (state = initState, action) => {
    switch (action.type) {
        case GET_JV_Code_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_JV_Code_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_JV_Code_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_JV_Code_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default JV_Codes