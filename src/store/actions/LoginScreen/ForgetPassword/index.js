
import {
     GET_FORGET_PASSWORD_DATA,
    GET_FORGET_PASSWORD_DATA_START,
    GET_FORGET_PASSWORD_DATA_SINGLE,
    GET_FORGET_PASSWORD_DATA_END
} from '../../types'
import baseUrl from '../../../../config.json'


export const GET_FORGET_PASSWORD_OTP = (code) => async (dispatch) => {
    try {
        dispatch({
            type: GET_FORGET_PASSWORD_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployee/ForgetPassword_Send_OTP`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            },
            body: JSON.stringify({
                "Emp_Code": code,
                "company_code": 1
            })

        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_FORGET_PASSWORD_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_FORGET_PASSWORD_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_FORGET_PASSWORD_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}