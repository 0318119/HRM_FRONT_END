import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const getOneTimeAllowance = (body) => async (dispatch, getState) => {
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

export const getAllowanceList = () => async (dispatch, getState) => {
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


export const getAllowanceDetail = (body) => async (dispatch, getState) => {
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
                p_FOEFlag: "O"
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
    try {
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/HistTranPayslips_Save_UploadPayrollData`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            },
            body: body
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
                FOE_flag: "O"
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const getDeductionList = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/GetDeductionList`, {
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




export const DownloadFileFunction = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/Salary_GetOverTimeData`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                From_Date: body?.From_Date,
                To_Date: body?.To_Date,
                Emp_code: body?.Emp_Code
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}