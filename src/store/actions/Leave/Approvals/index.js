import {
    GET_EMP_APPROVALS_DATA_START,
    GET_EMP_APPROVALS_DATA_END,
    // =================================================================
    GET_EMP_APPROVALS_ALL_DATA,
    GET_LEAVE_SUMMERY_BY_ID,
    GET_LEAVE_SUMMERY_FILE_BY_ID
} from '../../../actions/types'
import baseUrl from '../../../../config.json'

export const GET_ALL_EMP_APPROVAL_DATA = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetEssApproval`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_APPROVALS_ALL_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_APPROVALS_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const Emp_Approved_leave = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaveApprovals/ApproveLeave`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Tran_Code": body?.Tran_Code,
            "remarks": body?.remarks,
        })
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
export const Emp_Rejected_leave = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaveApprovals/RejectLeave`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Tran_Code": body?.Tran_Code,
            "remarks": body?.remarks,
        })
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
export const Emp_Step_Back_leave = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/leaveApprovals/StepBackLeave`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Tran_Code": body?.Tran_Code,
            "remarks": body?.remarks,
        })
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
export const LEAVE_SUMMERY_BY_ID = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_START,
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
                "Tran_Code": userId,
              })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_SUMMERY_BY_ID,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_APPROVALS_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const LEAVE_SUMMERY_FILE_BY_ID = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_START,
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
                "Tran_Code": userId
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_SUMMERY_FILE_BY_ID,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_APPROVALS_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}