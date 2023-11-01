

import {
    GET_TRANSITION_FAMILY_DATA,
    GET_TRANSITION_FAMILY_START,
    GET_TRANSITION_FAMILY_END,
    GET_TRANSITION_FAMILY_DATA_SINGLE,
} from "../../../actions/types";

const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}


const Transition_family = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_FAMILY_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_TRANSITION_FAMILY_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_TRANSITION_FAMILY_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };
        case GET_TRANSITION_FAMILY_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
export default Transition_family;
