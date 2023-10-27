import {
    GET_TRANSITION_EMPOYLEE_TYPE_DATA,
    GET_TRANSITION_EMPOYLEE_TYPE_START,
    GET_TRANSITION_EMPOYLEE_TYPE_SINGLE,
    GET_TRANSITION_EMPOYLEE_TYPE_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Employee_type = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_EMPOYLEE_TYPE_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TRANSITION_EMPOYLEE_TYPE_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_EMPOYLEE_TYPE_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_EMPOYLEE_TYPE_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Employee_type