import {
    GET_New_Appointment_Report_DATA,
    GET_New_Appointment_Report_START,
    GET_New_Appointment_Report_SINGLE,
    GET_New_Appointment_Report_END
} from '../../../actions/types.js'
import baseUrl from '../../../../config.json'

export const GetAllAppoint = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_New_Appointment_Report_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_New_Appointment_Report_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_New_Appointment_Report_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_New_Appointment_Report_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const PostAttendancePayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/reports/New_Appointment_Report`, {
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