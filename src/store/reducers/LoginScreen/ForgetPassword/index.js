import {
    GET_FORGET_PASSWORD_DATA,
    GET_FORGET_PASSWORD_DATA_START,
    GET_FORGET_PASSWORD_DATA_SINGLE,
    GET_FORGET_PASSWORD_DATA_END
} from '../../../actions/types'

const initState = {
    data :[],
    dataSingle:[],
    loading: false
}

const Red_Forget_Password = (state = initState, action) => {
    switch (action.type) {
        case GET_FORGET_PASSWORD_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_FORGET_PASSWORD_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_FORGET_PASSWORD_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_FORGET_PASSWORD_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Forget_Password