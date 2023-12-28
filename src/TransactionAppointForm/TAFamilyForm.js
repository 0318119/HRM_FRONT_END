import React, { useEffect, useState } from "react";
import "./assets/css/TAFamilyForm.css";
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import Header from "../components/Includes/Header";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { configure } from "@testing-library/react";
import DeleteModal from "../components/Modals/Delete_Modals/DeleteModal";
const config = require("../config.json");

function TAFamilyForm() {

  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_company_code = localStorage.getItem("company_code");
  const navigate = useNavigate();
  const search = useLocation().search;
  var userId = new URLSearchParams(search).get("userId");

  const [getInfo, setInfo] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false)

  async function getInfoCall() {
    await fetch(`${config["baseUrl"]}/appointments/GetAppointmentsBySeqNo/${userId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
      }
    ).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.masssege == "unauthorized") {
        await fetch(`${config["baseUrl"]}/appointments/GetAppointmentsBySeqNo/${userId}`,
          {
            method: "GET",
            headers: {
              "content-type": "appplication/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },

          }
        ).then((response) => {
          return response.json();
        }).then((response) => {
          if (response.masssege == "timeout error") {
            navigate("/");
          } else {
            sessionStorage.setItem("refresh", response.referesh_token);
            sessionStorage.setItem("access_token", response.access_token)
            setInfo(response.data[0][0])
          }
        }).catch((error) => {
          setInfoErr(error.massege)
        });
      } else {
        setInfo(response.data[0][0]);
      }
    }).catch((error) => {
      setInfoErr(error.massege)
    })
  }

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const [btnEnaledAndDisabled2, setBtnEnaledAndDisabled2] = useState(false);
  const [MarriageErr, setMarriageErr] = useState(false);
  const [FamilyErr, setFamilyErr] = useState(false);

  const showAlert = (message, type) => {
    setMarriageErr({
      message: message,
      type: type,
    });
  };
  const showAlert2 = (message, type) => {
    setFamilyErr({
      message: message,
      type: type,
    });
  };



  const [marriageDate, setMarriageDate] = useState("")
  const [spouseName, setSpouseName] = useState("")
  const [spouseDob, setSpousedob] = useState('')

  const createMarriage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config["baseUrl"]}/marriages/InsertTranMarriages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Sequenceno": userId,
        "MarriageDate": marriageDate,
        "Spausename": spouseName,
        "SpauseDOB": spouseDob,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/marriages/InsertTranMarriages`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
            body: JSON.stringify({
              "Sequenceno": userId,
              "MarriageDate": marriageDate,
              "Spausename": spouseName,
              "SpauseDOB": spouseDob,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            })
            .catch((errs) => {
              showAlert(errs.messsage, "warning");
            });
        } else {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response.messsage, "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((errs) => {
        showAlert(errs.messsage, "warning");
      });
  };

  const [GetTranMarriages,setGetTranMarriages] = useState([])
  const [GetTranMarriagesErr,setGetTranMarriagesErr] = useState(false)
  async function GetTranMarriagesCall() {
    await fetch(`${config['baseUrl']}/marriages/GetTranMarriagesBySeqNo/${userId}`, {
        method: "GET",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/marriages/GetTranMarriagesBySeqNo/${userId}`, {
                method: "GET",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
            }).then(response => {
                return response.json()
            }).then(response => {
                if (response.messsage == "timeout error") { navigate('/') }
                else {
                  localStorage.setItem("refresh",  response.referesh_token);
                  localStorage.setItem("access_token", response.access_token);
                  setGetTranMarriages(response.data[0])
                }
            }).catch((error) => {
              setGetTranMarriagesErr(error.message)
            })
        }
        else {
          setGetTranMarriages(response.data[0])
          setSpouseName(response.data[0][0]?.Spause_name)
          console.log("check that", response.data)
          setMarriageDate(response.data[0][0]?.Marriage_Date)
          setSpousedob(response.data[0][0]?.Spause_DOB)
          setSequenceno2(response.data[0][0]?.Sequence_no)
        }
    }).catch((error) => {
      setGetTranMarriagesErr(error.message)
    })
  }

  const [showDeleteModal2,setshowDeleteModal2] = useState(false)
  const [Sequenceno2,setSequenceno2] = useState("")
  const setDeleteMarriagesAlert = async (e) => {
    setshowDeleteModal2(!showDeleteModal2)
  }

  const deleteSaveMarriages = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/marriages/DeleteTranMarriages`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: JSON.stringify({
            "Sequenceno": Sequenceno2,
        })
    }).then((response) => {
        return response.json()
    }).then( async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/marriages/DeleteTranMarriages`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: JSON.stringify({
                  "Sequenceno": Sequenceno2,
                })
            }).then(response => {
                return response.json()
            }).then(response => {
                if (response.messsage == "timeout error") {navigate('/')}
                else {
                    localStorage.setItem("refresh",  response.referesh_token);
                    localStorage.setItem("access_token", response.access_token);
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAler3(response.messsage,"success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }
            }).catch((errs) => {showAler3(errs.messsage,"warning")})
        }
        else {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAler3(response.messsage,"success")
          setTimeout(() => {
              window.location.reload();
          }, 1000)
        }
    }).catch((errs) => {
      showAler3(errs.messsage,"warning")
    })

  }

  
  //  createFamily API's -=-=---=---=-=--=-=-=-=-=-=
  const [FamMemberName, setFamMemberName] = useState("")
  const [FamMemberType, setFamMemberType] = useState("")
  const [FamMemberDOB, setFamMemberDOB] = useState("")

  const createFamily = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setBtnEnaledAndDisabled2(true);
    await fetch(`${config["baseUrl"]}/families/CreateFamilies`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Sequenceno": userId,
        "FamMemberType": FamMemberType,
        "FamMemberName": FamMemberName,
        "FamMemberDOB": FamMemberDOB,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/families/CreateFamilies`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
            body: JSON.stringify({
              "Sequenceno": userId,
              "FamMemberType": FamMemberType,
              "FamMemberName": FamMemberName,
              "FamMemberDOB": FamMemberDOB,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading2(false);
                setBtnEnaledAndDisabled2(false);
                showAlert2(response.messsage, "success");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            })
            .catch((errs) => {
              showAlert2(errs.messsage, "warning");
            });
        } else {
          setLoading2(false);
          setBtnEnaledAndDisabled2(false);
          showAlert2(response.messsage, "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((errs) => {
        showAlert2(errs.messsage, "warning");
      });
  };

  const [GetTranFamilies,setGetTranFamilies] = useState([])
  const [GetTranFamiliesErr,setGetTranFamiliesErr] = useState(false)
  async function GetTranExperienceFamilies() {
    await fetch(`${config['baseUrl']}/families/GetTranFamiliesBySeqNo/${userId}`, {
        method: "GET",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
        return response.json()
    }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/families/GetTranFamiliesBySeqNo/${userId}`, {
                method: "GET",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
            }).then(response => {
                return response.json()
            }).then(response => {
                if (response.messsage == "timeout error") { navigate('/') }
                else {
                  localStorage.setItem("refresh",  response.referesh_token);
                  localStorage.setItem("access_token", response.access_token);
                  setGetTranFamilies(response.data[0])
                }
            }).catch((error) => {
              setGetTranFamiliesErr(error.message)
            })
        }
        else {
          setGetTranFamilies(response.data[0])
        }
    }).catch((error) => {
      setGetTranFamiliesErr(error.message)
    })
  }


  const [showDeleteModal,setshowDeleteModal] = useState(false)
  const [Sequenceno,setSequenceno] = useState(null)
  const [s_no,sets_no] = useState(null)
  const [formErr, setformErr] = useState(false)
  const showAler3 = (message, type) => {
    setformErr({
      message: message,
      type: type,
    })
  }
  const DeleteChildAlert = async (e) => {
    setshowDeleteModal(!showDeleteModal)
    setSequenceno(e.currentTarget.getAttribute('data-row-Sequence-no-d'))
    sets_no(e.currentTarget.getAttribute('data-row-s-no-d'))
  }

  const deleteSaveChild = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config['baseUrl']}/families/DeleteTranFamilies`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: JSON.stringify({
            "Sequenceno": Sequenceno,
            "Sno" : s_no
        })
    }).then((response) => {
        return response.json()
    }).then( async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/families/DeleteTranFamilies`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: JSON.stringify({
                  "Sequenceno": Sequenceno,
                  "Sno" : s_no
              })
            }).then(response => {
                return response.json()
            }).then(response => {
                if (response.messsage == "timeout error") {navigate('/')}
                else {
                    localStorage.setItem("refresh",  response.referesh_token);
                    localStorage.setItem("access_token", response.access_token);
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAler3(response.messsage,"success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }
            }).catch((errs) => {})
        }
        else {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAler3(response.messsage,"success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
        }
    }).catch((errs) => {
      showAler3(errs.messsage,"warning")
    })

  }


  const setValue = (e) => {
    setSequenceno(e.currentTarget.getAttribute('data-row-Sequence-no-u'))
    sets_no(e.currentTarget.getAttribute('data-row-s-no-u'))
    setFamMemberName(GetTranFamilies.filter(data=>data.Sequence_no==e.currentTarget.getAttribute('data-row-Sequence-no-u') && data.S_no==e.currentTarget.getAttribute('data-row-s-no-u'))[0].Fam_Member_Name)
    setFamMemberType(GetTranFamilies.filter(data=>data.Sequence_no==e.currentTarget.getAttribute('data-row-Sequence-no-u') && data.S_no==e.currentTarget.getAttribute('data-row-s-no-u'))[0].Fam_Member_Type)
    setFamMemberDOB(GetTranFamilies.filter(data=>data.Sequence_no==e.currentTarget.getAttribute('data-row-Sequence-no-u') && data.S_no==e.currentTarget.getAttribute('data-row-s-no-u'))[0].Fam_Member_DOB)
  }

  const updateFamilyHandler = async (e) =>{
    e.preventDefault();
    setLoading2(true);
    setBtnEnaledAndDisabled2(true);
    await fetch(`${config['baseUrl']}/families/UpdateTranFamilies`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: JSON.stringify({
          "Sno" : s_no,
          "Sequenceno": userId,
          "FamMemberType": FamMemberType,
          "FamMemberName": FamMemberName,
          "FamMemberDOB": FamMemberDOB,
        })
    }).then((response) => {
        return response.json()
    }).then( async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/families/UpdateTranFamilies`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: JSON.stringify({
                  "Sno" : s_no,
                  "Sequenceno": userId,
                  "FamMemberType": FamMemberType,
                  "FamMemberName": FamMemberName,
                  "FamMemberDOB": FamMemberDOB,
                })
            }).then(response => {
                return response.json()
            }).then(response => {
                if (response.messsage == "timeout error") {navigate('/')}
                else {
                    localStorage.setItem("refresh",  response.referesh_token);
                    localStorage.setItem("access_token", response.access_token);
                    setLoading2(false);
                    setBtnEnaledAndDisabled2(false);
                    showAlert2(response.messsage,"success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }
            }).catch((errs) => {showAlert2(errs.messsage,"warning")})
        }
        else {
                setLoading2(false);
                setBtnEnaledAndDisabled2(false);
                showAlert2(response.messsage,"success")
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
        }
    }).catch((errs) => {
      showAlert2(errs.messsage,"warning")
    })
  }


  useEffect(() => {
    getInfoCall()
    GetTranExperienceFamilies()
    GetTranMarriagesCall()
  }, [])


  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid TaFamilyFormContainer">
        <div className="row w-100 mx-0">
        <span className="TaFamilyFormHead py-2">
           Transaction - Appointment
            <Link to="/Appointment" className="backLink">Back to  Appointment List</Link>
        </span>
        </div>
        <ul className="p-0 mx-2 mt-2">
          {MarriageErr && (
            <li className={`alert alert-${MarriageErr.type}` + " " + "mt-1"}>{`${MarriageErr.message}`}</li>
          )}
           {GetTranMarriagesErr && (
            <li className={`alert alert-warning` + " " + "mt-1"}>{`${GetTranMarriagesErr}`}</li>
          )}
        </ul>
        {/* GetTranMarriages.length > 0 ? */}
        <form onSubmit={createMarriage} className="p-2">
          <div className="row">
            <div className="col-md-12">
              <span className="TaFamilyFromHeading">Employee Information</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Employee Name</label>
                <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Emp_name ? getInfo?.Emp_name : "Not Found"} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Designation</label>
                <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Desig_name ? getInfo?.Desig_name : "Not Found"} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Department</label>
                <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Dept_name ? getInfo?.Dept_name : "Not Found"} />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <span className="TaFamilyFromHeading">Marriage Information</span>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Spouse Name</label>
                <input type="text" required className="form-control" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Spouse D.O.B</label>
                <input type="Date" required className="form-control" value={spouseDob} onChange={(e) => setSpousedob(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Marriage Date</label>
                <input type="Date" required className="form-control" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
              </div>
            </div>
            <div className="col-md-12 col-sm-12 p-2 mt-2">
              <div className="Familybtncontainer d-flex">
                {GetTranMarriages.length > 0 ?
                  null :  <>
                    <button
                      disabled={btnEnaledAndDisabled}
                      type="submit"
                      className="btn btn-dark"
                    >{loading ? "A Moment Please" : "Save"}</button>
                  </>
              }
                &nbsp;
                {GetTranMarriages.length > 0 ? 
                  <span className="btn btn-dark" onClick={setDeleteMarriagesAlert}> <b>Delete</b> </span> : false
                }
              </div>
            </div>
          </div>
        </form>

        <form  className="p-2" onSubmit={ Sequenceno!==null && s_no!==null ? updateFamilyHandler : createFamily }>
          <div className="row mt-2">
            <div className="col-md-12">
              <span className="TaFamilyFromHeading">Children History</span>
              <ul className="p-0 mx-2 mt-2">
                {FamilyErr && (
                  <li className={`alert alert-${FamilyErr.type}` + " " + "mt-1"}>{`${FamilyErr.message}`}</li>
                )}
                {GetTranFamiliesErr && (
                  <li className={`alert alert-warning` + " " + "mt-1"}>{`${GetTranFamiliesErr}`}</li>
                )}
              </ul>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Child Name</label>
                <input type="text" required className="form-control" value={FamMemberName} onChange={(e) => setFamMemberName(e.target.value)} />
              </div>
              <div className="form-group d-flex flex-column mt-4 TaFamilyFormgroup">
                <label htmlFor="">D.O.B</label>
                <input type="date" required  className="form-control" value={FamMemberDOB} onChange={(e) => setFamMemberDOB(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaFamilyFormgroup">
                <label htmlFor="">Gender</label>
                <div className="form-control TaFamilyFormControl">
                  <input type="Radio" className="form-check-input" name="Gender" id="Son" value="S" required={FamMemberType == "" ? true :false} checked={FamMemberType!==null?FamMemberType=='S'?true:false:false} onChange={(e) => setFamMemberType(e.target.checked == true ? e.target.value : "null")} />
                  &nbsp;<label htmlFor="Son">Son</label> &nbsp;
                  <input type="Radio" className="form-check-input" name="Gender" id="Daughter" value="D" required={FamMemberType == "" ? true :false} checked={FamMemberType!==null?FamMemberType=='D'?true:false:false} onChange={(e) => setFamMemberType(e.target.checked == true ? e.target.value : "null")} />
                  &nbsp;<label htmlFor="Daughter">Daughter</label>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 p-2 mt-2">
              <div className="Familybtncontainer">
                <button
                  disabled={btnEnaledAndDisabled2}
                  type="submit"
                  className="btn btn-dark"
                >{loading2 ? "A Moment Please" : Sequenceno!==null && s_no!==null ? "Update" : "Save"}</button> &nbsp;
                <button  className="btn btn-dark">Reset</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="col-lg-12">
                {GetTranFamilies.length > 0 ?
                  <div className="col-lg-12">
                  <h5 className="tableDataHead">Children information</h5>
                    <div className="">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Child Name</th>
                              <th scope="col">DOB</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {GetTranFamilies.map((items) => {
                              return(
                                <tr>
                                  <>
                                  <td>{items.Fam_Member_Name}</td>
                                  </>
                                  <>
                                  <td>{items.Fam_Member_DOB}</td>
                                  </>
                                  <>
                                  <td>{items.Fam_Member_Type == "S" ? "Son" : "Daughter"}</td>
                                  </>
                                  <td className='tabletdRow'>
                                    <span className="editBtnTable" onClick={setValue} data-row-s-no-u={items.S_no} data-row-Sequence-no-u={items.Sequence_no}>Edit</span>
                                    <span className="deleteBtnTable" onClick={DeleteChildAlert} data-row-s-no-d={items.S_no} data-row-Sequence-no-d={items.Sequence_no}>Delete</span>
                                  </td>
                                </tr>
                              )
                            })}
                            
                          </tbody>
                        </table>
                      </div>
                      
                    </div>
                  </div>: ""
              }
            </div>
          </div>
          {/* <div class="row">
            <div className="col-lg-12">
                {GetTranMarriages.length > 0 ?
                  <div className="col-lg-12">
                    <h5 className="tableDataHead">Marriage information</h5>
                    <div className="">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Marriage Date</th>
                              <th scope="col">Spause name</th>
                              <th scope="col">Spause DOB</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {GetTranMarriages.map((items) => {
                              return(
                                <tr>
                                  <>
                                  <td>{items.Marriage_Date}</td>
                                  </>
                                  <>
                                  <td>{items.Spause_name}</td>
                                  </>
                                  <>
                                  <td>{items.Spause_DOB}</td>
                                  </>
                                  <td className='tabletdRow'>
                                    <span className="editBtnTable" data-seq-update={items.Sequence_no}>Edit</span>
                                    <span className="deleteBtnTable" onClick={setDeleteId} data-seq-delete={items.Sequence_no}>Delete</span>
                                  </td>
                                </tr>
                              )
                            })}
                            
                          </tbody>
                        </table>
                      </div>
                      
                    </div>
                  </div>: ""
              }
            </div>
          </div> */}
        </form>
      </div>

      {showDeleteModal && (
        <>
          <DeleteModal
            {...{ 
              
              setshowDeleteModal,showDeleteModal,deleteSaveChild,
              loading,setLoading,btnEnaledAndDisabled,
              setBtnEnaledAndDisabled,formErr
            }}
            warningMsg="Opps!"
            descriptionOne="Are you sure!!!" descriptionTwo="You want to delete this Family Info"
          />
        </>
      )}

      {showDeleteModal2 && (
        <>
          <DeleteModal
            {...{ 
              
              setshowDeleteModal2,showDeleteModal2,deleteSaveMarriages,
              loading,setLoading,btnEnaledAndDisabled,
              setBtnEnaledAndDisabled,formErr
            }}
            warningMsg="Opps!"
            descriptionOne="Are you sure!!!" descriptionTwo="You want to delete this Marriage Info"
          />
        </>
      )}
    </>

    
    
  );
}

export default TAFamilyForm;
