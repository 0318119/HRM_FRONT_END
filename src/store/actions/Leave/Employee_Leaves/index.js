import {
    GET_EMP_LEAVE_DATA_START,
    GET_EMP_LEAVES_DATA,
    GET_EMP_LEAVE_DATA_END,
    GET_EMP_LEAVE_DATA_SINGLE,
    // =================================================================
    GET_EMP_LAVES_NAME_DATA,
    GET_EMP_LEAVES_TYPE_DATA,
    GET_EMP_LEAVES_APPLIED,
    GET_EMP_LEAVES_BALANCED_DAYS,
    GET_EMP_LEAVES_APPLICATIONS,
    GET_EMP_LEAVES_ATTACEMENTS
} from '../../../actions/types'
import baseUrl from '../../../../config.json'



export const GET_ALL_EMP_DATA = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetEmployeeDetaillsUnderSupervision`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_LAVES_NAME_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_EMP_LEAVE_TYPE = (code) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetLeaveTypeByEmployeeCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Emp_code": code
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVES_TYPE_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_APPLIED_DAYS = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetLeaveAppliedDays`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
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
                type: GET_EMP_LEAVES_APPLIED,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_BALANCED_DAYS = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetBalanceDays`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
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
                type: GET_EMP_LEAVES_BALANCED_DAYS,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const SAVE_LEAVE_APPLICATION = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaves/SaveLeaveApplication`, {
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
export const GET_EMP_LEAVES_APP = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/MyApplication/GetMyLeaveApplications`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVES_APPLICATIONS,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_EMP_LEAVE_EDIT = (code) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetTranLeavesByTranCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Tran_Code": code
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const SUBMIT_LEAVE_APPLICATION = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaves/SubmitLeaveApplication`, {
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
export const GET_EMP_FILES = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_LEAVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetLeaveAttachmentByTranCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Tran_Code": body
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVES_ATTACEMENTS,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_LEAVE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_LEAVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const DELETE_FILE_OF_EMP_LEAVE= (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaves/DeleteLeaveApplicationAttachment`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Tran_Code": body,
          })
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
export const DELETE_LEAVE_APPLICATION = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaves/DeleteESS_TranLeaves`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Tran_Code":body
          })
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
