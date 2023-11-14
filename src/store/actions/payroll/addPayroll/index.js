import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const ListPayroll = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALLOWANCE_START,
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


export const DeleteLoans = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/payrollCategories/DeletePayrollCategories`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Payroll_Category_code: body
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


export const SavePayroll = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/payrollCategories/AddPayrollCategories`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Payroll_Category_code:'0',
                Payroll_Category_name:body?.Payroll_Category_name,
                Payroll_Category_abbr:body?.Payroll_Category_abbr,
                Payroll_Month:body?.Payroll_Month,
                Payroll_Year:body?.Payroll_Year,
                Payroll_Last_Month:body?.Payroll_Last_Month,
                Payroll_Last_Year:body?.Payroll_Last_Year,
                Payroll_Undo_Flag:body?.Payroll_Undo_Flag,
                Loan_Completion_Flag:body?.Loan_Completion_Flag,
                Sort_key:body?.Sort_key,
                pf_percentage:body?.pf_percentage,
                active_flag:body?.active_flag
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
        const response = await fetch(`${baseURL.baseUrl}/payrollCategories/GetbyPayrollCategoriesCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Payroll_Category_code: body,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}


export const UpdatePayrollFunction = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/payrollCategories/AddPayrollCategories`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Payroll_Category_code:body?.Payroll_Category_code,
                Payroll_Category_name:body?.Payroll_Category_name,
                Payroll_Category_abbr:body?.Payroll_Category_abbr,
                Payroll_Month:body?.Payroll_Month,
                Payroll_Year:body?.Payroll_Year,
                Payroll_Last_Month:body?.Payroll_Last_Month,
                Payroll_Last_Year:body?.Payroll_Last_Year,
                Payroll_Undo_Flag:body?.Payroll_Undo_Flag,
                Loan_Completion_Flag:body?.Loan_Completion_Flag,
                Sort_key:body?.Sort_key,
                pf_percentage:body?.pf_percentage,
                active_flag:body?.active_flag
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}