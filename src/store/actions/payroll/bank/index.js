import {
    GET_Bank_DATA,
    GET_Bank_DATA_START,
    GET_Bank_DATA_SINGLE,
    GET_Bank_DATA_END
} from "../../types"
import baseURL from '../../../../config.json'

export const GetBank = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_Bank_DATA_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/getbank/GetBanks/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_Bank_DATA,
                payload: [{res}],
            });
        }
        dispatch({
            type: GET_Bank_DATA_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_Bank_DATA_START,
            payload: false,
        });
        console.log(error)
    }

}


export const GET_BANK_BY_CODE = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_Bank_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/getbycode/GetBankByCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Bank_code : body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_Bank_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_Bank_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_Bank_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}



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

