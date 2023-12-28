import {
    GET_TRANSITION_DIVISIONS_DATA,
    GET_TRANSITION_DIVISIONS_START,
    GET_TRANSITION_DIVISIONS_DATA_SINGLE,
    GET_TRANSITION_DIVISIONS_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Division = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_DIVISIONS_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TRANSITION_DIVISIONS_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_DIVISIONS_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_DIVISIONS_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Division