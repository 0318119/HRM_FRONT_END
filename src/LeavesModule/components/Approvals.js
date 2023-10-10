import React, { useEffect, useState } from 'react'
import '../assets/css/Approval.css'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
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
    const [remarks, setRemarks] = useState('')

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
                                secureLocalStorage.setItem(
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
            `${config["baseUrl"]}/leaveApprovals/${e == "step" ? 'StepBackLeave' : e == "reject" ? 'RejectLeave' : e =="approve"? 'ApproveLeave':""}`,
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
                    `${config["baseUrl"]}/leaveApprovals/${e == "step" ? 'StepBackLeave' : e == "reject" ? 'RejectLeave' : e == "approve" ? 'ApproveLeave' : ""}`,
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
                            secureLocalStorage.setItem("access_token", response.access_token);
                            if (response.success) {
                                setmodal(false)
                                alert(response.messsage)
                                showAlert("Done", "success")
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000)
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
                    setmodal(false)
                    alert(response.messsage)
                    showAlert("Done", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } else {
                    showAlert(response.messsage, "warning")
                    console.log("response.data",response)
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
                                                        <td scope="row">{item.Tran_Code}</td>
                                                        <td>{item.EmployeeName}</td>
                                                        <td>{item.LocationName}</td>
                                                        <td>{item.Leave_name}</td>
                                                        <td>{item.StartDate}</td>
                                                        <td>{item.EndDate}</td>
                                                        <td>{item.LeaveDays}</td>
                                                        <td>{item.Status}</td>
                                                        <td>{item.Posting_date}</td>
                                                        <td>
                                                            <button className='mx-1' onClick={() => {
                                                                setRemarkModal(true)
                                                                setStep("step")
                                                                settrancode(item.Tran_Code, item.remarks)
                                                                // setmodal(true)
                                                            }}>Step Back</button>
                                                            <button className='mx-1' onClick={() => {
                                                                setStep("approve")
                                                                settrancode(item.Tran_Code)
                                                                setmodal(true)
                                                            }}>Aprove</button>
                                                            <button className='mx-1' onClick={() => {
                                                                setStep("reject")
                                                                settrancode(item.Tran_Code)
                                                                setmodal(true)
                                                            }}>Reject</button>
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
                            <h4>Please Give Your Remarks</h4>
                                 <textarea name="" id="" cols="30" rows="7" className='form-control' onChange={(e) => setRemarks(e.target.value)} /> 
                            <div className='btnBox'>
                                <button onClick={() => approveRejectStep(step, trancode,remarks)}>Submit</button>
                                <button onClick={() => setRemarkModal(false)}>Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>
                :""
        }

        </>
    )
}

export default Approvals