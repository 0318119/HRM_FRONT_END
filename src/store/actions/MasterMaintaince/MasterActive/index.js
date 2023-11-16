import {
    GET_MASTER_ACTIVE_DATA,
    GET_MASTER_ACTIVE_DATA_START,
    GET_MASTER_ACTIVE_DATA_SINGLE,
    GET_MASTER_ACTIVE_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";

export const GetMasterActiveData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_MASTER_ACTIVE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/master_all_employees/GetMasterAllEmployees`, {
            method: "GET",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_MASTER_ACTIVE_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: GET_MASTER_ACTIVE_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_MASTER_ACTIVE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error);
    }
};


