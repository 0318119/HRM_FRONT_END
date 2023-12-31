import React, { useState, useEffect } from 'react'
import '../LeavesModule/assets/css/manual_leave_posting.css'
import { Link, json, useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import Header from '../components/Includes/Header';
const config = require('../config.json')

const Manual_leave_posting = () => {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var Emp_code = localStorage.getItem("Emp_code");
    var Company_code = localStorage.getItem("company_code");
    
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
    const [formErr, setformErr] = useState(false)
    const navigate = useNavigate()
    const [getLeaveType, setGetLeaveType] = useState([]);
    const [getLeaveTypeErr, setGetLeaveTypeErr] = useState(false);
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [isFromDate, setFromDate] = useState(formattedDate)
    const [isToDate, setToDate] = useState(formattedDate)
    const [isLeaveType, setLeaveType] = useState(null)
    const [isStoreBalancedDays, setStoreBalancedDays] = useState(0)
    const [EmployeesName, setGetAttendanceName] = useState([])
    const [EmployeesNameErr, setGetAttendanceNameErr] = useState(false)
    const [isRequesterCode, setRequesterCode] = useState(null)
    const [isFromDateScd, setFromDateScd] = useState(formattedDate)
    const [isToDateScd, setToDateScd] = useState(formattedDate)
    const [isAppliedLeave, setAppliedLeave] = useState(1)
    const [isLeaveReason, setLeaveReason] = useState("")
    const [isSaveleaveAlert, setSaveleaveAlert] = useState(false)
    const [isRemainingdays, setRemainingdays] = useState(0)
    const [isGetLeaveApplication, setGetLeaveApplication] = useState([])
    const [isGetLeaveApplicationErr, setGetLeaveApplicationErr] = useState(false)
    const [isTracCodeForEdit, setTracCodeForEdit] = useState(0)
    const [isDatesErr, setDatesErr] = useState("")
    const [isEditData, setEditData] = useState([])
    const [isEditLeaveTypeCode, setEditLeaveTypeCode] = useState(null)
    const [isShowTags, setShowTags] = useState(false)
    const [isHalfDayFlag, setHalfDayFlag] = useState(0)
    const [isFile, setFile] = useState('')
    const [isEmpCode, setEmpCode] = useState(null)
    const [isFileErr, setFileErr] = useState(false)
    const [loading1, setLoading1] = useState(true);
    const [dataLoader1, setDataLoader1] = useState(false);
    const [isAttachmentsData, setAttachmentsData] = useState([])
    const [isAttachmentsErr, setAttachmentsErr] = useState(false)
    const [loading2, setLoading2] = useState(true);
    const [dataLoader2, setDataLoader2] = useState(false);
    const [Required, setRequired] = useState(false)
    const [isLeaveTypeLoading, setLeaveTypeLoading] = useState("")
    const [isBtnDisabled, setBtnDisabled] = useState(true)
    const showAlert = (message, type) => {
        setSaveleaveAlert({
            message: message,
            type: type,
        })
    }
    
    // GET REQUESTER NAME API CALL =========================================
    const GetEmployeesName = async (e) => {
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
                    localStorage.setItem("refresh", response.referesh_token);
                    localStorage.setItem("access_token", response.access_token);
                    setGetAttendanceName(response?.data[0])
                }).catch((errs) => { setGetAttendanceNameErr(errs.messsage) })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                setGetAttendanceName(response?.data)
            }
        }).catch((errs) => { setGetAttendanceNameErr(errs.messsage) })
    }
    // GET LEAVE TYPE API CALL =============================================
    async function GetLeaveType() {
        setLeaveTypeLoading(true)
        await fetch(
            `${config["baseUrl"]}/leaves/GetLeaveTypeByEmployeeCode`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": Emp_code !==null ? Emp_code : isRequesterCode
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaves/GetLeaveTypeByEmployeeCode`,{
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": Emp_code !==null ? Emp_code : isRequesterCode
                        })
                    }
                ).then((response) => {
                     return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if(response.success){
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setLeaveTypeLoading(false)
                            setGetLeaveType(response.data[0]);
                        }else{
                            setGetLeaveTypeErr(response.message);
                        }
                    }
                }).catch((error) => {
                    setLeaveTypeLoading("Something went wrong...")
                    setGetLeaveTypeErr(error.message);
                });
            } else {
                if(response.success){
                    setLeaveTypeLoading(false)
                    setGetLeaveType(response.data[0]);
                    console.log("get leave type",response.data[0])
                }else{
                    setGetLeaveTypeErr(response.message);
                }
            }
        }).catch((error) => {
            setLeaveTypeLoading("Something went wrong...")
            setGetLeaveTypeErr(error.message);
        });
    }
    // GET BALANCED DAYS API CALL ==========================================
    async function setBalanceDays(e, start, end) {
        await fetch(
            `${config["baseUrl"]}/leaves/GetBalanceDays`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": isRequesterCode !==null ? isRequesterCode : Emp_code,
                    "LeaveTypeCode": e !== null && e !== undefined && e !== "" ? e : isLeaveType,
                    "FromDate": start !== null && start !== undefined && start !== "" ? start : isFromDate,
                    "ToDate": end !== null && end !== undefined && end !== "" ? end : isToDate
                })
            }
        )
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/leaves/GetBalanceDays`,
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                            body: JSON.stringify({
                                "Emp_code": isRequesterCode !==null ? isRequesterCode : Emp_code,
                                "LeaveTypeCode": e !== null && e !== undefined && e !== "" ? e : isLeaveType,
                                "FromDate": start !== null && start !== undefined && start !== "" ? start : isFromDate,
                                "ToDate": end !== null && end !== undefined && end !== "" ? end : isToDate
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
                                setStoreBalancedDays(response?.data?.[0]?.[0]?.Leave_Balance)
                            }
                        })
                        .catch((error) => {
                            console.log(error.message)
                        });
                } else {
                    setStoreBalancedDays(response?.data?.[0]?.[0]?.Leave_Balance)
                }
            })
            .catch((error) => {
                console.log(error.message)
            });
    }
    // GET APPLIED DAYS API CALL ===========================================
    async function AppliedDaysFun(e, j) {
        await fetch(
            `${config["baseUrl"]}/leaves/GetLeaveAppliedDays`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": isRequesterCode !==null ? isRequesterCode : Emp_code,
                    "FromDate": isFromDateScd !== null && isFromDateScd !== undefined && isFromDateScd !== "" ? isFromDateScd : e,
                    "ToDate": isToDateScd !== null && isToDateScd !== undefined && isToDateScd !== "" ? isToDateScd : j
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaves/GetLeaveAppliedDays`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": isRequesterCode,
                            "FromDate": isFromDateScd,
                            "ToDate": isToDateScd
                        })
                    }
                ).then((response) => {
                        return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") { navigate("/") }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setAppliedLeave(response?.data[0]?.[0]?.Leaves)
                    }
                }).catch((error) => {
                    console.log(error.message)
                });
            } else {
                setAppliedLeave(response?.data[0]?.[0]?.Leaves)
            }
        }).catch((error) => {
            console.log(error.message)
        });
    }
    // SAVE LEAVE APPLICATION API CALL =====================================
    const saveLeaveApplication = async (e) => {
        e.preventDefault()
        await fetch(
            `${config["baseUrl"]}/manualLeavePosting/SaveManualLeavePosting`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": isTracCodeForEdit,
                    "Emp_code": isRequesterCode,
                    "Leave_type_code": isLeaveType !== null ? isLeaveType : isEditLeaveTypeCode,
                    "startDate": isFromDateScd,
                    "endDate": isToDate,
                    "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                    "reason": isLeaveReason ? isLeaveReason : ""
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/manualLeavePosting/SaveManualLeavePosting`,{
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                            body: JSON.stringify({
                                "Tran_Code": isTracCodeForEdit,
                                "Emp_code": isRequesterCode,
                                "Leave_type_code": isLeaveType !== null ? isLeaveType : isEditLeaveTypeCode,
                                "startDate": isFromDateScd,
                                "endDate": isToDate,
                                "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                                "reason": isLeaveReason ? isLeaveReason : ""
                            })
                        }
                    ).then((response) => {
                        return response.json();
                    }).then((response) => {
                            if (response.messsage == "timeout error") { navigate("/") }
                            else {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem("access_token", response.access_token);
                                if (response.success) {
                                    setTimeout(() => {
                                        submitLeaveApplication(e)
                                    }, 2000)
                                } else {
                                    showAlert(response.message, "warning")
                                    setTimeout(() => {
                                        showAlert("")
                                    }, 3000)
                                }
                            }
                        }).catch((error) => {
                            showAlert(error.message, "warning")
                            setTimeout(() => {
                                showAlert("")
                            }, 3000)
                        });
                } else {
                    if (response.success) {
                        setTimeout(() => {
                            submitLeaveApplication(e)
                        }, 2000)
                    } else {
                        showAlert(response.message, "warning")
                        setTimeout(() => {
                            showAlert("")
                        }, 3000)
                    }
                }
            }).catch((error) => {
                showAlert(error.message, "warning")
                setTimeout(() => {
                    showAlert("")
                }, 3000)
            });
    }
    // SUBMIT LEAVE APPLICATION API CALL ===================================
    const submitLeaveApplication = async (e) => {
        e.preventDefault()
        await fetch(
            `${config["baseUrl"]}/manualLeavePosting/SubmitManualLeavePosting`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": isRequesterCode,
                    "Leave_type_code": isLeaveType ? isLeaveType : isEditLeaveTypeCode,
                    "start_date": isFromDateScd,
                    "end_date": isToDate,
                    "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                    "reason": isLeaveReason ? isLeaveReason : ""
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/manualLeavePosting/SubmitManualLeavePosting`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": isRequesterCode,
                            "Leave_type_code": isLeaveType ? isLeaveType : isEditLeaveTypeCode,
                            "start_date": isFromDateScd,
                            "end_date": isToDate,
                            "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                            "reason": isLeaveReason ? isLeaveReason : ""
                        })
                    }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") { navigate("/") }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        if (response.success) {
                            showAlert("You have been submited leave application.", "success")
                            setTimeout(() => {
                                window.location.reload();
                            }, 4000)
                        } else {
                            showAlert(response.message, "warning")
                            setTimeout(() => {
                                showAlert("")
                            }, 4000)
                        }
                    }
                }).catch((error) => {
                    showAlert(error.message, "warning")
                    setTimeout(() => {
                        showAlert("")
                    }, 4000)
                });
            } else {
                if (response.success) {
                    showAlert("You have been submited leave application.", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 4000)
                } else {
                    showAlert(response.message, "warning")
                    setTimeout(() => {
                        showAlert("")
                    }, 4000)
                }
            }
        }).catch((error) => {
            showAlert(error.message, "warning")
            setTimeout(() => {
                showAlert("")
            }, 4000)
        });
    }
    // GET DATA OF LEAVE APPLICATION API CALL ==============================
    async function GetMyLeaveApplications() {
        setLoading1(true)
        setDataLoader1(false)
        await fetch(
            `${config["baseUrl"]}/manualLeavePostiing/getManualLeaveApplicationsByPostedByCode`,
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
                        `${config["baseUrl"]}/manualLeavePostiing/getManualLeaveApplicationsByPostedByCode`,
                        {
                            method: "GET",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                        }
                    ).then((response) => {
                        return response.json();
                    })
                        .then((response) => {
                            if (response.messsage == "timeout error") { navigate("/") }
                            else {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem("access_token", response.access_token);
                                setGetLeaveApplication(response?.data?.[0])
                                setLoading1(false)
                                setDataLoader1(true)
                            }
                        })
                        .catch((error) => {
                            setGetLeaveApplicationErr(error.message)
                            setLoading1(false)
                        });
                } else {
                    setGetLeaveApplication(response?.data[0])
                    setLoading1(false)
                    setDataLoader1(true)
                }
            })
            .catch((error) => { setGetLeaveApplicationErr(error.message) });
    }
    // DELETE ATTACHMENT API CALL =========================================
    const DeleteLeave = async (Emp_Code,start_date,end_date) => {
        await fetch(
            `${config["baseUrl"]}/manualLeavePosting/DeleteManualLeaveApplication`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": Emp_Code,
                    "startDate": start_date,
                    "endDate": end_date,
                })
            }
        ).then((response) => {
                return response.json();
            }).then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/manualLeavePosting/DeleteManualLeaveApplication`,
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                            body: JSON.stringify({
                                "Emp_code": Emp_Code,
                                "startDate": start_date,
                                "endDate": end_date,
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
                                    showAlert("Delete Successfully", "success")
                                    console.log(response.success, "Delete Successfully")
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 3000)
                                } else {
                                    showAlert(response.message, "warning")
                                }
                            }
                        })
                        .catch((error) => {
                            showAlert(error.message, "warning")
                        });
                } else {
                    if (response.success) {
                        showAlert(response.messsage, "success")
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000)
                    } else {
                        showAlert(response.message, "warning")
                    }
                }
            })
            .catch((error) => {
                showAlert(error.message, "warning")
            });
    }


    useEffect(() => {
        GetEmployeesName()
        GetMyLeaveApplications()
    }, [])

    useEffect(() => {
        if(isRequesterCode !==null || Emp_code !== null) {
          GetLeaveType()
        }
      }, [isRequesterCode])

    useEffect(() => {
        if(isFromDateScd !== null &&  isToDateScd !== null && isRequesterCode !== null || Emp_code !== null){
          AppliedDaysFun()
        }else{
          console.log("can't run AppliedDaysFun APi callback")
        }
      }, [isFromDateScd, isToDateScd, isRequesterCode])

    useEffect(() => {
        if(isFromDate !== null && isToDate !== null && isLeaveType !== null && isRequesterCode !== null || Emp_code !== null) {
          setBalanceDays()
        }else{
          console.log("can't run setBalanceDays APi callback")
        }
      }, [isFromDate, isToDate, isLeaveType,isRequesterCode])

    useEffect(() => {
        if (isStoreBalancedDays !== null && isAppliedLeave !== null) {
          if (isFromDateScd == isToDateScd || isFromDateScd !== isToDateScd && isHalfDayFlag == false) {
            if(isStoreBalancedDays == undefined){
              setRemainingdays("---")
            }else{
              setRemainingdays(isStoreBalancedDays - isAppliedLeave)
              setDatesErr("")
              setBtnDisabled(false)
            }
          }else if (isFromDateScd !== isToDateScd && isHalfDayFlag == true) {
            setDatesErr("To date is should be equal to From Date")
            setBtnDisabled(true)
          }else{
            setDatesErr("")
            setBtnDisabled(false)
          }
        }
      }, [isStoreBalancedDays, isAppliedLeave, isRemainingdays, isHalfDayFlag])


    const currentDate = new Date().toISOString().slice(0, 10);
    // const [FromDate, setFromDate] = useState(currentDate)
    // const [ToDate, setToDate] = useState(currentDate)



    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container px-2">
                <div className="container mt-1 Manual_Leaves_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="manual_Leaves_listHeader">
                            Manual Leave Application
                        </span>
                    </div>
                    <form action="" >
                        <div className="row px-2 mt-2 d-flex justify-content-center">
                            <div className="col-lg-10">
                                <div className="form-group w-100">
                                    <label htmlFor="">Requester Name</label>
                                    {EmployeesNameErr ? EmployeesNameErr : false}
                                    {/* {Required ? <p className='Required' >Please Select Requester</p> : false} */}
                                    <select name="" id="" className='form-select'  onChange={(e) => { 
                                        setRequesterCode(e.target.value)
                                        setRequired(false)}}>
                                        {/* <option value=""  selected disabled>Requester</option> */}
                                        {EmployeesName?.map((item) => {
                                            return (
                                                <option  value={item?.Emp_code}>{item.Emp_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="">Select Leave Type</label><br />
                                    {getLeaveTypeErr ? <span style={{fontSize: "13px",color: "red"}}>{getLeaveTypeErr}</span> : false}
                                    <select name="" id="" className='form-select' onChange={(e) => { setLeaveType(e.target.value) }}>
                                        <option selected disabled> {isLeaveTypeLoading == true ? "Please wait leave type is fetching..." : "Please Select The leave type..."}</option>
                                        {getLeaveType?.map((item) => {
                                            return (
                                                <>
                                                    <option
                                                        selected={isEditData.filter((items) => items?.Leave_type_code == item?.leave_type_code)[0]?.Leave_type_code ? true : false}
                                                        value={item?.leave_type_code}>{item?.leave_name}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="">Balance Day</label>
                                    <input type="text" readOnly value={isStoreBalancedDays} className='form-control' />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="" style={{ display: "inline-flex" }}>Applied days
                                        <div class="form-check mx-3">
                                            <input class="form-check-input" type="checkbox" onChange={(e) => {
                                                setHalfDayFlag(e.target.checked)
                                            }} id="halfDay" />
                                            <label class="form-check-label" htmlFor="halfDay">
                                                Half Day
                                            </label>
                                        </div>
                                    </label>
                                    <input type="text" value={isHalfDayFlag == true ? 0.5 : isAppliedLeave} readOnly className='form-control' />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="">Remaining Days</label>
                                    <input type="text" readOnly value={
                                        isHalfDayFlag == true ? isStoreBalancedDays - 0.5  : isStoreBalancedDays == 0 ? "----" : isRemainingdays
                                        } className='form-control' />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="">From Date</label>
                                    <input type="Date" name="" id="" value={isFromDate} className='form-control' onChange={(e) => {
                                        setFromDate(e.target.value)
                                        setFromDateScd(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group w-100">  
                                    <label htmlFor="">To Date</label>
                                    <input type="Date" name="" id="" value={isToDate} className='form-control' onChange={(e) => {
                                        setToDate(e.target.value)
                                        setToDateScd(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="">Reason</label>
                                    <textarea type="text" name="" id="" className='form-control' onChange={(e) => { setLeaveReason(e.target.value) }} />
                                </div>
                                <span style={{ color: "red", fontSize: "12px" }}>{isDatesErr}</span>
                            </div>
                        </div>
                        <div className="row mt-1 p-2 d-flex justify-content-center">
                            <div className="col-lg-10">
                                <div className="btnContainer">
                                    {/* {
                                        isShowTags ?
                                            <>
                                                <button type="submit" disabled={isBtnDisabled} className='btn btn-dark mx-1 LeaveSubmitbtn' onClick={submitLeaveApplication}>
                                                    Submit
                                            }
                                                </button>
                                            </> : */}
                                                
                                    <button type="submit" disabled={isBtnDisabled} className='btn btn-dark leaveSaveBtn' onClick={saveLeaveApplication}>
                                                Save
                                            </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="container px-2">
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
                                                                DeleteAttactmentsFile(items?.Tran_Code)
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
            </div> */}
            <div className="container px-2">
                <div className="container Leaves_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Leaves_listHeader">
                            Pending Applications
                        </span>
                    </div>
                    <div className="row  p-3 mt-2">
                        {loading1 && (
                            <div
                                className="d-flex justify-content-center align-items-center w-100"
                                style={{ height: "100px", background: "#d3d3d345" }}
                            >
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                        )}
                        {dataLoader1 && (
                            <div className='col-12 pendingTable'>

                                {
                                    isGetLeaveApplication.length > 0 ?
                                        <>

                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        {/* <th scope="col">TranCode</th> */}
                                                        <th scope="col">Employee Name</th>
                                                        <th scope="col">Leave Name</th>
                                                        <th scope="col">Leaves Days</th>
                                                        {/* <th scope="col">Posting Date</th> */}
                                                        <th scope="col">From Date</th>
                                                        <th scope="col">To Date</th>
                                                        {/* <th scope="col">Status</th> */}
                                                        {/* <th scope="col">Pending with</th> */}
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {isGetLeaveApplication.map((items) => {
                                                        return (
                                                            <tr>
                                                                {/* <td>{items?.Tran_Code ? items?.Tran_Code : "Not Found"}</td> */}
                                                                <td>{items?.Emp_name ? items?.Emp_name : "Not Found"}</td>
                                                                <td>{items?.Leave_name ? items?.Leave_name : "Not Found"}</td>
                                                                <td>{items?.Leave_Days ? items?.Leave_Days: "Not Found"}</td>
                                                                {/* <td>{items?.Posting_date ? items?.Posting_date : "Not Found"}</td> */}
                                                                <td>{items?.Start_Date ? items?.Start_Date : "Not Found"}</td>
                                                                <td>{items?.End_Date ? items?.End_Date : "Not Found"}</td>
                                                                {/* <td>{items?.Status ? items?.Status : "Not Found"}</td> */}
                                                                {/* <td>{items?.PendingWith ? items?.PendingWith : "Not Found"}</td> */}
                                                                <td><button className="editBtnTable" onClick={(e) => DeleteLeave(items?.Emp_code, items?.Start_Date, items?.End_Date )} >Delete</button></td>
                                                            </tr>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                        </> : <span className='text-center d-block'>No Pending Applications</span>
                                }

                            </div>
                        )}
                        {/* {isGetLeaveApplicationErr ? isGetLeaveApplicationErr : false} */}
                    </div>
                </div>
            </div>
            {
                <ul className="px-3" style={{ position: "fixed", bottom: "0", right: "0", widows: "50%" }}>
                    {isSaveleaveAlert && (
                        <li className={`alert alert-${isSaveleaveAlert.type}` + " " + "mt-4"}>{`${isSaveleaveAlert.message}`}</li>
                    )}
                </ul>
            }
           
        </>
    )
}

export default Manual_leave_posting 