import {
    GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA,
    GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_START,
    GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_SINGLE,
    GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_END,
  } from "../../types";
  import baseUrl from "../../../../config.json";
  
  export const GetPreviousEmpData = (params) => async (dispatch) => {
    try {
      dispatch({
        type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/allemployer/GetAllEmployer/${params.pageNo}/${params.pageSize}/${params.search}`,
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
          type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };

  export const Get_Previous_Emp_Data_By_Id = (body) => async (dispatch) => {
    try {
      dispatch({
        type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/allemployer/GetbyEmployerByEmpCode`,
        {
          method: "POST",
          headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Employer_Code: body,
          }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        dispatch({
          type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_SINGLE,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TRANSITION_PERVIOUS_EMPLOYEE_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };