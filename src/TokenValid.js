import React from 'react'
import { useEffect } from 'react';
import baseUrl from '../src/config.json'

function TokenValid() {
    var get_access_token = localStorage.getItem("access_token");

    async function POST_GRADES_FORM() {
        try {
            await fetch(
                `${baseUrl.baseUrl}/auth/Authorization`, {
                method: "GET",
                headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            }
            ).then((response) => {
                return response.json();
            }).then(async (response) => {
                console.log("object", response)
                if (response?.message == "Unauthorized" || response?.messsage == "Unauthorized") {
                    window.location.href = "/";
                } else if (response?.message == "timeout error" || response?.messsage == "timeout error") { }
            }).catch((error) => { });
        } catch (error) {
            console.log("Token error", error)
        }
    }

    useEffect(() => {
        POST_GRADES_FORM()
    }, [])

}
export default TokenValid

