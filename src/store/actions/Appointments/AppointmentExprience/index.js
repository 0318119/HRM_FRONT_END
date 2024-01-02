import {
    GET_EXPRIENCE_INFO_DATA,
    GET_EXPRIENCE_INFO_START,
    GET_EXPRIENCE_INFO_SINGLE,
    GET_EXPRIENCE_EMPlOYER_DATA,
    GET_EXPRIENCE_EMP_DATA,
    GET_EXPRIENCE_INFO_END

} from "../../types";
import baseUrl from "../../../../config.json";


export const GetEmployer = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EXPRIENCE_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employement_experience/GetTranExperienceByEmpCode/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_EXPRIENCE_EMP_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_EXPRIENCE_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EXPRIENCE_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};

export const GetEmployeeInfo = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EXPRIENCE_INFO_START,
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
                type: GET_EXPRIENCE_INFO_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_EXPRIENCE_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EXPRIENCE_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const GetEmployeeCode = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EXPRIENCE_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployer/GetAllEmployerWOP`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_EXPRIENCE_EMPlOYER_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_EXPRIENCE_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EXPRIENCE_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};

export const SaveExpForm = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/employement_experience/CreateTranExperience`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Sequence_no": body?.Sequence_no,
            "EmployerCode": body?.EmployerCode,
            "designation": body?.designation,
            "department": body?.department,
            "Start_Date": body?.Start_Date,
            "End_Date": body?.End_Date,
            "SubmitFlag": body?.SubmitFlag
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}


export const UpdatedExpForm = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/employement_experience/UpdateTranExperience`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": body?.id,
            "EmployerCode": body?.EmployerCode,
            "designation": body?.designation,
            "department": body?.department,
            "Start_Date": body?.Start_Date,
            "End_Date": body?.End_Date,
            "SubmitFlag": body?.SubmitFlag
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}