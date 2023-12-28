import {
    GET_TRANSITION_EDUCATION_LEVEL_DATA,
    GET_TRANSITION_EDUCATION_LEVEL_START,
    GET_TRANSITION_EDUCATION_LEVEL_DATA_SINGLE,
    GET_TRANSITION_EDUCATION_LEVEL_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetEducationLevelData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EDUCATION_LEVEL_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/educationlevel/GetEducationLevel/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_LEVEL_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_LEVEL_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EDUCATION_LEVEL_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Education_Level_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EDUCATION_LEVEL_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/educationlevel/GetEducationLevelById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Edu_level_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_LEVEL_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EDUCATION_LEVEL_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EDUCATION_LEVEL_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}