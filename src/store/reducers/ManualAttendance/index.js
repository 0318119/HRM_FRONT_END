import {
    GET_MANUAL_ATTENDANCE_DATA,
    GET_MANUAL_ATTENDANCE_DATA_START,
    GET_MANUAL_ATTENDANCE_DATA_INFO,
    GET_MANUAL_ATTENDANCE_DATA_SINGLE,
    GET_MANUAL_ATTENDANCE_DATA_END
} from '../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    GetInfo: [],
    loading: false,
}

const Red_ManualAttendence = (state = initState, action) => {
    switch (action.type) {
        case GET_MANUAL_ATTENDANCE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_MANUAL_ATTENDANCE_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_MANUAL_ATTENDANCE_DATA_INFO:
            return {
                ...state,
                GetInfo: action.payload,
                loading: action.loading,
            };
        case GET_MANUAL_ATTENDANCE_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_MANUAL_ATTENDANCE_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_ManualAttendence