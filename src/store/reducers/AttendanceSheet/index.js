import {
    GET_ATTENDANCE_SHEET_DATA,
    GET_ATTENDANCE_SHEET_START,
    GET_ATTENDANCE_SHEET_SINGLE,
    GET_ATTENDANCE_SHEET_END
} from '../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Attendance_sheet = (state = initState, action) => {
    switch (action.type) {
        case GET_ATTENDANCE_SHEET_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_ATTENDANCE_SHEET_DATA:
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
        case GET_ATTENDANCE_SHEET_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Attendance_sheet