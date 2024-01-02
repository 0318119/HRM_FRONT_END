import {
    GET_PAYSHEET_Report_DATA,
    GET_PAYSHEET_Report_START,
    GET_PAYSHEET_Report_PAYROLL,
    GET_PAYSHEET_Report_END
} from '../../../actions/types.js'

import baseUrl from '../../../../config.json'


export const GetPaysheet = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PAYSHEET_Report_START,
            payload: true,
            loading: true,
        });

        const response = await fetch(`${baseUrl.baseUrl}/employement_experience/GetEmployeeNamesTranExperience`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_PAYSHEET_Report_PAYROLL,
                payload: res,
                loading: false,
            });

            // console.log("Received payload:", res); 
        } else {
            const errorRes = await response.json();
            dispatch({
                type: GET_PAYSHEET_Report_END,
                payload: errorRes,
                loading: false,
            });
            console.error("Error response:", errorRes);
        }
    } catch (error) {
        dispatch({
            type: GET_PAYSHEET_Report_END,
            payload: false,
            loading: false,
        });
        console.error("Fetch error:", error);
    }
};



export const PostPaysheetPayload = (data) => async () => {
    // console.log(data, 'data')
    const response = await fetch(`${baseUrl.baseUrl}/reports/ExperienceReport`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Emp_code": data
        }),
    });
    const res = await response.json();
    console.log(res, 'rtes')
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};