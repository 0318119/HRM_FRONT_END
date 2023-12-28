import {
    GET_ServiceLengthReport_DATA,
    GET_ServiceLengthReport_DATA_START,
    GET_ServiceLengthReport_DATA_SINGLE,
    GET_ServiceLengthReport_DATA_END
} from'../../../actions/types.js'

const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_ServiceLengthReport = (state = initState, action) => {
    switch (action.type) {
        case     GET_ServiceLengthReport_DATA_START:

            return {
                ...state,
                loading: action.loading,
            };
        case GET_ServiceLengthReport_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
      
        case GET_ServiceLengthReport_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_ServiceLengthReport