import {
  GET_IncomeTax_Columns_DATA,
  GET_IncomeTax_Columns_DATA_START,
  GET_IncomeTax_Columns_DATA_SINGLE,
  GET_IncomeTax_Columns_DATA_END,
  } from "../../types";
  import baseUrl from "../../../../config.json";
  
  // Get Api======================
  
  export const GetIncomeTaxData = (params) => async (dispatch) => {
    try {
      dispatch({
        type: GET_IncomeTax_Columns_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/incomeTaxColumn/GetAllIncomeTaxColumn/${params.pageNo}/${params.pageSize}/${params.search}`,
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
          type: GET_IncomeTax_Columns_DATA,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_IncomeTax_Columns_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_IncomeTax_Columns_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };
  
  // Get By ID API====================
  
  export const GetIncomeTax_ColumnById = (body) => async (dispatch) => {
    try {
      dispatch({
        type: GET_IncomeTax_Columns_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/incomeTaxColumn/GetbyIncomeTaxColumn`,
        {
          method: "POST",
          headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Column_No: body,
          }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        dispatch({
          type: GET_IncomeTax_Columns_DATA_SINGLE,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_IncomeTax_Columns_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_IncomeTax_Columns_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };
  
  // Delete APi===================
  
  export const DeleteIncomeTax = (body) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/incomeTaxColumn/DeleteIncomeTaxColumn`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Column_No": body,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };