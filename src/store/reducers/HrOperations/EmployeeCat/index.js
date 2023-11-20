import {
    GET_TRANSITION_EMPLOYEE_CAT_DATA,
    GET_TRANSITION_EMPLOYEE_CAT_START,
    GET_TRANSITION_EMPLOYEE_CAT_SINGLE,
    GET_TRANSITION_EMPLOYEE_CAT_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Employee_Cat = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_EMPLOYEE_CAT_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TRANSITION_EMPLOYEE_CAT_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_EMPLOYEE_CAT_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_EMPLOYEE_CAT_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Employee_Cat