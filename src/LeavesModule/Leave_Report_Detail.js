import React,{useEffect, useState} from 'react'
import './assets/css/LeaveReport.css'
import Header from '../components/Includes/Header'
import {RiFileExcel2Fill} from 'react-icons/ri'
import secureLocalStorage from 'react-secure-storage';
import { Link, json, useLocation, useNavigate } from 'react-router-dom';
const config = require('../config.json')

const Leave_Report_Detail = () => {
  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const [formErr, setformErr] = useState(false)

  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const navigate = useNavigate()

  const showAlert = (message, type) => {
    setformErr({
      message: message,
      type: type,
    })
  }


  const [fromDate, SetFromDate] = useState('')
  const [toDate, SetToDate] = useState('')  
  const [leaveCat, setLeaveCat] = useState('')
  const [leaveType, setLeaveType] = useState('')
  const [Emp_Code, setEmp_Code] = useState('')
  const [Emp_name, setEmp_Name] = useState('')

const LeaveDetail = JSON.stringify({

  "fromDate": fromDate,
  "toDate": toDate,
  "leaveCatCode": leaveCat,
  "leaveTypeCode": leaveType,
  "Emp_Code": Emp_Code
})

console.log("first", LeaveDetail)


  const LeaveReport = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/GetLeaveReportdata/GetLeaveReport`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: LeaveDetail
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/GetLeaveReportdata/GetLeaveReport`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: LeaveDetail
        }).then(response => {
          return response.json()
        }).then(response => {
          localStorage.setItem("refresh",  response.referesh_token);
          secureLocalStorage.setItem("access_token", response.access_token);
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response.messsage, "success")
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }).catch((errs) => {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(errs.messsage, "warning")
        })
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(response.messsage, "success")
        setTimeout(() => {
          window.location.reload();
        }, 1000)

      }
    }).catch((errs) => {
      setLoading(false);
      setBtnEnaledAndDisabled(false);
      showAlert(errs.messsage, "warning")
    })
  } 

const [EmployeesName , setGetAttendanceName] = useState([])

  const GetEmployeesName = async (e) => {
    // e.preventDefault();
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
          setGetAttendanceName(response?.data)
          // console.log("first" , response.data)

        }).catch((errs) => {
        })
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        setGetAttendanceName(response?.data)
        // console.log("first", response.data)
      }
    }).catch((errs) => {
    })
  }

  const [getLeaveCat, setGetLeaveCat] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);



  async function GetLeaveCat() {
    await fetch(
      `${config["baseUrl"]}/employment_leave_category/GetEmploymentLeaveCategory`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/employment_leave_category/GetEmploymentLeaveCategory`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh",  response.referesh_token);
                secureLocalStorage.setItem("access_token",response.access_token);
                setGetLeaveCat(response.data);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetLeaveCat(response.data[0]);
          // console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  const [getLeaveType, setGetLeaveType] = useState([]);

  async function GetLeaveType() {
    await fetch(
      `${config["baseUrl"]}/employment_leave_type/GetLeaveType`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/employment_leave_type/GetLeaveType`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh",  response.referesh_token);
                secureLocalStorage.setItem("access_token", response.access_token);
                setGetLeaveType(response.data);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetLeaveType(response.data[0]);
          console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }

  useEffect(() => {
    GetEmployeesName();
    GetLeaveCat();
    GetLeaveType()
  }, [])

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid mt-5 p-2">
        <div className="container-fluid mt-1 LeaveReport_listContainer">
          <div className="row w-100 mx-0">
            <span className="LeaveReport_listHeader">
              Leave Report
            </span>
          </div>
          <form action="" onClick={LeaveReport}>
          <div className="row px-3 mt-2 p-2">
            <div className="col-lg-3">
              <div className="form-group">
                <label htmlFor="">From Date</label>
                  <input type="Date" name="" id="" className='form-control' onChange={(e) => SetFromDate(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label htmlFor="">To Date</label>
                  <input type="Date" name="" id="" className='form-control' onChange={(e) => SetToDate(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label htmlFor="">Leave Catergory</label>
                  <select name="" id="" className='form-select' onChange={(e) => setLeaveCat(e.target.value) } >
                    {getLeaveCat?.map((item) => {
                      return(                    
                        <option value={item.Leave_Category_name}>{item.Leave_Category_name}</option>
                      )
                    })}
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label htmlFor="">Leave Type</label>
                <select name="" id="" className='form-select' onChange={(e) => setLeaveType(e.target.value)}>
                    {getLeaveType?.map((item) => {
                      return (
                        <option value={item.Leave_name}>{item.Leave_name}</option>
                      )
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="row px-3 mt-2 p-2 ">
            <div className="col-lg-3">
              <div className="form-group">
                <label htmlFor="">Employee Code</label>
                <select name="" id="" className='form-select' onChange={(e) => setEmp_Code(e.target.value)}>
                    {EmployeesName?.map((item) => {
                      return (
                        <option value={item.Emp_code}>{item.Emp_code}</option>
                      )
                    })}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="">Employee Name</label>
                <input type="text" name="" id="" className='form-control' />
                <button className='searchemployeebtn'>Search</button>
                  {/* <select name="" id="" className='form-select' onChange={(e) => setEmp_Name(e.target.value)}>
                  {EmployeesName?.map((item) => {
                    return (
                      <option value={item.Emp_name}>{item.Emp_name}</option>
                    )
                  })}
                    
                </select> */}
              </div>
            </div>
          
          </div>
          <div className="row px-3 mt-2 p-2">
             <div className="col-1">
              <button className='excelbtn' type='submit'><RiFileExcel2Fill /> Excel</button>
             </div>
          </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Leave_Report_Detail