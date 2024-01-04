import {
    GET_Confirmation_Extensio2_DATA,
    GET_Confirmation_Extensio2_START,
    GET_Confirmation_Extensio2_Confirmation,
    GET_Confirmation_Extensio2_Designation,
    GET_Confirmation_Extensio2_END
} from "../../../actions/types";
import baseUrl from "../../../../config.json";


// Get Employee Name and Code API
export const AllEmployees = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_Confirmation_Extensio2_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            // console.log(res, 'res')
            dispatch({
                type: GET_Confirmation_Extensio2_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_Confirmation_Extensio2_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_Confirmation_Extensio2_END,
            payload: false,
            loading: false,
        });
        // console.log(error);
    }
};

// GET CONFIRMATION EXTENSION INFO API CALL =================================================================
export const GetEmployeeInfo = (isCode) => async (dispatch) => {
    console.log(isCode, 'isCode')

    const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/ME_ExtendedConfirmationListByCode`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": isCode,
        })
    });
    const res = await response.json();
    dispatch({
        type: GET_Confirmation_Extensio2_Confirmation,
        payload: [{ res }],
        loading: false,
    });

    if (res?.success) {
        return res;
    } else {
        return res;
    }
}

// // SAVE CONFIRMATION EXTENSION API CALL =================================
// export const SaveConfirmationExInfo = (body) => async (dispatch) => {
//     // console.log(body, 'body')

//     const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/TranConfirmationExtended_Save`, {
//         method: "POST",
//         headers: {
//             'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             "Emp_code": body?.Emp_code,
//             "Transaction_Date": body?.Transaction_Date,
//             "Confirmation_Date": body?.Confirmation_Date,
//             "Remarks": body?.Remarks
//         })
//     });
//     const res = await response.json();
//     dispatch({
//         type: GET_Confirmation_Extensio2_Designation,
//         payload: [{ res }],
//         loading: false,
//     });

//     if (res?.success) {
//         return res;
//     } else {
//         return res;
//     }
// }

// PROCESS CONFIRMATION EXTENSION API CALL =================================
// export const processConfirmationEx = (body) => async (dispatch) => {
//     // console.log(body, 'body')

//     const response = await fetch(`${baseUrl.baseUrl}/ConfirmationExtension/TranConfirmationExtended_Process`, {
//         method: "POST",
//         headers: {
//             'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             "Emp_code": body?.Emp_code,
//             "Date": [{
//                 "Attendance_Date": body?.Date?.[0]?.Attendance_Date,
//                 "Emp_Time_in_HH": body?.Date?.[0]?.Emp_Time_in_HH,
//                 "Emp_Time_In_MM": body?.Date?.[0]?.Emp_Time_In_MM,
//                 "Emp_Time_Out_HH": body?.Date?.[0]?.Emp_Time_Out_HH,
//                 "Emp_Time_Out_MM": body?.Date?.[0]?.Emp_Time_Out_MM,
//                 "Remarks": body?.Date?.[0]?.Remarks

//             }]


//         })
//     });
//     const res = await response.json();
//     dispatch({
//         type: GET_Confirmation_Extensio2_Designation,
//         payload: [{ res }],
//         loading: false,
//     });

//     if (res?.success) {
//         return res;
//     } else {
//         return res;
//     }
// }
