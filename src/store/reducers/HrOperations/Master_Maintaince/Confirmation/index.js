import {
    GET_confirmation_DATA,
    GET_confirmation_START ,
    GET_confirmation_SINGLE,
    GET_confirmation_END
} from '../../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const  Red_Confirmation = (state = initState, action) => {
    switch (action.type) {
        case GET_confirmation_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_confirmation_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_confirmation_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };
        case GET_confirmation_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default  Red_Confirmation;