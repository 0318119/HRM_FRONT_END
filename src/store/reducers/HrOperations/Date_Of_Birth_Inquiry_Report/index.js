import {
    GET_Date_Of_Birth_Inquiry_Report_DATA,
    GET_Date_Of_Birth_Inquiry_Report_START,
    GET_Date_Of_Birth_Inquiry_Report_END
} from '../../../actions/types.js'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Date_Of_Birth_Inquiry_Report = (state = initState, action) => {
    switch (action.type) {
        case GET_Date_Of_Birth_Inquiry_Report_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_Date_Of_Birth_Inquiry_Report_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_Date_Of_Birth_Inquiry_Report_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading, 
            };
        default:
            return state;
    }
};

export default Red_Date_Of_Birth_Inquiry_Report