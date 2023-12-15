import {
    GET_EDUCATIION_INFO_DATA,
    GET_EDUCATIION_INFO_START,
    GET_EDUCATIION_INFO_SINGLE,
    GET_EDUCATIION_EDUCATION_DATA,
    GET_EDUCATIION_GRADE_DATA,
    GET_EDUCATIION_INSTITUTE_DATA,
    GET_EDUCATIION_EDUCATION_SAVED_DATA,
    GET_EDUCATIION_INFO_END
} from '../../../actions/types'


const initState = {
    data: [],
    getGrade: [],
    getEdu: [],
    getInsti: [],
    getSavedData : [],
    dataSingle: [],
    loading: false,
}

const Red_AppointEducation = (state = initState, action) => {
    switch (action.type) {
        case GET_EDUCATIION_INFO_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_EDUCATIION_INFO_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_EDUCATIION_EDUCATION_DATA:
            return {
                ...state,
                getEdu: action.payload,
                loading: action.loading,
            };
        case GET_EDUCATIION_GRADE_DATA:
            return {
                ...state,
                getGrade: action.payload,
                loading: action.loading,
            }
        case GET_EDUCATIION_INSTITUTE_DATA:
            return {
                ...state,
                getInsti: action.payload,
                loading: action.loading,
            }
        case GET_EDUCATIION_EDUCATION_SAVED_DATA:
            return {
                ...state,
                getSavedData: action.payload,
                loading: action.loading,
            }                 
        case GET_EDUCATIION_INFO_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_EDUCATIION_INFO_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_AppointEducation