import {
    GET_LEAVE_REPORT_BALANCE_DATA_START,
    GET_LEAVE_REPORT_BALANCE_DATA_END,
    // =================================================================
    GET_LEAVE_REPORT_BALANCE_LEAVE_TYPES,
    GET_LEAVE_REPORT_BALANCE_LEAVE_CAT,
    GET_LEAVE_REPORT_BALANCE_LEAVE_EMP,
    GET_LEAVE_REPORT_BALANCE_LEAVE_YEAR
} from '../../types'
import baseUrl from '../../../../config.json'

export const GET_ALL_EMP_DATA = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status == 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_LEAVE_EMP,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_LEAVE_CAT = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_leave_category/GetEmploymentLeaveCategoryWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status == 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_LEAVE_CAT,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_LEAVE_TYPES = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_leave_type/GetLeaveTypeWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status == 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_LEAVE_TYPES,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_LEAVE_YEARS = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/GetYears`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status == 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_LEAVE_YEAR,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_REPORT_BALANCE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LEAVE_REPORT_BALANCE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const DOWNLOAD_LEAVE_BALANCED_EXCEL_FILE = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/reportBalance/GetLeaveReportBalance`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: body
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
export const DOWNLOAD_LEAVE_DETAILS_EXCEL_FILE = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/GetLeaveReportdata/GetLeaveReport`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: body
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}


