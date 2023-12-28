import {
    GET_LATE_ARRIVAL_DATA,
    GET_LATE_ARRIVAL_DATA_START,
    GET_LATE_ARRIVAL_DATA_SINGLE,
    GET_LATE_ARRIVAL_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_LateArrival = (state = initState, action) => {
    switch (action.type) {
        case GET_LATE_ARRIVAL_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_LATE_ARRIVAL_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_LATE_ARRIVAL_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_LATE_ARRIVAL_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_LateArrival