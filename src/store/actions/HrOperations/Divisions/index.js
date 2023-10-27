import {
    GET_TRANSITION_DIVISIONS_DATA,
    GET_TRANSITION_DIVISIONS_START,
    GET_TRANSITION_DIVISIONS_DATA_SINGLE,
    GET_TRANSITION_DIVISIONS_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetDivisionData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_DIVISIONS_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/division/GetAllDevisions/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DIVISIONS_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DIVISIONS_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_DIVISIONS_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Division_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_DIVISIONS_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/division/GetDivisionById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Div_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DIVISIONS_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DIVISIONS_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_DIVISIONS_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}