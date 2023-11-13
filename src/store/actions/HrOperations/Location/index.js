import {
    GET_LOCATION_DATA,
    GET_LOCATION_DATA_START,
    GET_LOCATION_DATA_SINGLE,
    GET_LOCATION_DATA_END
} from '../../types'
import baseUrl from '../../../../config.json'


export const getLocationData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOCATION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/location_code/GetLocations/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LOCATION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_LOCATION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LOCATION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Holidays_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOCATION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/holiday/GetHolidays`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Calendar_Date': body,
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LOCATION_DATA_SINGLE,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_LOCATION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LOCATION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}