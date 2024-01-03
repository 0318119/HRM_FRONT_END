import {
    GET_LATE_ARRIVAL_DATA,
    GET_LATE_ARRIVAL_DATA_START,
    GET_LATE_ARRIVAL_DATA_SINGLE,
    GET_LOCATIONS_DATA,
    GET_SECTION_DATA,
    GET_DIVISION_DATA,
    GET_LATE_ARRIVAL_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";


export const GenerateLateArrivals = (body) => async (dispatch) => {
    console.log(body , 'body')
    
    const response = await fetch(`${baseUrl.baseUrl}/lateArrival/CreateAndGetLateArrivalData`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({ 
            "Div_code": body?.Div_code,
            "Dept_code": body?.Dept_code,
            "Section_code": body?.Section_code,
            "Loc_code": body?.Loc_code,
            "Payroll_Year": body?.Payroll_Year,
            "Payroll_Month": body?.Payroll_Month
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
    const response = await fetch(`${baseUrl.baseUrl}/lateArrival/LateArrivalData_DownloadExcel`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Div_code": body?.Div_code,
            "Dept_code": body?.Dept_code,
            "Section_code": body?.Section_code,
            "Loc_code": body?.Loc_code,
            "Payroll_Year": body?.Payroll_Year,
            "Payroll_Month": body?.Payroll_Month
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}


export const GetDataDepartment = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/department/GetDepartmentListWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LATE_ARRIVAL_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_LATE_ARRIVAL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


export const GetDataLocation = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/location_code/GetLocationsWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_LOCATIONS_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_LATE_ARRIVAL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const GetSectionData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_section_code/GetEmploymentSectionCodeWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_SECTION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_LATE_ARRIVAL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const GetDivisionData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/division/GetAllDivisionsWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_DIVISION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_LATE_ARRIVAL_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LATE_ARRIVAL_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


