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
    const response = await fetch(`${baseUrl.baseUrl}/payroll/InsertPayroll`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Sequence_no": body?.Sequence_no,
            "Mode_Of_Payment": body?.Mode_Of_Payment,
            "Recreation_Club_Flag": body?.Recreation_Club_Flag,
            "Meal_Deduction_Flag": body?.Meal_Deduction_Flag,
            "Union_Flag": body?.Union_Flag,
            "Overtime_Flag": body?.Overtime_Flag,
            "Incentive_Flag": body?.Incentive_Flag,
            "Bonus_Type": body?.Bonus_Type,
            "SESSI_Flag": body?.SESSI_Flag,
            "EOBI_Flag": body?.EOBI_Flag,
            "SESSI_Number": body?.SESSI_Number,
            "EOBI_Number": body?.EOBI_Number,
            "Account_Type1": body?.Account_Type1,
            "Bank_Account_No1": body?.Bank_Account_No1,
            "Branch_Code1": body?.Branch_Code1,
            "Bank_Amount_1": body?.Bank_Amount_1,
            "Bank_Percent_1": body?.Bank_Percent_1,
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}