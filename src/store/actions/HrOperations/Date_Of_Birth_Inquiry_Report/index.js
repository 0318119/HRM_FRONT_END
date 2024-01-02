import baseUrl from '../../../../config.json'


export const PostDOBPayload = (data) => async () => {
    console.log(data, 'data'); // Log the 'data' parameter received
  
    const response = await fetch(`${baseUrl.baseUrl}/reports/ReprtByEmpDOB`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"), 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Emp_DOB": data,
      }),
    });
  
    const res = await response.json();
    // console.log(res , 'res')
    if (res?.success) {
      return res;
    } else {
      return res;
    }
  };