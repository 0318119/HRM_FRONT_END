import {
    LOGIN_DATA_START,
    LOGIN_DATA_END,
    // =================================================================
    LOGIN_GET_COMPANY_DATA
} from '../../actions/types'

const initState = {
    COMPANIES: [],
}

const Red_Login = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case LOGIN_GET_COMPANY_DATA:
            return {
                ...state,
                COMPANIES: action.payload,
                loading: action.loading,
            };
        case LOGIN_DATA_END:
            return {
                ...state,
                COMPANIES: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Login