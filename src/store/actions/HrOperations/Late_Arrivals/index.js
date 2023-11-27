import {
    GET_LATE_ARRIVAL_DATA,
    GET_LATE_ARRIVAL_DATA_START,
    GET_LATE_ARRIVAL_DATA_SINGLE,
    GET_LATE_ARRIVAL_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";


export const GenerateLateArrivals = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/lateArrival/CreateLateArrivalData`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({ 
            "Month": body?.Month,
            "Year": body?.Year
         })
        });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}

export const GetGenerateLateArrivalsData = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/lateArrival/CreateLateArrivalData`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Month": body?.Month,
            "Year": body?.Year
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}