import {
    GET_New_Appointment_Report_DATA,
    GET_New_Appointment_Report_START,
    GET_New_Appointment_Report_SINGLE,
    GET_New_Appointment_Report_END
} from '../../../actions/types.js'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_New_Appointment_Report = (state = initState, action) => {
    switch (action.type) {
        case GET_New_Appointment_Report_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_New_Appointment_Report_DATA:
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
        case GET_New_Appointment_Report_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_New_Appointment_Report