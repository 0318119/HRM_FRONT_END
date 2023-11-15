import {
    GET_MASTER_PERSONAL_DATA,
    GET_MASTER_PERSONAL_START,
    GET_MASTER_PERSONALSINGLE,
    GET_MASTER_PERSONAL_END,
} from "../../../actions/types.js";

const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Master_Personal = (state = initState, action) => {
    switch (action.type) {
        case GET_MASTER_PERSONAL_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_MASTER_PERSONAL_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_MASTER_PERSONALSINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_MASTER_PERSONAL_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Master_Personal