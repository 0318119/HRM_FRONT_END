import { GET_ALLOWANCE_START, GET_ALLOWANCE_COMPLETE, GET_ALLOWANCE_END } from "../../types"
import baseURL from '../../../../config.json'

export const ListAllownace = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALLOWANCE_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/allowance/GetAllowances/${body.pageNo}/${body.pageSize}/${body.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_ALLOWANCE_COMPLETE,
                payload: res.data1,
            });
        }
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_ALLOWANCE_END,
            payload: false,
        });
        console.log(error)
    }

}


export const DeleteAllowance = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/allowance/DeleteAllowance`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Allowance_code: body
            })
        });
        const res = await response.json()
        if (res?.success == "success") {
            return res;
        }
    }
    catch (error) {
        console.log(error)
    }

}

export const SaveAllowance = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/allowance/AddAllowance`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Allowance_code:'0',
                Allowance_name: body?.name,
                Allowance_abbr: body?.abbreviation,
                Basic_Flag: body?.basicFlag,
                Appointment_flag:body?.appointmentFlag,
                Increment_flag:body?.increamentFlag,
                EOBI_flag: body?.EOBIFlag,
                SESSI_flag: body?.SESSIFLag,
                Overtime_flag: body?.overTimeFlag,
                COLA_Flag: body?.colaFlag,
                Special_Allowance_Flag: body?.specialFlag,
                Union_Cola_Flag: body?.unionColaFlag,
                LFA_flag: body?.LFAFlag,
                LFA_Default_flag: body?.LFADefaultFlag,
                Fixed_Transaction_Increment_Flag: body?.fixedTransactionIncrementFlag,
                Advance_Flag: body?.advanceFlag,
                Tax_Treatment_Type:body?.taxTreatmentFlag,
                Tax_Exempt_Percentage:body?.textExemptPercentage,
                Section_149_Column_no: body?.SectionColumnNumber,
                Fix_Sheet_Col_no: body?.FixSheetColumn,
                One_Sheet_Col_no: body?.oneSheetColumn,
                JV_Code: body?.jvCode,
                JV_Summary_Code:body?.jvSummaryCode,
                Income_Tax_Col: body?.incomeTaxColumn,
                Projection_Flag: body?.ProjectionFlag,
                Cash_Salary_Flag: body?.cashSalaryFlag,
                Sort_key: body?.sortKey,
                Income_Tax_Income_Column: body?.incomeTaxIncomeColumn,
                Income_Tax_Exemption_Column:body?.incomeTaxExamptionColumn,
                Perquisite_Flag: body?.perquisiteFlag,
                Description:body?.description,
                Bonus_Flag: body?.bonusFlag,
                Show_On_Letter_Flag: body?.showOnLetterFlag,
                Gross_Salary_Flag: body?.grossSalaryflag
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}


export const GetUpdateData = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/allowance/GetAllAllownceDetailsByAllowanceCode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Allowance_Code: body,
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}



export const SaveUpdateAllowance = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/allowance/AddAllowance`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Allowance_code:body?.Allowance_code,
                Allowance_name: body?.name,
                Allowance_abbr: body?.abbreviation,
                Basic_Flag: body?.basicFlag,
                Appointment_flag:body?.appointmentFlag,
                Increment_flag:body?.increamentFlag,
                EOBI_flag: body?.EOBIFlag,
                SESSI_flag: body?.SESSIFLag,
                Overtime_flag: body?.overTimeFlag,
                COLA_Flag: body?.colaFlag,
                Special_Allowance_Flag: body?.specialFlag,
                Union_Cola_Flag: body?.unionColaFlag,
                LFA_flag: body?.LFAFlag,
                LFA_Default_flag: body?.LFADefaultFlag,
                Fixed_Transaction_Increment_Flag: body?.fixedTransactionIncrementFlag,
                Advance_Flag: body?.advanceFlag,
                Tax_Treatment_Type:body?.taxTreatmentFlag,
                Tax_Exempt_Percentage:body?.textExemptPercentage,
                Section_149_Column_no: body?.SectionColumnNumber,
                Fix_Sheet_Col_no: body?.FixSheetColumn,
                One_Sheet_Col_no: body?.oneSheetColumn,
                JV_Code: body?.jvCode,
                JV_Summary_Code:body?.jvSummaryCode,
                Income_Tax_Col: body?.incomeTaxColumn,
                Projection_Flag: body?.ProjectionFlag,
                Cash_Salary_Flag: body?.cashSalaryFlag,
                Sort_key: body?.sortKey,
                Income_Tax_Income_Column: body?.incomeTaxIncomeColumn,
                Income_Tax_Exemption_Column:body?.incomeTaxExamptionColumn,
                Perquisite_Flag: body?.perquisiteFlag,
                Description:body?.description,
                Bonus_Flag: body?.bonusFlag,
                Show_On_Letter_Flag: body?.showOnLetterFlag,
                Gross_Salary_Flag: body?.grossSalaryflag
            })
        });
        const res = await response.json()
        return res
    }
    catch (error) {
        console.log(error)
    }
}

