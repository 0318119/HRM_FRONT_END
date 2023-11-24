import {
    GET_ALLOWANCE_START,
    GET_ALLOWANCE_COMPLETE,
    GET_ALLOWANCE_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const TaxReport = (state = initState, action) => {
    switch (action.type) {
        case GET_ALLOWANCE_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_ALLOWANCE_COMPLETE:
            return {
                ...state,
                data: action.payload,
            };
        case GET_ALLOWANCE_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default TaxReport;