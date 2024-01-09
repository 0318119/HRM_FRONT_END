import {
    GET_LEAVE_BALANCE_UPLOAD_DATA_START,
    GET_LEAVE_BALANCE_UPLOAD_DATA_END,
    // =================================================================
    GET_LEAVE_BALANCE_UPLOAD_YEAR_DATA
} from '../../../actions/types'
import baseUrl from '../../../../config.json'

export const GET_YEAR = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_LEAVE_BALANCE_UPLOAD_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/GetYears`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status == 200) {
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_BALANCE_UPLOAD_YEAR_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_LEAVE_BALANCE_UPLOAD_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_LEAVE_BALANCE_UPLOAD_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}
export const GET_FILE = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/uploadExcel/ExportLeaveReportExcelData`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: body
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
}

