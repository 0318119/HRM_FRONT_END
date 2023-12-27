import {
    GET_TranEducationReport_DATA,
    GET_TranEducationReport_DATA_START,
    GET_TranEducationReport_DATA_SINGLE,
    GET_TranEducationReport_DATA_END
} from '../../../actions/types.js'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_TranEducationReport = (state = initState, action) => {
    switch (action.type) {
        case GET_TranEducationReport_DATA_START:

            return {
                ...state,
                loading: action.loading,
            };
        case GET_TranEducationReport_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };

        case GET_TranEducationReport_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_TranEducationReport