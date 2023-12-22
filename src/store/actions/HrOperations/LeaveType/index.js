import {
  GET_TRANSITION_LEAVE_TYPE_DATA,
  GET_TRANSITION_LEAVE_TYPE_DATA_START,
  GET_TRANSITION_LEAVE_TYPE_DATA_SINGLE,
  GET_TRANSITION_LEAVE_TYPE_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";

// Get Api======================
export const GetLeaveTypeData = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRANSITION_LEAVE_TYPE_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/employment_leave_type/GetLeaveType/${params.pageNo}/${params.pageSize}/${params.search}`,
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
        type: GET_TRANSITION_LEAVE_TYPE_DATA,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_TRANSITION_LEAVE_TYPE_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_TRANSITION_LEAVE_TYPE_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};

// Get By ID API====================
export const GetLeaveTypeById = (body) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRANSITION_LEAVE_TYPE_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/employment_leave_type/GetLeaveTypeById`,
      {
        method: "POST",
        headers: {
          accessToken: "Bareer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Leave_type_code: body,
        }),
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: GET_TRANSITION_LEAVE_TYPE_DATA_SINGLE,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_TRANSITION_LEAVE_TYPE_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_TRANSITION_LEAVE_TYPE_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};

// Delete APi===================
export const DeleteFunLeaveType = (body) => async () => {
  const response = await fetch(`${baseUrl.baseUrl}/employment_leave_type/DeleteLeaveType`, {
    method: "POST",
    headers: {
      accessToken: "Bareer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "Leave_type_code": body,
    }),
  });
  const res = await response.json();
  if (res?.success) {
    return res;
  }else{
    return res;
  }
};