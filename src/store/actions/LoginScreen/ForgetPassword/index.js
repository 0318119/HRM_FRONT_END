
import {
     GET_FORGET_PASSWORD_DATA,
    GET_FORGET_PASSWORD_DATA_START,
    GET_FORGET_PASSWORD_DATA_SINGLE,
    GET_FORGET_PASSWORD_DATA_END
} from '../../types'
import baseUrl from '../../../../config.json'



export const SEND_PASSWORD_OTP = (body) => async (dispatch) => {
    console.log(body , "bo")
    const response = await fetch(`${baseUrl.baseUrl}/allemployee/ForgetPassword_Send_OTP`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_Code": body.Emp_Code,
            "company_code": body.company_code
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}

export const Verify_OTP = (body) => async (dispatch) => {
    console.log(body,'bid')
    const response = await fetch(`${baseUrl.baseUrl}/allemployee/Verify_OTP`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": body.Emp_code,
            "OTP": body.OTP,
            "company_code": body.company_code
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}


export const UpdatePassword = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/allemployee/Update_Password`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": body.Emp_code,
            "company_code": body.company_code,
            "new_password": body.new_password
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}

export const GET_Company_Code = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_FORGET_PASSWORD_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/companies/getCompanies`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
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