import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const GetEmployeeList = (body) => async (dispatch, getState) => {
    try {       
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/MasterEmployees_SearchWithPayrollCategory/${body.pageNo}/${body.pageSize}`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                searchType:body.searchType,
                searchValue:body.search,
                payrollCategory:localStorage.getItem('Payroll_Category')
            })
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

export const getAllowanceDetail = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/HistAdvancePayslips_ListByCodes`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_code: body?.Emp_code,
                ADEFlag: "D",
                p_FOEFlag: "O",
                DeductionCode:"28",
                AllowanceCode: 0,
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
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/HistAdvancePaySlips_Save`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_code: body?.Emp_Code,
                Allowance_code: 0,
                Deduction_code:28,
                ADE_flag: "D",
                FOE_flag: "O",
                Amount: body.Amount,
                Reverse_flag: "N",
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
