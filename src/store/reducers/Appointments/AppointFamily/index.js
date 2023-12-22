import {
    GET_FAMILY_DATA,
    GET_FAMILY_DATA_START,
    GET_FAMILY_CHILDREN_DATA,
    GET_FAMILY_MARRIAGE_DATA,
    GET_FAMILY_DATA_SINGLE,
    GET_FAMILY_DATA_END

} from '../../../actions/types'



const initState = {
    data: [],
    getMarrige: [],
    getChlidren: [],
    dataSingle: [],
    loading: false,
}

const Red_AppointFamily = (state = initState, action) => {
    switch (action.type) {
        case GET_FAMILY_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_FAMILY_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_FAMILY_CHILDREN_DATA:
            return {
                ...state,
                getChlidren: action.payload,
                loading: action.loading,
            };
        case GET_FAMILY_MARRIAGE_DATA:
            return {
                ...state,
                getMarrige: action.payload,
                loading: action.loading,
            };
        case GET_FAMILY_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_FAMILY_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_AppointFamily