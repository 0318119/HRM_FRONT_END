import {
    GET_Access_Control_DATA,
    GET_Access_Control_DATA_START,
    GET_Access_Control_DATA_SINGLE,
    GET_Access_Control_DATA_END,
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
        `${baseUrl.baseUrl}/accessmenus/GetUserAccessMenus`,
        {
          method: "POST",
          headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_code: body,
          }),
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
  
  // Delete APi===================
  
//   export const DeleteJvCode = (body) => async () => {
//     const response = await fetch(`${baseUrl.baseUrl}/JVCodes/DeleteJvCode`, {
//       method: "POST",
//       headers: {
//         accessToken: "Bareer " + localStorage.getItem("access_token"),
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "JV_Unit": body,
//       }),
//     });
//     const res = await response.json();
//     if (res?.success) {
//       return res;
//     }else{
//       return res;
//     }
//   };