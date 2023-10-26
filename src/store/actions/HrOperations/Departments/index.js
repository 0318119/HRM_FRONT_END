import {
    GET_TRANSITION_DEPARTMENT_DATA,
    GET_TRANSITION_DEPARTMENT_START,
    GET_TRANSITION_DEPARTMENT_DATA_SINGLE,
    GET_TRANSITION_DEPARTMENT_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetDataDepartment = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_DEPARTMENT_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/department/GetDepartmentList/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DEPARTMENT_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DEPARTMENT_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_DEPARTMENT_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_department_Data_By_Id = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_DEPARTMENT_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/department/GetDepartmentById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Dept_code': body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DEPARTMENT_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_DEPARTMENT_DATA,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_DEPARTMENT_DATA,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}