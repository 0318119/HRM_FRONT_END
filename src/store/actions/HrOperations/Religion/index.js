import {
  GET_TRANSITION_RELIGION_DATA,
  GET_TRANSITION_RELIGION_DATA_START,
  GET_TRANSITION_RELIGION_DATA_SINGLE,
  GET_TRANSITION_RELIGION_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetReligionData = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRANSITION_RELIGION_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/religion_code/GetEmploymentReligionCode/${params.pageNo}/${params.pageSize}/${params.search}`,
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
        type: GET_TRANSITION_RELIGION_DATA,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_TRANSITION_RELIGION_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_TRANSITION_RELIGION_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};

export const Get_Religion_Data_By_Id = (body) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRANSITION_RELIGION_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/religion_code/GetbyReligionCode`,
      {
        method: "POST",
        headers: {
          accessToken: "Bareer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Religion_code: body,
        }),
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: GET_TRANSITION_RELIGION_DATA_SINGLE,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_TRANSITION_RELIGION_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_TRANSITION_RELIGION_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};
