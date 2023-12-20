import {
    GET_APPOIN_PAYROLL_DATA,
    GET_APPOIN_PAYROLL_DATA_START,
    GET_APPOIN_PAYROLL_INFO_DATA,
    GET_APPOIN_PAYROLL_BANK_BRANCHES_DATA,
    GET_APPOIN_PAYROLL_DATA_SINGLE,
    GET_APPOIN_PAYROLL_DATA_END,
} from "../../types.js";

import baseUrl from "../../../../config.json";



export const GetEmployeeInfo = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_APPOIN_PAYROLL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/appointments/GetAppointmentsBySeqNo/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_APPOIN_PAYROLL_INFO_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_APPOIN_PAYROLL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_APPOIN_PAYROLL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};



export const GetModeOfPay = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_APPOIN_PAYROLL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/payment_mode/GetPaymentMode`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_APPOIN_PAYROLL_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_APPOIN_PAYROLL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_APPOIN_PAYROLL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const GetBankBranches = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_APPOIN_PAYROLL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/banks/GetBankBranches`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_APPOIN_PAYROLL_BANK_BRANCHES_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_APPOIN_PAYROLL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_APPOIN_PAYROLL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const SavePayForm = (body) => async (dispatch) => {
    console.log(body, 'body')
    const response = await fetch(`${baseUrl.baseUrl}/payroll/InsertPayroll`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Sequence_no": body?.Sequence_no,
            "Mode_Of_Payment": body?.EmployerCode,
            "Recreation_Club_Flag": body?.designation,
            "Meal_Deduction_Flag": body?.department,
            "Union_Flag": body?.Start_Date,
            "Overtime_Flag": body?.End_Date,
            "Incentive_Flag": body?.SubmitFlag,
            "Bonus_Type": body?.SubmitFlag,
            "SESSI_Flag": body?.SubmitFlag,
            "EOBI_Flag": body?.SubmitFlag,
            "SESSI_Number": body?.SubmitFlag,
            "EOBI_Number": body?.SubmitFlag,
            "Account_Type1": body?.SubmitFlag,
            "Bank_Account_No1": body?.SubmitFlag,
            "Branch_Code1": body?.SubmitFlag,
            "Bank_Amount_1": body?.SubmitFlag,
            "Bank_Percent_1": body?.SubmitFlag,
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}