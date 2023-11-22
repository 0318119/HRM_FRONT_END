import {
    GET_Outstanding_Recoveries_DATA,
    GET_Outstanding_Recoveries_START,
    GET_Outstanding_Recoveries_SINGLE,
    GET_Outstanding_Recoveries_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const  Red_Bank = (state = initState, action) => {
    switch (action.type) {
        case GET_Outstanding_Recoveries_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_Outstanding_Recoveries_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_Outstanding_Recoveries_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };
        case GET_Outstanding_Recoveries_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default  Red_Bank;