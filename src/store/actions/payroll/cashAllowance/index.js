import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const getCashAllowance = (body) => async (dispatch, getState) => {
    try {       
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationList/${body.pageNo}/${body.pageSize}/${body.search}`, {
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

export const getEmployeeData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/appointments/GetAppointmentsBySeqNo/${body?.Emp_Code}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        return res?.data
    }
    catch (error) {
        console.log(error)
    }
}

export const getEmployeeCashData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/cashAllowances/Get_CashAllowances_ListByCodes`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Emp_code:body?.Emp_Code
            })
        });
        const res = await response.json()
        return res?.data
    }
    catch (error) {
        console.log(error)
    }
}

export const saveAllowanceDetail = (body) => async (dispatch, getState) => {
    console.log(body, 'body')
    try {
        const response = await fetch(`${baseURL.baseUrl}/cashAllowances/SaveCashAllowance`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
                DepositAmount: body?.DepositAmount,
                CashAwardAmount: body.CashAwardAmount,
                Remarks:body.Remarks,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}
export const DeleteAllowanceDetail = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/cashAllowances/DeleteCashAllowance`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}