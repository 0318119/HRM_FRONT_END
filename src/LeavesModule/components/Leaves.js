import React, { useState, useEffect } from 'react'
import '../assets/css/Leaves.css'
import { Link, json, useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import {saveAs} from "file-saver";
const config = require('../../config.json')

const Leaves = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const [currentDate, setCurrentDate] = useState(formattedDate);
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var Emp_code = localStorage.getItem("Emp_code");
  var Company_code = localStorage.getItem("company_code");
  const navigate = useNavigate()
  const [getLeaveType, setGetLeaveType] = useState([]);
  const [getLeaveTypeErr, setGetLeaveTypeErr] = useState(false);
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
  const [isLeaveReason, setLeaveReason] = useState(null)
  const [isSaveleaveAlert, setSaveleaveAlert] = useState(false)
  const [isRemainingdays, setRemainingdays] = useState("---")
  const [isGetLeaveApplication, setGetLeaveApplication] = useState([])
  const [isGetLeaveApplicationErr, setGetLeaveApplicationErr] = useState(false)
  const [isTracCodeForEdit, setTracCodeForEdit] = useState(null)
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
  const [isLeaveTypeLoading, setLeaveTypeLoading] = useState("")
  const [isEditableFileBox,setEditableFileBox] = useState("dontEditFile")

  const showAlert = (message, type) => {
    setSaveleaveAlert({
      message: message,
      type: type,
    })
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
          localStorage.setItem("access_token", response.access_token);
          setGetAttendanceName(response?.data[0])
        }).catch((errs) => { setGetAttendanceNameErr(errs.messsage) })
      }
      else if (response.messsage == "timeout error") { navigate('/') }
      else {
        setGetAttendanceName(response?.data[0])
      }
    }).catch((errs) => { setGetAttendanceNameErr(errs.messsage) })
  }
  // GET LEAVE TYPE API CALL =============================================
  async function GetLeaveType() {
    setLeaveTypeLoading(true)
      await fetch(
        `${config["baseUrl"]}/leaves/GetLeaveTypeByEmployeeCode`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accessToken: `Bareer ${get_access_token}`,
          },
          body: JSON.stringify({
            "Emp_code": isRequesterCode !== null ? isRequesterCode : Emp_code
          })
        }
      ).then((response) => {
        return response.json();
      }).then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/leaves/GetLeaveTypeByEmployeeCode`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
              },
              body: JSON.stringify({
                "Emp_code": isRequesterCode ? isRequesterCode : Emp_code
              })
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
                localStorage.setItem("access_token", response.access_token);
                setLeaveTypeLoading(false)
                setGetLeaveType(response.data[0]);
              }
            }).catch((error) => {
              setLeaveTypeLoading("Something went wrong...")
              setGetLeaveTypeErr(error.message);
            });
        } else {
          setLeaveTypeLoading(false)
          setGetLeaveType(response.data[0]);
        }
      }).catch((error) => {
        setGetLeaveTypeErr(error.messsage);
        setLeaveTypeLoading("Something went wrong...")
        console.log("setGetLeaveTypeErr",error)
      });
  }
  // GET BALANCED DAYS API CALL ==========================================
  async function setBalanceDays(leaveTypeId, start, end) {
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
          "LeaveTypeCode": leaveTypeId !== null && leaveTypeId !== undefined && leaveTypeId !== "" ? leaveTypeId : isLeaveType ,
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
                "LeaveTypeCode": leaveTypeId !== null && leaveTypeId !== undefined && leaveTypeId !== "" ? leaveTypeId : isLeaveType ,
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
    // }
  }
  // GET APPLIED DAYS API CALL ===========================================
  async function AppliedDaysFun(StartDate, EndDate) {
      await fetch(
        `${config["baseUrl"]}/leaves/GetLeaveAppliedDays`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accessToken: `Bareer ${get_access_token}`,
          },
          body: JSON.stringify({
            "Emp_code": isRequesterCode !==null ? isRequesterCode : Emp_code ,
            "FromDate": isFromDateScd !== null && isFromDateScd !== undefined && isFromDateScd !== "" ? isFromDateScd : StartDate,
            "ToDate": isToDateScd !== null && isToDateScd !== undefined && isToDateScd !== "" ? isToDateScd : EndDate
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
                  "Emp_code": isRequesterCode !==null ? isRequesterCode : Emp_code ,
                  "FromDate": isFromDateScd !== null && isFromDateScd !== undefined && isFromDateScd !== "" ? isFromDateScd : StartDate,
                  "ToDate": isToDateScd !== null && isToDateScd !== undefined && isToDateScd !== "" ? isToDateScd : EndDate
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
  // SAVE LEAVE APPLICATION API CALL =====================================
  const saveLeaveApplication = async (e) => {
    e.preventDefault()
    await fetch(
      `${config["baseUrl"]}/leaves/SaveLeaveApplication`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          "Tran_Code": isTracCodeForEdit !== null ? isTracCodeForEdit : "0",
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
                "Tran_Code": isTracCodeForEdit !== null ? isTracCodeForEdit : "0",
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
                localStorage.setItem("access_token", response.access_token);
                if (response.success) {
                  showAlert("You have Applied Holidays", "success")
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000)
                } else {
                  showAlert(response.data, "warning")
                  setTimeout(() => {
                    showAlert("", "")
                  }, 3000)
                }
              }
            })
            .catch((error) => {
              showAlert(error.message, "warning")
              setTimeout(() => {
                showAlert("", "")
              }, 3000)
            });
        } else {
          if (response.success) {
            showAlert("You have Applied Holidays", "success")
            setTimeout(() => {
              window.location.reload();
            }, 3000)
          } else {
            showAlert(response.message, "warning")
            setTimeout(() => {
              showAlert("", "")
            }, 3000)
            console.log("save leave response", response)
          }
        }
      }).catch((error) => {
        showAlert(error.message, "warning")
        setTimeout(() => {
          showAlert("", "")
        }, 3000)
        console.log("save leave warning", error)
      });
  }
  // EDIT LEAVE APPLICATION API CALL =====================================
  const EditLeaveApplication = async (tranId, chk, leaveTypeId) => {
    await fetch(
      `${config["baseUrl"]}/leaves/GetTranLeavesByTranCode`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          "Tran_Code": tranId,
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
              "Tran_Code": tranId,
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
              setEditData(response.data[0])
              var temp = response.data[0]
              if (chk == "edit") {
                setShowTags(true)
                setHalfDayFlag(temp?.[0]?.Leave_Days == 0.50 ? true : false)
                setEmpCode(temp?.[0]?.Emp_code)
                setEditLeaveTypeCode(leaveTypeId)
                AppliedDaysFun(temp[0]?.Start_Date, temp[0]?.End_Date)
                setBalanceDays(leaveTypeId, temp[0]?.Start_Date, temp[0]?.End_Date)
                setFromDate(temp[0]?.Start_Date)
                setFromDateScd(temp[0]?.Start_Date)
                setToDate(temp[0]?.End_Date)
                setToDateScd(temp[0]?.End_Date)
                setLeaveReason(temp[0]?.Reason)
              }
            }
          }
        }).catch((error) => {
          console.log("Edit Api", error)
        });
      } else {

        if (response.success) {
          setEditData(response.data[0])
          var temp = response.data[0]
          if (chk == "edit") {
            setShowTags(true)
            setHalfDayFlag(temp?.[0]?.Leave_Days == 0.50 ? true : false)
            setEmpCode(temp?.[0]?.Emp_code)
            setEditLeaveTypeCode(leaveTypeId)
            AppliedDaysFun(temp[0]?.Start_Date, temp[0]?.End_Date)
            setBalanceDays(leaveTypeId, temp[0]?.Start_Date, temp[0]?.End_Date)
            setFromDate(temp[0]?.Start_Date)
            setFromDateScd(temp[0]?.Start_Date)
            setToDate(temp[0]?.End_Date)
            setToDateScd(temp[0]?.End_Date)
            setLeaveReason(temp[0]?.Reason)
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
          "Tran_Code": isTracCodeForEdit !== null ? isTracCodeForEdit : "0",
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
              "Tran_Code": isTracCodeForEdit !== null ? isTracCodeForEdit : "0",
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
            localStorage.setItem("access_token", response.access_token);
            if (response.success) {
              showAlert("You have been submited leave application.", "success")
              setTimeout(() => {
                window.location.reload();
              }, 3000)
            } else {
              showAlert(response.message, "warning")
              setTimeout(() => {
                showAlert("", "")
              }, 3000)
            }
          }
        }).catch((error) => {
          showAlert(error.message, "warning")
          setTimeout(() => {
            showAlert("", "")
          }, 3000)
        });
      } else {
        if (response.success) {
          showAlert("You have been submited leave application.", "success")
          setTimeout(() => {
            window.location.reload();
          }, 3000)
        } else {
          showAlert(response.message, "warning")
          console.log("Submit Leave", response)
          setTimeout(() => {
            showAlert("", "")
          }, 3000)
        }
      }
    }).catch((error) => {
      showAlert(error.message, "warning")
      setTimeout(() => {
        showAlert("", "")
      }, 3000)
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
      setFileErr(response.data.message)
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    }).catch((errors) => {
      setFileErr(errors.response.data?.message)
      setTimeout(() => {
        setFileErr("")
      }, 3000)
    });
  }
  // GET ATTACHMENTS DATA API CALL ======================================
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
      body : JSON.stringify({
        "Tran_Code": isTracCodeForEdit
      })
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(
          `${config["baseUrl"]}/leaves/GetLeaveAttachmentByTranCode`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
            body : JSON.stringify({
              "Tran_Code": isTracCodeForEdit
            })
          }
        ).then((response) => {
          return response.json();
        }).then((response) => {
          if (response.messsage == "timeout error") {
            navigate("/");
          } else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            if (response.success) {
              setAttachmentsData(response?.data?.[0])
              setLoading2(false)
              setDataLoader2(true)
            } else { setAttachmentsErr(response.message) }
          }
        }).catch((error) => {
          setAttachmentsErr(error.message)
        });
      } else {
        if (response.success) {
          setAttachmentsData(response?.data?.[0])
          console.log("response?.data?.[0]",response?.data?.[0])
          setLoading2(false)
          setDataLoader2(true)
        } else { setAttachmentsErr(response.message) }
      }
    }).catch((error) => {
      setAttachmentsErr(error.message)
    });
  }
  // DELETE ATTACHMENT API CALL =========================================
  const DeleteAttactmentsFile = async (tracId) => {
    await fetch(
      `${config["baseUrl"]}/leaves/DeleteLeaveApplicationAttachment`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          "Tran_Code": tracId,
        })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/leaves/DeleteLeaveApplicationAttachment`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
              },
              body: JSON.stringify({
                "Tran_Code": tracId,
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
                  showAlert(response.message, "success")
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
            showAlert(response.message, "success")
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
    if(isTracCodeForEdit !== null){
      GetAttachemnts()
    }else{
      console.log("Can't run GetAttachemnts Funtion")
    }
  }, [isTracCodeForEdit])
  useEffect(() => {
    if(isRequesterCode !== null || Emp_code !== null) {
      GetLeaveType()
    }
  }, [isRequesterCode])
  useEffect(() => {
    if(isFromDate !== null && isToDate !== null && isLeaveType !== null && isRequesterCode !== null || Emp_code !== null) {
      setBalanceDays()
    }else{
      console.log("can't run  setBalanceDays APi callback")
    }
  }, [isFromDate, isToDate, isLeaveType,isRequesterCode])
  useEffect(() => {
    if(isFromDateScd !== null &&  isToDateScd !== null && isRequesterCode !== null || Emp_code !== null){
      AppliedDaysFun()
    }else{
      console.log("can't run AppliedDaysFun APi callback")
    }
  }, [isFromDateScd, isToDateScd, isRequesterCode])

  const [isBtnDisabled, setBtnDisabled] = useState(true)
  
  useEffect(() => {
    if (isStoreBalancedDays !== null && isAppliedLeave !== null) {
      if (isFromDateScd == isToDateScd || isFromDateScd !== isToDateScd && isHalfDayFlag == false) {
        if(isStoreBalancedDays == undefined){
          setRemainingdays("---")
          console.log("ddd")
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




  return (
    <>
      <div className="container px-2">
        <div className="container mt-1 Leaves_listContainer">
          <div className="row w-100 mx-0">
            <span className="Leaves_listHeader">
              Leave Application Form
            </span>
          </div>
          <form action="" >
            <div className="row px-2 mt-2 d-flex justify-content-center">
              <div className="col-lg-10">
                <div className="form-group w-100">
                  <label htmlFor="">Requester Name</label>
                  {EmployeesNameErr ? EmployeesNameErr : false}
                  <select name="" id="" className='form-select' onChange={(e) => {setRequesterCode(e.target.value)}}>
                    {EmployeesName?.map((item) => {
                      return (
                        <option selected={EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code ? true : false} value={item?.Emp_code}>{item.Emp_name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-group w-100">
                  <label htmlFor="">Select Leave Type</label> <br />
                  {getLeaveTypeErr ? <span style={{color: "red"}}>{getLeaveTypeErr}</span> : false}
                  <select className='form-select' onChange={(e) => { setLeaveType(e.target.value) }}>
                    <option selected disabled>  {isLeaveTypeLoading == true ? "Please wait leave type is fetching..." : "Please Select The leave type..."} </option>
                    {isLeaveTypeLoading == false ? 
                      <>
                        {getLeaveType?.map((item) => {
                          return (
                            <>
                              <option
                                selected={isEditData.filter((items) => items?.Leave_type_code == item?.leave_type_code)[0]?.Leave_type_code ? true : false}
                                value={item?.leave_type_code}>{item?.leave_name}</option>
                            </>
                          )
                        })}
                      </> : <option value="">{isLeaveTypeLoading}</option>
                    }
                  </select>
                </div>
                <div className="form-group w-100">
                  <label htmlFor="">Balance Day</label>
                  <input type="text" readOnly value={isStoreBalancedDays} className='form-control' />
                </div>
                <div className="form-group w-100">
                  <label htmlFor="" style={{ display: "inline-flex" }}>Applied days
                    <div class="form-check mx-3">
                      <input class="form-check-input" type="checkbox" checked={isHalfDayFlag} onChange={(e) => {
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
                  <textarea type="text" defaultValue={isLeaveReason? isLeaveReason : ""} className='form-control' onChange={(e) => { setLeaveReason(e.target.value) }} />
                </div>
                <span style={{ color: "red", fontSize: "12px" }}>{isDatesErr}</span>
              </div>
            </div>
            <div className="row mt-1 p-2 d-flex justify-content-center">
              <div className="col-lg-10">
                <div className="btnContainer">
                  <button type="submit" disabled={isBtnDisabled} className='btn btn-dark leaveSaveBtn' onClick={saveLeaveApplication}>
                    Save Changes
                  </button>
                  {
                    isShowTags ?
                      <>
                        <button type="submit" disabled={isBtnDisabled} className='btn btn-dark mx-1 LeaveSubmitbtn' onClick={submitLeaveApplication}>
                          Submit
                        </button>
                        <button type="" className='btn btn-dark mx-1 AttactBtn'>
                          <input type="file" name="" id="" onChange={uploadFileFun} accept="image/*" placeholder='Attechments' />
                        </button>
                      </> : ""
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {
         isEditableFileBox == "editableFile" ? 
          <div className="container px-2">
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
                        {isAttachmentsData?.length > 0 ?
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
                                      <td>{items?.FileName ? <a style={{background: "#014f86",cursor: "pointer"}} className='text-white text-center py-1 px-3 rounded'
                                       onClick={(e) => {
                                        const imageSource = `${config["baseUrl"]}/${items?.File_Path}`;
                                        saveAs(imageSource, "employeesAttachments");
                                      }}
                                      >Download</a> : "Not Found"}</td>
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
                        {isAttachmentsErr ? isAttachmentsErr : false}
                        {/* <></>
                        */}
                      </div>
                    )}
              </div>
            </div>
          </div> : false
      }
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
                  isGetLeaveApplication?.length > 0 ?
                    <table className='table table-striped'>
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
                        <>
                          {
                            isGetLeaveApplication.map((items) => {
                              // {
                              //   console.log("items",items)
                              // }
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
                                  {
                                    items?.Emp_name == items?.PendingWith ?
                                    <td><button className="editBtnTable"  onClick={(e) => {
                                      setTracCodeForEdit(items?.Tran_Code)
                                      setLeaveType(items?.Leave_type_code)
                                      setEditableFileBox("editableFile")
                                      EditLeaveApplication(items?.Tran_Code, "edit", items.Leave_type_code)
                                    }}>Edit</button></td> : 
                                    <td><span style={{
                                      background: "grey",
                                      padding: "5px 13px",
                                      borderRadius: "20px",
                                      fonSize: "12px",
                                      color: "white"
                                    }}>Submitted</span></td>
                                  }
                                </tr>
                                //  "Tran_Code": isTracCodeForEdit,
                                //  "Emp_code": EmployeesName ? EmployeesName.filter((items) => items?.Emp_code == Emp_code)[0]?.Emp_code : isRequesterCode,
                                //  "LeaveTypeCode": isLeaveType !== null ? isLeaveType : isEditLeaveTypeCode,
                                //  "FromDate": isFromDateScd,
                                //  "ToDate": isToDate,
                                //  "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
                                //  "Reason": isLeaveReason ? isLeaveReason : ""
                              )
                            })
                          }
                        </>
                      </tbody>
                    </table> : <span className='text-center d-block'>No Pending Applications</span>
                }
              </div>
            )}
            {isGetLeaveApplicationErr ? isGetLeaveApplicationErr : false}
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
      }
    </>
  )
}

export default Leaves