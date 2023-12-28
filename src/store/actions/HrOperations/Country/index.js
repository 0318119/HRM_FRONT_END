import {
    GET_TRANSITION_COUNTRY_START,
    GET_TRANSITION_COUNTRY_DATA,
    GET_TRANSITION_COUNTRY_DATA_SINGLE,
    GET_TRANSITION_COUNTRY_END
} from '../../types'
import baseUrl from '../../../../config.json'




export const GetDataCountry = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_COUNTRY_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/countries/GetCountries/${params.pageNo}/${params.pageSize}/${params.search}`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COUNTRY_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COUNTRY_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_COUNTRY_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const Get_Country_Data_By_Id = (body) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSITION_COUNTRY_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/countries/GetCountryById`, {
            method: "POST",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'Country_Code':body,
            })
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COUNTRY_DATA_SINGLE,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_TRANSITION_COUNTRY_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_TRANSITION_COUNTRY_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }

}