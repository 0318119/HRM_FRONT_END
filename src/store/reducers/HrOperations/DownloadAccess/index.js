import {
    GET_DOWNLOAD_PARA_ACCESS_DATA,
    GET_DOWNLOAD_PARA_ACCESS_START,
    GET_DOWNLOAD_PARA_ACCESS_SINGLE,
    GET_DOWNLOAD_PARA_ACCESS_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Cost_centre = (state = initState, action) => {
    switch (action.type) {
        case GET_DOWNLOAD_PARA_ACCESS_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_DOWNLOAD_PARA_ACCESS_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_DOWNLOAD_PARA_ACCESS_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_DOWNLOAD_PARA_ACCESS_END:
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