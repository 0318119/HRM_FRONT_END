import {
    GET_Confirmation_Extensio2_DATA,
    GET_Confirmation_Extensio2_START,
    GET_Confirmation_Extensio2_Confirmation,
    GET_Confirmation_Extensio2_Designation,
    GET_Confirmation_Extensio2_END
} from "../../../actions/types";


const initState = {
    data: [],
    dataSingle: [],
    GetConfirmation: [],
    GetDesignation: [],
    loading: false,
}

const Red_Confirmation_Extensio2 = (state = initState, action) => {
    switch (action.type) {
        case GET_Confirmation_Extensio2_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Confirmation_Extensio2_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Confirmation_Extensio2_Confirmation:
            return {
                ...state,
                GetInfo: action.payload,
                loading: action.loading,
            };
        case GET_Confirmation_Extensio2_Designation:
            return {
                ...state,
                GetDesignation: action.payload,
                loading: action.loading,
            };
        case GET_Confirmation_Extensio2_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Confirmation_Extensio2