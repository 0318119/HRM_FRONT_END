import {
    GET_DOWNLOAD_PARA_ACCESS_DATA,
    GET_DOWNLOAD_PARA_ACCESS_START,
    GET_DOWNLOAD_PARA_ACCESS_SINGLE,
    GET_SELECT_USER_DATA,
    GET_DOWNLOAD_PARA_ACCESS_END,
    
} from '../../types'
import baseUrl from '../../../../config.json'


export const GET_DOWNLOAD_ACCESS_DATA = (params) => async (dispatch) => {
    // ${params.pageNo}/${params.pageSize}/${params.search}
    try {
        dispatch({
            type: GET_DOWNLOAD_PARA_ACCESS_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/refreshable/getParameterAccess`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_DOWNLOAD_PARA_ACCESS_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_DOWNLOAD_PARA_ACCESS_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_DOWNLOAD_PARA_ACCESS_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const GET_SELECT_USER = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_DOWNLOAD_PARA_ACCESS_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesName`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_SELECT_USER_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_DOWNLOAD_PARA_ACCESS_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_DOWNLOAD_PARA_ACCESS_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

