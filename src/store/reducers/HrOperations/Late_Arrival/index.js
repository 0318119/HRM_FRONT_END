import {
    GET_LATE_ARRIVAL_DATA,
    GET_LATE_ARRIVAL_DATA_START,
    GET_LATE_ARRIVAL_DATA_SINGLE,
    GET_LOCATIONS_DATA,
    GET_SECTION_DATA,
    GET_DIVISION_DATA,
    GET_LATE_ARRIVAL_DATA_END,
} from '../../../actions/types'


const initState = {
    deptData: [],
    locationData :[],
    SectionData: [],
    divisionData: [],
    loading: false,
}

const Red_LateArrival = (state = initState, action) => {
    switch (action.type) {
        case GET_LATE_ARRIVAL_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_LATE_ARRIVAL_DATA:
            return {
                ...state,
                deptData: action.payload,
                loading: action.loading,
            };
        case GET_LOCATIONS_DATA:
            return {
                ...state,
                locationData: action.payload,
                loading: action.loading,
            };
        case GET_SECTION_DATA:
            return {
                ...state,
                SectionData: action.payload,
                loading: action.loading,
            };
        case GET_DIVISION_DATA:
            return {
                ...state,
                divisionData: action.payload,
                loading: action.loading,
            };      
        case GET_LATE_ARRIVAL_DATA_END:
            return {
                ...state,
                deptData: action.payload,
                locationData: action.payload,
                SectionData: action.payload,
                divisionData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_LateArrival