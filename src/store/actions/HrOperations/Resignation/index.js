import {
    GET_TRANSITION_RESIGNATION_DATA,
    GET_TRANSITION_RESIGNATION_DATA_START,
    GET_TRANSITION_RESIGNATION_DATA_SINGLE,
    GET_TRANSITION_RESIGNATION_DATA_END,
  } from "../../types";
  import baseUrl from "../../../../config.json";
  
  export const GetResignationData = (params) => async (dispatch) => {
    try {
      dispatch({
        type: GET_TRANSITION_RESIGNATION_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/employee_resignation/GetEmploymentResignation/${params.pageNo}/${params.pageSize}/${params.search}`,
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
          type: GET_TRANSITION_RESIGNATION_DATA,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_TRANSITION_RESIGNATION_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TRANSITION_RESIGNATION_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };

  export const Get_Resignation_Data_By_Id = (body) => async (dispatch) => {
    try {
      dispatch({
        type: GET_TRANSITION_RESIGNATION_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/employee_resignation/GetResignationByCode`,
        {
          method: "POST",
          headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Resign_code: body,
          }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        dispatch({
          type: GET_TRANSITION_RESIGNATION_DATA_SINGLE,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_TRANSITION_RESIGNATION_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TRANSITION_RESIGNATION_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };