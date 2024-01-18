import {
    GET_PROMOTION_DATA_START,
    GET_PROMOTION_DATA,
    GET_PROMOTION_INFO_DATA,
    GET_PROMOTION_CATEGORY_DATA,
    GET_PROMOTION_COSTCENTER_DATA,
    GET_PROMOTION_DESIGNATION_DATA,
    GET_PROMOTION_SUPERVISOR_DATA,
    GET_PROMOTION_GRADE_DATA,
    GET_PROMOTION_WAITING_DATA,
    GET_PROMOTION_BYID_DATA,
    GET_PROMOTION_DATA_END
} from "../../../types"
import baseUrl from '../../../../../config.json'



export const AllEmployeeData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
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
                type: GET_PROMOTION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


export const GetInfoById = (isCode) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/promotions/Pomotions_MasterEmployees_List_By_Code`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Emp_code": isCode
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_INFO_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}


export const Get_Category = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_category/GetEmploymentCategoryWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_CATEGORY_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Grade = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/grade_code/GetGradeCodeWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_GRADE_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}




export const Get_Designation = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_desig/GetEmploymentDesignationWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DESIGNATION_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_SuperVisor = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/tranConfirmation/GetEmployeeTranConfirmationListWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_SUPERVISOR_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


export const Get_CostCenter = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/employment_cost_center/GetEmploymentCostCenterWithoutPagination`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_COSTCENTER_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


export const WaitingPromotion = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/promotions/GetTranPromotionListWaiting`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_WAITING_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA_END,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}


export const SavePromotion = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/promotions/PomotionsTranPromotionsSave`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Emp_code": data?.Emp_code,
            "Date_of_promotion": data?.Date_of_promotion,
            "Transaction_Date": data?.Transaction_Date,
            "Position_Code_to": data?.Position_Code_to,
            "Desig_code_to": data?.Desig_code_to,
            "Grade_code_to": data?.Grade_code_to,
            "Supr_code_to": data?.Supr_code_to,
            "Cost_Centre_Code_To": data?.Cost_Centre_Code_To
        }),
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};



export const ProcessPromotion = (data) => async () => {
    console.log(data, 'data')
    const response = await fetch(`${baseUrl.baseUrl}/promotions/PomotionsTranPromotionsSave`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Emp_code": data?.Emp_code,
            "Date_of_promotion": data?.Date_of_promotion,
            "Transaction_Date": data?.Transaction_Date,
            "Position_Code_to": data?.Position_Code_to,
            "Desig_code_to": data?.Desig_code_to,
            "Grade_code_to": data?.Grade_code_to,
            "Supr_code_to": data?.Supr_code_to,
            "Cost_Centre_Code_To": data?.Cost_Centre_Code_To
        }),
        
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};




export const Get_ProcesById = (isCode) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROMOTION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/promotions/PomotionstranPromotionsListBycode`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Emp_code": isCode
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_BYID_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const res = await response.json()
            dispatch({
                type: GET_PROMOTION_DATA,
                payload: [{ res }],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PROMOTION_DATA,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}






export const DeletePromotion = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/promotions/PomotionsTranPromotionsDelete`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Emp_code": data?.Emp_code,
        }),

    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};