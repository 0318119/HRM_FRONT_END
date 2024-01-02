import React, { useEffect, useState } from 'react'
import '../assets/css/Approval.css'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import {saveAs} from "file-saver";
import { Modal } from '@mui/material';
const config = require('../../config.json')



const Approvals = () => {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()
    const [isApprovalData, setApprovalData] = useState([]);
    const [isApprovalDataErr, setApprovalDataErr] = useState(false);
    const [modal, setmodal] = useState(false)
    const [step, setStep] = useState("")
    const [trancode, settrancode] = useState("")
    const [isSaveleaveAlert, setSaveleaveAlert] = useState(false)
    const [isRemark_Modal, setRemarkModal] = useState(false)
    const [remarks, setRemarks] = useState("")
    const [isRejectModal, setRejectModal] = useState(false)

    const showAlert = (message, type) => {
        setSaveleaveAlert({
            message: message,
            type: type,
        })
    }


    async function GetApprovalInfo() {
        await fetch(
            `${config["baseUrl"]}/leaves/GetEssApproval`,
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
                        `${config["baseUrl"]}/leaves/GetEssApproval`,
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
                                setApprovalData(response.data[0]);
                            }
                        })
                        .catch((error) => {
                            setApprovalDataErr(error.message);
                        });
                } else {
                    setApprovalData(response.data[0]);
                }
            })
            .catch((error) => {
                setApprovalDataErr(error.message);
            });
    }
    const approveRejectStep = async (e, code) => {
        await fetch(
            `${config["baseUrl"]}/leaveApprovals/ApproveLeave`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": code
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaveApprovals/ApproveLeave`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Tran_Code": code
                        })
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.messsage == "timeout error") { navigate("/") }
                        else {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            if (response.success) {
                                showAlert("You have been approved this leave application", "success")
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000)
                            } else {
                                showAlert(response.messsage, "warning")
                                console.log("response.data",response)
                            }
                        }
                    })
                    .catch((error) => {
                        showAlert(error.messsage, "warning")
                    });
            } else {
                if (response.success) {
                    showAlert("You have been approved this leave application", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    showAlert(response.messsage, "warning")
                }
            }
        }).catch((error) => {
            showAlert(error.messsage, "warning")
        });

    }
    const StepBack = async (code) => {
        await fetch(
            `${config["baseUrl"]}/leaveApprovals/StepBackLeave`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": code,
                    "remarks": remarks
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaveApprovals/StepBackLeave`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Tran_Code": code,
                            "remarks" : remarks
                        })
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.messsage == "timeout error") { navigate("/") }
                        else {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            if (response.success) {
                                showAlert("You have Stepback this Leave Application.", "success")
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000)
                            } else {
                                showAlert(response.message, "warning")
                            }
                        }
                    })
                    .catch((error) => {
                        showAlert(error.messsage, "warning")
                    });
            } else {
                if (response.success) {
                    showAlert("You have Stepback this Leave Application.", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    showAlert(response.message, "warning")
                }
            }
        }).catch((error) => {
            showAlert(error.messsage, "warning")
        });

    }
    const RejectLeave = async (code) => {
        await fetch(
            `${config["baseUrl"]}/leaveApprovals/RejectLeave`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": code,
                    "remarks": remarks
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaveApprovals/RejectLeave`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Tran_Code": code,
                            "remarks": remarks
                        })
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.messsage == "timeout error") { navigate("/") }
                        else {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            if (response.success) {
                                showAlert("You have Rejected  Application.", "success")
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000)
                            } else {
                                showAlert(response.message, "warning")
                            }
                        }
                    })
                    .catch((error) => {
                        showAlert(error.messsage, "warning")
                    });
            } else {
                if (response.success) {
                    showAlert("You have Rejected  Application.", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                } else {
                    showAlert(response.message, "warning")
                }
            }
        }).catch((error) => {
            showAlert(error.messsage, "warning")
        });

    }

    useEffect(() => {
        GetApprovalInfo()
    }, [])

    return (
        <>
            <div className="container-fluid px-2">
                <div className="container-fluid  Approvals_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Approvals_listHeader">
                            Approvals
                        </span>   
                        <ul className="px-3">
                            {isSaveleaveAlert && (
                                <li className={`alert alert-${isSaveleaveAlert.type}` + " " + "mt-4"}>{`${isSaveleaveAlert.message}`}</li>
                            )}
                        </ul>
                    </div>
                    <div className="row  p-3">
                        <div className="col-12 approvaltable">
                            {isApprovalData?.length > 0 ?
                                <>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">TranCode</th>
                                                <th scope="col">Employee name</th>
                                                <th scope="col">Location Name</th>
                                                <th scope="col">Leave Name</th>
                                                <th scope="col">File</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">End Date</th>
                                                <th scope="col">Leave Days</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Posting Date</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {isApprovalData?.map((item) => {
                                                return (
                                                    <tr>
                                                        <td scope="row">{item.Tran_Code ? item?.Tran_Code : "Not Found"}</td>
                                                        <td>{item?.EmployeeName ? item?.EmployeeName : "Not Found"}</td>
                                                        <td>{item?.LocationName ? item?.LocationName : "Not Found"}</td>
                                                        <td>{item?.Leave_name ? item?.Leave_name : "Not Found"}</td>
                                                        {/* <td>{item?.FileName !==null ? "Downlaod" : "Not Found"}</td> */}
                                                        <td>{item?.FileName ? <a style={{background: "#014f86",cursor: "pointer"}} className='text-white text-center py-1 px-3 rounded'
                                                            onClick={(e) => {
                                                                const imageSource = `${config["baseUrl"]}/${item?.File_Path}`;
                                                                saveAs(imageSource, "employeesAttachments");
                                                            }}
                                                        >Download</a> : "Not Found"}</td>
                                                        <td>{item?.Reason ? item?.Reason : "Not Found"}</td>
                                                        <td>{item?.StartDate ? item?.StartDate : "Not Found"}</td>
                                                        <td>{item?.EndDate ? item?.EndDate  :"Not Found"}</td>
                                                        <td>{item?.LeaveDays ? item?.LeaveDays : "Not Found"}</td>
                                                        <td>{item?.Status ? item?.Status : "Not Found"}</td>
                                                        <td>{item?.Posting_date ? item?.Posting_date : "Not Found"}</td>
                                                        <td>
                                                            {
                                                                item?.Status == "Step Back" || item?.Status == "Rejected" ?
                                                                null : 
                                                                <>
                                                                    <button className='mx-1 buttonSet' onClick={() => {
                                                                    setRemarkModal(true)
                                                                    settrancode(item?.Tran_Code)
                                                                    }}>Step Back</button>
                                                                    <button className='mx-1 buttonSet' onClick={() => {
                                                                        setStep("approve")
                                                                        settrancode(item?.Tran_Code)
                                                                        setmodal(true)
                                                                    }}>Aprove</button>
                                                                    <button className='mx-1 buttonSet' onClick={() => {
                                                                        settrancode(item?.Tran_Code)
                                                                        setRejectModal(true)
                                                                    }}>Reject</button>
                                                                </>
                                                            }
                                                            
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </> : <h4 className='DataANotFound'>Data Not Found</h4>
                            }

                        </div>
                    </div>
                    {/* <div className="row mt-1 p-3">
                  <div className="col-md-12 col-sm-12 p-2">
                      <div className="    ">
                          <button type="submit" className='btn btn-dark'>
                              Add New
                          </button>
                      </div>
                  </div>
              </div> */}
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
                                <button onClick={() => approveRejectStep(step, trancode)}>yes</button>
                                <button onClick={() => setmodal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }
            {isRemark_Modal ?
                <div className="Remarkmodal">
                    <div className="RemarkmodalInner">
                        <div className=''>
                            <ul className="px-3">
                                {isSaveleaveAlert && (
                                    <li className={`alert alert-${isSaveleaveAlert.type}` + " " + "mt-4"}>{`${isSaveleaveAlert.message}`}</li>
                                )}
                            </ul>
                            <h4>Please Give Your Remarks</h4>
                                 <textarea name="" id="" cols="30" rows="7" className='form-control' onChange={(e) => setRemarks(e.target.value)} /> 
                            <div className='btnBox'>
                                <button onClick={() => { StepBack(trancode) }}>Submit</button>
                                <button onClick={() => setRemarkModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                :""
            }
            {isRejectModal ?
                <div className="Remarkmodal">
                    <div className="RemarkmodalInner">
                        <div className=''>
                            <ul className="px-3">
                                {isSaveleaveAlert && (
                                    <li className={`alert alert-${isSaveleaveAlert.type}` + " " + "mt-4"}>{`${isSaveleaveAlert.message}`}</li>
                                )}
                            </ul>
                            <h4>Please Give Your Remarks</h4>
                            <textarea name="" id="" cols="15" rows="5" className='form-control' onChange={(e) => setRemarks(e.target.value)} />
                            <div className='btnBox'>
                                <button onClick={() => { RejectLeave(trancode) }}>Submit</button>
                                <button onClick={() => setRejectModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }

        </>
    )
}

export default Approvals