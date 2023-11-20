import {
    GET_HOLIDAYS_DATA,
    GET_HOLIDAYS_DATA_START,
    GET_HOLIDAYS_DATA_SINGLE,
    GET_HOLIDAYS_DATA_END
} from '../../types'
import baseUrl from '../../../../config.json'


export const getHolidaysData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_HOLIDAYS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/holiday/GetHolidays/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_HOLIDAYS_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_HOLIDAYS_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_HOLIDAYS_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Holidays_By_ID = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_HOLIDAYS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/holiday/GetHolidaysByCalendarDate`, {
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
                type: GET_HOLIDAYS_DATA_SINGLE,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_HOLIDAYS_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_HOLIDAYS_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}