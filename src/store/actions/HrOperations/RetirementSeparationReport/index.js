import baseUrl from '../../../../config.json'

export const PostRetirementSeparationReportPayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/reports/RetirementSeparationReport`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
    },
      
      body: JSON.stringify({
        "From_Date": data?.From_Date,
        "To_Date": data?.To_Date,
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };
