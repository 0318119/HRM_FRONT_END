import {
    GET_Increment_DATA,
    GET_Increment_START,
    GET_Increment_Confirmation,
    GET_Increment_END
} from "../../types";
import baseUrl from "../../../../config.json";


export const GetIncrementOfAllEmployees = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_Increment_START,
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
                type: GET_Increment_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_Increment_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_Increment_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
export const getEmployeeInfo = (body) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl.baseUrl}/tranIncrement/TranIncrements_List_By_Code`, {
            method: "POST",
            headers: {
                'accessToken': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Emp_code": body,
            })
        });

        const res = await response.json();
 

        dispatch({
            type: GET_Increment_Confirmation,
            payload: [{ res }],
            loading: false,
        });

        if (res?.success) {
            return res;
        } else {
            return res;
        }
    } catch (error) {
        console.error('Error fetching employee information:', error);
        return error;
    }
};
export const SaveIncrementExInfo = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/tranIncrement/TranIncrementsSave`, {
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
    const response = await fetch(`${baseUrl.baseUrl}/tranIncrement/TranIncrementsProcess`, {
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
            type: GET_Increment_START,
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
                type: GET_Increment_DATA,
                payload: [{ res }],
                loading: false,
            });
            console.log("Data:", res);
        } else {
            const res = await response.json();
            dispatch({
                type: GET_Increment_END,
                payload: [{ res }],
                loading: false,
            });
            console.log("res:", res);
        }

    } catch (error) {
        dispatch({
            type: GET_Increment_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
