import {
    GET_TRANSITION_GRADES_DATA,
    GET_TRANSITION_GRADES_START,
    GET_TRANSITION_GRADES_SINGLE,
    GET_TRANSITION_GRADES_END
} from '../../types'
import baseUrl from '../../../../config.json'


export const GetGradesData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_GRADES_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/grade_code/GetGradeCode/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_GRADES_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_GRADES_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_GRADES_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Grades_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_GRADES_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/grade_code/GetGradeByGradeCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Grade_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_GRADES_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_GRADES_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_GRADES_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}