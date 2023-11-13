import {
    GET_MASTER_PERSONAL_DATA,
    GET_MASTER_PERSONAL_START,
    GET_DOWNLOAD_PARA_ACCESS_SINGLE,
    GET_MASTER_PERSONAL_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetMasterPersonalData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MASTER_PERSONAL_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWP/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_MASTER_PERSONAL_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_MASTER_PERSONAL_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_MASTER_PERSONAL_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};

export const Get_Master_Personal_By_Id = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MASTER_PERSONAL_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/SP_PER_MasterEmployees_Update`, {
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
                type: GET_DOWNLOAD_PARA_ACCESS_SINGLE,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_MASTER_PERSONAL_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_MASTER_PERSONAL_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }


}
