import React, { useState, useEffect } from 'react'
import './assets/css/manual_leave_posting.css'
import { Link, json, useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import Header from '../components/Includes/Header';
const config = require('../config.json')

const Leaves = () => {
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
    const [formErr, setformErr] = useState(false)
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var Emp_code = secureLocalStorage.getItem("Emp_code");
    var Company_code = secureLocalStorage.getItem("company_code");

    const navigate = useNavigate()
    const [getLeaveType, setGetLeaveType] = useState([]);
    const [getLeaveTypeErr, setGetLeaveTypeErr] = useState(false);
    const [isFromDate, setFromDate] = useState(null)
    const [isToDate, setToDate] = useState(null)
    const [isLeaveType, setLeaveType] = useState(null)
    const [isStoreBalancedDays, setStoreBalancedDays] = useState(0)
    const [EmployeesName, setGetAttendanceName] = useState([])
    const [EmployeesNameErr, setGetAttendanceNameErr] = useState(false)
    const [isRequesterCode, setRequesterCode] = useState(false)
    const [isFromDateScd, setFromDateScd] = useState(null)
    const [isToDateScd, setToDateScd] = useState(null)
    const [isAppliedLeave, setAppliedLeave] = useState(null)
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
    const showAlert = (message, type) => {
        setSaveleaveAlert({
            message: message,
            type: type,
        })
    }

    // GET LEAVE TYPE API CALL =============================================
    async function GetLeaveType() {
        await fetch(
            `${config["baseUrl"]}/leaves/GetLeaveTypeByEmployeeCode`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaves/GetLeaveTypeByEmployeeCode`,
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
                            secureLocalStorage.setItem("access_token", response.access_token);
                            setGetLeaveType(response.data[0]);
                        }
                    })
                    .catch((error) => {
                        setGetLeaveTypeErr(error.message);
                    });
            } else {
                setGetLeaveType(response.data[0]);
            }
        })
            .catch((error) => {
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
                    "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : Emp_code,
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
                                "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : Emp_code,
                                "LeaveTypeCode": isLeaveType,
                                "FromDate": isFromDate,
                                "ToDate": isToDate
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
        // }
    }
    // GET REQUESTER NAME API CALL =========================================
    const GetEmployeesName = async (e) => {
        await fetch(`${config['baseUrl']}/leaves/GetEmployeeDetaillsUnderSupervision`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/leaves/GetEmployeeDetaillsUnderSupervision`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    localStorage.setItem("refresh", response.referesh_token);
                    secureLocalStorage.setItem("access_token", response.access_token);
                    setGetAttendanceName(response?.data[0])
                }).catch((errs) => { setGetAttendanceNameErr(errs.messsage) })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                setGetAttendanceName(response?.data[0])
            }
        }).catch((errs) => { setGetAttendanceNameErr(errs.messsage) })
    }
    // GET APPLIED DAYS API CALL ===========================================
    async function AppliedDaysFun(e, j) {
        if (isRequesterCode !== null && isFromDateScd !== null && isToDateScd !== null) {
            await fetch(
                `${config["baseUrl"]}/leaves/GetLeaveAppliedDays`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accessToken: `Bareer ${get_access_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
                        "FromDate": isFromDateScd !== null && isFromDateScd !== undefined && isFromDateScd !== "" ? isFromDateScd : e,
                        "ToDate": isToDateScd !== null && isToDateScd !== undefined && isToDateScd !== "" ? isToDateScd : j
                    })
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then(async (response) => {
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
                        )
                            .then((response) => {
                                return response.json();
                            })
                            .then((response) => {
                                if (response.messsage == "timeout error") { navigate("/") }
                                else {
                                    localStorage.setItem("refresh", response.referesh_token);
                                    secureLocalStorage.setItem("access_token", response.access_token);
                                    setAppliedLeave(response?.data[0]?.[0]?.Leaves)
                                }
                            })
                            .catch((error) => {
                                console.log(error.message)
                            });
                    } else {
                        setAppliedLeave(response?.data[0]?.[0]?.Leaves)
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }
    }
    // SAVE LEAVE APPLICATION API CALL =====================================
    const saveLeaveApplication = async (e) => {
        e.preventDefault()
        // var checkData = JSON.stringify({
        //   "Tran_Code": isTracCodeForEdit,
        //   "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
        //   "LeaveTypeCode":  isLeaveType !== null ? isLeaveType : isEditLeaveTypeCode,
        //   "FromDate": isFromDateScd,
        //   "ToDate": isToDate,
        //   "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
        //   "Reason": isLeaveReason? isLeaveReason : ""
        // })
        // console.log("object",checkData)
        // return
        await fetch(
            `${config["baseUrl"]}/leaves/SaveLeaveApplication`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": isTracCodeForEdit,
                    "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
                    "LeaveTypeCode": isLeaveType !== null ? isLeaveType : isEditLeaveTypeCode,
                    "FromDate": isFromDateScd,
                    "ToDate": isToDate,
                    "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                    "Reason": isLeaveReason ? isLeaveReason : ""
                })
            }
        )
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/leaves/SaveLeaveApplication`,
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                            body: JSON.stringify({
                                "Tran_Code": isTracCodeForEdit,
                                "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
                                "LeaveTypeCode": isLeaveType !== null ? isLeaveType : isEditLeaveTypeCode,
                                "FromDate": isFromDateScd,
                                "ToDate": isToDate,
                                "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                                "Reason": isLeaveReason ? isLeaveReason : ""
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
                                    showAlert("You have Applied Holidays", "success")
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000)
                                } else {
                                    showAlert(response.data, "warning")
                                }
                            }
                        })
                        .catch((error) => {
                            showAlert(error.message, "warning")
                        });
                } else {
                    if (response.success) {
                        showAlert("You have Applied Holidays", "success")
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000)
                    } else {
                        showAlert(response.data, "warning")
                    }
                }
            })
            .catch((error) => {
                showAlert(error.message, "warning")
            });
    }
    // EDIT LEAVE APPLICATION API CALL =====================================
    const EditLeaveApplication = async (e, chk, bal) => {
        await fetch(
            `${config["baseUrl"]}/leaves/GetTranLeavesByTranCode`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": e,
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
                            "Tran_Code": e,
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
                            setEditData(response.data[0])
                            var temp = response.data[0]
                            if (chk == "edit") {
                                setShowTags(true)
                                setEmpCode(temp?.[0]?.Emp_code)
                                setEditLeaveTypeCode(bal)
                                AppliedDaysFun(temp[0]?.Start_Date, temp[0]?.End_Date)
                                setBalanceDays(bal, temp[0]?.Start_Date, temp[0]?.End_Date)
                                setFromDate(temp[0]?.Start_Date)
                                setFromDateScd(temp[0]?.Start_Date)
                                setToDate(temp[0]?.End_Date)
                                setToDateScd(temp[0]?.End_Date)
                            }
                        }
                    }
                }).catch((error) => {
                    console.log("Edit Api", error)
                });
            } else {

                if (response.success) {
                    setEditData(response.data[0])
                    console.log("response.data[0]", response.data[0])
                    var temp = response.data[0]
                    if (chk == "edit") {
                        setShowTags(true)
                        setEmpCode(temp?.[0]?.Emp_code)
                        setEditLeaveTypeCode(bal)
                        AppliedDaysFun(temp[0]?.Start_Date, temp[0]?.End_Date)
                        setBalanceDays(bal, temp[0]?.Start_Date, temp[0]?.End_Date)
                        setFromDate(temp[0]?.Start_Date)
                        setFromDateScd(temp[0]?.Start_Date)
                        setToDate(temp[0]?.End_Date)
                        setToDateScd(temp[0]?.End_Date)
                    }
                }
            }
        }).catch((error) => {
            console.log("Edit Api", error)
        });
    }
    // SUBMIT LEAVE APPLICATION API CALL ===================================
    const submitLeaveApplication = async (e) => {
        e.preventDefault()
        await fetch(
            `${config["baseUrl"]}/leaves/SubmitLeaveApplication`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Tran_Code": isTracCodeForEdit ? isTracCodeForEdit : "0",
                    "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
                    "LeaveTypeCode": isLeaveType ? isLeaveType : isEditLeaveTypeCode,
                    "FromDate": isFromDateScd,
                    "ToDate": isToDate,
                    "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                    "Reason": isLeaveReason ? isLeaveReason : ""
                })
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaves/SubmitLeaveApplication`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Tran_Code": isTracCodeForEdit ? isTracCodeForEdit : "0",
                            "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
                            "LeaveTypeCode": isLeaveType ? isLeaveType : isEditLeaveTypeCode,
                            "FromDate": isFromDateScd,
                            "ToDate": isToDate,
                            "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                            "Reason": isLeaveReason ? isLeaveReason : ""
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
                            showAlert("You have been submited leave application.", "success")
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000)
                        } else {
                            showAlert(response.data, "warning")
                        }
                    }
                }).catch((error) => {
                    showAlert(error.message, "warning")
                });
            } else {
                if (response.success) {
                    showAlert("You have been submited leave application.", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } else {
                    showAlert(response.data, "warning")
                }
            }
        }).catch((error) => {
            showAlert(error.message, "warning")
        });
    }


    // GET DATA OF LEAVE APPLICATION API CALL ==============================
    async function GetMyLeaveApplications() {
        setLoading1(true)
        setDataLoader1(false)
        await fetch(
            `${config["baseUrl"]}/MyApplication/GetMyLeaveApplications`,
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
                        `${config["baseUrl"]}/MyApplication/GetMyLeaveApplications`,
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
                                secureLocalStorage.setItem("access_token", response.access_token);
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

    // UPLOAD ATTACHMENT API CALL ==========================================
    const uploadFileFun = async (e) => {
        e.preventDefault();
        var file = e.target.files[0]
        let formData = new FormData();
        if (file !== '') {
            formData.append("file", file);
        }
        formData.append("Tran_Code", isTracCodeForEdit);
        formData.append("Emp_Code", isEmpCode);
        formData.append("company_code", Company_code)
        await axios.post(`https://hrm-api.logomish.com/leaves/AddLeaveApplicationAttachment`, formData, {
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                Accept: "form-data",
            },
        }).then((response) => {
            setFileErr(response?.response?.data?.message)
        }).catch((errors) => {
            setFileErr(errors?.response?.data?.message)
        });
    }

    // GET ATTACHMENTS DATA API CALL ======================================
    async function GetAttachemnts() {
        setLoading2(true)
        setDataLoader2(false)
        await fetch(
            `${config["baseUrl"]}/leaves/GetLeaveAttachment`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/leaves/GetLeaveAttachment`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                    }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        localStorage.setItem("refresh", response.referesh_token);
                        secureLocalStorage.setItem("access_token", response.access_token);
                        setAttachmentsData(response?.data?.[0])
                        setLoading2(false)
                        setDataLoader2(true)
                    }
                }).catch((error) => {
                    setAttachmentsErr(error.message)
                });
            } else {
                setAttachmentsData(response?.data?.[0])
                setLoading2(false)
                setDataLoader2(true)
            }
        }).catch((error) => {
            setAttachmentsErr(error.message)
        });
    }



    useEffect(() => {
        GetLeaveType()
        GetEmployeesName()
        GetMyLeaveApplications()
        GetAttachemnts()
    }, [])
    useEffect(() => {
        setBalanceDays()
    }, [isFromDate, isToDate, isLeaveType])
    useEffect(() => {
        AppliedDaysFun()
    }, [isFromDateScd, isToDateScd, isRequesterCode])

    useEffect(() => {
        if (isStoreBalancedDays !== null && isAppliedLeave !== null) {
            if (isFromDateScd < isToDateScd && isHalfDayFlag == false) {
                setRemainingdays(isStoreBalancedDays - isAppliedLeave)
                setDatesErr("")
            } else if (isFromDateScd == isToDateScd && isHalfDayFlag == false) {
                setDatesErr("To date is should be greater then From date")
            } else if (isFromDateScd == isToDateScd && isHalfDayFlag == true) {
                setDatesErr("")
            } else if (isFromDateScd !== isToDateScd && isHalfDayFlag == true) {
                setDatesErr("To date is should be equal to From Date")
            }
        }
    }, [isStoreBalancedDays, isAppliedLeave, isRemainingdays, isHalfDayFlag])




    return (
        <>
        <div>
                <Header />
        </div>
            <div className="container  px-2">

                <div className="container mt-1 Posting_Leaves_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Posting_Leaves_listHeader">
                            Leave Application Form
                        </span>
                    </div>
                    <form action="" >
                        <div className="row px-2 mt-2 d-flex justify-content-center">
                            <div className="col-lg-10">
                                <div className="form-group w-100">
                                    <label htmlFor="">Requester Name</label>
                                    {EmployeesNameErr ? EmployeesNameErr : false}
                                    <select name="" id="" className='form-select' onChange={(e) => { setRequesterCode(e.target.value) }}>
                                        {EmployeesName?.map((item) => {
                                            return (
                                                <option selected={EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code ? true : false} value={item?.Emp_code}>{item.Emp_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="">Select Leave Type</label>
                                    {getLeaveTypeErr ? getLeaveTypeErr : false}
                                    <select name="" id="" className='form-select' onChange={(e) => { setLeaveType(e.target.value) }}>
                                        <option selected disabled>The leave type</option>
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
                                    <input type="text" readOnly value={isHalfDayFlag == true ? isStoreBalancedDays - 0.5 : isRemainingdays} className='form-control' />
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
                                    <button type="submit" className='btn btn-dark leaveSaveBtn' onClick={saveLeaveApplication}>
                                        Save Changes
                                    </button>
                                    {
                                        isShowTags ?
                                            <>
                                                <button type="submit" className='btn btn-dark mx-1 LeaveSubmitbtn' onClick={submitLeaveApplication}>
                                                    Submit
                                                </button>
                                                <button type="" className='btn btn-dark mx-1 AttactBtn'>
                                                    <input type="File" name="" id="" onChange={uploadFileFun} placeholder='Attechments' />
                                                </button>
                                            </> : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="container px-2">
                <div className="container Posting_Leaves_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Posting_Leaves_listHeader">
                            Attachments
                        </span>
                    </div>
                    <div className="row  p-3 mt-2">
                        <div className="col-12 attachmenttable">
                            <table class="table table-striped">
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
                                        <>
                                            {isAttachmentsData.length > 0 ?
                                                <>
                                                    {
                                                        isAttachmentsData?.map((items) => {
                                                            return (
                                                                <tr>
                                                                    <td>{items?.FileName ? items?.FileName.slice(0, 8) : "Not Found"}</td>
                                                                    <td>{items?.FileName ? <a href={`${config["baseUrl"]}/${items?.FileName}`} download>{items?.FileName.slice(0, 8)}</a> : "Not Found"}</td>
                                                                    <td>{items?.Reason ? items?.Reason : "Not Found"}</td>
                                                                    <td>{items?.Posting_date ? items?.Posting_date.slice(0, 10) : "Not Found"}</td>
                                                                    <td><button className="editBtnTable">Delete</button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </> :
                                                <>{isAttachmentsErr ? isAttachmentsErr : false}</>
                                            }
                                        </>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-2">
                <div className="container Posting_Leaves_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Posting_Leaves_listHeader">
                            Pending Applications
                        </span>
                    </div>
                    <div className="row  p-3 mt-2">
                        <div className="col-12 pendingTable">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">TranCode</th>
                                        <th scope="col">Employee Name</th>
                                        <th scope="col">Leave Name</th>
                                        <th scope="col">Leaves Days</th>
                                        <th scope="col">Posting Date</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Pending with</th>
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                        <>
                                            {
                                                isGetLeaveApplication.map((items) => {
                                                    return (
                                                        <tr>
                                                            <td>{items?.Tran_Code ? items?.Tran_Code : "Not Found"}</td>
                                                            <td>{items?.Emp_name ? items?.Emp_name : "Not Found"}</td>
                                                            <td>{items?.Leave_name ? items?.Leave_name : "Not Found"}</td>
                                                            <td>{items?.LeaveDays ? items?.LeaveDays : "Not Found"}</td>
                                                            <td>{items?.Posting_date ? items?.Posting_date : "Not Found"}</td>
                                                            <td>{items?.StartDate ? items?.StartDate : "Not Found"}</td>
                                                            <td>{items?.EndDate ? items?.EndDate : "Not Found"}</td>
                                                            <td>{items?.Status ? items?.Status : "Not Found"}</td>
                                                            <td>{items?.PendingWith ? items?.PendingWith : "Not Found"}</td>
                                                            <td><button className="editBtnTable" onClick={(e) => {
                                                                setTracCodeForEdit(items?.Tran_Code)
                                                                EditLeaveApplication(items?.Tran_Code, "edit", items.Leave_type_code)
                                                            }}>Edit</button></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </>
                                    )}
                                    {isGetLeaveApplicationErr ? isGetLeaveApplicationErr : false}
                                </tbody>
                            </table>
                        </div>
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
            {
                isFileErr && (
                    <ul className="px-3" style={{ position: "fixed", bottom: "0", right: "0", widows: "50%" }}>
                        {isFileErr && (
                            <li className={`alert alert-success` + " " + "mt-4"}>{`${isFileErr}`}</li>
                        )}
                    </ul>
                )
            } */}
        </>
    )
}

export default Leaves