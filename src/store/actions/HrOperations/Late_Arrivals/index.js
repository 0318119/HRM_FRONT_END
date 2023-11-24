import {
    GET_LATE_ARRIVAL_DATA,
    GET_LATE_ARRIVAL_DATA_START,
    GET_LATE_ARRIVAL_DATA_SINGLE,
    GET_LATE_ARRIVAL_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";


export const GenerateLateArrival = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_INSTITUTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/lateArrival/CreateLateArrivalData`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Month": body,
                "Year": body
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_INSTITUTION_DATA_SINGLE,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_INSTITUTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_INSTITUTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }


}