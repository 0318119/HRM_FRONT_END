import React, { useState, useEffect } from 'react'
import '../LeavesModule/assets/css/manual_leave_posting.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../components/Includes/Header';
import * as MANUAL_LEAVE_POSTING_ACTIONS from "../store/actions/Leave/Manual_Leave_Posting/index";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as yup from "yup";
import { message } from 'antd';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/basic/input";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import { PrimaryButton } from '../components/basic/button';

const config = require('../config.json')

const Manual_leave_posting = ({
    Red_Manual_Leave_Posting,
    GET_ALL_EMP_DATA,
    GET_EMP_LEAVE_TYPE_DATA,
    GET_EMP_APPLIED_LEAVE_DATA,
    GET_EMP_BALANCED_DAYS
}) => {
    var Emp_code = localStorage.getItem("Emp_code");
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var Company_code = localStorage.getItem("company_code");
    const currentDate = new Date().toISOString().slice(0, 10);
    const emp_all_data = Red_Manual_Leave_Posting?.AllEmployees?.[0]
    const emp_leave_type_data = Red_Manual_Leave_Posting?.leavetype?.[0]?.res
    const emp_leaves_applied = Red_Manual_Leave_Posting?.appliedDays?.[0]?.res
    const emp_balanced_days = Red_Manual_Leave_Posting?.balanceDays?.[0]?.res
    const [leaveCalculations,setleaveCalculations] =  useState(0)
    const [halfDayCheck,sethalfDayCheck] = useState(0)
    const [isLeaveReq,setLeaveReq] = useState(Emp_code)
    const [isLeave,setLeave] = useState(null)
    const [isLeaveReason, setLeaveReason] = useState(null)
    const [isDate, setDate] = useState([
        { FromDate: currentDate },{ ToDate: currentDate },
      ]);
    const [isDateScd, setDateScd] = useState([
         { FromDate: currentDate },{ ToDate: currentDate },
    ]);

    const {
        control,
        formState: { errors },
    }  = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(),
    });

    useEffect(() => {
        GET_ALL_EMP_DATA()
    }, [])

    useEffect (() => {
        if(isLeaveReq !== null){
            GET_EMP_LEAVE_TYPE_DATA(isLeaveReq)
        }
    },[isLeaveReq])

    useEffect(() => {
        if(isLeaveReq !== null){
            GET_EMP_APPLIED_LEAVE_DATA({
                code: isLeaveReq,
                startDate: isDate[0].FromDate,
                endDate: isDate[1].ToDate
            })
        }
    },[isDate,isLeaveReq])
    
     useEffect(() => {
        if(emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code){
            GET_EMP_BALANCED_DAYS({
                code: isLeaveReq,
                leave_code: emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code,
                startDate: isDateScd[0].FromDate,
                endDate: isDateScd[1].ToDate
            })
            setLeave(emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code)
        }
     },[isDateScd,emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code,isLeaveReq])

     useEffect(() => {
        if(isLeave){
            setLeave(emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code)
        }
     },[isLeave,emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code])


     useEffect(() => {
        if(halfDayCheck == false && emp_balanced_days){
            setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - emp_leaves_applied?.data?.[0]?.[0]?.Leaves)
        }else if(halfDayCheck == true && isDateScd[0].FromDate === isDateScd[1].ToDate){
            setleaveCalculations(emp_balanced_days - 0.5)
        }else if(halfDayCheck == true && isDateScd[0].FromDate !== isDateScd[1].ToDate){
            message.error("To date is should be equal to From Date")
            console.log("dbjdghk")
        }else{setleaveCalculations(emp_balanced_days?.data?.[0]?.[0]?.Leave_Balance - emp_leaves_applied?.data?.[0]?.[0]?.Leaves)}
    },[emp_balanced_days,emp_leaves_applied,halfDayCheck])


    if(emp_all_data?.res?.message == "failed")
    {message.error("in all Employee :"+emp_all_data?.res?.message)}
    else if(emp_leaves_applied?.message == "failed")
    {message.error("in leave Applied :"+emp_leaves_applied?.message)}
    else if(emp_leave_type_data?.message == "failed")
    {message.error(emp_leave_type_data?.message)}
    else if(emp_balanced_days?.message == "failed")
    {message.error(emp_balanced_days?.message)}

    // HALF DAY FLAG EVENT =================
     const changeBox =(e)=>{
        if(e.target.checked == true){
            sethalfDayCheck(e.target.checked)
        }else{
            sethalfDayCheck(e.target.checked)
        }
     }
    
    // SAVE LEAVE APPLICATION API CALL =====================================
    const payLoad = JSON.stringify({
        "Tran_Code": 0,
        "Emp_code": isLeaveReq,
        "Leave_type_code": isLeave,
        "startDate": isDate[0].FromDate,
        "endDate": isDate[1].FromDate,
        "LeaveDays": halfDayCheck == true ? 0.5 : emp_leaves_applied?.data?.[0]?.[0]?.Leaves,
        "reason": isLeaveReason
    })
    const saveLeaveApplication = async (e) => {
    e.preventDefault()
    if(isDate[0].FromDate == null){message.error("Start Date is required")}
    else if(isDate[1].ToDate == null){message.error("End Date is required")}
    else if(isLeave == null){message.error("Leave Type is required")}
    else if(isLeaveReason == null){message.error("Leave Reason is required")}
    else if(halfDayCheck == true && isDateScd[0].FromDate !== isDateScd[1].ToDate)
    {message.error("To date is should be equal to From Date")}
    else{
        await fetch(
            `${config["baseUrl"]}/manualLeavePosting/SaveManualLeavePosting`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: payLoad
            }
        ).then((response) => {
            return response.json();
        }).then((response) => {
            if(response?.success){submitLeaveApplication(e)}
            else(message.error(response?.message || response?.messsage))
        })
        .catch((error) => {message.error(error?.message)});
    }
    }
    const submitLeaveApplication = async (e) => {
        e.preventDefault()
            await fetch(
                `${config["baseUrl"]}/manualLeavePosting/SubmitManualLeavePosting`,{
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accessToken: `Bareer ${get_access_token}`,
                    },
                    body: payLoad
                }
            ).then((response) => {
                return response.json();
            }).then((response) => {
                if(response?.success){message.success("Submit : You have applied leave!")}
                else(message.error(response?.message || response?.messsage))
            })
            .catch((error) => {message.error(error?.message)});
        }
    // // SUBMIT LEAVE APPLICATION API CALL ===================================
    // const submitLeaveApplication = async (e) => {
    //     e.preventDefault()
    //     await fetch(
    //         `${config["baseUrl"]}/manualLeavePosting/SubmitManualLeavePosting`,{
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //                 accessToken: `Bareer ${get_access_token}`,
    //             },
    //             body: JSON.stringify({
    //                 "Emp_code": isRequesterCode,
    //                 "Leave_type_code": isLeaveType ? isLeaveType : isEditLeaveTypeCode,
    //                 "start_date": isFromDateScd,
    //                 "end_date": isToDate,
    //                 "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
    //                 "reason": isLeaveReason ? isLeaveReason : ""
    //             })
    //         }
    //     ).then((response) => {
    //         return response.json();
    //     }).then(async (response) => {
    //         if (response.messsage == "unauthorized") {
    //             await fetch(
    //                 `${config["baseUrl"]}/manualLeavePosting/SubmitManualLeavePosting`,
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         "content-type": "application/json",
    //                         refereshToken: `Bareer ${get_refresh_token}`,
    //                     },
    //                     body: JSON.stringify({
    //                         "Emp_code": isRequesterCode,
    //                         "Leave_type_code": isLeaveType ? isLeaveType : isEditLeaveTypeCode,
    //                         "start_date": isFromDateScd,
    //                         "end_date": isToDate,
    //                         "LeaveDays": isHalfDayFlag == true ? 0.5 : isAppliedLeave,
    //                         "reason": isLeaveReason ? isLeaveReason : ""
    //                     })
    //                 }
    //             ).then((response) => {
    //                 return response.json();
    //             }).then((response) => {
    //                 if (response.messsage == "timeout error") { navigate("/") }
    //                 else {
    //                     localStorage.setItem("refresh", response.referesh_token);
    //                     localStorage.setItem("access_token", response.access_token);
    //                     if (response.success) {
    //                         showAlert("You have been submited leave application.", "success")
    //                         setTimeout(() => {
    //                             window.location.reload();
    //                         }, 4000)
    //                     } else {
    //                         showAlert(response.message, "warning")
    //                         setTimeout(() => {
    //                             showAlert("")
    //                         }, 4000)
    //                     }
    //                 }
    //             }).catch((error) => {
    //                 showAlert(error.message, "warning")
    //                 setTimeout(() => {
    //                     showAlert("")
    //                 }, 4000)
    //             });
    //         } else {
    //             if (response.success) {
    //                 showAlert("You have been submited leave application.", "success")
    //                 setTimeout(() => {
    //                     window.location.reload();
    //                 }, 4000)
    //             } else {
    //                 showAlert(response.message, "warning")
    //                 setTimeout(() => {
    //                     showAlert("")
    //                 }, 4000)
    //             }
    //         }
    //     }).catch((error) => {
    //         showAlert(error.message, "warning")
    //         setTimeout(() => {
    //             showAlert("")
    //         }, 4000)
    //     });
    // }
    // // GET DATA OF LEAVE APPLICATION API CALL ==============================
    // async function GetMyLeaveApplications() {
    //     setLoading1(true)
    //     setDataLoader1(false)
    //     await fetch(
    //         `${config["baseUrl"]}/manualLeavePostiing/getManualLeaveApplicationsByPostedByCode`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "content-type": "application/json",
    //                 accessToken: `Bareer ${get_access_token}`,
    //             },
    //         }
    //     )
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then(async (response) => {
    //             if (response.messsage == "unauthorized") {
    //                 await fetch(
    //                     `${config["baseUrl"]}/manualLeavePostiing/getManualLeaveApplicationsByPostedByCode`,
    //                     {
    //                         method: "GET",
    //                         headers: {
    //                             "content-type": "application/json",
    //                             refereshToken: `Bareer ${get_refresh_token}`,
    //                         },
    //                     }
    //                 ).then((response) => {
    //                     return response.json();
    //                 })
    //                     .then((response) => {
    //                         if (response.messsage == "timeout error") { navigate("/") }
    //                         else {
    //                             localStorage.setItem("refresh", response.referesh_token);
    //                             localStorage.setItem("access_token", response.access_token);
    //                             setGetLeaveApplication(response?.data?.[0])
    //                             setLoading1(false)
    //                             setDataLoader1(true)
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         setGetLeaveApplicationErr(error.message)
    //                         setLoading1(false)
    //                     });
    //             } else {
    //                 setGetLeaveApplication(response?.data[0])
    //                 setLoading1(false)
    //                 setDataLoader1(true)
    //             }
    //         })
    //         .catch((error) => { setGetLeaveApplicationErr(error.message) });
    // }
    // // DELETE ATTACHMENT API CALL =========================================
    // const DeleteLeave = async (Emp_Code,start_date,end_date) => {
    //     await fetch(
    //         `${config["baseUrl"]}/manualLeavePosting/DeleteManualLeaveApplication`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //                 accessToken: `Bareer ${get_access_token}`,
    //             },
    //             body: JSON.stringify({
    //                 "Emp_code": Emp_Code,
    //                 "startDate": start_date,
    //                 "endDate": end_date,
    //             })
    //         }
    //     ).then((response) => {
    //             return response.json();
    //         }).then(async (response) => {
    //             if (response.messsage == "unauthorized") {
    //                 await fetch(
    //                     `${config["baseUrl"]}/manualLeavePosting/DeleteManualLeaveApplication`,
    //                     {
    //                         method: "POST",
    //                         headers: {
    //                             "content-type": "application/json",
    //                             refereshToken: `Bareer ${get_refresh_token}`,
    //                         },
    //                         body: JSON.stringify({
    //                             "Emp_code": Emp_Code,
    //                             "startDate": start_date,
    //                             "endDate": end_date,
    //                         })
    //                     }
    //                 )
    //                     .then((response) => {
    //                         return response.json();
    //                     })
    //                     .then((response) => {
    //                         if (response.messsage == "timeout error") { navigate("/") }
    //                         else {
    //                             localStorage.setItem("refresh", response.referesh_token);
    //                             localStorage.setItem("access_token", response.access_token);
    //                             if (response.success) {
    //                                 showAlert("Delete Successfully", "success")
    //                                     setTimeout(() => {
    //                                         window.location.reload();
    //                                     }, 3000)
    //                             } else {
    //                                 showAlert(response.message, "warning")
    //                             }
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         showAlert(error.message, "warning")
    //                     });
    //             } else {
    //                 if (response.success) {
    //                     showAlert(response.messsage, "success")
    //                     setTimeout(() => {
    //                         window.location.reload();
    //                     }, 3000)
    //                 } else {
    //                     showAlert(response.message, "warning")
    //                 }
    //             }
    //         })
    //         .catch((error) => {
    //             showAlert(error.message, "warning")
    //         });
    // }

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 maringClass manual_Leaves_bg">
                        <form onSubmit={saveLeaveApplication}>
                            <h5 className='text-dark'><b>Manual Leave Application</b></h5>
                            <div>
                                <FormSelect
                                    label={"Select the requester name"}
                                    placeholder="please select the requester name"
                                    id="Emp_code"
                                    name="Emp_code"
                                    value={emp_all_data?.res?.data?.filter((items) => items?.Emp_code == isLeaveReq)?.[0]?.Emp_name}
                                    onChange={(e)=> {
                                        setLeaveReq(e)
                                    }}
                                    options={emp_all_data?.res?.data?.map(
                                        (item) => ({
                                            value: item.Emp_code,
                                            label: item.Emp_name,
                                        })
                                    )}
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                 <FormSelect
                                    label={"Select the leave type"}
                                    placeholder="please select the leave type"
                                    id="Leave_type_code"
                                    name="Leave_type_code"
                                    value={emp_leave_type_data?.data?.[0]?.[0]?.leave_name}
                                    onChange={(e)=> {
                                        setLeave(e)
                                    }}
                                    options={[
                                        {
                                            value: emp_leave_type_data?.data?.[0]?.[0]?.leave_type_code,
                                            label: emp_leave_type_data?.data?.[0]?.[0]?.leave_name
                                        }
                                    ]}
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput 
                                    label={'Balance Days'} 
                                    placeholder={'Balance Days'}
                                    readOnly={true}
                                    id=""
                                    name=""
                                    value={leaveCalculations ? leaveCalculations : 0}
                                    type="number"
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <div className='manualLeavePostionHalfDayBox'>
                                    <FormInput 
                                        className={'appliedInput'}
                                        label={'Applied Days'} 
                                        placeholder={'Applied Days'}
                                        readOnly={true}
                                        id=""
                                        name=""
                                        type="number"
                                        value={halfDayCheck == false ? emp_leaves_applied?.data?.[0]?.[0]?.Leaves : 0.5}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <Input placeholder={false} label={"Half Day"} type="checkbox" className="half_day"
                                        onChange={(e) => {changeBox(e)}}
                                    />
                                </div>
                                <FormInput 
                                    label={'From Date'}  
                                    placeholder={'From Date'}
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    defaultValue={currentDate}
                                    onChange={(e)=> {
                                        setDate(prevData => {
                                            const newDate = [...prevData];
                                            newDate[0].FromDate = e.target.value;
                                            return newDate;
                                        });
                                        setDateScd(prevData => {
                                            const newDate = [...prevData];
                                            newDate[1].ToDate = e.target.value;
                                            return newDate;
                                        });
                                    }}
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput 
                                    label={'To Date'}  
                                    placeholder={'To Date'}
                                    defaultValue={currentDate}
                                    onChange={(e)=> {
                                        setDate(prevData => {
                                            const newDate = [...prevData];
                                            newDate[1].ToDate = e.target.value;
                                            return newDate;
                                        });
                                        setDateScd(prevData => {
                                            const newDate = [...prevData];
                                            newDate[1].ToDate = e.target.value;
                                            return newDate;
                                        });
                                    }}
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput 
                                    label={'Reason'}  
                                    placeholder={'Please enter reason'}
                                    id="reason"
                                    name="reason"
                                    onChange={(e)=>{setLeaveReason(e.target.value)}}
                                    type="text"
                                    showLabel={true}
                                    errors={errors}
                                    control={control}
                                />
                            </div>
                            <div className='CountryBtnBox'>
                                {/* loading={isLoading} */}
                                <PrimaryButton type={'submit'}  title="Save"/>
                            </div>
                        </form>
                    </div>
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
            {/* <div className="container px-2">
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
                                                        <th scope="col">Employee Name</th>
                                                        <th scope="col">Leave Name</th>
                                                        <th scope="col">Leaves Days</th>
                                                        <th scope="col">From Date</th>
                                                        <th scope="col">To Date</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {isGetLeaveApplication.map((items) => {
                                                        return (
                                                            <tr>
                                                                <td>{items?.Emp_name ? items?.Emp_name : "Not Found"}</td>
                                                                <td>{items?.Leave_name ? items?.Leave_name : "Not Found"}</td>
                                                                <td>{items?.Leave_Days ? items?.Leave_Days: "Not Found"}</td>
                                                                <td>{items?.Start_Date ? items?.Start_Date : "Not Found"}</td>
                                                                <td>{items?.End_Date ? items?.End_Date : "Not Found"}</td>
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
                        {isGetLeaveApplicationErr ? isGetLeaveApplicationErr : false}
                    </div>
                </div>
            </div> */}
        </>
    )
}


function mapStateToProps({ Red_Manual_Leave_Posting }) {
    return { Red_Manual_Leave_Posting };
  }
export default connect(mapStateToProps, MANUAL_LEAVE_POSTING_ACTIONS)(Manual_leave_posting) 