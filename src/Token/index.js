import baseUrl from "../config.json";

export const getToken = async () => {
    try {
        const response = await fetch(
            `${baseUrl.baseUrl}/auth/Authorization`,{
                method: "GET",
                headers: {
                    accessToken: "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                },
            }
        );

        const res = await response.json();
        if (response.status === 200) {
            console.log("Token is valid:", res);
            // provide the access token and refresh token
            // A store tokens in local storage for api callings purposes
            return res;
        }
        else if (res?.message === "unauthorized" || res?.message === "timeout error") {
            console.log("Token is unauthorized. Attempting to refresh...");
            const refreshResponse = await fetch(
                `${baseUrl.baseUrl}/auth/Authorization`, {
                method: "GET",
                headers: {
                    accessToken: "Bearer " + localStorage.getItem("refresh"),
                    "Content-Type": "application/json",
                },
            });
            if(refreshResponse?.ok){
                const res = refreshResponse.json();
                return res;
            }
        }
    } catch (error) {
        console.error("Error while checking token:", error.message);
    }
};
