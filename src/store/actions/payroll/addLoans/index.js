import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const ListLoans = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/loan/GetLoans/${body.pageNo}/${body.pageSize}/${body.search}`, {
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
        const response = await fetch(`${baseURL.baseUrl}/loan/DeleteLoan`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Loan_code: body
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



export const SaveLoans = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/loan/AddLoan`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Loan_code: 0,
                Loan_name: body?.loanName,
                Loan_abbr: body?.abbreviation,
                Deduction_code: body?.deduction,
                PF_flag: body?.flag,
                Sort_key: body?.sortKey
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
        const response = await fetch(`${baseURL.baseUrl}/loan/GetLoanByCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Loan_code: body,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}


export const UpdateLoansFunction = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/loan/AddLoan`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Loan_code: body?.Loan_code,
                Loan_name: body?.loanName,
                Loan_abbr: body?.abbreviation,
                Deduction_code: body?.deduction,
                PF_flag: body?.flag,
                Sort_key: body?.sortKey
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}