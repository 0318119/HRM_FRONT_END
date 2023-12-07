import {
    GET_confirmation_DATA,
    GET_confirmation_START ,
    GET_confirmation_SINGLE,
    GET_confirmation_END
} from "../../../types"
import baseURL from '../../../../../config.json'

export const Getconfirmation = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_confirmation_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationList/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        console.log(res, 'res')
        if (res?.success == "success") {
            dispatch({
                type: GET_confirmation_DATA,
                payload: [{res}],
            });
        }
        dispatch({
            type:  GET_confirmation_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_confirmation_START,
            payload: false,
        });
        console.log(error)
    }

}

export const Get_confirmation_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_confirmation_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseURL.baseURL}/tranConfirmation/GetEmployeeTranConfirmationList/`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Cost_Centre_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_confirmation_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_confirmation_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_confirmation_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}

// export const GET_confirmation_BY_CODE = (body) => async (dispatch) => {
//     try {
//         dispatch({
//             type: GET_confirmation_START,
//             payload: true,
//             loading: true,
//         });
//         const response = await fetch(`${baseURL.baseUrl}/getbycode/GetBankByCode`, {
//             method: "POST",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//             body:JSON.stringify({
//                 Bank_code : body,
//             })
//         });
//         if(response.status === 200) {
//             const res = await response.json()
//             dispatch({
//                 type: GET_confirmation_SINGLE,
//                 payload: [{res}],
//                 loading: false,
//             });
//         }else{
//             const res = await response.json()
//             dispatch({
//                 type:  GET_confirmation_END,
//                 payload: [{res}],
//                 loading: false,
//             });
//         }
//     }
//     catch (error) {
//         dispatch({
//             type:  GET_confirmation_END,
//             payload: false,
//             loading: false,
//         });
//         console.log(error)
//     }

// }



// export const DeleteBank = (body) => async (dispatch, getState) => {
//     try {
//         const response = await fetch(`${baseURL.baseUrl}/deletebank/DeleteBank`, {
//             method: "POST",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 Bank_code: body
                
//             })
//         });
//         const res = await response.json()
//         return res?.data
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

