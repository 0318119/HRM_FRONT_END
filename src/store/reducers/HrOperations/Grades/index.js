import {
    GET_TRANSITION_GRADES_DATA,
    GET_TRANSITION_GRADES_START,
    GET_TRANSITION_GRADES_SINGLE,
    GET_TRANSITION_GRADES_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Grades = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_GRADES_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TRANSITION_GRADES_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_GRADES_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_GRADES_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Grades