import {
    GET_Payroll_Catery_Access_DATA,
    GET_Payroll_Catery_Access_START,
    GET_Payroll_Catery_Access_SINGLE,
    GET_Payroll_Catery_Access_END
} from "../../types"
import baseURL from '../../../../config.json'

export const GetPayrollCateryAccess = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_Payroll_Catery_Access_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/payrollCategories/GetallPayrollCategories/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_Payroll_Catery_Access_DATA,
                payload: [{res}],
            });
        }
        dispatch({
            type: GET_Payroll_Catery_Access_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_Payroll_Catery_Access_START,
            payload: false,
        });
        console.log(error)
    }

}


export const GET_Payroll_Category_Access_BY_CODE = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_Payroll_Catery_Access_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/payrollCategories/GetbyPayrollCategoriesCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Payroll_Category_code : body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_Payroll_Catery_Access_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_Payroll_Catery_Access_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_Payroll_Catery_Access_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}

