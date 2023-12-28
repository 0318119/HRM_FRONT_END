import {
    GET_TRANSITION_COST_CENTRE_DATA,
    GET_TRANSITION_COST_CENTRE_START,
    GET_TRANSITION_COST_CENTRE_DATA_SINGLE,
    GET_TRANSITION_COST_CENTRE_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetCostCentreData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_COST_CENTRE_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_cost_center/GetEmploymentCostCenter/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COST_CENTRE_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COST_CENTRE_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_COST_CENTRE_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Cost_Centre_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_COST_CENTRE_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_cost_center/GetEmploymentCostCenterById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Cost_Centre_code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COST_CENTRE_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COST_CENTRE_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_COST_CENTRE_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}