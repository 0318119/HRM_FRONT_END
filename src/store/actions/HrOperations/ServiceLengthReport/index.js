import baseUrl from '../../../../config.json'

export const PostServiceLenghthPayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/reports/ServiceLengthReport`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
    },
      
      body: JSON.stringify({
        "Servicefrom": data?.Servicefrom,
        "Serviceto": data?.Serviceto,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };
