import {
    GET_PAY_SLIP_PDF_DATA,
    GET_PAY_SLIP_PDF_DATA_START,
    GET_PAY_SLIP_PDFDATA_SINGLE,
    GET_PAY_SLIP_PDF_DATA_END
} from '../../types'
import baseUrl from '../../../../config.json'

export const GetAllEmp = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PAY_SLIP_PDF_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            const res = await response.json()
            dispatch({
                type: GET_PAY_SLIP_PDF_DATA,
                payload: [{res}],
                loading: false,
            });
        }else{
            const res = await response.json()
            dispatch({
                type: GET_PAY_SLIP_PDF_DATA_END,
                payload: [{res}],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: GET_PAY_SLIP_PDF_DATA_END,
            payload: false,
            loading: false,
        });
        console.log(error)
    }
}

export const PostPaySlip = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/payslips/Pay_Report_PaySlip`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "payroll_category": localStorage.getItem('Payroll_Category'),
        "payslip_year": data?.payslip_year,
        "payslip_month": data?.payslip_month,
        "Emp_code": data?.Emp_code
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };

  export const GETEmpPasswordCall = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/allemployeer/GetEmployeeNicNumber`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Emp_code": data
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };