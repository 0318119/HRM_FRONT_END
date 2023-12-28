import {
    GET_TranEducationReport_DATA,
    GET_TranEducationReport_DATA_START,
    GET_TranEducationReport_DATA_SINGLE,
    GET_TranEducationReport_DATA_END

} from '../../../../store/actions/types'


import baseUrl from '../../../../config.json'

export const GetTransAllEmp = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_TranEducationReport_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/tranEducation/GetEmployeeNamesTranEducation`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TranEducationReport_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_TranEducationReport_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TranEducationReport_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

// =================================================================

export const PostTranEducationPayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/reports/TranEducationReport`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            "Emp_code": data,

        }),
    });
    const res = await response.json();
    console.log(res, 'res')
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};
