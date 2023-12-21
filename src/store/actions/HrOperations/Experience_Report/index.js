import baseUrl from '../../../../config.json'


export const PostExperiencePayload = (data) => async () => {
    console.log(data, 'data')
    const response = await fetch(`${baseUrl.baseUrl}'/reports/ExperienceReport`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Emp_code": data?.Emp_code,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };