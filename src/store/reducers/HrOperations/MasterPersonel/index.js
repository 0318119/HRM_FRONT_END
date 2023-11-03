import {
    GET_TRANSITION_MASTERPERSONEL_DATA,
    GET_TRANSITION_MASTERPERSONEL_DATA_START,
    GET_TRANSITION_MASTERPERSONEL_DATA_SINGLE,
    GET_TRANSITION_MASTERPERSONEL_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Master_Personel = (state = initState, action) => {
    switch (action.type) {
        case GET_TRANSITION_MASTERPERSONEL_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TRANSITION_MASTERPERSONEL_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_MASTERPERSONEL_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_TRANSITION_MASTERPERSONEL_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Master_Personel