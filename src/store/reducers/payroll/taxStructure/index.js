import {
    GET_TAX_STRUCTURE_DATA,
    GET_TAX_STRUCTURE_DATA_START,
    GET_TAX_STRUCTURE_DATA_SINGLE,
    GET_TAX_STRUCTURE_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_TaxStructure = (state = initState, action) => {
    switch (action.type) {
        case GET_TAX_STRUCTURE_DATA_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_TAX_STRUCTURE_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case GET_TAX_STRUCTURE_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
            };
        case GET_TAX_STRUCTURE_DATA_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default Red_TaxStructure;