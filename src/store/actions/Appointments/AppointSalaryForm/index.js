import {
  GET_SALARY_DATA,
  GET_SALARY_START,
  GET_SALARY_SINGLE,
  GET_SALARY_AMOUNT_DATA,
  GET_SALARY_ALLOWANCE_DATA,
  GET_SALARY_END,
} from "../../types";
import baseUrl from "../../../../config.json";


export const GetEmployeeInfo = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SALARY_START,
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
        type: GET_SALARY_DATA,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_SALARY_END,
        payload: [{ res }],
        loading: false,
      });
    }

  } catch (error) {
    dispatch({
      type: GET_SALARY_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};

export const EmployeeSalaryAmount = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SALARY_START,
      payload: true,
      loading: true,
    });

    const accessToken = localStorage.getItem("access_token");

    const response = await fetch(
      `${baseUrl.baseUrl}/employee_salary/GetEmployeeSalaryBySeqNo/${userId}`,
      {
        method: "GET",
        headers: {
          accessToken: "Bareer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: GET_SALARY_AMOUNT_DATA,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_SALARY_END,
        payload: [{ res }],
        loading: false,
      });
    }

  } catch (error) {
    dispatch({
      type: GET_SALARY_END,
      payload: false,
      loading: false,
    });
    console.error('Caught error:', error);
  }
};


export const SalaryAlowanceCall = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SALARY_START,
      payload: true,
      loading: true,
    });

    const response = await fetch(
      `${baseUrl['baseUrl']}/allownces/GetAllAllownces`,
      {
        method: 'GET',
        headers: {
          accessToken: `Bareer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: GET_SALARY_ALLOWANCE_DATA,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_SALARY_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SALARY_END,
      payload: false,
      loading: false,
    });
    console.error(error);
  }
};


export const GetSalaryByCode = (body) => async () => {
  const response = await fetch(`${baseUrl['baseUrl']}/employee_salary/InsertEmployeeSalary`, {
    method: "POST",
    headers: {
      accessToken: "Bareer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "Sequence_no": body?.Sequence_no,
      "FirstTimeFlag": body?.FirstTimeFlag,
      "allownces": body?.allownces
    })
  });
  const res = await response.json();
  if (res?.success) {
    return res;
  }else{
    return res;
  }
};