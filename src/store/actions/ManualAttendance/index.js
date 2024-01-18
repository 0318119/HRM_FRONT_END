import {
    GET_MANUAL_ATTENDANCE_DATA,
    GET_MANUAL_ATTENDANCE_DATA_START,
    GET_MANUAL_ATTENDANCE_DATA_INFO,
    GET_MANUAL_ATTENDANCE_DATA_SINGLE,
    GET_MANUAL_ATTENDANCE_DATA_END
} from "../../actions/types";
import baseUrl from "../../../config.json";


export const AllEmployees = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MANUAL_ATTENDANCE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesName/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            // console.log(res , 'res')
            dispatch({
                type: GET_MANUAL_ATTENDANCE_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_MANUAL_ATTENDANCE_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_MANUAL_ATTENDANCE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};

export const GetEmployeeInfo = (params) => async (dispatch) => {
    console.log(params, 'params')
    try {
        dispatch({
            type: GET_MANUAL_ATTENDANCE_DATA_START,
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
                type: GET_MANUAL_ATTENDANCE_DATA_INFO,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_MANUAL_ATTENDANCE_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_MANUAL_ATTENDANCE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};



export const getAtttendanceHisss = (body) => async (dispatch) => {
    // console.log(body, 'body')

    const response = await fetch(`${baseUrl.baseUrl}/attendance/ManualAttendance/GetMonthlyAttendanceByEmpCode`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": body?.Emp_code,
            "Year": body?.Year,
            "Month": body?.Month

        })
    });
    const res = await response.json();
    dispatch({
        type: GET_MANUAL_ATTENDANCE_DATA_SINGLE,
        payload: [{ res }],
        loading: false,
    });

    if (res?.success) {
        return res;
    } else {
        return res;
    }
}




export const UpdateAttendance = (body) => async (dispatch) => {

    const response = await fetch(`${baseUrl.baseUrl}/attendance/ManualAttendance/UpdateMonthlyAttendance`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Emp_code": body?.Emp_code,
            "Date": [{
                "Attendance_Date": body?.Date?.[0]?.Attendance_Date,
                "Emp_Time_in": body?.Date?.[0]?.Emp_Time_in,
                "Emp_Time_Out": body?.Date?.[0]?.Emp_Time_Out,
                "Remarks": body?.Date?.[0]?.Remarks

            }]


        })
    });
    const res = await response.json();
    // console.log(res , "res")
    dispatch({
        type: GET_MANUAL_ATTENDANCE_DATA_SINGLE,
        payload: [{ res }],
        loading: false,
    });

    if (res?.success) {
        return res;
    } else {
        return res;
    }
}
