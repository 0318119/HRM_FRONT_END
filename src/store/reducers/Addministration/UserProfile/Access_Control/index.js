import {
    GET_Access_Control_DATA,
    GET_Access_Control_DATA_START,
    GET_Access_Control_DATA_SINGLE,
    GET_Access_Control_DATA_END,
} from '../../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Access_Control = (state = initState, action) => {
    switch (action.type) {
        case GET_Access_Control_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Access_Control_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Access_Control_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_Access_Control_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Access_Control 