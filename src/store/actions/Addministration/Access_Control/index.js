import {
  GET_Access_Control_DATA,
  GET_Access_Control_DATA_START,
  GET_Access_Control_DATA_SINGLE,
  GET_Access_Control_DATA_END,
  GET_ALL_MENUS
} from "../../types";
import baseUrl from "../../../../config.json";

// Get Api======================

export const GetAccessControlData = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_Access_Control_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/allemployees/GetEmployeesName/${params.pageNo}/${params.pageSize}/${params.search}`,
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
        type: GET_Access_Control_DATA,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_Access_Control_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_Access_Control_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};

// Get By ID API====================

export const GetMenuDir = (body) => async (dispatch) => {
  try {
    dispatch({
      type: GET_Access_Control_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/accessmenus/getMenusUserAccessHave`,
      {
        method: "POST",
        headers: {
          accessToken: "Bareer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Emp_code": body
        })
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: GET_Access_Control_DATA_SINGLE,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_Access_Control_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_Access_Control_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};

export const GetAllMenus = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_Access_Control_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/accessmenus/getAllMenus`,
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
        type: GET_ALL_MENUS,
        payload: [res],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_Access_Control_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_Access_Control_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};


export const AddUserAccessMenus = (body) => async (dispatch) => {
  console.log(body,'root')
  try {
    dispatch({
      type: GET_Access_Control_DATA_START,
      payload: true,
      loading: true,
    });
    const response = await fetch(
      `${baseUrl.baseUrl}/accessmenus/AddUserAccessMenus`,
      {
        method: "POST",
        headers: {
          accessToken: "Bareer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: localStorage.getItem('Emp_code'),
          menu_code: body,
        })
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: GET_Access_Control_DATA_SINGLE,
        payload: [{ res }],
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: GET_Access_Control_DATA_END,
        payload: [{ res }],
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_Access_Control_DATA_END,
      payload: false,
      loading: false,
    });
    console.log(error);
  }
};



