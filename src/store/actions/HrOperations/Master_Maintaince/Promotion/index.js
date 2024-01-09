import {
    GET_PROMOTION_DATA_START,
    GET_PROMOTION_DATA,
    GET_PROMOTION_INFO_DATA,
    GET_PROMOTION_CATEGORY_DATA,
    GET_PROMOTION_COSTCENTER_DATA,
    GET_PROMOTION_DESIGNATION_DATA,
    GET_PROMOTION_SUPERVISOR_DATA,
    GET_PROMOTION_GRADE_DATA,
    GET_PROMOTION_DATA_END
} from "../../../types"
import baseUrl from '../../../../../config.json'



export const AllEmployeeData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        }); 
        const response = await fetch(`${baseUrl.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationList/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


export const GetInfoById = (isCode) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/promotions/Pomotions_MasterEmployees_List_By_Code`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Emp_code": isCode
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_INFO_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}


export const Get_Category = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_category/GetEmploymentCategoryWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_CATEGORY_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}



