import {
    GET_Bank_Letter_Report_Payroll_Data,
    GET_Bank_Letter_Report_Bank_Data,
    GET_Bank_Letter_Report_Type_Data,
    GET_Bank_Letter_Report_Region_Data,
    GET_Bank_Letter_Report_START,
    GET_Bank_Letter_Report_END
} from '../../types'

import baseUrl from '../../../../config.json'



export const GetPayroll = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_Bank_Letter_Report_START,
            payload: true,
            loading: true,
        });

        const response = await fetch(`${baseUrl.baseUrl}/payrollCategories/GetallPayrollCategoriesWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_Bank_Letter_Report_Payroll_Data,
                payload: res,
                loading: false,
            });

        } else {
            const errorRes = await response.json();
            dispatch({
                type: GET_Bank_Letter_Report_END,
                payload: errorRes,
                loading: false,
            });
            console.error("Error response:", errorRes);
        }
    } catch (error) {
        dispatch({
            type: GET_Bank_Letter_Report_END,
            payload: false,
            loading: false,
        });
        console.error("Fetch error:", error);
    }
};

export const GetBank = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_Bank_Letter_Report_START,
            payload: true,
            loading: true,
        });

        const response = await fetch(`${baseUrl.baseUrl}/getbank/GetBanksWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_Bank_Letter_Report_Bank_Data,
                payload: res,
                loading: false,
            });

        } else {
            const errorRes = await response.json();
            dispatch({
                type: GET_Bank_Letter_Report_END,
                payload: errorRes,
                loading: false,
            });
            console.error("Error response:", errorRes);
        }
    } catch (error) {
        dispatch({
            type: GET_Bank_Letter_Report_END,
            payload: false,
            loading: false,
        });
        console.error("Fetch error:", error);
    }
};

export const GetRegion = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_Bank_Letter_Report_START,
            payload: true,
            loading: true,
        });

        const response = await fetch(`${baseUrl.baseUrl}/location_code/GetLocationsWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_Bank_Letter_Report_Region_Data,
                payload: res,
                loading: false,
            });

        } else {
            const errorRes = await response.json();
            dispatch({
                type: GET_Bank_Letter_Report_END,
                payload: errorRes,
                loading: false,
            });
            console.error("Error response:", errorRes);
        }
    } catch (error) {
        dispatch({
            type: GET_Bank_Letter_Report_END,
            payload: false,
            loading: false,
        });
        console.error("Fetch error:", error);
    }
};

export const ExportExcel = (data) => async () => {
    console.log(data, 'data')
    const response = await fetch(`${baseUrl.baseUrl}/reports/Bank_payment_report`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "payslip_year": data?.payslip_year,
            "payslip_month": data?.payslip_month,
            "payroll_category_code": data?.payroll_category_code,
            "Bank_code": data?.Bank_code,
            "Region": data?.Region,
        }),
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};