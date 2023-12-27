import {
    GET_CHANGE_PROFILE_DATA,
    GET_CHANGE_PROFILE_DATA_START,
    GET_CHANGE_PROFILE_DATA_SINGLE,
    GET_CHANGE_PROFILE_DATA_END,
} from "../../types";
import baseUrl from "../../../../config.json";


export const GetChangePassword = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/allemployee/changePassword`, {
        method: "POST",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                "Old_Password" : body?.Old_Password,
                "New_Password" : body?.New_Password
            
        })
    });
    const res = await response.json();
    if (res?.success) {
        return res;
    } else {
        return res;
    }
}
