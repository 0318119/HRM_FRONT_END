import {
    GET_TRANSITION_POSITION_DATA,
    GET_TRANSITION_POSITION_START,
    GET_TRANSITION_POSITION_SINGLE,
    GET_TRANSITION_POSITION_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetPositionData = (params) => async (dispatch) => {
    // ${params.pageNo}/${params.pageSize}/${params.search}
    try {
        dispatch({
            type: GET_TRANSITION_POSITION_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/Positions/GetAllPositions/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_POSITION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_POSITION_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_POSITION_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Position_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_POSITION_DATA,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/Positions/GetbyPositionscode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Position_Code': body,
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_POSITION_SINGLE,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_POSITION_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_POSITION_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}