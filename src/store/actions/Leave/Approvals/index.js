import {
    GET_EMP_APPROVALS_DATA_START,
    GET_EMP_APPROVALS_DATA_END,
    // =================================================================
    GET_EMP_APPROVALS_ALL_DATA,
    GET_EMP_APPROVALS_REJECT_LEAVE,
    GET_EMP_APPROVALS_STEP_BACK_LEAVE,
    GET_EMP_APPROVALS_APPROVED_LEAVE,
} from '../../../actions/types'
import baseUrl from '../../../../config.json'

export const GET_ALL_EMP_APPROVAL_DATA = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/leaves/GetEssApproval`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_EMP_APPROVALS_ALL_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_EMP_APPROVALS_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_EMP_APPROVALS_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}