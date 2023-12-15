import baseURL from '../../../../config.json'

export const GetSalaryOnHold = (body) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${baseURL.baseUrl}/reports/SalaryOnHoldReport`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        return res.data
    }
    catch (error) {
        console.log(error)
    }

}