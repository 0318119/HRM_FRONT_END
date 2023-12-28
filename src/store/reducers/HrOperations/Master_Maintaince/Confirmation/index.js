import {
    GET_CONFORMATION_DATA,
    GET_CONFORMATION_DATA_START,
    GET_CONFORMATION_DATA_SINGLE,
    GET_CONFORMATION_DATA_END,
    GET_CONFORMATION_DATA_WAITING,
} from '../../../../actions/types'

const initState = {
    data: [],
    dataSingle:[],
    WaitingData:[],
    loading: false,
}

const Red_Confirmation = (state = initState, action) => {
    switch (action.type) {
        case GET_CONFORMATION_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_CONFORMATION_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_CONFORMATION_DATA_WAITING:
            return {
                ...state,
                WaitingData: action.payload,
                loading: action.loading,
            };
        case GET_CONFORMATION_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_CONFORMATION_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Confirmation