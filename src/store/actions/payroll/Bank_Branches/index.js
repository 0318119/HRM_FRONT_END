import {
    GET_Bank_Branches_DATA,
    GET_Bank_Branches_DATA_START,
    GET_Bank_Branches_DATA_SINGLE,
    GET_Bank_Branches_DATA_END,
    } from "../../types";
    import baseUrl from "../../../../config.json";
    
    // Get Api======================
    
    export const GetBankBranchesData = (params) => async (dispatch) => {
      try {
        dispatch({
          type: GET_Bank_Branches_DATA_START,
          payload: true,
          loading: true,
        });
        const response = await fetch(
          `${baseUrl.baseUrl}/getbranch/GetBranchesOfBank/${params.pageNo}/${params.pageSize}/${params.search}`,
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
            type: GET_Bank_Branches_DATA,
            payload: [{ res }],
            loading: false,
          });
        } else {
          const res = await response.json();
          dispatch({
            type: GET_Bank_Branches_DATA_END,
            payload: [{ res }],
            loading: false,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_Bank_Branches_DATA_END,
          payload: false,
          loading: false,
        });
        console.log(error);
      }
    };
    
    // Get By ID API====================
    
    export const GetBankBranchById = (body) => async (dispatch) => {
      try {
        dispatch({
          type: GET_Bank_Branches_DATA_START,
          payload: true,
          loading: true,
        });
        const response = await fetch(
          `${baseUrl.baseUrl}/getbycode/GetBankBranchByCode`,
          {
            method: "POST",
            headers: {
              accessToken: "Bareer " + localStorage.getItem("access_token"),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Branch_code": body
            })
          }
        );
        if (response.status === 200) {
          const res = await response.json();
          dispatch({
            type: GET_Bank_Branches_DATA_SINGLE,
            payload: [{ res }],
            loading: false,
          });
        } else {
          const res = await response.json();
          dispatch({
            type: GET_Bank_Branches_DATA_END,
            payload: [{ res }],
            loading: false,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_Bank_Branches_DATA_END,
          payload: false,
          loading: false,
        });
        console.log(error);
      }
    };
    
    // Delete APi===================
    
    export const DeleteBankBranch = (body) => async () => {
      const response = await fetch(`${baseUrl.baseUrl}/deletebranch/DeleteBankBranch`, {
        method: "POST",
        headers: {
          accessToken: "Bareer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Branch_code": body,
        }),
      });
      const res = await response.json();
      if (res?.success) {
        return res;
      }else{
        return res;
      }
    };