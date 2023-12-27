import baseUrl from '../../../../config.json'


export const PostAppointmentPayload = (data) => async () => {
  // console.log(data, 'data')
  const response = await fetch(`${baseUrl.baseUrl}/reports/New_Appointment_Report`, {
    method: "POST",
    headers: {
      accessToken: "Bareer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "FromDate": data?.FromDate,
      "ToDate": data?.ToDate,
    }),
  });
  const res = await response.json();
  if (res?.success) {
    return res;
  } else {
    return res;
  }
};