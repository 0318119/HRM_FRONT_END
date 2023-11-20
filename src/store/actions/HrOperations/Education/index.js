import {
    GET_TRANSITION_EDUCATION_DATA,
    GET_TRANSITION_EDUCATION_START,
    GET_TRANSITION_EDUCATION_DATA_SINGLE,
    GET_TRANSITION_EDUCATION_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetEducationData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EDUCATION_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/education_code/GetEducationCode/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EDUCATION_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Education_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EDUCATION_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/education/GetEducationByCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Edu_code': body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EDUCATION_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}