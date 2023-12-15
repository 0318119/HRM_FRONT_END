import baseUrl from '../../../../config.json'


export const PostDueRetirementPayload = (data) => async () => {
    console.log(data, 'data')
    const response = await fetch(`${baseUrl.baseUrl}/reports/RetirementDueReport`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "from_date": data?.from_date,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };