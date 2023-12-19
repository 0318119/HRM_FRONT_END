import {
    GET_SALARY_DATA,
    GET_SALARY_START,
    GET_SALARY_SINGLE,
    GET_SALARY_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetSalaryInfo = (params) => async (dispatch) => {
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

async function getInfoCall() {
    await fetch(`${config['baseUrl']}/appointments/GetAppointmentsBySeqNo/${userId}`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/appointments/GetAppointmentsBySeqNo/${userId}`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setInfo(response.data[0][0])
          }
        }).catch((error) => {
          setInfoErr(error.message)
        })
      }
      else {
        setInfo(response.data[0][0])
      }
    }).catch((error) => {
      setInfoErr(error.message)
    })
  }X

export const GetSalaryByCode = (params) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SALARY_START,
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
          type:  GET_SALARY_SINGLE,
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
  






