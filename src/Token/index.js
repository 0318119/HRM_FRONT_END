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
        if (response.status === 200) {
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
                if(response.status === 200) {
                    const res = await response.json();
<<<<<<< HEAD
                    localStorage.setItem("refresh", res?.refresh_token)
                    localStorage.setItem("access_token", res?.access_token)
                    return res
                }
                else{
                    window.location.href = '/'
                    localStorage.clear()
                }
            }
        }
=======
                    localStorage.setItem("refresh",res?.refresh_token)
                    localStorage.setItem("access_token",res?.access_token)
                    return res
                }
                else{window.location.href = '/'}
            }
        }

>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    } catch (error) {
        console.log(error);
    }
}