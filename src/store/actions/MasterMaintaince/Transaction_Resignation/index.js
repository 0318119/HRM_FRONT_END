import {
    GET_TransactionResignation_DATA,
    GET_TransactionResignation_START,
    GET_TransactionResignation_Confirmation,
    GET_TransactionResignation_Waiting,
    GET_TransactionResignation_END
}
    from "../../types";
import baseUrl from "../../../../config.json";


export const AllResignationEmployees = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TransactionResignation_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationList/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_TransactionResignation_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_TransactionResignation_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_TransactionResignation_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
// GET RESIGNATION BY ID API CALL =================================================================
export const TranResignationByEmpCode = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/Resignation/GetTranResignationByEmpCode`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_Code": body,
        })
    });
    const res = await response.json();
    dispatch({
        type: GET_TransactionResignation_Confirmation,
        payload: [{ res }],
        loading: false,
    });

    if (res?.success) {
        return res;
    } else {
        return res;
    }
}
// SAVE RESIGNATION API CALL =================================================================
export const SaveResignationExInfo = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/Resignation/SaveTranResignation`, {
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
    } else {
        return res;
    }
}
// PROCESS RESIGNATION API CALL =================================================================
export const SaveResignationExInFoProcess = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/Resignation/ProcessTranResignation`, {
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
    } else {
        return res;
    }
}
// DELETE RESIGNATION API CALL =================================================================
export const Delete_Confirmation_Resignation = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/Resignation/DeleteTranResignation`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_Code": body,
        }),
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}

export const getResignationExProcessData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TransactionResignation_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/Resignation/GetTranResignationListWaiting/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_TransactionResignation_Waiting,
                payload: [{ res }],
                loading: false,
            });
            // console.log("Data:", res);
        } else {
            const res = await response.json();
            dispatch({
                type: GET_TransactionResignation_END,
                payload: [{ res }],
                loading: false,
            });
            // console.log("res:", res);
        }

    } catch (error) {
        dispatch({
            type: GET_TransactionResignation_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
