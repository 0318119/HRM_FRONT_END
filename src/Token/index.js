import baseUrl from "../config.json";

export const getToken = async () => {
    try {
        const response = await fetch(
            `${baseUrl.baseUrl}/auth/Authorization`,
            {
                method: "GET",
                headers: {
                    accessToken: "Bareer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await response.json();
        if (response.status == 200) {
            return res
        } else {
            if (res?.messsage == "timeout error" || res?.messsage == "unauthorized") {
                const response = await fetch(
                `${baseUrl.baseUrl}/auth/Authorization`,{
                    method: "GET",
                    headers: {
                        refereshtoken: "Bareer " + localStorage.getItem("refresh"),
                        "Content-Type": "application/json",
                    }}
                );
                if(response.status == 200) {
                    const res = await response.json();
                    localStorage.setItem("refresh", res?.refresh_token)
                    localStorage.setItem("access_token", res?.access_token)
                    console.log("res",res)
                    return res
                }
                else{
                    if (window.location.pathname !== '/') {
                        window.location.href = '/';
                        localStorage.clear()
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}