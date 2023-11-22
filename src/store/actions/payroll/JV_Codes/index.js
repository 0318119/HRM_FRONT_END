import {
    GET_JV_Code_DATA,
    GET_JV_Code_DATA_START,
    GET_JV_Code_DATA_SINGLE,
    GET_JV_Code_DATA_END,
  } from "../../types";
  import baseUrl from "../../../../config.json";
  
  // Get Api======================
  
  export const GetJvCodeData = (params) => async (dispatch) => {
    try {
      dispatch({
        type: GET_JV_Code_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/JVCodes/GetallJvCode/${params.pageNo}/${params.pageSize}/${params.search}`,
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
          type: GET_JV_Code_DATA,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_JV_Code_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_JV_Code_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };
  
  // Get By ID API====================
  
  export const GetJvCOdeById = (body) => async (dispatch) => {
    try {
      dispatch({
        type: GET_JV_Code_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/JVCodes/GetbyJvCode`,
        {
          method: "POST",
          headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            JV_Unit: body,
          }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        dispatch({
          type: GET_JV_Code_DATA_SINGLE,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_JV_Code_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_JV_Code_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };
  
  // Delete APi===================
  
  export const DeleteJvCode = (body) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/JVCodes/DeleteJvCode`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "JV_Unit": body,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };