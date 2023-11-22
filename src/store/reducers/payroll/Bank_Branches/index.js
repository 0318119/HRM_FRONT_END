import {
    GET_Bank_Branches_DATA,
    GET_Bank_Branches_DATA_START,
    GET_Bank_Branches_DATA_SINGLE,
    GET_Bank_Branches_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Bank_Branches = (state = initState, action) => {
    switch (action.type) {
        case GET_Bank_Branches_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Bank_Branches_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Bank_Branches_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_Bank_Branches_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Bank_Branches