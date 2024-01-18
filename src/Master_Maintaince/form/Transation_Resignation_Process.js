// import React, { useState, useEffect } from 'react'
// import '../assets/css/TransactionResignationForm.css'
// import Header from '../../components/Includes/Header'
// import secureLocalStorage from 'react-secure-storage';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// const config = require('../../config.json')


// const Transaction_Resingnation_form = (props) => {

//     var get_refresh_token = localStorage.getItem("refresh");
//     var get_access_token = localStorage.getItem("access_token");
//     const search = useLocation().search
//     var regId = new URLSearchParams(search).get('regId')
//     var AlreadyProcess = new URLSearchParams(search).get('Process')
//     const [WhichAction, setWhichAction] = useState(AlreadyProcess !== null ? "DeleteAndProcess" : "Save")
//     const [isSaved, setSaved] = useState(false)
//     const currentDate = new Date().toISOString().slice(0, 10);
//     const [isGetInfo, setGetInfo] = useState([])
//     const [isGetInfoErr, setGetInfoErr] = useState("")
//     const [isResignationRemarks, setResignationRemarks] = useState('')

//     const [isResignationDate,setResignationDate] = useState(currentDate)
//     const [isSubmissionDate,setSubmissionDate] = useState(currentDate)
//     const [isAcceptanceDate,setAcceptanceDate] = useState(currentDate)

//     const [isBtn, setBtn] = useState({
//         saveBtnLoading: false,
//         saveBtnDisabled: false,
//         // =================================================================
//         processBtnLoading: false,
//         processBtnDisabled: false,
//         // =================================================================
//         deleteBtnLoading: false,
//         deleteBtnDisabled: false,
//         // =================================================================
//     })

//     const navigate = useNavigate()
//     const showAlert = (message, type) => {
//         setSaved({
//             message: message,
//             type: type,
//         })
//     }


//     // GET RESIGNATION BY ID API CALL =================================================================
//     async function getInfo() {
//         await fetch(`${config["baseUrl"]}/Resignation/GetTranResignationByEmpCode`, {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//                 accessToken: `Bareer ${get_access_token}`,
//             },
//             body: JSON.stringify({
//                 "Emp_Code": regId
//             }),
//         }
//         ).then((response) => {
//             return response.json();
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(
//                     `${config["baseUrl"]}/Resignation/GetTranResignationByEmpCode`,
//                     {
//                         method: "POST",
//                         headers: {
//                             "content-type": "application/json",
//                             refereshToken: `Bareer ${get_refresh_token}`,
//                         },
//                         body: JSON.stringify({
//                             "Emp_Code": regId
//                         }),
//                     }
//                 ).then((response) => {
//                     return response.json();
//                 })
//                     .then((response) => {
//                         if (response.messsage == "timeout error") {
//                             navigate("/");
//                         } else {
//                             if (response.success) {
//                                 localStorage.setItem("refresh", response.referesh_token);
//                                 localStorage.setItem("access_token", response.access_token);
//                                 setGetInfo(response?.data)
//                             } else {
//                                 setGetInfoErr(response.message)
//                             }
//                         }
//                     }).catch((error) => { setGetInfoErr(error.messsage) });
//             } else {
//                 if (response.success) {
//                     setGetInfo(response?.data[0][0])
//                 } else {
//                     setGetInfoErr(response.message)
//                 }
//             }
//         }).catch((error) => { 
//             setGetInfoErr(error.message) 
//         });
//     }
//     // SAVE RESIGNATION API CALL =================================================================
//     const SaveDetail = async (e) => {
//         e.preventDefault();
//         setBtn({
//             saveBtnLoading: true,
//             saveBtnDisabled: true,
//         })
//         await fetch(`${config['baseUrl']}/Resignation/SaveTranResignation`, {
//             method: "POST",
//             headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
//             body: JSON.stringify({
// "Emp_Code": regId,
// "Resig_code": 6,
// "Transaction_Date": currentDate,
// "Resignation_Submission_Date": isSubmissionDate !==null? isSubmissionDate : currentDate,
// "Resignation_Acceptance_Date": isAcceptanceDate !==null? isAcceptanceDate : currentDate,
// "Resignation_Date": isResignationDate !==null? isResignationDate : currentDate,
// "Remarks": isResignationRemarks,
//             })
//         }).then((response) => {
//             return response.json()
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config['baseUrl']}/Resignation/SaveTranResignation`, {
//                     method: "POST",
//                     headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
//                     body: JSON.stringify({
//                         "Emp_Code": regId,
//                         "Resig_code": 6,
//                         "Transaction_Date": currentDate,
//                         "Resignation_Submission_Date": isSubmissionDate !==null? isSubmissionDate : currentDate,
//                         "Resignation_Acceptance_Date": isAcceptanceDate !==null? isAcceptanceDate : currentDate,
//                         "Resignation_Date": isResignationDate !==null? isResignationDate : currentDate,
//                         "Remarks": isResignationRemarks,
//                     })
//                 }).then(response => {
//                     return response.json()
//                 }).then(response => {
//                     if (response.success) {
//                         localStorage.setItem("refresh", response.referesh_token);
//                         localStorage.setItem("access_token", response.access_token);
//                         setBtn({
//                             saveBtnLoading: false,
//                             saveBtnDisabled: false,
//                         })
//                         showAlert("Your Request Has been Saved", "success")
//                         setTimeout(() => { showAlert("") }, 3000)
//                         setWhichAction("DeleteAndProcess")
//                     } else {
//                         setBtn({
//                             saveBtnLoading: false,
//                             saveBtnDisabled: false,
//                         })
//                         showAlert(response.messsage, "warning")
//                     }

//                 }).catch((errs) => {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert(errs.messsage, "warning")
//                 })
//             }
//             else if (response.messsage == "timeout error") { navigate('/') }
//             else {
//                 if (response.success) {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert("Your Request Has been Saved", "success")
//                     setTimeout(() => { showAlert("") }, 3000)
//                     setWhichAction("DeleteAndProcess")
//                 } else {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert(response.messsage, "warning")
//                 }
//             }
//         }).catch((errs) => {
//             setBtn({
//                 saveBtnLoading: false,
//                 saveBtnDisabled: false,
//             })
//             showAlert(errs.messsage, "warning")
//         })
//     }
//     // PROCESS RESIGNATION API CALL =================================================================
//     const ProcessForm = async (e) => {
//         e.preventDefault();
//         setBtn({
//             processBtnLoading: true,
//             processBtnDisabled: true,
//         })
//         await fetch(`${config['baseUrl']}/Resignation/ProcessTranResignation`, {
//             method: "POST",
//             headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
//             body: JSON.stringify({
//                 "Emp_Code": regId,
//                 "Resig_code": 6,
//                 "Transaction_Date": currentDate,
//                 "Resignation_Submission_Date": isSubmissionDate,
//                 "Resignation_Acceptance_Date": isAcceptanceDate,
//                 "Resignation_Date": isResignationDate,
//                 "Remarks": isResignationRemarks !=null ? isResignationRemarks : isGetInfo?.Remarks,
//             })
//         }).then((response) => {
//             return response.json()
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config['baseUrl']}/Resignation/ProcessTranResignation`, {
//                     method: "POST",
//                     headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
//                     body: JSON.stringify({
//                         "Emp_Code": regId,
//                         "Resig_code": 6,
//                         "Transaction_Date": currentDate,
//                         "Resignation_Submission_Date": isSubmissionDate,
//                         "Resignation_Acceptance_Date": isAcceptanceDate,
//                         "Resignation_Date": isResignationDate,
//                         "Remarks": isResignationRemarks !=null ? isResignationRemarks : isGetInfo?.Remarks,
//                     })
//                 }).then(response => {
//                     return response.json()
//                 }).then(response => {
//                     if (response.success) {
//                         localStorage.setItem("refresh", response.referesh_token);
//                         localStorage.setItem("access_token", response.access_token);
//                         setBtn({
//                             processBtnLoading: false,
//                             processBtnDisabled: false,
//                         })
//                         showAlert("Request Proccessed Successfully", "success")
//                         setTimeout(() => {
//                             showAlert("")
//                             navigate('/Transaction_Resignation_process')
//                         }, 3000);
//                     } else {
//                         setBtn({
//                             processBtnLoading: false,
//                             processBtnDisabled: false,
//                         })
//                         showAlert(response.messsage, "warning")
//                         setTimeout(() => {
//                             showAlert("")
//                             navigate('/Transaction_Resignation_process')
//                         }, 3000);
//                     }
//                 }).catch((errs) => {
//                     setBtn({
//                         processBtnLoading: false,
//                         processBtnDisabled: false,
//                     })
//                     showAlert(errs.messsage, "warning")
//                 })
//             }
//             else if (response.messsage == "timeout error") { navigate('/') }
//             else {
//                 if (response.success) {
//                     setBtn({
//                         processBtnLoading: false,
//                         processBtnDisabled: false,
//                     })
//                     showAlert("Request Proccessed Successfully", "success")
//                     setTimeout(() => {
//                         showAlert("")
//                         navigate('/Transaction_Resignation_process')
//                     }, 3000);
//                 } else {
//                     setBtn({
//                         processBtnLoading: false,
//                         processBtnDisabled: false,
//                     })
//                     showAlert(response.messsage, "warning")
//                     setTimeout(() => {
//                         showAlert("")
//                         navigate('/Transaction_Resignation_process')
//                     }, 3000);
//                 }
//             }
//         }).catch((errs) => {
//             setBtn({
//                 processBtnLoading: false,
//                 processBtnDisabled: false,
//             })
//             showAlert(errs.messsage, "warning")
//         })
//     }
//     // DELETE RESIGNATION API CALL =================================================================
//     const DeleteInc = async (e) => {
//         e.preventDefault();
//         setBtn({
//             deleteBtnLoading: true,
//             deleteBtnDisabled: true,
//         })
//         await fetch(`${config['baseUrl']}/Resignation/DeleteTranResignation`, {
//             method: "POST",
//             headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
//             body: JSON.stringify({
//                 "Emp_Code": regId,
//             })
//         }).then((response) => {
//             return response.json()
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config['baseUrl']}/Resignation/DeleteTranResignation`, {
//                     method: "POST",
//                     headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
//                     body: JSON.stringify({
//                         "Emp_Code": regId,
//                     })
//                 }).then(response => {
//                     return response.json()
//                 }).then(response => {
//                     localStorage.setItem("access_token", response.access_token);
//                     localStorage.setItem("refresh", response.referesh_token);
//                     if (response.success) {
//                         setBtn({
//                             deleteBtnLoading: false,
//                             deleteBtnDisabled: false,
//                         })
//                         showAlert("Delete Successfully", "success")
//                         setTimeout(() => {
//                             showAlert("")
//                             navigate('/Transaction_Resignation')
//                         }, 3000);
//                     } else {
//                         setBtn({
//                             deleteBtnLoading: false,
//                             deleteBtnDisabled: false,
//                         })
//                         showAlert(response.messsage, "warning")
//                         setTimeout(() => {
//                             showAlert("")
//                             navigate('/Transaction_Resignation')
//                         }, 3000);
//                     }
//                 }).catch((errs) => {
//                     setBtn({
//                         deleteBtnLoading: false,
//                         deleteBtnDisabled: false,
//                     })
//                     showAlert(errs.messsage, "warning")
//                 })
//             }
//             else if (response.messsage == "timeout error") { navigate('/') }
//             else {
//                 if (response.success) {
//                     setBtn({
//                         deleteBtnLoading: false,
//                         deleteBtnDisabled: false,
//                     })
//                     showAlert("Delete Successfully", "success")
//                     setTimeout(() => {
//                         showAlert("")
//                         navigate('/Transaction_Resignation')
//                     }, 3000);
//                 } else {
//                     setBtn({
//                         deleteBtnLoading: false,
//                         deleteBtnDisabled: false,
//                     })
//                     showAlert(response.messsage, "warning")
//                     setTimeout(() => {
//                         showAlert("")
//                         navigate('/Transaction_Resignation')
//                     }, 3000);
//                 }
//             }
//         }).catch((errs) => {
//             setBtn({
//                 deleteBtnLoading: false,
//                 deleteBtnDisabled: false,
//             })
//             showAlert(errs.messsage, "warning")
//         })
//     }





//     useEffect(() => {
//         getInfo()
//     }, [])
//     return (
//         <>
//             <div>
//                 <Header />
//             </div>
//             <div className="transaction_Resignation_Section px-1 ">
//                 <div className="container-fluid Transaction_Resignation_container">
//                     <div className="row mx-0 w-100 Transaction_Resignation_Header">
//                         <span className="Transaction_Resignation_Header">
//                             Transaction Resignation
//                             <Link to="#" className="backLink" onClick={props.onClick} ></Link>
//                         </span>
//                     </div>
//                     <form className="responsiveform"
//                     onSubmit={
//                         WhichAction == "Save" ? SaveDetail :
//                         WhichAction == "DeleteAndProcess" ? ProcessForm : false 
//                     }
//                     >
//                         <div className="row mx-0 Resignation_row">
//                             <div className='Resignation_heading'>
//                                 Employee Information
//                             </div>
//                             <div className="col-lg-12 Resignation_Info">
//                                 <div className="form-group Resignation_Input">
//                                     <label htmlFor="">Employee Name</label>
//                                     <input type="text" name="" id="" className='form-control  input' readOnly value={isGetInfo?.Emp_name ? isGetInfo?.Emp_name : "Not Found"} />
//                                 </div>
//                                 <div className="form-group Resignation_Input">
//                                     <label htmlFor="">Designation</label>
//                                     <input type="text" name="" id="" className='form-control input' readOnly value={isGetInfo?.Desig_name ? isGetInfo?.Desig_name : "Not Found"} />
//                                 </div>
//                                 <div className="form-group Resignation_Input">
//                                     <label htmlFor="">Department</label>
//                                     <input type="text" name="" id="" className='form-control input' readOnly value={isGetInfo?.Dept_name ? isGetInfo?.Dept_name : "Not Found"} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mx-0 Resignation_row">
//                             <div className='Resignation_heading'>
//                                 Resignation
//                             </div>
//                             <div className="col-lg-12 Resignation_Info">
//                                 <div className="Resignation_Date">
//                                     <div className='form-group  Resignation_select mx-1'>
//                                         {
//                                             console.log("object",isGetInfo)
//                                         }
//                                         <label htmlFor="">Resignation Date</label>
//                                         <input type="Date" defaultValue={isGetInfo?.Resignation_Date !==null ? isGetInfo?.Resignation_Date : currentDate} className='form-control' onChange={(e) => {setResignationDate(e.target.value)}} />
//                                     </div>
//                                     <div className='form-group Resignation_select mx-1'>
//                                         <label htmlFor="">Transaction Date</label>
//                                         <input type="Date" value={currentDate} readOnly className='form-control' />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-12 Resignation_Info">
//                                 <div className="Resignation_Date">
//                                     <div className='form-group  Resignation_select mx-1'>
//                                         <label htmlFor="">Submission Date</label>
//                                         <input type="Date" defaultValue={isGetInfo?.Resignation_Submission_Date !==null? isGetInfo?.Resignation_Submission_Date : currentDate}  className='form-control' onChange={(e) => {setSubmissionDate(e.target.value)}}/>
//                                     </div>
//                                     <div className='form-group Resignation_select mx-1'>
//                                         <label htmlFor="">Acceptance Date</label>
//                                         <input type="Date" defaultValue={isGetInfo?.Resignation_Acceptance_Date !==null ? isGetInfo?.Resignation_Acceptance_Date : currentDate}  className='form-control' onChange={(e) => {setAcceptanceDate(e.target.value)}}/>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-12 Resignation_Info">
//                                 <div className="Resignation_Date w-100">
//                                     <div className='form-group Resignation_select w-100 mx-1'>
//                                         <label htmlFor="">Remarks</label>
//                                         <textarea required className='form-control' defaultValue={isGetInfo?.Remarks ? isGetInfo?.Remarks : ""} onChange={(e)=> {setResignationRemarks(e.target.value)}}/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row TAFormBtn mt-3 p-3">
//                             <div className="col-md-12 col-sm-12">
//                                 {WhichAction == "Save" ?
//                                     <>
//                                         <button type="submit" disabled={isBtn.saveBtnDisabled} className="btn btn-dark">{isBtn.saveBtnLoading ? "Please wait..." : "Save"}</button>
//                                     </>
//                                     : WhichAction == "DeleteAndProcess" ?
//                                         <>
//                                             <button type="submit" disabled={isBtn.processBtnDisabled} className="ml-2 btn btn-dark" >{isBtn.processBtnLoading ? "Please Wait..." : "Process"}</button>
//                                             <button type="button" disabled={isBtn.deleteBtnDisabled} className="ml-2 btn btn-dark" onClick={DeleteInc}>{isBtn.deleteBtnLoading ? "Please Wait..." : "Delete"}</button>
//                                         </>
//                                     : ""}z
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {isSaved && (
//                 <ul className='p-0' style={{position: "fixed",bottom: "0",width: "50%",right: "10px"}}>
//                     <li className={`alert alert-${isSaved.type}` + " " + "mt-4"}>{`${isSaved.message}`}</li>
//                 </ul>
//             )}
//              {isGetInfoErr && (
//                 <ul className='p-0' style={{position: "fixed",bottom: "0",width: "50%",right: "10px"}}>
//                     <li className={`alert alert-warning` + " " + "mt-4"}>{`${isGetInfoErr}`}</li>
//                 </ul>
//             )}
//         </>
//     )
// }

// export default Transaction_Resingnation_form


// ///////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { PrimaryButton } from "../../components/basic/button";
import { Table, Space, message } from "antd";
import { connect } from "react-redux";
import { CancelButton } from "../../components/basic/button";
import { FaEdit } from 'react-icons/fa';
import Resignation_ExtensionForm from "./Resignation_ExtensionForm";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Transaction_Resignation/index";

const Transation_Resignation_Process = ({ Red_Transaction_Resignation, getResignationExProcessData, cancel }) => {

    const [isCode, setCode] = useState(null);
    const [mode, setMode] = useState("read");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const waiting = Red_Transaction_Resignation?.Waiting?.[0]?.res
    const [isCheckStatus, setCheckStatus] = useState("Process")

    const EditBack = () => {
        cancel("read");
    };


    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode);
    };

    const columns = [
        {
            title: "Emp Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
        },
        {
            title: "Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },

        {
            title: "Action",
            key: "action",
            render: (data) => (
                <Space size="middle">
                    <button
                        onClick={() => EditPage("Edit", data?.Emp_code)}
                        className="editBtn"
                    >
                        <FaEdit />
                    </button>

                </Space>
            ),
        },
    ];

    // useEffect(() => {
    //     getResignationExProcessData();
    // }, [])

    useEffect(() => {
        if (isSearchVal == "") {
            getResignationExProcessData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            getResignationExProcessData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal, mode]);

    useEffect(() => {
        if (waiting?.message == "failed" || waiting?.messsage == "failed") {
            message.error(waiting?.message || waiting?.messsage)
        }
    }, [waiting])

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        {mode == "read" && (
                            <>
                                <div className="Base_CityFlexBox">
                                    <h4 className="text-dark">Form Processing</h4>
                                    <div className="Base_CitysearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />

                                    </div>
                                </div>
                                <hr />
                            </>
                        )}
                        <div>
                            {console.log("waiting", waiting)}
                            {
                                mode == "read" ?
                                    <Table
                                        columns={columns}
                                        loading={Red_Transaction_Resignation?.loading}
                                        dataSource={waiting?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: waiting?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    /> : ""
                            }
                            {mode == "Edit" && <Resignation_ExtensionForm cancel={setMode} status={isCheckStatus} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_Transaction_Resignation }) {
    return { Red_Transaction_Resignation };
}

export default connect(mapStateToProps, ACTIONS)(Transation_Resignation_Process);

