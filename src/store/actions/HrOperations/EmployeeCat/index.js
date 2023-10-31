import {
    GET_TRANSITION_EMPLOYEE_CAT_DATA,
    GET_TRANSITION_EMPLOYEE_CAT_START,
    GET_TRANSITION_EMPLOYEE_CAT_SINGLE,
    GET_TRANSITION_EMPLOYEE_CAT_END
} from '../../types'
import baseUrl from '../../../../config.json'


export const GetEmployeeCatData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EMPLOYEE_CAT_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_category/GetEmploymentCategory/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPLOYEE_CAT_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPLOYEE_CAT_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EMPLOYEE_CAT_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Employee_Cat_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_EMPLOYEE_CAT_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_category/GetEmploymentCategoryById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Emp_Category_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPLOYEE_CAT_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_EMPLOYEE_CAT_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_EMPLOYEE_CAT_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}