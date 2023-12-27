import {
    GET_SALARY_INFO_DATA,
    GET_SALARY_INFO_START,
    GET_SALARY_GRADE_DATA,
    GET_SALARY_INFO_SINGLE,
    GET_SALARY_INFO_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetEmployeeInfo = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SALARY_INFO_DATA,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/appointments/GetAppointmentsBySeqNo/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_SALARY_INFO_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_SALARY_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_SALARY_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const GetEducationData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SALARY_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/education_code/GetEducationCodeWOP`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_EDUCATIION_EDUCATION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_SALARY_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EDUCATIION_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};



export const GetInstituteData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EDUCATIION_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/institutions/GetwithoutPaginationInstitution`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_EDUCATIION_INSTITUTE_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_EDUCATIION_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EDUCATIION_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const GetGradeData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EDUCATIION_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/grade_code/GetGradeCodeWOP`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_SALARY_GRADE_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_EDUCATIION_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EDUCATIION_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


export const SaveFormEdu = (body) => async (dispatch) => {
    
    const response = await fetch(`${baseUrl.baseUrl}/education_code/InsertTranEducation`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Sequence_no": body?.Sequence_no,
            "EduCode": body?.EduCode,
            "EduYear": body?.EduYear,
            "EduGrade": body?.EduGrade,
            "Topflag": body?.Topflag,
            "institutecode": body?.institutecode

        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}


export const GetEducationSavedData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EDUCATIION_INFO_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/eduation_code/GetTranEducationByEmpCode/${params}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_EDUCATIION_EDUCATION_SAVED_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_EDUCATIION_INFO_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_EDUCATIION_INFO_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};
