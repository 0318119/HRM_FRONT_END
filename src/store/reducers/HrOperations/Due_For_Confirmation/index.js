import {
    GET_DUE_FOR_CONFIRMATION_DATA,
    GET_DUE_FOR_CONFIRMATION_DATA_START,
    GET_DUE_FOR_CONFIRMATION_DATA_SINGLE,
    GET_DUE_FOR_CONFIRMATION_DATA_END
} from '../../../actions/types.js'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Due_For_Confirmation = (state = initState, action) => {
    switch (action.type) {
        case GET_DUE_FOR_CONFIRMATION_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_DUE_FOR_CONFIRMATION_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
      
        case GET_DUE_FOR_CONFIRMATION_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Due_For_Confirmation