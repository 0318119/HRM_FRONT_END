import { 
    GET_MASTER_PAYROLL_DATA,
    GET_MASTER_PAYROLL_DATA_START,
    GET_MASTER_PAYROLL_DATA_SINGLE,
    GET_MASTER_PAYROLL_DATA_END 
    } from "../../types"
import baseURL from '../../../../config.json'

// export const getHrInfo = (body) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: GET_ALLOWANCE_START,
//             payload: true,
//         });
//         const response = await fetch(`${baseURL.baseUrl}/employee_salary/Get_HR_Stop_Flag`, {
//             method: "GET",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//         });
//         const res = await response.json()
//         if (res?.success == "success") {
//             return res?.data
//         }
//         dispatch({
//             type: GET_ALLOWANCE_END,
//             payload: false,
//         });
//     }
//     catch (error) {
//         dispatch({
//             type: GET_ALLOWANCE_END,
//             payload: false,
//         });
//         console.log(error)
//     }
// }



export const MasterPayroll = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_MASTER_PAYROLL_DATA,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/SetHrEntryStopFlag`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                StopFlag: body
            })
        });
        const res = await response.json()
        if (res?.success == "success") {
            return res
        }
        dispatch({
            type: GET_MASTER_PAYROLL_DATA_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_MASTER_PAYROLL_DATA_END,
            payload: false,
        });
        console.log(error)
    }
}