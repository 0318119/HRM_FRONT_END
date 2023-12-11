import {
    GET_CONFORMATION_DATA,
    GET_CONFORMATION_DATA_START,
    GET_CONFORMATION_DATA_SINGLE,
    GET_CONFORMATION_DATA_END
} from "../../../types"
import baseUrl from '../../../../../config.json'



export const Get_Conformation_Data = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CONFORMATION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationList/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_CONFORMATION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_CONFORMATION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_CONFORMATION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_confirmation_By_ID = (isCode) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CONFORMATION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationListByEmp_Code`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "Emp_code":isCode
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_CONFORMATION_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_CONFORMATION_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_CONFORMATION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}



