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
        if (res?.success == "success") {
            dispatch({
                type: GET_TAX_STRUCTURE_DATA,
                payload: res.data1,
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

export const AddTax_Structure = (body) => async (dispatch, getState) => {
    console.log(body, 'body')
    try {
        const response = await fetch(`${baseURL.baseUrl}/employee_salary/Salary_Hold_Save`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Structure_Code: body?.Emp_code,
                Taxable_Income_From: body?.Salary_Hold_Flag,
                Taxable_Income_To: body.Description,
                Fixed_Amount: body.Description,
                Tax_Percentage: body.Description,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
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
                Structure_Code: body?.Emp_code,
                Taxable_Income_From: body?.Salary_Hold_Flag,
                Taxable_Income_To: body.Description,
                Fixed_Amount: body.Description,
                Tax_Percentage: body.Description,
            })
        });
        const res = await response.json()
        return res?.data
    }
    catch (error) {
        console.log(error)
    }
}

