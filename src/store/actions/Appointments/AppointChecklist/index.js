import {
    GET_CHECKLIST_DATA,
    GET_CHECKLIST_DATA_START,
    GET_CHECKLIST_DATA_CHECK,
    GET_CHECKLIST_DATA_END
} from "../../types";
import baseUrl from "../../../../config.json";


export const getCheckList = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CHECKLIST_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/checklist/GetAllCheckList`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_CHECKLIST_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_CHECKLIST_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_CHECKLIST_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};



// 
export const getCheckedList = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CHECKLIST_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/checklist/GetTranhiringchecklistBySeqNo/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_CHECKLIST_DATA_CHECK,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_CHECKLIST_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_CHECKLIST_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};




export const CheckList = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/checklist/InsertCheckList`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Sequence_no": body?.Sequence_no,
            "FirstTimeFlag": body?.FirstTimeFlag,
            "items": body?.items

        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}