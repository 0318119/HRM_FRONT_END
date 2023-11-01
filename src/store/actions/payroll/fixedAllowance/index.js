import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const getFixedAllowance = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationList`, {
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
                payload: res.data,
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


export const getEmployeeData_Fixed = (body) => async (dispatch, getState) => {
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

export const getAllowanceList_Fixed = () => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/tranPaySlips/GetAllowancesList`, {
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


export const getAllowanceDetail_Fixed = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/HistoryPayslips/HistTranPayslipsListByCodes`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_code: body?.Emp_code,
                AllowanceCode: body?.Allowance_Code,
                DeductionCode: "0",
                ADEFlag: "A",
                p_FOEFlag: "F"
            })
        });
        const res = await response.json()
        return res?.data
    }
    catch (error) {
        console.log(error)
    }
}


export const saveAllowanceDetail_Fixed = (body) => async (dispatch, getState) => {
    console.log(body, 'body')
    try {
        const response = await fetch(`${baseURL.baseUrl}/tranPaySlips/Save_TranPaySlips`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
                Allowance_code: body?.Allowance_code,
                Deduction_code: body.Deduction_code,
                ADE_flag: "A",
                FOE_flag: "F",
                Amount: body.Amount,
                Reverse_flag: body.Reverse_flag,
                Remarks: body.Remarks
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const DeleteAllowanceDetail_Fixed = (body) => async (dispatch, getState) => {
    console.log(body, 'body')
    try {
        const response = await fetch(`${baseURL.baseUrl}/tranPaySlips/Delete_TranPaySlips`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
                Allowance_code: body?.Allowance_code,
                Deduction_code: 0,
                ADE_flag: "A",
                FOE_flag: "F"
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}