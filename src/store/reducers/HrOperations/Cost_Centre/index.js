import {
    GET_TRANSITION_COST_CENTRE_DATA,
    GET_TRANSITION_COST_CENTRE_START,
    GET_TRANSITION_COST_CENTRE_DATA_SINGLE,
    GET_TRANSITION_COST_CENTRE_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Cost_centre = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_COST_CENTRE_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TRANSITION_COST_CENTRE_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_COST_CENTRE_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_COST_CENTRE_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Cost_centre