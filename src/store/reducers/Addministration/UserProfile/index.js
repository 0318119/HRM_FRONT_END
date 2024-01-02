import {
    GET_CHANGE_PROFILE_DATA,
    GET_CHANGE_PROFILE_DATA_START,
    GET_CHANGE_PROFILE_DATA_SINGLE,
    GET_CHANGE_PROFILE_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_ChangePassword = (state = initState, action) => {
    switch (action.type) {
        case GET_CHANGE_PROFILE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_CHANGE_PROFILE_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_CHANGE_PROFILE_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_CHANGE_PROFILE_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_ChangePassword 