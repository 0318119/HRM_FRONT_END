import {
    GET_DUE_FOR_CONFIRMATION_DATA,
    GET_DUE_FOR_CONFIRMATION_DATA_START,
    GET_DUE_FOR_CONFIRMATION_DATA_SINGLE,
    GET_DUE_FOR_CONFIRMATION_DATA_END
} from '../../../actions/types.js'
import baseUrl from '../../../../config.json'

// export const GetAllAppoint = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: GET_DUE_FOR_CONFIRMATION_DATA_START,
//             payload: true,
//             loading: true,
//         });
//         const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWOP`, {
//             method: "GET",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//         });
//         if(response.status === 200) {
//             const res = await response.json()
//             dispatch({
//                 type: GET_DUE_FOR_CONFIRMATION_DATA,
//                 payload: [{res}],
//                 loading: false,
//             });
//         }else{
//             const res = await response.json()
//             dispatch({
//                 type: GET_DUE_FOR_CONFIRMATION_DATA_END,
//                 payload: [{res}],
//                 loading: false,
//             });
//         }
//     }
//     catch (error) {
//         dispatch({
//             type: GET_DUE_FOR_CONFIRMATION_DATA_END,
//             payload: false,
//             loading: false,
//         });
//         console.log(error)
//     }
// }

export const PostConfirmationPayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/reports/RDLC_Due_Confirmations`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
    },
      
      body: JSON.stringify({
        "FromDate": data?.FromDate,
        "ToDate": data?.ToDate,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };


// export const PostConfirmationPayload = (data) => async (dispatch) => {
//     try {
//         dispatch({
//             type: GET_DUE_FOR_CONFIRMATION_DATA_START,
//             payload: true,
//             loading: true,
//         });
//         const response = await fetch(`${baseUrl.baseUrl}/reports/ServiceLengthReport`, {
//             method: "POST",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//             body:JSON.stringify({
//                 "Servicefrom": data?.Servicefrom,
//                 "Serviceto": data?.Serviceto,
//             })
//         });
//         if(response.status === 200) {
//             const res = await response.json()
//             dispatch({
//                 type: GET_DUE_FOR_CONFIRMATION_DATA_SINGLE,
//                 payload: [{res}],
//                 loading: false,
//             });
//         }else{
//             const res = await response.json()
//             dispatch({
//                 type: GET_DUE_FOR_CONFIRMATION_DATA_END,
//                 payload: [{res}],
//                 loading: false,
//             });
//         }
//     }
//     catch (error) {
//         dispatch({
//             type: GET_DUE_FOR_CONFIRMATION_DATA_END,
//             payload: false,
//             loading: false,
//         });
//         console.log(error)
//     }

// }