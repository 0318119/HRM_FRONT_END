import {
    GET_MASTER_ACTIVE_DATA,
    GET_MASTER_ACTIVE_DATA_START,
    GET_MASTER_ACTIVE_DATA_SINGLE,
    GET_MASTER_ACTIVE_DATA_END,
} from "../../../actions/types";

const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_MasterActive = (state = initState, action) => {
    switch (action.type) {
        case GET_MASTER_ACTIVE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_MASTER_ACTIVE_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_MASTER_ACTIVE_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_MASTER_ACTIVE_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_MasterActive