import {
    GET_CHECKLIST_DATA,
    GET_CHECKLIST_DATA_START,
    GET_CHECKLIST_DATA_CHECK,
    GET_CHECKLIST_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataCheck: [],
    loading: false,
}

const Red_AppointChecklist = (state = initState, action) => {
    switch (action.type) {
        case GET_CHECKLIST_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_CHECKLIST_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_CHECKLIST_DATA_CHECK:
            return {
                ...state,
                dataCheck: action.payload,
                loading: action.loading,
            };
      

        case GET_CHECKLIST_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_AppointChecklist