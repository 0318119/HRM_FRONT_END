import {
    GET_TAX_STRUCTURE_DATA,
    GET_TAX_STRUCTURE_DATA_START,
    GET_TAX_STRUCTURE_DATA_SINGLE,
    GET_TAX_STRUCTURE_DATA_END
} from "../../types"
import baseURL from '../../../../config.json'

export const getTaxStructure = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_TAX_STRUCTURE_DATA_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/taxStructure/Getalltaxstructures/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        console.log(res , 'res')
        if (res?.success == "success") {
            dispatch({
                type: GET_TAX_STRUCTURE_DATA,
                payload: [{res}],
            });
        }
        dispatch({
            type: GET_TAX_STRUCTURE_DATA_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_TAX_STRUCTURE_DATA_END,
            payload: false,
        });
        console.log(error)
    }

}


export const Get_Tax_Structure_By_Id = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TAX_STRUCTURE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/taxStructure/GetbyTaxStructuresCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Structure_Code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TAX_STRUCTURE_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TAX_STRUCTURE_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TAX_STRUCTURE_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}



export const DeleteTax_Structure = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/taxStructure/DeleteTaxStructure`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Structure_Code: body
                
            })
        });
        const res = await response.json()
        return res?.data
    }
    catch (error) {
        console.log(error)
    }
}

