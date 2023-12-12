
const RefreshToken = () => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWOP`, {
        method: "GET",
        headers: {
            'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
    });
    if(response.status === 200) {
        const res = await response.json()
    }else{
        const res = await response.json()
    }
}

export default RefreshToken;