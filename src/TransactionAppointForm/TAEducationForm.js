import React, { useEffect, useState } from 'react'
import './assets/css/TAEducationForm.css'
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import Header from '../components/Includes/Header'
import secureLocalStorage from 'react-secure-storage';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/Modals/Delete_Modals/DeleteModal';
const config = require('../config.json')



function TAEducationForm() {
  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_company_code = localStorage.getItem("company_code");
  var get_Emp_code = localStorage.getItem("Emp_code");
  const search = useLocation().search
  const navigate = useNavigate()
  var userId = new URLSearchParams(search).get('userId')
    // const [loading, setLoading] = useState(true);
  // const [dataLoader, setDataLoader] = useState(false);


  const [getinstitute, setgetinstitute] = useState([])
  const [getinstituteErr, setgetinstituteErr] = useState(false)
  const [getinstituteVal, setgetinstituteVal] = useState("")
  const [topFlag, settopFlag] = useState(null);
  const [eduYear, seteduYear] = useState("")
  const [EduCodeData, setEduCodeData] = useState([])
  const [EduCodeDataErr, setEduCodeDataErr] = useState(false)
  const [EduCodeDataVal, setEduCodeDataVal] = useState("")
  const [getInfo, setInfo] = useState([])
  const [getInfoErr, setInfoErr] = useState(false)
  const [formErr, setformErr] = useState(false)
  const [getGradeData, setgetGradeData] = useState([])
  const [getGradeDataErr, setgetGradeDataErr] = useState(false)
  const [eduGrade, seteduGrade] = useState("")


  const showAlert = (message, type) => {
    setformErr({
      message: message,
      type: type,
    })
  }
  async function getinstituteCall() {
    await fetch(`${config['baseUrl']}/institutions/GetInstitutions`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/institutions/GetInstitutions`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setgetinstitute(response.data[0])
          }
        }).catch((error) => {
          setgetinstituteErr(error.message)
        })
      }
      else {
        setgetinstitute(response.data[0])

      }
    }).catch((error) => {
      setgetinstituteErr(error.message)
    })
  }
  async function getGradeDataCall() {
    await fetch(`${config['baseUrl']}/grade_code/GetGradeCode`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/grade_code/GetGradeCode`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setgetGradeData(response.data[0])
          }
        }).catch((error) => {
          setgetGradeDataErr(error.message)
        })
      }
      else {
        setgetGradeData(response.data[0])
      }
    }).catch((error) => {
      setgetGradeDataErr(error.message)
    })
  }
  async function EduCodeDataCall() {
    await fetch(`${config['baseUrl']}/education_code/GetEducationCode`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/education_code/GetEducationCode`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setEduCodeData(response.data[0])
          }
        }).catch((error) => {
          setEduCodeDataErr(error.message)
        })
      }
      else {
        setEduCodeData(response.data[0])
      }
    }).catch((error) => {
      setEduCodeDataErr(error.message)
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
            localStorage.setItem("refresh",  response.referesh_token);
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
  const [GetTranEducation, setGetTranEducation] = useState([])
  const [GetTranEducationErr, setGetTranEducationErr] = useState(false)
  async function GetTranEducationCall() {
    await fetch(`${config['baseUrl']}/eduation_code/GetTranEducationByEmpCode/${userId}`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/eduation_code/GetTranEducationByEmpCode/${userId}`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setGetTranEducation(response.data[0])
          }
        }).catch((error) => {
          setGetTranEducationErr(error.message)
        })
      }
      else {
        setGetTranEducation(response.data[0])

      }
    }).catch((error) => {
      setGetTranEducationErr(error.message)
    })
  }
  const createEduHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/education_code/InsertTranEducation`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Sequence_no": userId,
        "EduCode": EduCodeDataVal,
        "EduYear": eduYear,
        "EduGrade": eduGrade,
        "Topflag": topFlag,
        "institutecode": getinstituteVal
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/education_code/InsertTranEducation`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "Sequence_no": userId,
            "EduCode": EduCodeDataVal,
            "EduYear": eduYear,
            "EduGrade": eduGrade,
            "Topflag": topFlag,
            "institutecode": getinstituteVal
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
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

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/eduation_code/UpdateTranEducation`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "srNo": getUpdateId,
        "EduCode": EduCodeDataVal,
        "EduYear": eduYear,
        "EduGrade": eduGrade,
        "Topflag": topFlag,
        "institutecode": getinstituteVal
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/eduation_code/UpdateTranEducation`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "srNo": getUpdateId,
            "EduCode": EduCodeDataVal,
            "EduYear": eduYear,
            "EduGrade": eduGrade,
            "Topflag": topFlag,
            "institutecode": getinstituteVal
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            if (response.success == "success") {
              setLoading(false);
              setBtnEnaledAndDisabled(false);
              showAlert(response.messsage, "success")
              setTimeout(() => {
                window.location.reload();
              }, 1000)
            } else {
              setLoading(false);
              setBtnEnaledAndDisabled(false);
              showAlert(response.messsage, "warning")
            }
          }
        }).catch((errs) => { showAlert(errs.messsage, "warning") })
      }
      else {
        if (response.success ==  "success"){
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response.messsage, "success")
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }else{
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response.messsage, "warning")
        }
      }
    }).catch((errs) => {
      showAlert(errs.messsage, "warning")
    })
  }

  const [getUpdateId, setgetUpdateId] = useState(null)
  const setValue = async (e) => {
    setgetUpdateId(e.currentTarget.getAttribute('data-id'))
    setEduCodeDataVal(GetTranEducation.filter(data => data.Sr_No == e.currentTarget.getAttribute('data-id'))[0].Edu_Code)
    seteduGrade(GetTranEducation.filter(data => data.Sr_No == e.currentTarget.getAttribute('data-id'))[0].Edu_Grade)
    setgetinstituteVal(GetTranEducation.filter(data => data.Sr_No == e.currentTarget.getAttribute('data-id'))[0].institute_code)
    seteduYear(GetTranEducation.filter(data => data.Sr_No == e.currentTarget.getAttribute('data-id'))[0].Edu_Year)
    settopFlag(GetTranEducation.filter(data => data.Sr_No == e.currentTarget.getAttribute('data-id'))[0].Top_flag)
  }

  const [showDeleteModal, setshowDeleteModal] = useState(false)
  const [deleteID, setdeleteID] = useState("")
  const DeleteEduAlert = async (e) => {
    setshowDeleteModal(!showDeleteModal)
    setdeleteID(e.currentTarget.getAttribute('data-row'))
  }

  const deleteSaveEdu = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/eduation_code/deleteTranEducation`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Sr_No": deleteID,
      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/eduation_code/deleteTranEducation`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "Sr_No": deleteID,
          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh",  response.referesh_token);
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

  useEffect(() => {
    getinstituteCall()
    EduCodeDataCall()
    getInfoCall()
    getGradeDataCall()
    GetTranEducationCall()
  }, [])


  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container mt-5 p-2">
      </div>
      <div className="container-fluid mt-5 TaEduformContainer ">
        <div className="col-lg-12 p-2 TAEDHeading">
          <span className="TaEduFormHeading">
            Transaction - Appointment(education)
            <Link to="/Appointment" className="backLink">Back to  Appointment List</Link>
          </span>
        </div>
     
        <form onSubmit={getUpdateId == null ? createEduHandler : updateHandler} className="p-2">
          <div className="row p-2">
            <ul className='p-0'>
              {formErr && (
                <li className={`alert alert-${formErr.type}` + " " + "mt-1"}>{`${formErr.message}`}</li>
              )}
              {GetTranEducationErr && (
                <li className={`alert alert-warning` + " " + "mt-1"}>{`${GetTranEducationErr}`}</li>
              )}
            </ul>
            <span className="TaEduform">Employee Information</span>
            <div className="col-lg-4 col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Employee Name</label>
                <input type="text" name="" id="" className='form-control' readOnly value={getInfo?.Emp_name ? getInfo.Emp_name : "Not Found"}/>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Designation</label>
                <input type="text" name="" readOnly id="" className='form-control' value={getInfo?.Desig_name ? getInfo.Desig_name : "Not Found"}/>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Department</label>
                <input type="text" name="" className='form-control'  id="" readOnly value={getInfo?.Dept_name ? getInfo.Dept_name : "Not Found"}/>
              </div>
            </div>
            <span className="TaEduformHIstoy mt-1">Education History</span>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Education</label>
                <h6 className="m-0 p-0" style={{fontSize: "12px",color: "red"}}>{EduCodeDataErr? EduCodeDataErr : false}</h6>
                  <select name="" required={EduCodeDataVal==""?true:false} id="" className='form-select'  onChange={(e) => {setEduCodeDataVal(e.target.value)}}>
                    <option  value="">{EduCodeDataVal==""? "select Education" :EduCodeData.length>0?EduCodeData.filter(data=>data.Edu_code==EduCodeDataVal)[0].Edu_name:"select Education"}</option>
                     {EduCodeData?.map((items) => {
                          return(
                            items.Edu_code==EduCodeDataVal?""
                            :<option value={items.Edu_code}>{items.Edu_name}</option>
                          )
                      })}
                    </select>
                <label htmlFor="">Year</label>
                <input type="number" value={eduYear} required className='form-control' onChange={(e)=> {seteduYear(e.target.value)}}/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Institute</label>
                <h6 className="m-0 p-0" style={{fontSize: "12px",color: "red"}}>{getinstituteErr? getinstituteErr : false}</h6>
                <select name="" id="" required={getinstituteVal==""?true:false} className='form-select'  onChange={(e) => {setgetinstituteVal(e.target.value)}}>
                  <option  value="">{getinstituteVal==""?"select institute":getinstitute.length>0?getinstitute.filter(data=>data.Inst_code==getinstituteVal)[0].Inst_name:"select institute"}</option>
                  {getinstitute.map((items) => {
                    return (
                      items.Inst_code == getinstituteVal ? ""
                        : <option value={items.Inst_code}>{items.Inst_name}</option>
                    )
                  })}
                </select>
                <label htmlFor="">Grade</label>
                <h6 className="m-0 p-0" style={{fontSize: "12px",color: "red"}}>{getGradeDataErr? getGradeDataErr : false}</h6>
                <select name="" id="" required={eduGrade==""?true:false} className='form-select'  onChange={(e) => {seteduGrade(e.target.value)}}>
                  <option  value="">{eduGrade==""?"select Grade":getGradeData.length>0?getGradeData.filter(data=>data.Grade_code==eduGrade)[0].Grade_name:"select Grade"}</option>
                  {getGradeData.map((items) => {
                    return (
                      items.Grade_code == eduGrade ? ""
                        : <option value={items.Grade_code}>{items.Grade_name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column taEduformgroup">
                <label htmlFor="">Top flag</label>
                <div className="form-control d-flex align-items-center taEduformgroupControl">
                  <label htmlFor="Yes">Yes</label>
                  <input type="radio" id="Yes" name="select_flag" value="Y" checked={topFlag !== null ? topFlag == 'N' ? false : true : false} required onChange={(e) => { settopFlag(e.target.checked == true ? e.target.value : "null") }} />
                  <label htmlFor="No">No</label>
                  <input type="radio" id="No" name="select_flag" value="N" checked={topFlag !== null ? topFlag == 'N' ? true : false : false} onChange={(e) => { settopFlag(e.target.checked == true ? e.target.value : "null") }} />
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="col-md-4 col-sm-4 mt-2">
                <button
                  type="submit"
                  disabled={btnEnaledAndDisabled}
                  className="TaEduFormBtn btn btn-dark"
                >
                  {loading ? "A moment please..." : getUpdateId !== null ? "Update" : "Save"}
                </button>
              </div>
            </div>


            {GetTranEducation.length > 0 ?
              <div className="col-lg-12">
                <h5 className='tableDataHead'>Employee Information</h5>
                <div className="">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Education</th>
                          <th scope="col">Institute</th>
                          <th scope="col">Top Flag</th>
                          <th scope="col">Year</th>
                          <th scope="col">Grade</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {GetTranEducation.map((items) => {
                          return (
                            <tr>
                              {

                                EduCodeData.filter(data => data.Edu_code == items.Edu_Code).map((items) => {
                                  return (
                                    <td>{items.Edu_name}</td>
                                  )
                                })
                              }
                              {
                                getinstitute.filter(data => data.Inst_code == items.institute_code).map((items) => {
                                  return (
                                    <td>{items.Inst_name}</td>
                                  )
                                })
                              }
                              <td>
                                {items.Top_flag == "Y" ? "Yes" : "NO"}
                              </td>
                              <td>
                                {items.Edu_Year}
                              </td>
                              {
                                getGradeData.filter(data => data.Grade_code == items.Edu_Grade).map(ii => (
                                  <td>{ii.Grade_name}</td>
                                ))
                              }
                              <td className='tabletdRow'>
                                <span onClick={setValue} className="editBtnTable" data-id={items.Sr_No}>Edit</span>
                                <span onClick={DeleteEduAlert} className="deleteBtnTable" data-row={items.Sr_No}>Delete</span>
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
        </form>
      </div>

      {showDeleteModal && (
        <>
          <DeleteModal
            {...{
              setshowDeleteModal, deleteSaveEdu,
              loading, setLoading, btnEnaledAndDisabled,
              setBtnEnaledAndDisabled, formErr
            }}
            warningMsg="Opps!"
            descriptionOne="Are you sure!!!" descriptionTwo="You want to delete this Education"
          />
        </>
      )}
    </>
  );
}

export default TAEducationForm