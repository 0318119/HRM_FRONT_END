import {
    GET_SALARY_DATA,
    GET_SALARY_START,
    GET_SALARY_SINGLE,
    GET_SALARY_END,
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

const Red_AppointSalary = (state = initState, action) => {
    switch (action.type) {
        case GET_SALARY_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_SALARY_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_SALARY_DATA:
            return {
                ...state,
                getEdu: action.payload,
                loading: action.loading,
            };
        case GET_SALARY_DATA:
            return {
                ...state,
                getGrade: action.payload,
                loading: action.loading,
            }
        case GET_SALARY_DATA:
            return {
                ...state,
                getInsti: action.payload,
                loading: action.loading,
            }
        case GET_SALARY_DATA:
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