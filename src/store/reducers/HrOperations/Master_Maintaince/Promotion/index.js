import {
    GET_PROMOTION_DATA_START,
    GET_PROMOTION_DATA,
    GET_PROMOTION_CATEGORY_DATA,
    GET_PROMOTION_DESIGNATION_DATA,
    GET_PROMOTION_GRADE_DATA,
    GET_PROMOTION_COSTCENTER_DATA,
    GET_PROMOTION_INFO_DATA,
    GET_PROMOTION_SUPERVISOR_DATA,
    GET_PROMOTION_WAITING_DATA,
    GET_PROMOTION_BYID_DATA,
    GET_PROMOTION_DATA_END
} from '../../../../actions/types'

const initState = {
    data: [],
    dataInfo: [],
    dataCategory: [],
    dataDesignation: [],
    dataGrade: [],
    dataById:[],
    dataWaitings: [],
    dataSupervisor: [],
    dataCostCenter: [],
    loading: false,
}

const Red_Promotion = (state = initState, action) => {
    switch (action.type) {
        case GET_PROMOTION_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_PROMOTION_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_INFO_DATA:
            return {
                ...state,
                dataInfo: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_CATEGORY_DATA:
            return {
                ...state,
                dataCategory: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_DESIGNATION_DATA:
            return {
                ...state,
                dataDesignation: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_GRADE_DATA:
            return {
                ...state,
                dataGrade: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_COSTCENTER_DATA:
            return {
                ...state,
                dataCostCenter: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_WAITING_DATA:
            return {
                ...state,
                dataWaitings: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_BYID_DATA:
            return {
                ...state,
                dataById: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_SUPERVISOR_DATA:
            return {
                ...state,
                dataSupervisor: action.payload,
                loading: action.loading,
            };
        case GET_PROMOTION_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Promotion