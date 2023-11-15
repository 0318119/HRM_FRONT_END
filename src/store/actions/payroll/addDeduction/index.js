import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const ListDeduction = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/deductions/GetallDeductions/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_ALLOWANCE_COMPLETE,
                payload: res.data1,
            });
        }
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
        console.log(error)
    }

}


export const DeleteDeduction = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/DeleteDeductions`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Deduction_code: body
            })
        });
        const res = await response.json()
        if (res?.success == "success") {
            return res;
        }
    }
    catch (error) {
        console.log(error)
    }

}


export const SaveDeduction = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/AddDeductions`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Deduction_code:0,
                Deduction_name : body?.Deduction_name,
                Deduction_abbr : body?.Deduction_abbr,
                Fix_Sheet_Col_no : body?.Fix_Sheet_Col_no,
                One_Sheet_Col_no : body?.One_Sheet_Col_no,
                JV_Code : body?.JV_Code,
                JV_Summary_Code : body?.JV_Summary_Code,
                Sort_key : body?.Sort_key
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const GetUpdateData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/GetbyDeductionscode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Deduction_code: body,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}


export const UpdateDeductionFunction = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/AddDeductions`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Deduction_code: body?.Deduction_code,
                Deduction_name : body?.Deduction_name,
                Deduction_abbr : body?.Deduction_abbr,
                Fix_Sheet_Col_no : body?.Fix_Sheet_Col_no,
                One_Sheet_Col_no : body?.One_Sheet_Col_no,
                JV_Code : body?.JV_Code,
                JV_Summary_Code : body?.JV_Summary_Code,
                Sort_key : body?.Sort_key
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}