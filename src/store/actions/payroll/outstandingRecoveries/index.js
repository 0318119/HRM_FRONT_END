import {
    GET_Outstanding_Recoveries_DATA,
    GET_Outstanding_Recoveries_START,
    GET_Outstanding_Recoveries_SINGLE,
    GET_Outstanding_Recoveries_END
} from "../../types"
import baseURL from '../../../../config.json'

export const GetOutstandingRecoveries = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_Outstanding_Recoveries_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/outstandingRecoveries/GetAlloutstandingRecoveries/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_Outstanding_Recoveries_DATA,
                payload: [{res}],
            });
        }
        dispatch({
            type: GET_Outstanding_Recoveries_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_Outstanding_Recoveries_START,
            payload: false,
        });
        console.log(error)
    }

}


export const GET_Outstanding_Recoveries_BY_CODE = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_Outstanding_Recoveries_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/outstandingRecoveries/GetbyOutstandingRecoveriesByCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Outstanding_Recovery_code : body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_Outstanding_Recoveries_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_Outstanding_Recoveries_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_Outstanding_Recoveries_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}

