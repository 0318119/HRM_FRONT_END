import React, { useEffect, useState } from "react";
import "./assets/css/TAExprienceForm.css";
import Header from '../components/Includes/Header'
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DeleteModal from "../components/Modals/Delete_Modals/DeleteModal";
const config = require("../config.json");


function TAExprienceForm() {
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_company_code = localStorage.getItem("company_code");
  const [getEmpTypeCode, setgetEmpTypeCode] = useState([]);
  const [getEmptypeErr, setgetEmptypeErr] = useState(false);
  const navigate = useNavigate();
  const search = useLocation().search;
  var userId = new URLSearchParams(search).get("userId");

  const [getInfo, setInfo] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);

  async function getInfoCall() {
    await fetch(
      `${config["baseUrl"]}/appointments/GetAppointmentsBySeqNo/${userId}`,
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
            `${config["baseUrl"]}/appointments/GetAppointmentsBySeqNo/${userId}`,
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
                localStorage.setItem(
                  "access_token",
                  response.access_token
                );
                setInfo(response.data[0][0]);
              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setInfo(response.data[0][0]);
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  const [AllEmployer, setAllEmployer] = useState([])
  const [AllEmployerErr, setAllEmployerErr] = useState(false)

  async function getEmployerData() {
    await fetch(`${config["baseUrl"]}/allemployer/GetAllEmployerWOP`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/allemployer/GetAllEmployerWOP`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem(
                  "access_token",
                  response.access_token
                );
                setAllEmployer(response.data[0]);
              }
            })
            .catch((error) => {
              setAllEmployerErr(error.message);
            });
        } else {
          setAllEmployer(response.data);
        }
      })
      .catch((error) => {
        setAllEmployerErr(error.message);
      });
  }

  const [EmployerNameCode, setEmployerNameCode] = useState(null)
  const [isDesignation, setDesignation] = useState("")
  const [isDepartment, setDepartment] = useState("")
  const [start_Date, setstart_Date] = useState("")
  const [end_Date, setend_Date] = useState("")
  const [IndustryFlag, setIndustryFlag] = useState("")
  const [formErr, setformErr] = useState(false)
  const showAlert = (message, type) => {
    setformErr({
      message: message,
      type: type,
    })
  }


  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const createExperHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employement_experience/CreateTranExperience`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Sequence_no": userId,
        "EmployerCode": EmployerNameCode,
        "designation": isDesignation,
        "department": isDepartment,
        "Start_Date": start_Date,
        "End_Date": end_Date,
        "SubmitFlag": IndustryFlag
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/employement_experience/CreateTranExperience`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "Sequence_no": userId,
            "EmployerCode": EmployerNameCode,
            "designation": isDesignation,
            "department": isDepartment,
            "Start_Date": start_Date,
            "End_Date": end_Date,
            "SubmitFlag": IndustryFlag
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          }
        }).catch((errs) => { })
      }
      else {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(response.messsage, "success")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    }).catch((errs) => {
      showAlert(errs.messsage, "warning")
    })
  }
  const [GetTranExperienceData, setGetTranExperienceData] = useState([])
  const [GetTranExperienceErr, setGetTranExperienceErr] = useState(false)
  async function GetTranExperience() {
    await fetch(`${config['baseUrl']}/employement_experience/GetTranExperienceByEmpCode/${userId}`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/employement_experience/GetTranExperienceByEmpCode/${userId}`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setGetTranExperienceData(response.data[0])
          }
        }).catch((error) => {
          setGetTranExperienceErr(error.message)
        })
      }
      else {
        setGetTranExperienceData(response.data[0])
      }
    }).catch((error) => {
      setGetTranExperienceErr(error.message)
    })
  }
  const [showDeleteModal, setshowDeleteModal] = useState(false)
  const [deleteID, setdeleteID] = useState("")
  const DeleteExperAlert = async (e) => {
    setshowDeleteModal(!showDeleteModal)
    setdeleteID(e.currentTarget.getAttribute('data-row'))
  }

  const deleteSaveExper = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employement_experience/deleteTranExperience`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "id": deleteID,
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/employement_experience/deleteTranExperience`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "id": deleteID,
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          }
        }).catch((errs) => { })
      }
      else {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(response.messsage, "success")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    }).catch((errs) => {
      showAlert(errs.messsage, "warning")
    })

  }

  const [getUpdateId, setgetUpdateId] = useState(null)
  const setValue = (e) => {
    setgetUpdateId(e.currentTarget.getAttribute('data-id'))
    setEmployerNameCode(GetTranExperienceData.filter(data => data.ID == e.currentTarget.getAttribute('data-id'))[0].Employer_Code)
    setDesignation(GetTranExperienceData.filter(data => data.ID == e.currentTarget.getAttribute('data-id'))[0].Designation)
    setDepartment(GetTranExperienceData.filter(data => data.ID == e.currentTarget.getAttribute('data-id'))[0].Department)
    setstart_Date(GetTranExperienceData.filter(data => data.ID == e.currentTarget.getAttribute('data-id'))[0].StartDate)
    setend_Date(GetTranExperienceData.filter(data => data.ID == e.currentTarget.getAttribute('data-id'))[0].EndDate)
    setIndustryFlag(GetTranExperienceData.filter(data => data.ID == e.currentTarget.getAttribute('data-id'))[0].Submit_Flag)
  }

  useEffect(() => {
    getInfoCall()
    getEmployerData()
    GetTranExperience()
  }, [])

  const updateExperHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/employement_experience/UpdateTranExperience`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "id": getUpdateId,
        "EmployerCode": EmployerNameCode,
        "designation": isDesignation,
        "department": isDepartment,
        "Start_Date": start_Date,
        "End_Date": end_Date,
        "SubmitFlag": IndustryFlag
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/employement_experience/UpdateTranExperience`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "id": getUpdateId,
            "EmployerCode": EmployerNameCode,
            "designation": isDesignation,
            "department": isDepartment,
            "Start_Date": start_Date,
            "End_Date": end_Date,
            "SubmitFlag": IndustryFlag
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(response.messsage, "success")
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          }
        }).catch((errs) => { showAlert(errs.messsage, "warning") })
      }
      else {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        showAlert(response.messsage, "success")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    }).catch((errs) => {
      showAlert(errs.messsage, "warning")
    })
  }


  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid p-2">
        <span className="Ta_Exprince_FormHeader">
        </span>
      </div>
      <div className="container-fluid mt-5 p-0  TaExprienceformContainer">
        <div className="row w-100 mx-0">
          <span className="Ta_Exprience_FormHeading py-2">
            Transaction - Appointment(Exprience)
            <Link to="/Appointment" className="backLink">Back to  Appointment List</Link>
          </span>
        </div>
        <form onSubmit={getUpdateId !== null ? updateExperHandler : createExperHandler} className="p-2">
          <div className="row p-2">
            <span className="Ta_Exprience_Form">Employee Exprience</span>
            <ul className='p-0'>
              {formErr && (
                <li className={`alert alert-${formErr.type}` + " " + "mt-1"}>{`${formErr.message}`}</li>
              )}
              {GetTranExperienceErr && (
                <li className={`alert alert-warning` + " " + "mt-1"}>{`${GetTranExperienceErr}`}</li>
              )}
            </ul>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group d-flex flex-column Ta_Exprience_Formgroup">
                  <label htmlFor="">Employee Name</label>
                  <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Emp_name ? getInfo?.Emp_name : "Not Found"} />
                  <label htmlFor="">Employer Name</label>
                  <h6 style={{ fontSize: "12px", color: "red" }}>{AllEmployerErr ? AllEmployerErr : false}</h6>
                  <select name="" id="" className="form-select" required={EmployerNameCode == null ? true : false} onChange={(e) => { setEmployerNameCode(e.target.value) }}>
                    <option selected value="">{EmployerNameCode == "" || EmployerNameCode == null || EmployerNameCode == undefined ? "Select Employer Name" : AllEmployer.length > 0 ? AllEmployer.filter(data => data.Employer_Code == EmployerNameCode)[0].Employer_Name : "Select Employer Name"}</option>
                    {AllEmployer?.map((items) => {
                      return (
                        items.Employer_Code == EmployerNameCode ? ""
                          : <option value={items.Employer_Code}>{items.Employer_Name}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group d-flex flex-column Ta_Exprience_Formgroup">
                  <label htmlFor="">Designation</label>
                  <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Desig_name ? getInfo?.Desig_name : "Not Found"} />
                  <label htmlFor="">Designation</label>
                  <input type="text" className="form-control" required value={isDesignation} onChange={(e) => { setDesignation(e.target.value) }} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group d-flex flex-column Ta_Exprience_Formgroup">
                  <label htmlFor="">Deparment</label>
                  <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Dept_name ? getInfo?.Dept_name : "Not Found"} />
                  <label htmlFor="">Deparment</label>
                  <input type="text" className="form-control" required value={isDepartment} onChange={(e) => { setDepartment(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4 col-md-4">
                <div className="form-group d-flex flex-column Ta_Exprience_Formgroup">
                  <label htmlFor="">Start Date</label>
                  <input type="Date" className="form-control" required value={start_Date} onChange={(e) => { setstart_Date(e.target.value) }} />
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="form-group d-flex flex-column Ta_Exprience_Formgroup">
                  <label htmlFor="">End Date</label>
                  <input type="Date" className="form-control" required value={end_Date} onChange={(e) => { setend_Date(e.target.value) }} />
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="form-group d-flex flex-column Ta_Exprience_Formgroup">
                  <label htmlFor="">Industry Flag</label>
                  <div className="form-control d-flex align-items-center  Ta_Exprience_FormgroupControl">
                    <input type="radio" className="form-check-input" required name="setIndustryFlag" id="yes" value="y" checked={IndustryFlag == "y" ? true : false} onChange={(e) => { setIndustryFlag(e.target.checked == true ? e.target.value : "null") }} /> &nbsp;
                    <label htmlFor="yes" className="yes">Yes</label>
                    &nbsp; <input type="radio" id="no" className="form-check-input" name="setIndustryFlag" value="n" checked={IndustryFlag == "n" ? true : false} onChange={(e) => { setIndustryFlag(e.target.checked == true ? e.target.value : "null") }} /> &nbsp;
                    <label htmlFor="no" className="yes">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2 ">
                <button
                  type="submit"

                  disabled={btnEnaledAndDisabled}
                  className="btn btn-dark"
                >
                  {loading ? "A moment please..." : getUpdateId !== null ? "Update" : "Save"}
                </button>
                <button className="btn btn-dark mx-2">reset</button>
              </div>

              <div className="col-lg-12">
                {GetTranExperienceData.length > 0 ?
                  <div className="col-lg-12">
                    <h5 className='tableDataHead'>Employee Exprience Information</h5>
                    <div className="">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Employer Name</th>
                              <th scope="col">Designation</th>
                              <th scope="col">Deparment</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">End Date</th>
                              <th scope="col">Industry Flag</th>
                              <th scope="col">Actions</th>

                            </tr>
                          </thead>
                          <tbody>
                            {GetTranExperienceData.map((items) => {
                              return (
                                <tr>
                                  <>
                                    {
                                      AllEmployer.filter(data => data.Employer_Code == items.Employer_Code).map(ii => (
                                        <td>{ii.Employer_Name}</td>
                                      ))
                                    }
                                  </>
                                  <>
                                    <td>{items.Designation}</td>
                                  </>
                                  <>
                                    <td>{items.Department}</td>
                                  </>
                                  <>
                                    <td>{items.StartDate}</td>
                                  </>
                                  <>
                                    <td>{items.EndDate}</td>
                                  </>
                                  <>
                                    <td>{items.Submit_Flag == "y" ? "Yes" : "No"}</td>
                                  </>
                                  <td className='tabletdRow'>
                                    <span className="editBtnTable" onClick={setValue} data-id={items.ID}>Edit</span>
                                    <span className="deleteBtnTable" onClick={DeleteExperAlert} data-row={items.ID}>Delete</span>
                                  </td>
                                </tr>

                              )
                            })}

                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div> : ""
                }
              </div>
            </div>
          </div>
        </form>
      </div>
      {showDeleteModal && (
        <>
          <DeleteModal
            {...{

              setshowDeleteModal, deleteSaveExper,
              loading, setLoading, btnEnaledAndDisabled,
              setBtnEnaledAndDisabled, formErr
            }}
            warningMsg="Opps!"
            descriptionOne="Are you sure!!!" descriptionTwo="You want to delete this Exprience"
          />
        </>
      )}
    </>
  );
}

export default TAExprienceForm;
