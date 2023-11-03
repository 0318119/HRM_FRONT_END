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
        const response = await fetch(`${baseURL.baseUrl}/loan/GetLoanByMultipleCodes`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_Code: body?.Emp_Code,
                Loan_Code: body?.Loan_Code,
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
        const response = await fetch(`${baseURL.baseUrl}/advanceSalary/SaveAdvanceSalary`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_code:body.Emp_code?.toString(),
                Loan_Code: body.Loan_Code?.toString(),
                Reference: body.Reference?.toString(),
                Loan_Date: body.Advance_Date?.toString(),
                Principal_Sum:body.Advance_Amount?.toString(),
                Total_Installment:body.Total_Installment?.toString(),
                Monthly_Installment_Amount:body.Monthly_Installment_Amount?.toString(),
                Starting_Month:body.Starting_Month?.toString(),
                Starting_Year:body.Starting_Year?.toString(),
                Interest_Rate:body.Interest_Rate?.toString(),
                Interest_Amount_Deducted:"1",
                Reschedule_No: "21",
                No_of_Installment_Deducted: "2",
                Undo_No_of_instalment_Deducted: "0",
                Principal_Sum_Deducted: "9",
                Undo_Principal_Sum_Deducted: "10",
                Undo_Interest_Amount_Deducted: "2",
                Stop_Flag: "Y",
                Permanent_Stop_Flag: "N",
                Undo_Stop_Flag: "N",
                Old_Interest_Calculation: "N",
                FirstTime_DoubleMarkup: "Y",
                payroll_month:body.Starting_Month?.toString(),
                payroll_year:body.Starting_Year?.toString(),
            })
        });
        const res=await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}
export const getAllowanceList_Fixed = () => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/loan/Get_LoanList`, {
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

export const DeleteAllowanceDetail = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/advanceSalary/DeleteAdvanceSalary`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Emp_code: body?.Emp_Code,
                Loan_Code:body?.Loan_Code
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}