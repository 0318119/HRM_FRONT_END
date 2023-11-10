import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const ListLoans = (body) => async (dispatch, getState) => {
    try {       
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/loan/GetLoans/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_ALLOWANCE_COMPLETE,
                payload: res.data1,
            });
        }
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
        console.log(error)
    }

}




