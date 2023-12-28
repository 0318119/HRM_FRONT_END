import React, { useState, useEffect } from 'react'
import './assets/css/LeaveReportBalance.css'
import Header from '../components/Includes/Header'
import { RiFileExcel2Fill } from 'react-icons/ri'
import secureLocalStorage from 'react-secure-storage';
import { Link, json, useLocation, useNavigate } from 'react-router-dom';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
const config = require('../config.json')

const Leave_Report_Balance = () => {

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


  const [leaveYear, SetLeaveYear] = useState('')
  const [leaveCat, setLeaveCat] = useState('')
  const [leaveType, setLeaveType] = useState('')
  const [Emp_Code, setEmp_Code] = useState('')
  const [Emp_name, setEmp_Name] = useState('')
  const [dataLoader, setDataLoader] = useState(false);
  const [Leave_Report, setLeave_Report] = useState([])



  const LeaveBalanceReport = async (e) => {
    e.preventDefault();

    await fetch(`${config['baseUrl']}/reportBalance/GetLeaveReportBalance`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "YearNo": leaveYear,
        "Leave_category_code": leaveCat,
        "Leave_type_code": leaveType,
        "Emp_Code": isVal
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/reportBalance/GetLeaveReportBalance`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "YearNo": leaveYear,
            "Leave_category_code": leaveCat,
            "Leave_type_code": leaveType,
            "Emp_Code": isVal
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          localStorage.setItem("refresh", response.referesh_token);
          localStorage.setItem("access_token", response.access_token);

          setLeave_Report(response.data[0])
          showAlert(response.success[0], "success")
          DownloadExcel(response.data[0])
        }).catch((errs) => {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(errs.messsage, "warning")
        })
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        if (response.success) {
          setLeave_Report(response.data[0])
          console.log(response.data[0], 'hhhhhh')
          showAlert("File Downloaded Successfully", "success")
          DownloadExcel(response.data[0])

        }
      }
    }).catch((errs) => {
      setLoading(false);
      setBtnEnaledAndDisabled(false);
      showAlert(errs.messsage, "warning")
    })
  }

  const [EmployeesName, setEmployeesName] = useState([])
  const [SearchEmployeesName, setSearchEmployeesName] = useState([])

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
          setEmployeesName(response?.data)
          setSearchEmployeesName(response?.data)
          setSearchData(response.data)
          console.log(response.data, "re")
          setDataLoader(true);

          // console.log("first" , response.data)

        }).catch((errs) => {
        })
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        setEmployeesName(response?.data)
        setSearchEmployeesName(response?.data)
        setSearchData(response.data)
        console.log(response.data, "re")

        setDataLoader(true);



        // console.log("first", response.data)
      }
    }).catch((errs) => {
    })
  }

  const [getLeaveCat, setGetLeaveCat] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);



  async function GetLeaveCat() {
    await fetch(
      `${config["baseUrl"]}/employment_leave_category/GetEmploymentLeaveCategoryWOP`,
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
            `${config["baseUrl"]}/employment_leave_category/GetEmploymentLeaveCategoryWOP`,
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
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setGetLeaveCat(response.data[0]);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetLeaveCat(response.data);
          console.log(response.data, "leavecat")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  const [getLeaveType, setGetLeaveType] = useState([]);

  async function GetLeaveType() {
    await fetch(
      `${config["baseUrl"]}/employment_leave_type/GetLeaveTypeWOP`,
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
            `${config["baseUrl"]}/employment_leave_type/GetLeaveTypeWOP`,
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
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setGetLeaveType(response.data);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetLeaveType(response.data);
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


  const [isSearchData, setSearchData] = useState([])
  const [isVal, setVal] = useState("")


  const SearchFunctionality = (e) => {
    if (e.target.value == ' ') {
      setSearchEmployeesName(isSearchData)
    } else {
      setLoading(true)
      setDataLoader(false)
      setTimeout(() => {
        const SearchResult = isSearchData.filter(item =>
          item.Emp_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          `${item.Emp_code}`.includes(e.target.value)

        )
        setSearchEmployeesName(SearchResult)
        setLoading(false)
        setDataLoader(true)
      });
    }
    setVal(e.target.value)
  }






  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  const fileExtension = '.xlsx';

  const DownloadExcel = async (hjh) => {
    const ws = XLSX.utils.json_to_sheet(hjh);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "data" + fileExtension);
  }


  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid mt-5 p-2">
        <div className="container-fluid mt-1 LeaveReportBalance_listContainer">
          <div className="row w-100 mx-0">
            <span className="LeaveReportBalance_listHeader">
              Leave Report Balance
            </span>
          </div>
          <div className="row px-3 mt-2 p-2">
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="">Year</label>
                <select name="" id="" className='form-select' onChange={(e) => SetLeaveYear(e.target.value)} >
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="">Leave Catergory</label>
                <select name="" id="" className='form-select' onChange={(e) => setLeaveCat(e.target.value)} >
                  {getLeaveCat?.map((item) => {
                    return (
                      <option value={item.Leave_Category_code}>{item.Leave_Category_name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="">Leave Type</label>
                <select name="" id="" className='form-select' onChange={(e) => setLeaveType(e.target.value)} >
                  {getLeaveType?.map((item) => {
                    return (
                      <option value={item.Leave_type_code}>{item.Leave_name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row px-3 mt-2 p-2">
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="">Employee Code</label>
                <input type="text" name="" id="" className='form-control' value={isVal} onChange={SearchFunctionality} />
                {/* <select name="" id="" className='form-select'>
                                  <option value="">1</option>
                                  <option value="">2</option>
                              </select> */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group ">
                <label htmlFor="">Employee Name</label>
                {dataLoader &&
                  (<select name="" id="" className='form-control' onChange={(e) => setVal(e.target.value)}>
                    {SearchEmployeesName?.map((item) => {
                      return (

                        <option value={item.Emp_code} >{item.Emp_name}</option>


                      )
                    })}

                  </select>)}
              </div>
            </div>

          </div>
          <div className="row px-3 mt-2 p-2">
            <div className="col-1">
              <button className='excelbtn' onClick={LeaveBalanceReport} ><RiFileExcel2Fill /> Excel</button>
            </div>
          </div>
        </div>
      </div>
      {
        <ul className="px-3" style={{ position: "fixed", bottom: "0", right: "0", widows: "50%" }}>
          {formErr && (
            <li className={`alert alert-${formErr.type}` + " " + "mt-4"}>{`${formErr.message}`}</li>
          )}
        </ul>
      }
    </>
  )
}

export default Leave_Report_Balance