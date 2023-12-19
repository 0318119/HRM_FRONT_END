import {
    GET_EXPRIENCE_INFO_DATA,
    GET_EXPRIENCE_INFO_START,
    GET_EXPRIENCE_INFO_SINGLE,
    GET_EXPRIENCE_EMP_DATA,
    GET_EXPRIENCE_INFO_END

} from "../../types";
import baseUrl from "../../../../config.json";

export const GetEmployeeInfo = (params) => async (dispatch) => {
    console.log(params, 'params')
    try {
        dispatch({
            type: GET_EXPRIENCE_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/appointments/GetAppointmentsBySeqNo${params}`, {
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

export const GetEmployer = (params) => async (dispatch) => {
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
            // console.log(res , 'res')
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

export const getEmployer_data_by_ID = (params) => async (dispatch) => {
    // console.log(params, 'params')
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

// export const getExprience = (params) => async (dispatch) => {
//     console.log(params, 'params')
//     try {
//         dispatch({
//             type: GET_EXPRIENCE_INFO_START,
//             payload: true,
//             loading: true,
//         });
//         const response = await fetch(`${baseUrl.baseUrl}/employement_experience/GetTranExperienceByEmpCode/${params}`, {
//             method: "GET",
//             headers: {
//                 accessToken: "Bareer " + localStorage.getItem("access_token"),
//                 "Content-Type": "application/json",
//             },
//         });
//         if (response.status === 200) {
//             const res = await response.json();
//             dispatch({
//                 type: GET_EXPRIENCE_EMP_DATA,
//                 payload: [{ res }],
//                 loading: false,
//             });
//         } else {
//             const res = await response.json();
//             dispatch({
//                 type: GET_EXPRIENCE_INFO_END,
//                 payload: [{ res }],
//                 loading: false,
//             });
//         }

//     } catch (error) {
//         dispatch({
//             type: GET_EXPRIENCE_INFO_END,
//             payload: false,
//             loading: false,
//         });
//         console.log(error);
//     }
// };

