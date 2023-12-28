import React, { useEffect, useState } from 'react'
import './assets/css/TASalaryForm.css'
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import Header from '../components/Includes/Header'
import secureLocalStorage from 'react-secure-storage';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const config = require('../config.json')



function TASalaryForm() {
  const [getInfo, setInfo] = useState([])
  const [getInfoErr, setInfoErr] = useState(false)
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const search = useLocation().search
  const navigate = useNavigate()
  var userId = new URLSearchParams(search).get('userId')
  const [formErr, setformErr] = useState(false)


  const showAlert = (message, type) => {
    setformErr({
      message: message,
      type: type,
    })
  }
  async function getInfoCall() {
    await fetch(`${config['baseUrl']}/appointments/GetAppointmentsBySeqNo/${userId}`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/appointments/GetAppointmentsBySeqNo/${userId}`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setInfo(response.data[0][0])
          }
        }).catch((error) => {
          setInfoErr(error.message)
        })
      }
      else {
        setInfo(response.data[0][0])
      }
    }).catch((error) => {
      setInfoErr(error.message)
    })
  }


  const [AllowanceData, setAllowanceData] = useState([])
  const [AllowanceErr, setAllowanceErr] = useState(false)
  const [postAllownces, setpostAllownces] = useState([])

  async function AllowanceCall() {
    await fetch(`${config['baseUrl']}/allownces/GetAllAllownces`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/allownces/GetAllAllownces`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setAllowanceData(response.data[0])
            var temp = []
            if (response.data[0].length > 0) {
              for (var i of response.data[0]) {
                var obj = {
                  "code": i.allowance_code,
                  "amount": 0
                }
                temp.push(obj)
                setpostAllownces([...temp])
              }
            }
          }
        }).catch((error) => {
          setAllowanceErr(error.message)
        })
      }
      else {
        setAllowanceData(response.data[0])
        var temp = []
        if (response.data[0].length > 0) {
          for (var i of response.data[0]){
            var obj = {
              "code": i.allowance_code,
              "amount": 0
            }
            temp.push(obj)
            setpostAllownces([...temp])
          }
        }
      }
    }).catch((error) => {
      setAllowanceErr(error.message)
    })
  }

  const CreateAllowance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employee_salary/InsertEmployeeSalary`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Sequence_no": userId,
        "FirstTimeFlag": GetEmployeeSalary.length > 0 ? "Y" : "N",
        "allownces": postAllownces
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/employee_salary/InsertEmployeeSalary`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "Sequence_no": userId,
            "FirstTimeFlag": GetEmployeeSalary.length > 0 ? "Y" : "N",
            "allownces": postAllownces
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            if (response.success == "success") {
              setLoading(false);
              setBtnEnaledAndDisabled(false);
              showAlert(response.success, "success")
              setTimeout(() => {
                window.location.reload();
              }, 1000)
            } else {
              setLoading(false);
              setBtnEnaledAndDisabled(false);
              showAlert(response?.messsage, "warning")
            }
          }
        }).catch((errs) => {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(errs.messsage, "warning")
        })
      }
      else {
        if (response.success == "success") {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response.success, "success")
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        } else {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response?.messsage, "warning")
        }
      }
    }).catch((errs) => {
      setLoading(false);
      setBtnEnaledAndDisabled(false);
      showAlert(errs.messsage, "warning")
    })
  }

  const [GetEmployeeSalary, setGetEmployeeSalary] = useState([])
  const [GetEmployeeSalaryErr, setGetEmployeeSalaryErr] = useState(false)
  const [loader, setloader] = useState(false)
  async function GetEmployeeSalaryCall() {
    setloader(true)
    await fetch(`${config['baseUrl']}/employee_salary/GetEmployeeSalaryBySeqNo/${userId}`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/employee_salary/GetEmployeeSalaryBySeqNo/${userId}`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setGetEmployeeSalary(response.data[0])
            if (response && response.data && response.data.length > 0 && response.data[0] && response.data[0].length > 0) {
              var temp = 0
              var temparray = []
              for (var i of response.data[0]) {
                temp = temp + parseInt(i?.Amount)
                temparray.push({ "code": i?.Allowance_code, "amount": i?.Amount })
              }
              setpostAllownces(temparray)
              settotal(temp)
            }
            setloader(false)
          }
        }).catch((error) => {
          setGetEmployeeSalaryErr(error.message)
        })
      }
      else {
        setGetEmployeeSalary(response.data[0])
        if (response && response.data && response.data.length > 0 && response.data[0] && response.data[0].length > 0) {
          var temp = 0
          var temparray = []
          for (var i of response.data[0]) {
            temp = temp + parseInt(i?.Amount)
            temparray.push({ "code": i?.Allowance_code, "amount": i?.Amount })
          }
          setpostAllownces(temparray)
          settotal(temp)
        }
        setloader(false)
      }
    }).catch((error) => {
      setGetEmployeeSalaryErr(error.message)
      setloader(false)
    })
  }


  useEffect(() => {
    getInfoCall()
    AllowanceCall()
    GetEmployeeSalaryCall()
  }, [])
  const [total, settotal] = useState(0)
  const [loads, setloads] = useState([])
  useEffect(() => {
    var temp = 0
    for (var i of postAllownces) {
      temp = temp + parseInt(i.amount)
      settotal(temp)
    }
  }, [loads])

  const EditData = (e) => { }
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid  TaSalaryFormContainer">
        <div className="row w-100 mx-0">
          <span className="TaSalaryFormHead py-2">
            Transaction - Appointment
            <Link to="/Appointment" className="backLink">Back to  Appointment List</Link>
          </span>
        </div>
        <ul className='p-0 mx-2'>
          {formErr && (
            <li className={`alert alert-${formErr.type}` + " " + "mt-1"}>{`${formErr.message}`}</li>
          )}
        </ul>
        <form onSubmit={CreateAllowance} className="p-2">
          <div className="row">
            <div className="col-md-12">
              <span className="TaSalaryFromHeading">Employee Salary</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-4 col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Employee Name</label>
                <input type="text" name="" id="" className='form-control' readOnly value={getInfo?.Emp_name ? getInfo.Emp_name : "Not Found"} />
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Designation</label>
                <input type="text" name="" readOnly id="" className='form-control' value={getInfo?.Desig_name ? getInfo.Desig_name : "Not Found"} />
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Department</label>
                <input type="text" name="" id="" className='form-control' readOnly value={getInfo?.Dept_name ? getInfo.Dept_name : "Not Found"} />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <span className="TaSalaryFromHeading">Salary Break Up</span>
            </div>
          </div>
          <div className="row mt-2 p-2">
            <div className='SalResponse'>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Allowance Code</th>
                    <th scope="col">Allowance</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {
                    loader == false ?
                      postAllownces.length > 2 ?
                        AllowanceData?.map((items, ind) => {
                          return (
                            <tr>
                              <td className="col-md-4 col-sm-4 TaSalaryFormChildHeaderData">
                                {items.allowance_code}
                              </td>
                              <td className="col-md-4  col-sm-4 TaSalaryFormChildHeaderData ">
                                {items.Allowance_name}
                              </td>
                              <td className="col-md-4 col-sm-4 TaSalaryFormChildHeaderData ">
                                {/* defaultValue={GetEmployeeSalary.filter(data=>data.Allowance_code==items.allowance_code)[0].Amount} */}
                                <input defaultValue={GetEmployeeSalary.filter(data => data.Allowance_code == items.allowance_code)[0]?.Amount} type="number" className='form-control' required onChange={(e) => {
                                  postAllownces[ind].amount = e.target.value
                                  setpostAllownces([...postAllownces])
                                  setloads([...postAllownces])
                                }} name="" id="" />
                              </td>
                            </tr>
                          )
                        }) : "not found" : "not foundd"}
                  <tr>
                    <td className="col-md-4 col-sm-4 TaSalaryFormChildHeaderData">
                      4
                    </td>
                    <td className="col-md-4  col-sm-4 TaSalaryFormChildHeaderData ">
                      Total Salary
                    </td>
                    {
                      total !== "" && total !== null && total !== undefined ?
                        <td className="col-md-4 col-sm-4 TaSalaryFormChildHeaderData ">
                          <input type="text" className='form-control' readOnly value={total} name="" id="" />
                        </td> : ""
                    }
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row mt-2">
              <div className="col-md-12 col-sm-12 p-2">
                <div className="salarybtncontainer">
                  <button type="submit" className='btn btn-dark' disabled={btnEnaledAndDisabled}>
                    {loading ? "A moment please..." : GetEmployeeSalary.length > 0 ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>


            {/* {GetEmployeeSalary.length > 0 ?
                <div className="col-lg-12">
                  <h5 className='tableDataHead'>Salary Information</h5>
                  <div className="">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Allowance Code</th>

                            <th scope="col">Allowance Amount</th>
                            <th scope="col">Allowance Name</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {GetEmployeeSalary.map((items) => {
                            return(
                              <tr>
                                <>
                                  {
                                    AllowanceData.filter(data=>data.allowance_code==items.Allowance_code).map(ii=>(
                                        <td>{ii.Amount}</td>
                                    ))
                                  }
                                </>
                                <>
                                  <td>{items.Amount}</td>
                                </>
                                <>
                                  {
                                    AllowanceData.filter(data=>data.allowance_code==items.Allowance_code).map(ii=>(
                                        <td>{ii.Allowance_name}</td>
                                    ))
                                  }
                                </>
                                <td className='tabletdRow'>
                                  <span className="editBtnTable">Edit</span>
                                  <span className="deleteBtnTable">Delete</span>
                                </td>
                              </tr>
                            
                            )
                          })}
                           
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                </div>: ""
            } */}

          </div>
        </form>
      </div>
    </>
  );
}

export default TASalaryForm