import {
    GET_Bank_DATA,
    GET_Bank_DATA_START,
    GET_Bank_DATA_SINGLE,
    GET_Bank_DATA_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const  Red_Bank = (state = initState, action) => {
    switch (action.type) {
        case GET_Bank_DATA_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_Bank_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_Bank_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };
        case GET_Bank_DATA_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default  Red_Bank;