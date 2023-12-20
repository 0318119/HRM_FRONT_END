import {
    GET_SALARY_DATA,
    GET_SALARY_START,
    GET_SALARY_SINGLE,
    GET_SALARY_ALLOWANCE_DATA,
    GET_SALARY_AMOUNT_DATA,
    GET_SALARY_END,
} from '../../../actions/types'


const initState = {
    data: [],
    getAllowance: [],
    getAmount: [],
    dataSingle: [],
    loading: false,
}

const Red_AppointSalary = (state = initState, action) => {
    switch (action.type) {
        case GET_SALARY_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_SALARY_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };

            case GET_SALARY_ALLOWANCE_DATA:
                return {
                    ...state,
                    getAllowance: action.payload,
                    loading: action.loading,
                };
                case GET_SALARY_AMOUNT_DATA:
                return {
                    ...state,
                    getAmount: action.payload,
                    loading: action.loading,
                };
        case GET_SALARY_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_SALARY_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_AppointSalary