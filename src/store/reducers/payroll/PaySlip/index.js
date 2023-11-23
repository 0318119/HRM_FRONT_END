import {
    GET_PAY_SLIP_PDF_DATA,
    GET_PAY_SLIP_PDF_DATA_START,
    GET_PAY_SLIP_PDFDATA_SINGLE,
    GET_PAY_SLIP_PDF_DATA_END
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Pay_Slip = (state = initState, action) => {
    switch (action.type) {
        case GET_PAY_SLIP_PDF_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_PAY_SLIP_PDF_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        // case GET_TRANSITION_COST_CENTRE_DATA_SINGLE:
        //     return {
        //         ...state,
        //         dataSingle: action.payload,
        //         loading: action.loading,
        //     };
        case GET_PAY_SLIP_PDF_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Pay_Slip