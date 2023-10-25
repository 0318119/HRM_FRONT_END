import React, { useEffect, useState } from 'react'
import '../assets/css/transaction_confirmation_form.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import Header from '../../components/Includes/Header'
const config = require('../../config.json')

const Transaction_confirmation_form = () => {
    const [isGetInfo, setGetInfo] = useState([])
    const search = useLocation().search
    var ConfirmId = new URLSearchParams(search).get('ConfirmId')
    var Already_Process = new URLSearchParams(search).get('Process')

    const [isGetInfoErr, setGetInfoErr] = useState("")
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [currentDate, setCurrentDate] = useState(formattedDate);
    const navigate = useNavigate()
    const [whichAction, setwhichAction] = useState(Already_Process!==null? "DeleteAndProcess" : "save")
    const [isConfirmationDate, setConfirmationDate] = useState(null)
    const [isBtn, setBtn] = useState({
        saveBtnLoading: false,
        saveBtnDisabled: false,
        // =================================================================
        processBtnLoading: false,
        processBtnDisabled: false,
        // =================================================================
        deleteBtnLoading: false,
        deleteBtnDisabled: false,
        // =================================================================
    })



    // GET CONFIRMATION INFO API CALL =================================================================
    async function getInfo() {
        await fetch(
            `${config["baseUrl"]}/tranConformation/GetEmployeeInfoTranConfirmation`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": ConfirmId
                }),
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConformation/GetEmployeeInfoTranConfirmation`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": ConfirmId
                        }),
                    }
                ).then((response) => {
                    return response.json();
                })
                    .then((response) => {
                        if (response.messsage == "timeout error") {
                            navigate("/");
                        } else {
                            if (response.success) {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem("access_token", response.access_token);
                                setGetInfo(response?.data[0]?.[0])
                            } else {
                                setGetInfoErr(response.message)
                            }
                        }
                    }).catch((error) => { setGetInfoErr(error.messsage) });
            } else {
                if (response.success) {
                    setGetInfo(response?.data[0]?.[0])
                } else {
                    setGetInfoErr(response.message)
                }
            }
        }).catch((error) => { setGetInfoErr(error.message) });
    }
    // SAVE CONFIRMATION API CALL =================================
    async function SaveConfirmationInfo(e) {
        e.preventDefault();
        setBtn({
            saveBtnLoading: true,
            saveBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/tranConfirmation/TranConfirmations_save`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmId,
                "TransactionDate": currentDate,
                "ConfirmationDate": isConfirmationDate !== null ? isConfirmationDate : currentDate,
                "Confirmation_DueDate": isGetInfo?.Emp_Confirm_date
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConfirmation/TranConfirmations_save`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": ConfirmId,
                        "TransactionDate": currentDate,
                        "ConfirmationDate": isConfirmationDate !== null ? isConfirmationDate : currentDate,
                        "Confirmation_DueDate": isGetInfo?.Emp_Confirm_date
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                saveBtnLoading: false,
                                saveBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("Please click on Process button.")
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        } else {
                            setBtn({
                                saveBtnLoading: false,
                                saveBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        saveBtnLoading: false,
                        saveBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 5000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            saveBtnLoading: false,
                            saveBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("Please click on Process button.")
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    } else {
                        setBtn({
                            saveBtnLoading: false,
                            saveBtnDisabled: false,
                        })
                        setGetInfoErr(response.message)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                saveBtnLoading: false,
                saveBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 5000);
        });
    }
    // PROCESS CONFIRMATION API CALL =================================
    async function processConfirmation(e) {
        e.preventDefault();
        setBtn({
            processBtnLoading: true,
            processBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/tranConfirmation/TranConfirmations_Process`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmId,
                "TransactionDate": currentDate,
                "ConfirmationDate": isConfirmationDate !== null ? isConfirmationDate : isGetInfo?.Confirmation_Date,
                "Confirmation_DueDate": isGetInfo?.Emp_Confirm_date
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConfirmation/TranConfirmations_Process`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": ConfirmId,
                        "TransactionDate": currentDate,
                        "ConfirmationDate": isConfirmationDate !== null ? isConfirmationDate : isGetInfo?.Confirmation_Date ,
                        "Confirmation_DueDate": isGetInfo?.Emp_Confirm_date
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                processBtnLoading: false,
                                processBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("You have been Processed this confirmation.")
                            setTimeout(() => {
                                setGetInfoErr("")
                                navigate("/Confirmation");
                            }, 5000);
                        } else {
                            setBtn({
                                processBtnLoading: false,
                                processBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        processBtnLoading: false,
                        processBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 5000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            processBtnLoading: false,
                            processBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("You have been Processed this confirmation.")
                        setTimeout(() => {
                            setGetInfoErr("")
                              navigate("/Confirmation");
                        }, 5000);
                    } else {
                        setBtn({
                            processBtnLoading: false,
                            processBtnDisabled: false,
                        })
                        setGetInfoErr(response.message)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                processBtnLoading: false,
                processBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 5000);
        });
    }
    // DELETE CONFIRMATION API CALL =================================
    async function deleteConfirmation(e) {
        e.preventDefault();
        setBtn({
            deleteBtnLoading: true,
            deleteBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/tranConfirmation/TranConfirmations_delete`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmId,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConfirmation/TranConfirmations_delete`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": ConfirmId,
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                deleteBtnLoading: false,
                                deleteBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("You have been Deleted this confirmation.")
                            setTimeout(() => {
                                setGetInfoErr("")
                                navigate("/Confirmation");
                            }, 5000);
                        } else {
                            setBtn({
                                deleteBtnLoading: false,
                                deleteBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 3000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        deleteBtnLoading: false,
                        deleteBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 3000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            deleteBtnLoading: false,
                            deleteBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("You have been Deleted this confirmation.")
                        setTimeout(() => {
                            setGetInfoErr("")
                            navigate("/Confirmation");
                        }, 5000);
                    } else {
                        setBtn({
                            deleteBtnLoading: false,
                            deleteBtnDisabled: false,
                        })
                        setGetInfoErr(response.messsage)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 3000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                deleteBtnLoading: false,
                deleteBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 3000);
        });
    }




    useEffect(() => {
        getInfo()
    }, [])

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="transaction_confirmation_Section  p-3">
                <div className="container-fluid transaction_confirmation_container">
                    <div className="col-lg-12 TC_Heading p-2">
                        <span className="TCFormHead">
                            Transaction Confirmation
                        </span>
                    </div>
                    <form onSubmit={
                        whichAction == "save" ? SaveConfirmationInfo :
                        whichAction == "DeleteAndProcess" ? processConfirmation : false
                    }>
                        <div className='confirmationFormScrollBox'>
                            <div className="row">
                                <div className='HeadingEI'>
                                    Employee Information
                                </div>
                                <ul className='p-0'>
                                    {isGetInfoErr && (
                                        <li className={`alert alert-warning` + " " + "mt-1"}>{`${isGetInfoErr}`}</li>
                                    )}
                                </ul>
                                <div className="col-lg-12 EmployeeInfo">
                                    <div className="form-group">
                                        <label htmlFor="">Employee Name</label>
                                        <input type="text" readOnly value={isGetInfo?.Emp_name ? isGetInfo?.Emp_name : "Not Found"} className='form-control' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Designation</label>
                                        <input type="text" readOnly value={isGetInfo?.Desig_Name ? isGetInfo?.Desig_Name : "Not Found"} className='form-control' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Department</label>
                                        <input type="text" readOnly value={isGetInfo?.Dept_name ? isGetInfo?.Dept_name : "Not Found"} className='form-control' />
                                    </div>
                                    <div className='form-group radioBoxConfirmation'>
                                        <label htmlFor="">PF Nomination</label>
                                        <div>
                                            <div className="form-group">
                                                <label>Yes</label>
                                                <input type="Radio" checked={isGetInfo?.PF_Nomination_Flag == "Y" ? true : false} readOnly className='mx-1' />
                                            </div>
                                            <div className="form-group">
                                                <label>No</label>
                                                <input type="Radio" checked={isGetInfo?.PF_Nomination_Flag == "N" ? true : false} readOnly className='mx-1' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='HeadingEI'>
                                    Confirmation Information
                                </div>
                                <div className="col-lg-12 EmployeeInfo">
                                    <div className="form-group">
                                        <label htmlFor="">Joining Date</label>
                                        <input type="date" readOnly value={isGetInfo?.Joining_Date !== null ? isGetInfo?.Joining_Date : "Not Found"} className='form-control' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Transaction Date</label>
                                        <input type="date" readOnly value={currentDate} className='form-control' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Confirmation Due</label>
                                        <input type="date" readOnly value={isGetInfo?.Emp_Confirm_date !== null ? isGetInfo?.Emp_Confirm_date : "Not Found"} className='form-control' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Confirmation Date</label>
                                        <input type="date" defaultValue={isGetInfo?.Confirmation_Date !==null ? isGetInfo?.Confirmation_Date :  currentDate} onChange={(e) => { setConfirmationDate(e.target.value) }} className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="TAFormBtn">
                            {
                                whichAction == "save" ?
                                <>
                                    <button type="submit" className="btn btn-dark" disabled={isBtn.saveBtnDisabled}>{isBtn.saveBtnLoading ? "Please wait..." : "Save"}</button>
                                </>
                                : whichAction == "DeleteAndProcess" ?
                                <>
                                    <button type="button" className="ml-2 btn btn-dark" onClick={deleteConfirmation} disabled={isBtn.deleteBtnDisabled}>{isBtn.deleteBtnLoading ? "Please wait..." : "Delete"}</button>
                                    <button type="submit" className="ml-2 btn btn-dark" disabled={isBtn.processBtnDisabled} > {isBtn.processBtnLoading ? "Please wait..." : "Process"}</button>
                                </> : false
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Transaction_confirmation_form