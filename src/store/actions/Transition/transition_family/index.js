import {
    GET_TRANSITION_FAMILY_DATA,
    GET_TRANSITION_FAMILY_START,
    GET_TRANSITION_FAMILY_DATA_SINGLE,
    GET_TRANSITION_FAMILY_END
} from "../../types";
import baseUrl from '../../../../config.json'


export const Transition_Family = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_TRANSITION_FAMILY_START,
            payload: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/historyFamily/GetHistoryFamily`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        dispatch({
            type: GET_TRANSITION_FAMILY_DATA,
            payload: res.data,
        });
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
        console.log(error)
    }

}

export const Transition_Family_Update = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_TRANSITION_FAMILY_START,
            payload: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/historyFamily/AddEmployeeHistoryFamilies`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        });
        const res = await response.json()
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
        console.log(error)
    }

}

export const Transition_Family_Delete = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_TRANSITION_FAMILY_START,
            payload: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/historyFamily/DeleteHistoryFamilies`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        });
        const res = await response.json()
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
        console.log(error)
    }

}

export const Transition_Family_Get_Byid = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_TRANSITION_FAMILY_START,
            payload: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/historyFamily/GetHistoryFamiliesByCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                ControlNo:body.ControlNo,
                Emp_code:body.Emp_code,
            })
        });
        const res = await response.json()
        dispatch({
            type: GET_TRANSITION_FAMILY_DATA_SINGLE,
            payload: res.data,
        });
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_FAMILY_END,
            payload: false,
        });
        console.log(error)
    }

}