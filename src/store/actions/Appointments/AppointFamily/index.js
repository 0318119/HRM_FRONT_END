import {
    GET_FAMILY_DATA,
    GET_FAMILY_DATA_START,
    GET_FAMILY_CHILDREN_DATA,
    GET_FAMILY_MARRIAGE_DATA,
    GET_FAMILY_DATA_SINGLE,
    GET_FAMILY_DATA_END

} from "../../types";
import baseUrl from "../../../../config.json";

export const GetEmployer = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_FAMILY_DATA_START,
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
                type: GET_FAMILY_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_FAMILY_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_FAMILY_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const GetMarriage = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_FAMILY_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/marriages/GetTranMarriagesBySeqNo/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_FAMILY_MARRIAGE_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_FAMILY_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_FAMILY_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const GetChildren = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_FAMILY_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/families/GetTranFamiliesBySeqNo/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_FAMILY_CHILDREN_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_FAMILY_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_FAMILY_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const SaveMarriageForm = (body) => async (dispatch) => {
    console.log(body, 'body')
    const response = await fetch(`${baseUrl.baseUrl}/marriages/InsertTranMarriages`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Sequenceno": body?.Sequenceno,
            "MarriageDate": body?.MarriageDate,
            "Spausename": body?.Spausename,
            "SpauseDOB": body?.SpauseDOB,
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}






