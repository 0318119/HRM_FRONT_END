import {
    GET_ATTENDANCE_SHEET_DATA,
    GET_ATTENDANCE_SHEET_START,
    GET_ATTENDANCE_SHEET_SINGLE,
    GET_ATTENDANCE_SHEET_END
} from '../../../store/actions/types'
import baseUrl from '../../../config.json'

export const GetAllEmp = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ATTENDANCE_SHEET_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetEmployeeDetaillsUnderSupervision`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_ATTENDANCE_SHEET_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_ATTENDANCE_SHEET_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_ATTENDANCE_SHEET_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const PostAttendancePayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/attendance/GetAttendanceSummary`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Employee_Id": data?.Employee_Id,
        "Month": data?.Month,
        "Year": data?.Year,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };