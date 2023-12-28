import {
    GET_MANUAL_LEAVE_POSTING_DATA,
    GET_MANUAL_LEAVE_POSTING_DATA_START,
    GET_MANUAL_LEAVE_POSTING_DATA_SINGLE,
    GET_MANUAL_LEAVE_POSTING_DATA_END,
    // =================================================================
    GET_EMP_DATA,
    GET_LEAVE_TYPE_DATA,
    SET_EMP_BALANCE_DAYS,
    APPLIED_EMP_DAYS_DATA,
    GET_MY_LEAVE_EMP_APPLICATION
} from '../../../actions/types'
import baseUrl from '../../../../config.json'


export const GET_ALL_EMP_DATA = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_START,
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
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_MANUAL_LEAVE_POSTING_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const GET_EMP_LEAVE_TYPE_DATA = (code) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetLeaveTypeByEmployeeCode`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            },
            body: JSON.stringify({
                "Emp_code": code
            })
           
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_TYPE_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_MANUAL_LEAVE_POSTING_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const GET_EMP_APPLIED_LEAVE_DATA = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetLeaveAppliedDays`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            },
            body: JSON.stringify({
                "Emp_code": body?.code,
                "FromDate": body?.startDate,
                "ToDate": body?.endDate
            })
           
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: APPLIED_EMP_DAYS_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_MANUAL_LEAVE_POSTING_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const GET_EMP_BALANCED_DAYS = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetBalanceDays`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            },
            body: JSON.stringify({
                "Emp_code": body?.code,
                "FromDate": body?.startDate,
                "ToDate": body?.endDate,
                "LeaveTypeCode": body?.leave_code,
            })
           
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: SET_EMP_BALANCE_DAYS,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_MANUAL_LEAVE_POSTING_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const SAVE_LEAVE_APPLICATION = (body) => async (dispatch) => {
        const response = await fetch(`${baseUrl.baseUrl}/manualLeavePosting/SaveManualLeavePosting`, {
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

export const SUBMIT_LEAVE_APPLICATION = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/manualLeavePosting/SubmitManualLeavePosting`, {
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

export const GET_LEAVES_APPLICATIONS = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/manualLeavePostiing/getManualLeaveApplicationsByPostedByCode`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_MY_LEAVE_EMP_APPLICATION,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_MANUAL_LEAVE_POSTING_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MANUAL_LEAVE_POSTING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const DELETE_LEAVE_APPLICATION = (payLoad) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/manualLeavePosting/DeleteManualLeaveApplication`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": payLoad?.code,
            "startDate": payLoad?.startDate,
            "endDate": payLoad?.endDate,
        })
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
