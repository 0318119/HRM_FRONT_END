import {
    GET_EXPRIENCE_INFO_DATA,
    GET_EXPRIENCE_INFO_START,
    GET_EXPRIENCE_EMP_DATA,
    GET_EXPRIENCE_EMPlOYER_DATA,
    GET_EXPRIENCE_INFO_SINGLE,
    GET_EXPRIENCE_INFO_END
    
} from '../../../actions/types'



const initState = {
    data: [],
    getEmp: [],
    getEmployer: [],
    dataSingle: [],
    loading: false,
}

const Red_AppointExprience = (state = initState, action) => {
    switch (action.type) {
        case GET_EXPRIENCE_INFO_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_EXPRIENCE_INFO_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_EXPRIENCE_EMPlOYER_DATA:
            return {
                ...state,
                getEmployer: action.payload,
                loading: action.loading,
            };
        case GET_EXPRIENCE_EMP_DATA:
            return {
                ...state,
                getEmp: action.payload,
                loading: action.loading,
            };
        case GET_EXPRIENCE_INFO_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_EXPRIENCE_INFO_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_AppointExprience