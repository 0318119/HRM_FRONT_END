import {
    GET_Confirmation_Extension_DATA,
    GET_Confirmation_Extension_START,
    GET_Confirmation_Extension_Confirmation,
    GET_Confirmation_Extension_END
} from "../../../actions/types";


const initState = {
    data: [],
    dataSingle: [],
    GetConfirmation: [],
    loading: false,
}

const Red_Confirmation_Extension = (state = initState, action) => {
    switch (action.type) {
        case GET_Confirmation_Extension_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Confirmation_Extension_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Confirmation_Extension_Confirmation:
            return {
                ...state,
                GetInfo: action.payload,
                loading: action.loading,
            };
        case GET_Confirmation_Extension_END:
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

export default Red_Confirmation_Extension