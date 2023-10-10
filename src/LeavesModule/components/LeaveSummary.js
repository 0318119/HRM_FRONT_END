import React, { useEffect, useState } from 'react'
import Header from '../../components/Includes/Header'
import '../assets/css/Leaves.css'
import { useLocation, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')



function LeaveSummary() {
    const search = useLocation().search
    const navigate = useNavigate()
    var userId = new URLSearchParams(search).get('userId')
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var Emp_code = secureLocalStorage.getItem("Emp_code");
    var Company_code = secureLocalStorage.getItem("company_code");
    const [isLeaveSummaryData,setLeaveSummaryData] = useState([])
    const [isLeaveSummaryErr,setLeaveSummaryErr] = useState(false)
    const [isAttachmentsData, setAttachmentsData] = useState([])
    const [isAttachmentsErr, setAttachmentsErr] = useState(false)
    const [loading2, setLoading2] = useState(true);
    const [dataLoader2, setDataLoader2] = useState(false);
    const [modal, setmodal] = useState(false)
    const [step, setStep] = useState("")
    const [isSaveleaveAlert, setSaveleaveAlert] = useState(false)
    const [isRemarks,setRemarks] = useState(null)


    const showAlert = (message, type) => {
        setSaveleaveAlert({
            message: message,
            type: type,
        })
    }

    // GET LEAVES DATA BY TRAC_CODE API CALL ======================================
    const getDataOFLeave = async () => {
        await fetch(
          `${config["baseUrl"]}/leaves/GetTranLeavesByTranCode`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
              "Tran_Code": userId,
            })
          }
        ).then((response) => {
          return response.json();
        }).then(async (response) => {
          if (response.messsage == "unauthorized") {
            await fetch(
              `${config["baseUrl"]}/leaves/GetTranLeavesByTranCode`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  refereshToken: `Bareer ${get_refresh_token}`,
                },
                body: JSON.stringify({
                  "Tran_Code": userId,
                })
              }
            ).then((response) => {
              return response.json();
            }).then((response) => {
              if (response.messsage == "timeout error") { navigate("/") }
              else {
                localStorage.setItem("refresh", response.referesh_token);
                secureLocalStorage.setItem("access_token", response.access_token);
                if (response.success) {
                    setLeaveSummaryData(response.data[0]?.[0])
                }else{
                    setLeaveSummaryErr(response.message)
                }
              }
            }).catch((error) => {setLeaveSummaryErr(error.message)});
          } else {
            if (response.success) {
                setLeaveSummaryData(response.data[0]?.[0])
            }else{
                setLeaveSummaryErr(response.message)
            }
          }
        }).catch((error) => {setLeaveSummaryErr(error.message)});
    }
    // GET ATTACHMENTS DATA BY TRAC_CODE API CALL ======================================
    async function GetAttachemnts() {
        setLoading2(true)
        setDataLoader2(false)
        await fetch(
        `${config["baseUrl"]}/leaves/GetLeaveAttachmentByTranCode`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Tran_Code" : userId
            })
        }
        ).then((response) => {
        return response.json();
        }).then(async (response) => {
        if (response.messsage == "unauthorized") {
            await fetch(
            `${config["baseUrl"]}/leaves/GetLeaveAttachmentByTranCode`, {
                method: "POST",
                headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code" : userId
                })
            }
            ).then((response) => {
            return response.json();
            }).then((response) => {
            if (response.messsage == "timeout error") {
                navigate("/");
            } else {
                localStorage.setItem("refresh", response.referesh_token);
                secureLocalStorage.setItem("access_token", response.access_token);
                if(response.success){
                    setAttachmentsData(response?.data?.[0])
                    setLoading2(false)
                    setDataLoader2(true)
                }else{setAttachmentsErr(response.message)}
            }
            }).catch((error) => {
            setAttachmentsErr(error.message)
            });
        } else {
            if(response.success){
                setAttachmentsData(response?.data?.[0])
                setLoading2(false)
                setDataLoader2(true)
            }else{setAttachmentsErr(response.message)}
        }
        }).catch((error) => {
            setAttachmentsErr(error.message)
        });
    }

    const approveRejectStep = async (argu,e) => {
        e.preventDefault(e)
        await fetch(
            `${config["baseUrl"]}/leaveApprovals/${argu == "step" ? 'StepBackLeave' : argu == "reject" ? 'RejectLeave' : argu =="approve"? 'ApproveLeave':""}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": userId,
                    "remarks" : isRemarks
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaveApprovals/${argu == "step" ? 'StepBackLeave' : argu == "reject" ? 'RejectLeave' : argu =="approve"? 'ApproveLeave':""}`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Tran_Code": userId,
                            "remarks" : isRemarks
                        })
                    }
                ).then((response) => {
                        return response.json();
                    }).then((response) => {
                        if (response.messsage == "timeout error") { navigate("/") }
                        else {
                            localStorage.setItem("refresh", response.referesh_token);
                            secureLocalStorage.setItem("access_token", response.access_token);
                            if (response.success) {
                                setmodal(false)
                                showAlert("Done", "success")
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000)
                            } else {
                                showAlert(response.messsage, "warning")
                            }
                        }
                    }).catch((error) => {
                        showAlert(error.messsage, "warning")
                    });
            } else {
                if (response.success) {
                    setmodal(false)
                    showAlert("Done", "success")
                    console.log("success",response)

                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000)
                } else {
                    showAlert(response.messsage, "warning")
                    console.log("warning",response)
                }
            }
        }).catch((error) => {
            showAlert(error.messsage, "warning")
            console.log("error",error)
        });

    }




    useEffect(() => {
        getDataOFLeave()
        GetAttachemnts()
    }, [])
  return (
    <>
        <div className='mb-5'>
          <Header />
        </div>
        <div className="container px-2 leaveSummaryContainer">
            <div className="container mt-1 Leaves_listContainer">
            <div className="row mx-0">
                <span className="Leaves_listHeader">
                    Leave Application Form
                </span>
                <ul className="px-3">
                    {isLeaveSummaryErr && (
                        <li className={`alert alert-warning mt-2`}>{`${isLeaveSummaryErr}`}</li>
                    )}
                </ul>
            </div>
            <form action="" >
                <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="leaveSummaryDetailsBox">
                        <div className="form-group">
                            <label htmlFor="">Requester Name</label><br />
                            <input type="text" className='form-control' value={isLeaveSummaryData?.Emp_Name ? isLeaveSummaryData?.Emp_Name : "Not Found"} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Select Leave Type</label>
                            <input type="text" className='form-control' value={isLeaveSummaryData?.Leave_name ? isLeaveSummaryData?.Leave_name : "Not Found"} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Balance Day</label>
                            <input type="text" className='form-control' value={isLeaveSummaryData?.Leave_Balance_days ? isLeaveSummaryData?.Leave_Balance_days : "Not Found"} readOnly/>
                        </div>
                    </div>

                    <div className="leaveSummaryDetailsBox">
                        <div className="form-group">
                            <label htmlFor="">From Date</label>
                            <input type="text" className='form-control' value={isLeaveSummaryData?.Start_Date ? isLeaveSummaryData?.Start_Date : "Not Found"} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">To Date</label>
                            <input type="text" className='form-control' value={isLeaveSummaryData?.End_Date ? isLeaveSummaryData?.End_Date : "Not Found"} readOnly/>
                        </div>
                    </div>

                    <div className="leaveSummaryDetailsBox">
                        <div className="form-group">
                            <label htmlFor="">Reason</label>
                            <textarea className='form-control' value={isLeaveSummaryData?.Reason ? isLeaveSummaryData?.Reason : "Not Found"}></textarea>
                        </div> 
                    </div>
                    <div className="leaveSummaryDetailsBox">
                        <div className="form-group">
                            <label htmlFor="">Remarks</label>
                            <textarea className='form-control' placeholder="Enter the your remarks..." onChange={(e) => {setRemarks(e.target.value)}}></textarea>
                        </div> 
                    </div>
                    <div className='mx-3 mb-3'>
                        <button className='mx-1' onClick={(e) => {
                            e.preventDefault(e)
                            setStep("step")
                            setmodal(true)
                        }}>Step Back</button>
                        <button className='mx-1' onClick={(e) => {
                            e.preventDefault(e)
                            setStep("approve")
                            setmodal(true)
                        }}>Aprove</button>
                        <button className='mx-1' onClick={(e) => {
                            e.preventDefault(e)
                            setStep("reject")
                            setmodal(true)
                        }}>Reject</button>
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
        <div className="container px-2 mt-3">
        <div className="container Leaves_listContainer">
          <div className="row w-100 mx-0">
            <span className="Leaves_listHeader">
              Attachments
            </span>
          </div>
          <div className="row  p-3 mt-2">
            {loading2 && (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ height: "100px", background: "#d3d3d345" }}
              >
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only"></span>
                </div>
              </div>
            )}
            {dataLoader2 && (
              <div className='col-12 attachmenttable'>
                {isAttachmentsData.length > 0 ?
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">View</th>
                        <th scope="col">Posting Date</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        isAttachmentsData?.map((items) => {
                          return (
                            <tr>
                              <td>{items?.FileName ? items?.FileName.slice(0, 8) : "Not Found"}</td>
                              <td>{items?.FileName ? <a href={`${config["baseUrl"]}/${items?.FileName}`} download>{items?.FileName.slice(0, 8)}</a> : "Not Found"}</td>
                              <td>{items?.Posting_date ? items?.Posting_date.slice(0, 10) : "Not Found"}</td>
                              <td>{items?.Reason ? items?.Reason : "Not Found"}</td>
                              <td><button className="editBtnTable" onClick={(e) => {
                                // DeleteAttactmentsFile(items?.Tran_Code)
                              }}>Delete</button></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  : <span className='text-center d-block'>No Attachments Data</span>
                }
                <>{isAttachmentsErr ? isAttachmentsErr : false}</>
              </div>
            )}
          </div>
        </div>
        </div>

        {
            modal == true ?
            <div className="stepBoxMain">
                <div className="stepBoxInner">
                    <div className=''>
                        <h1>Are you sure!</h1>
                        <ul className="px-3">
                            {isSaveleaveAlert && (
                                <li className={`alert alert-${isSaveleaveAlert.type}` + " " + "mt-4"}>{`${isSaveleaveAlert.message}`}</li>
                            )}
                        </ul>
                        <div className='btnBox'>
                            <button onClick={(e) => approveRejectStep(step,e)}>yes</button>
                            <button onClick={() => setmodal(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
            : ""
        }
    </>
  )
}

export default LeaveSummary
