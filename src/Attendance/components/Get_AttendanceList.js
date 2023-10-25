import { useState, useEffect } from 'react'
import '../Assets/css/get_Attendance.css'
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { Print } from '@mui/icons-material';
const config = require('../../config.json')


function Get_Attendancelist() {

  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var Emp_code = localStorage.getItem("Emp_code");

  

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const [formErr, setformErr] = useState(false)
  const [AttendanceMon, SetAttendanceMon] = useState("")
  const [AttendanceYear, SetAttendanceYear] = useState("")
  const [AttendanceID, setAttendanceID] = useState(null)
  const showAlert = (message, type) => {
    setformErr({
      message: message,
      type: type,
    })
  }

  const [attendanceSheet, setAttendanceSheet] = useState([])
  const [getYear, setYear] = useState(new Date().getFullYear())
  const [getMonth, setMonth] = useState(new Date().getMonth())
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();
  let name = month[d.getMonth()];


  const AttendanceData = JSON.stringify({
    "Employee_Id": AttendanceID !== null ? AttendanceID : "-1",
    "Month": AttendanceMon ? AttendanceMon : name == "January" ? "1" : name == "February" ? "2" : name == "March" ? "3" : name == "April" ? "4" : name == "May" ? "5" : name == "June" ? "6" : name == "July" ? "7" : name == "August" ? "8" : name == "September" ? "9" : name == "October" ? "10" : name == "November" ? "11" : name == "December" ? "12" : false ,
    "Year": AttendanceYear ? AttendanceYear : getYear,
})

console.log(AttendanceData,"dddddd")


  const [isOnLoadShow, setOnLoadShow] = useState(false)
  const [isDBtn, setDBtn] = useState(false)


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
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/attendance/GetAttendanceSummary`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: AttendanceData
        }).then(response => {
          return response.json()
        }).then(response => {
          localStorage.setItem("refresh",  response.referesh_token);
          localStorage.setItem("access_token", response.access_token);
          setAttendanceSheet(response?.data?.[0])
          setLoading(false);
          setBtnEnaledAndDisabled(false);

          setTimeout(() => {
            showAlert(response.messsage, "success")
            setOnLoadShow(true)
            setDBtn(true)
          }, 2000);

        }).catch((errs) => {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(errs.messsage, "warning")
        })
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        setAttendanceSheet(response?.data?.[0])
        console.log(response.data[0], "response")
        setLoading(false);
        setBtnEnaledAndDisabled(false);

        setTimeout(() => {
          showAlert(response.messsage, "success")
          setOnLoadShow(true)
          setDBtn(true)
        }, 2000);
      }
    }).catch((errs) => {
      setLoading(false);
      setBtnEnaledAndDisabled(false);
      showAlert(errs.messsage, "warning")
    })
}

  const [getAttendanceName, setGetAttendanceName] = useState([])

  const getAttendance = async (e) => {
    await fetch(`${config['baseUrl']}/allemployees/GetEmployeesName`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/allemployees/GetEmployeesName`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          localStorage.setItem("refresh", response.referesh_token);
          localStorage.setItem("access_token", response.access_token);
          setGetAttendanceName(response?.data)
        }).catch((errs) => {})
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        setGetAttendanceName(response?.data)
      }
    }).catch((errs) => {})
  }



 useEffect(()=>{
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



  return (
    <>
      <div className="container-fluid p-2 mt-5" id='Body1'>
        <div className="container-fluid mt-2  Attendance_Container">
          <div className='row w-100 mx-0'>
            <span className="Attendance_Header">Attendance</span>
          </div>
          {formErr && (
            <li className={`alert alert-${formErr.type}` + " " + "mt-1 px-0"}>
              {formErr.message == "Fetched" ? "now, you can download Attendance Sheet" : formErr.message}
            </li>
          )}
          <div className="row px-3 mt-2 py-2">
            <form action="" onSubmit={Attendance} className='d-flex align-items-center ResiveForm'>
              <div className="form-group w-100 ">
                <label htmlFor="">Employee Id</label>
                <select name="" id="" onChange={(e) => setAttendanceID(e.target.value)} className='form-select AttendanceSeleect'>
                  <option selected={true} value="" >All Employees</option>
                  {getAttendanceName.map((items)=>{
                    return(
                      <option value={items?.Emp_code}>{items?.Emp_code + " " + items.Emp_name}</option>
                    )
                  })}
                  
                </select>
                {/* <input type="text" name="" id="" className='form-control' onChange={(e) => setAttendanceID(e.target.value)} /> */}
              </div>
              <div className="form-group w-100 ">
                <label htmlFor="">Month</label>
                <select name="" id="" className='form-select AttendanceSeleect' onChange={(e) => SetAttendanceMon(e.target.value)}>
                  <option selected>
                    {name}
                    {/* { 
                      getMonth == 1 ? "January" :
                      getMonth == 2 ? "Febuary":
                      getMonth == 3 ? "March" :
                      getMonth == 4 ? "April" :
                      getMonth == 5 ? "May" :
                      getMonth == 6 ? "June" :
                      getMonth == 7 ? "July" :
                      getMonth == 8 ? "August" :
                      getMonth == 9 ? "September" :
                      getMonth == 10 ? "October" :
                      getMonth == 11 ? "November" :
                      getMonth == 12 ? "December" : ""
                    } */}
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
              <div className="form-group w-100 ">
                <label htmlFor="">year</label>
                <select name="" id="" className='form-select AttendanceSeleect' onChange={(e) => 
                  SetAttendanceYear(e.target.value)
                }>
                  <option selected={2023 == getYear ? true : false}>{getYear}</option>
                  <option value="2022">2022</option>
                  {/* <option value="2023">2023</option> */}
                </select>
              </div>
              <div>
                <button
                  type='submit'
                  disabled={btnEnaledAndDisabled}
                  className="btn btn-light mt-4">{loading ? "A moment please..." : "Submit"}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
      
      <span className='d-flex justify-content-end px-4' id='button'>
        <button id="Print" disabled={isDBtn ? false : true}>Download</button>
      </span>
      {isOnLoadShow && (
        <>
          <div className="containner mt-5 p-5" id="content">
            <div className="row">
              <div className="col-lg-12 px-2">
                <h4 className='HeaderAttendance'>Attendance Sheet</h4>
                <div className='w-100'>
                  <span>
                    {/* <p>Employeen code : {attendanceSheet[0]?.Emp_Code}</p> */}
                    {/* <p>Name :{attendanceSheet[0]?.Emp_name} </p> */}
                  </span>
                  <span>
                    {/* <p>Section : {attendanceSheet[0]?.Section_name}</p> */}
                    {/* <p>Description :</p> */}
                  </span>
                </div>
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
                          <th>{items?.Attendance_Date ? items?.Attendance_Date.slice(0,10) : "Empty"}</th>
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


