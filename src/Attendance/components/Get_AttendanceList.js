import { useState, useEffect } from 'react'
import '../Assets/css/get_Attendance.css'
import { useNavigate } from 'react-router-dom';
import { Print } from '@mui/icons-material';
import { message } from 'antd';
const config = require('../../config.json')


function Get_Attendancelist() {
  var get_access_token = localStorage.getItem("access_token");
  var Emp_code = localStorage.getItem("Emp_code");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const [formErr, setformErr] = useState(false)
  const [AttendanceMon, SetAttendanceMon] = useState("")
  const [AttendanceYear, SetAttendanceYear] = useState("")
  const [AttendanceID, setAttendanceID] = useState(null)
  const [messageApi, contextHolder] = message.useMessage();
  const [AllEmpCodeErr, setAllEmpCodeErr] = message.useMessage();
  const [isLoadingAlert, setLoadingAlert] = message.useMessage();
  const [attendanceSheet, setAttendanceSheet] = useState([])
  const [getYear, setYear] = useState(new Date().getFullYear())
  const [getMonth, setMonth] = useState(new Date().getMonth())
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [isOnLoadShow, setOnLoadShow] = useState(false)
  const [isDBtn, setDBtn] = useState(false)
  const d = new Date();
  let name = month[d.getMonth()];
  const [getAttendanceName, setGetAttendanceName] = useState([])
  const AttendanceData = JSON.stringify({
    "Employee_Id": AttendanceID !== null ? AttendanceID : "-1",
    "Month": AttendanceMon ? AttendanceMon : name == "January" ? "1" : name == "February" ? "2" : name == "March" ? "3" : name == "April" ? "4" : name == "May" ? "5" : name == "June" ? "6" : name == "July" ? "7" : name == "August" ? "8" : name == "September" ? "9" : name == "October" ? "10" : name == "November" ? "11" : name == "December" ? "12" : false,
    "Year": AttendanceYear ? AttendanceYear : getYear,
  })




  const Attendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/attendance/GetAttendanceSummary`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: AttendanceData
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response?.success) {
        setAttendanceSheet(response?.data?.[0])
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        messageApi.open({
          type: 'success',
          content: "Now,You can Download PDF",
        });
        setTimeout(() => {
          messageApi.destroy()
          setOnLoadShow(true)
          setDBtn(true)
        }, 2000);
      } else {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        messageApi.open({
          type: 'error',
          content: response?.message || response?.messsage,
        });
        setTimeout(() => {
          messageApi.destroy()
        }, 2000);
      }
    }).catch((errs) => {
      setLoading(false);
      setBtnEnaledAndDisabled(false);
      messageApi.open({
        type: 'error',
        content: errs?.message || errs?.messsage,
      });
      setTimeout(() => {
        messageApi.destroy()
      }, 2000);
    })
  }

  const getAttendance = async (e) => {
    await fetch(`${config['baseUrl']}/allemployees/GetEmployeesName`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response?.success == "success") {
        setGetAttendanceName(response?.data)
      } else {
        AllEmpCodeErr.open({
          type: 'success',
          content: response?.message || response?.messsage,
        });
        setTimeout(() => {
          AllEmpCodeErr.destroy()
        }, 2000);
      }
    }).catch((errs) => {
      AllEmpCodeErr.open({
        type: 'error',
        content: errs?.message || errs?.messsage,
      });
      setTimeout(() => {
        AllEmpCodeErr.destroy()
      }, 2000);
    })
  }
  useEffect(() => {
    getAttendance();
  }, [])
  useEffect(() => {
    const btnprint = document.getElementById('Print');
    const gotoPrint = () => {
      window.print()
    }
    btnprint.addEventListener('click', gotoPrint, false)
    return () => {
      btnprint.removeEventListener('click', gotoPrint, false)
    }
  }, [])
  
  useEffect(() => {
    if (loading == true) {
      isLoadingAlert.open({
        type: 'loading',
        content: 'Please Wait..',
        duration: 0,
      });
    }
    else {
      isLoadingAlert.destroy()
    }
  }, [loading])



  return (
    <>
      {setLoadingAlert}{contextHolder}
      <div className="container p-2 mt-5" id='Body1'>
          <div className="row px-3 mt-2 py-2 justify-content-center">
            <div className="col-lg-8">
              <div className='AttendanceBox p-5'>
                <h6><b>Attendance</b></h6>
                <form action="" className='mt-3' onSubmit={Attendance}>
                  <div className="w-100">
                    <label htmlFor="">Employee Id</label>
                    <select name="" id="" onChange={(e) => setAttendanceID(e.target.value)} className='w-100 form-select'>
                      <option selected={true} value="" >All Employees</option>
                      {getAttendanceName.map((items) => {
                        return (
                          <option value={items?.Emp_code}>{items?.Emp_code + " " + items.Emp_name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="w-100 mt-3">
                    <label htmlFor="">Month</label>
                    <select name="" id="" className='form-select w-100' onChange={(e) => SetAttendanceMon(e.target.value)}>
                      <option selected>
                        {name}
                      </option>
                      <option value="1">January</option>
                      <option value="2">Febuary</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="w-100 mt-3">
                    <label htmlFor="">year</label>
                    <select name="" id="" className='form-select w-100' onChange={(e) =>
                      SetAttendanceYear(e.target.value)
                    }>
                      <option selected={2023 == getYear ? true : false}>{getYear}</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                  <div>
                    <button
                      type='submit'
                      disabled={btnEnaledAndDisabled}
                      className="submitBtn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-end">
            <button id="Print" className={isDBtn == false? "d-none" : "d-block"} disabled={isDBtn ? false : true}>Download</button>
          </div>
        </div>
      </div>
      {isOnLoadShow && (
        <>
          <div className="container" id="content">
            <div className="row">
              <div className="col-lg-12 px-2">
                <h4 className='HeaderAttendance'>Attendance Sheet</h4>
                <table className='table table-striped border' >
                  <thead >
                    <tr>
                      <td>Employee Code</td>
                      <td>Employee Name</td>
                      <td>Day</td>
                      <td>Date</td>
                      <td>Time In</td>
                      <td>Time Out</td>
                      <td>Shift Durration</td>
                      {/* <td>Remarks</td> */}
                    </tr>
                  </thead>
                  <tbody >
                    {attendanceSheet.map((items) => {
                      return (
                        <tr>
                          <th>{items?.Emp_code ? items?.Emp_code : "Empty"}</th>
                          <th>{items?.Emp_name ? items?.Emp_name : "Empty"}</th>
                          <th>{items?.Day_Name ? items?.Day_Name : "Empty"}</th>
                          <th>{items?.Attendance_Date ? items?.Attendance_Date.slice(0, 10) : "Empty"}</th>
                          <th>{items?.Emp_Time_In_HH ? items?.Emp_Time_In_HH : "--"} : {items?.Emp_Time_In_MM ? items?.Emp_Time_In_MM : "--"}</th>
                          <th>{items?.Emp_Time_Out_HH ? items?.Emp_Time_Out_HH : "--"} : {items?.Emp_Time_Out_MM ? items?.Emp_Time_Out_MM : "--"}</th>
                          <th>{items?.Shift_Duration ? items?.Shift_Duration : ""}</th>
                          {/* <th>{items?.Remarks}</th> */}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  )
}

export default Get_Attendancelist;


