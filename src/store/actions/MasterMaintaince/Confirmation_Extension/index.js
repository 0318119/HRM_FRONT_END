import {
    GET_Confirmation_Extension_DATA,
    GET_Confirmation_Extension_START,
    GET_Confirmation_Extension_Confirmation,
    GET_Confirmation_Extension_END
} from "../../types";
import baseUrl from "../../../../config.json";


export const AllEmployees = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_Confirmation_Extension_START,
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
                type: GET_Confirmation_Extension_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_Confirmation_Extension_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_Confirmation_Extension_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
export const getAtttendanceHisss = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/ME_ExtendedConfirmationListByCode`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": body,
        })
    });
    const res = await response.json();
    dispatch({
        type: GET_Confirmation_Extension_Confirmation,
        payload: [{ res }],
        loading: false,
    });

    if (res?.success) {
        return res;
    } else {
        return res;
    }
}
export const SaveConfirmationExInfo = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/TranConfirmationExtended_Save`, {
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
export const SaveConfirmationExInFoProcess = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/TranConfirmationExtended_Process`, {
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
export const Delete_Confirmation = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/TranConfirmationExtended_Delete`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": body,
        }),
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}
export const getConfirmationExProcessData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_Confirmation_Extension_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/GetTranConfirmationExtensionListWaiting/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_Confirmation_Extension_DATA,
                payload: [{ res }],
                loading: false,
            });
            console.log("Data:", res);
        } else {
            const res = await response.json();
            dispatch({
                type: GET_Confirmation_Extension_END,
                payload: [{ res }],
                loading: false,
            });
            console.log("res:", res);
        }

    } catch (error) {
        dispatch({
            type: GET_Confirmation_Extension_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
