import {
    GET_TransactionResignation_DATA,
    GET_TransactionResignation_START,
    GET_TransactionResignation_Confirmation,
    GET_TransactionResignation_Waiting,
    GET_TransactionResignation_END
} from "../../../actions/types";


const initState = {
    data: [],
    dataSingle: [],
    Waiting: [],
    GetConfirmation: [],
    loading: false,
}

const Red_Transaction_Resignation = (state = initState, action) => {
    switch (action.type) {
        case GET_TransactionResignation_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_TransactionResignation_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_TransactionResignation_Confirmation:
            return {
                ...state,
                GetInfo: action.payload,
                loading: action.loading,
            };
        case GET_TransactionResignation_Waiting:
            return {
                ...state,
                Waiting: action.payload,
                loading: action.loading,
            };
        case GET_TransactionResignation_END:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Transaction_Resignation