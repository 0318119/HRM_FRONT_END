import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const TaxPdfData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/payroll/Report_Tax_Statement_Liability`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payrollYear:body?.payrollYear,
                payroll_month:body?.payroll_month,
                PayrollCategory: localStorage.getItem('Payroll_Category'),
                Emp_Code:body?.Emp_Code
            })
        });
        const res = await response.json()
        return res.data
    }
    catch (error) {
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
        console.log(error)
    }

}

export const GetAllEmp = () => async (dispatch) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/allemployees/GetEmployeesNameWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            return res
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const GetAllEmpPass = (body) => async (dispatch) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/allemployeer/GetEmployeeNicNumber`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Emp_code:body
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            return res
        }
    }
    catch (error) {
        console.log(error)
    }
}


export const GetCompanyLogo = () => async (dispatch) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/GetCompanyLogo`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            return res
        }
    }
    catch (error) {
        console.log(error)
    }
}