import {
    GET_MASTER_EARNING_DATA,
    GET_MASTER_EARNING_DATA_START,
    GET_MASTER_EARNING_DATA_SINGLE,
    GET_MASTER_EARNING_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetMasterEarningData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MASTER_EARNING_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesName/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_MASTER_EARNING_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_MASTER_EARNING_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_MASTER_EARNING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};

export const Get_Master_Earning_Allowance_By_EmpCode = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MASTER_EARNING_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allowance/getAllowancesByEmpCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Emp_code': body,
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_MASTER_EARNING_DATA_SINGLE,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_MASTER_EARNING_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MASTER_EARNING_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }


}
