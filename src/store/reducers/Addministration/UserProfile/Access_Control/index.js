import {
    GET_Access_Control_DATA,
    GET_Access_Control_DATA_START,
    GET_Access_Control_DATA_SINGLE,
    GET_Access_Control_DATA_END,
    GET_ALL_MENUS
} from '../../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    AllMenus: [],
    loading: false,
}

const Red_Access_Control = (state = initState, action) => {
    switch (action.type) {
        case GET_Access_Control_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Access_Control_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Access_Control_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_ALL_MENUS:
            return {
                ...state,
                AllMenus: action.payload,
                loading: action.loading,
            };
        case GET_Access_Control_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Access_Control