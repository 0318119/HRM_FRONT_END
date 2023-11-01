import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const getFixedDeductionData = (body) => async (dispatch, getState) => {
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


export const getDeductionEmployeeData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/appointments/GetAppointmentsBySeqNo/${body?.Emp_code}`, {
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

export const getDeductionEmployeeSallaryData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/GetSalariesByEmpCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_code
            })
        });
        const res = await response.json()
        return { LastMonthNetSalary: res?.data1[0], LastMonthGrossSalary: res?.data2[0] }
    }
    catch (error) {
        console.log(error)
    }
}
export const getDeductionList = () => async (dispatch, getState) => {
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
                AllowanceCode: "0",
                DeductionCode: body?.DeductionCode,
                ADEFlag: "D",
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


export const saveAllowanceDetail = (body) => async (dispatch, getState) => {
    console.log(body, 'body')
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/Save_TranPaySlipsDeductionsFixed`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
                Allowance_code: body?.Allowance_code,
                Deduction_code: body.Deduction_code,
                ADE_flag: "D",
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

export const DeleteAllowanceDetail = (body) => async (dispatch, getState) => {
    console.log(body, 'body')
    try {
        const response = await fetch(`${baseURL.baseUrl}/deductions/Delete_TranPaySlipsDeductionsFixed`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
                Allowance_code: body?.Allowance_code,
                Deduction_code: body.Deduction_code,
                ADE_flag: "D",
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