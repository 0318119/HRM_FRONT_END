import {
    LOGIN_DATA_START,
    LOGIN_DATA_END,
    // =================================================================
    LOGIN_GET_COMPANY_DATA
} from '../../actions/types'
import baseUrl from '../../../config.json'

export const GET_ALL_COMPANY_DATA = () => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_DATA_START,
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
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: LOGIN_GET_COMPANY_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: LOGIN_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: LOGIN_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Login = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/auth/SuperAdminLogin`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: body
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}
