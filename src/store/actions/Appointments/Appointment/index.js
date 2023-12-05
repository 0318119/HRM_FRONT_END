import {
    GET_APPOINTMENT_DATA,
    GET_APPOINTMENT_DATA_START,
    GET_APPOINTMENT_DATA_SINGLE,
    GET_APPOINTMENT_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetAppointStatusCall = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_APPOINTMENT_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/appointments/GetTranAppointmentsByCompanyCode/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_APPOINTMENT_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_APPOINTMENT_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_APPOINTMENT_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


// export const Get_Appointment_By_ID = (body) => async (dispatch) => {
//     try {
//         dispatch({
//             type: GET_APPOINTMENT_DATA,
//             payload: true,
//             loading: true,
//         });
//         const response = await fetch(`${baseUrl.baseUrl}/Positions/GetbyPositionscode`, {
//             method: "POST",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 'Position_Code': body,
//             })
//         });
//         if (response.status === 200) {
//             const res = await response.json()
//             dispatch({
//                 type: GET_APPOINTMENT_DATA_SINGLE,
//                 payload: [{ res }],
//                 loading: false,
//             });
//         } else {
//             const res = await response.json()
//             dispatch({
//                 type: GET_APPOINTMENT_DATA_END,
//                 payload: [{ res }],
//                 loading: false,
//             });
//         }
//     }
//     catch (error) {
//         dispatch({
//             type: GET_APPOINTMENT_DATA_END,
//             payload: false,
//             loading: false,
//         });
//         console.log(error)
//     }

// }

