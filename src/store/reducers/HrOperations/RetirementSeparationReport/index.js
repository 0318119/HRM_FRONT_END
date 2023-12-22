import {
    GET_RetirementSeparationReport_DATA,
    GET_RetirementSeparationReport_DATA_START,
    GET_RetirementSeparationReport_DATA_SINGLE,
    GET_RetirementSeparationReport_DATA_END
} from'../../../actions/types.js'

const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_RetirementSeparationReport = (state = initState, action) => {
    switch (action.type) {
        case     GET_RetirementSeparationReport_DATA_START:

            return {
                ...state,
                loading: action.loading,
            };
        case GET_RetirementSeparationReport_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
      
        case GET_RetirementSeparationReport_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_RetirementSeparationReport