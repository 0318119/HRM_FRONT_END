import {
    GET_Increment_DATA,
    GET_Increment_START,
    GET_Increment_Confirmation,
    GET_Increment_END
} from "../../../actions/types";


const initState = {
    data: [],
    dataSingle: [],
    GetConfirmation: [],
    loading: false,
}

const Red_Increment = (state = initState, action) => {
    switch (action.type) {
        case GET_Increment_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Increment_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Increment_Confirmation:
            return {
                ...state,
                GetInfo: action.payload,
                loading: action.loading,
            };
        case GET_Increment_END:
            return {
                ...state,
                data: action.payload,
                GetInfo: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Increment