import React, { useState } from 'react'
import './assets/css/LeaveUpload.css'
import Header from '../components/Includes/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const Leave_Balance_Upload = () => {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const [isFile, setFile] = useState()
    const [isFileErr,setFileErr] = useState("")
    const [isGetExcelData,setGetExcelData] = useState([])
    const navigate = useNavigate()
    const [isbtnLaoding,setbtnLaoding] = useState(false)
    const [isExcelbtnLaoding,setExcelbtnLaoding] = useState(false)
    




    // UPLOAD ATTACHMENT API CALL ==========================================
    const formData = new FormData();
    if (isFile !== '') {
        formData.append("excelFile", isFile);
    }
    const uploadFileFun = async (e) => {
        e.preventDefault();
        setbtnLaoding(true)
        await fetch(`https://hrm-api.logomish.com/uploadExcelData/SaveExcelFile`, {
            method: "POST",
            headers: { "Accept": "form-data", "accessToken": `Bareer ${get_access_token}` },
            body: formData,
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`https://hrm-api.logomish.com/uploadExcelData/SaveExcelFile`, {
                    method: "POST",
                    headers: { "Accept": "form-data", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: formData,
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if(response.success){
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setbtnLaoding(false)
                        setTimeout(() => {
                            setFileErr(response.message)
                            window.location.reload();
                        }, 3000);
                    }else{
                        setbtnLaoding(false)
                        setFileErr(response.message)
                        setTimeout(() => {
                            setFileErr("")
                        }, 3000);
                    }
                }).catch((errs) => { 
                    setbtnLaoding(false)
                    setFileErr(errs.message)
                    setTimeout(() => {
                        setFileErr("")
                    }, 3000);
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                if(response.success){
                    setbtnLaoding(false)
                    setTimeout(() => {
                        setFileErr(response.message)
                        window.location.reload();
                    }, 3000);
                }else{
                    setbtnLaoding(false)
                    setFileErr(response.message)
                    setTimeout(() => {
                        setFileErr("")
                    }, 3000);
                }
            }
        }).catch((errs) => {
            setbtnLaoding(false)
            setFileErr(errs.message)
            setTimeout(() => {
                setFileErr("")
            }, 3000);
        })
    }

    const getExcelFileData = async (e) => {
        e.preventDefault();
        setExcelbtnLaoding(true)
        await fetch(`https://hrm-api.logomish.com/uploadExcel/ExportLeaveReportExcelData`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "leave_year": 2023
            }),
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`https://hrm-api.logomish.com/uploadExcel/ExportLeaveReportExcelData`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: JSON.stringify({
                        "leave_year": 2023
                    }),
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if(response.success){
                        setExcelbtnLaoding(false)
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetExcelData(response?.data)
                        setTimeout(() => {
                            exportToExcel()
                        }, 3000);
                    }else{
                        setExcelbtnLaoding(false)
                        setFileErr(response.message)
                    }
                }).catch((errs) => {
                    setExcelbtnLaoding(false)
                    setFileErr(errs.message)
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                if(response.success){
                    setExcelbtnLaoding(false)
                    setGetExcelData(response?.data?.[0])
                    setTimeout(() => {
                        exportToExcel()
                    }, 3000);
                }else{
                    setExcelbtnLaoding(false)
                    setFileErr(response.message)
                }
            }
        }).catch((errs) => {
            setExcelbtnLaoding(false)
            setFileErr(errs.message)
        })
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(isGetExcelData);
        // console.log("isGetExcelData?.[0]",isGetExcelData)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Employee_leave_info" + fileExtension);
    }
    
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container-fluid mt-5 p-2">
                <div className="container-fluid mt-1 LeaveReportBalance_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="LeaveReportBalance_listHeader">
                            Leave Uploads
                        </span>
                       
                    </div>
                    <form action="" >
                        <div className="row px-3 mt-2 UploadRow">
                            <div className="col-lg-4 LeaveUploadContainer">
                                {
                                    <ul className='p-0'>
                                        {isFileErr && (
                                            <li className={`alert alert-warning`}>{`${isFileErr}`}</li>
                                        )}
                                    </ul>
                                }
                                <div className="form-group">
                                    <label htmlFor="">Year</label>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="">Upload File</label>
                                    <input type="file" className="form-control fileupload" name="" id="" onChange={(e) => { setFile(e.target.files[0]) }} />
                                </div>
                                <div className="form-group mt-2">
                                    <button className='mx-1' onClick={uploadFileFun}>{isbtnLaoding ? "Please wait..." : "Upload"}</button>
                                    <button className='mx-1' onClick={getExcelFileData}>{isExcelbtnLaoding ? "Please wait..." : "Download Excel"}</button>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Leave_Balance_Upload