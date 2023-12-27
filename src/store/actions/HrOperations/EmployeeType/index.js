import {
    GET_TRANSITION_EMPOYLEE_TYPE_DATA,
    GET_TRANSITION_EMPOYLEE_TYPE_START,
    GET_TRANSITION_EMPOYLEE_TYPE_SINGLE,
    GET_TRANSITION_EMPOYLEE_TYPE_END
} from '../../types'
import baseUrl from '../../../../config.json'


export const GetEmployeeTypeData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EMPOYLEE_TYPE_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_type_code/GetEmploymentTypeCode/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPOYLEE_TYPE_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPOYLEE_TYPE_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EMPOYLEE_TYPE_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Employee_Type_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EMPOYLEE_TYPE_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_type/GetEmploymentTypeById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Empt_Type_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPOYLEE_TYPE_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPOYLEE_TYPE_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EMPOYLEE_TYPE_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}