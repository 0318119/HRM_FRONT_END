import React, { useState, useEffect } from 'react'
import '../assets/css/Reports.css'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
const config = require('../../config.json')



const Reports = () => {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var Emp_Code = localStorage.getItem("Emp_code");
    // console.log(Emp_Code,"sssss")
    const navigate = useNavigate()
    const [isSaveleaveAlert, setSaveleaveAlert] = useState(false)
    const [getReportLocation, setReportLocation] = useState([])
    const [ReportLocationErr, setReportLocationErr] = useState(false)
    const [getSectionLeaveBalance, setSectionLeaveBalance] = useState([])
    const [getEmployeeDetail, setEmployeeDetail] = useState([])
    const [isLeaveBalance, setLeaveBalance] = useState(false)
    const [isLeaveTransaction, setLeaveTransaction] = useState(false)
    const [ExportBalanceData, setExportBalanceData] = useState([])
    const [LeaveTransData, setLeaveTransData] = useState([])
    const [isSectionCode, setSectionCode] = useState(null)
    const [isBranchLocation, setBranchLocation] = useState(null)
    const [isEmployeeCode, setisEmployeeCode] = useState(null)
    const [isDownloadButton, setDownloadButton] = useState(false)
    const [isloading, setLoading] = useState(false)




    const showAlert = (message, type) => {
        setSaveleaveAlert({
            message: message,
            type: type,
        })
    }

    async function GetLeaveReportLocation() {
        await fetch(
            `${config["baseUrl"]}/leavesReport/GetLocationViewLeaveBalance`,
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
                        `${config["baseUrl"]}/leavesReport/GetLocationViewLeaveBalance`,
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
                                setReportLocation(response.data[0]);
                            }
                        })
                        .catch((error) => {
                            setReportLocationErr(error.message);
                        });
                } else {
                    setReportLocation(response.data[0]);
                    console.log(response.data, "reportcccc")

                }
            })
            .catch((error) => {
                setReportLocationErr(error.message);
            });
    }
    async function GetLeaveReportSection() {
        await fetch(
            `${config["baseUrl"]}/leavesReport/GetSectionViewLeaveBalance`,
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
                        `${config["baseUrl"]}/leavesReport/GetSectionViewLeaveBalance`,
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
                                setSectionLeaveBalance(response.data[0]);
                            }
                        })
                        .catch((error) => {
                            setReportLocationErr(error.message);
                        });
                } else {
                    setSectionLeaveBalance(response.data[0]);
                    console.log(response.data, "balance")
                }
            })
            .catch((error) => {
                setReportLocationErr(error.message);
            });
    }
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
                    setEmployeeDetail(response?.data[0])
                }).catch((errs) => {
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                setEmployeeDetail(response?.data[0])
            }
        }).catch((errs) => {
        })
    }

    const [isFailedBl, setFailedBl] = useState(false)

    const ExportBalanceLeave = async (e) => {
        e.preventDefault()

        await fetch(
            `${config["baseUrl"]}/leaveReports/ExportLeaveBalance`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": isEmployeeCode !== null ? isEmployeeCode : Emp_Code,
                })
            }
        )
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/leaveReports/ExportLeaveBalance`,
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                            body: JSON.stringify({
                                "Emp_codes": isEmployeeCode !== null ? isEmployeeCode : Emp_Code,
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
                                // if (response.success) {
                                //     showAlert("You have Applied Holidays", "success")
                                // } else {
                                //     showAlert(response.data, "warning")
                                // }
                            }
                        })
                        .catch((error) => {
                            showAlert(error.message, "warning")
                        });
                } else {
                    if (response.success){
                        setLeaveBalance(true)
                        setDownloadButton(true)
                        setLeaveTransaction(false)
                        setExportBalanceData(response.data[0])
                        isFailed(false)
                    }else if(response.failed){
                        setFailed(true)
                        setLeaveTransaction(false)
                    }else{
                        setLeaveTransaction(false)  
                        setExportBalanceData(response.data[0]) 
                    }
                    
                    console.log("exportdata", response)

    
                }
            })
            .catch((error) => {
                showAlert(error.message, "warning")
            });
    }

    const [isFailed, setFailed] = useState(false)
    
    const LeaveTransactionReport = async (e) => {
        setLoading(true)
        e.preventDefault()
        // var body = JSON.stringify({
        //     "Emp_code": isEmployeeCode !== null ? isEmployeeCode : Emp_Code,
        //     "section": isSectionCode !== null ? isSectionCode : -1,
        //     "LocationCode": isBranchLocation !== null ? isBranchLocation : -1,
        //     "FromDate": FromDate,
        //     "ToDate": ToDate
        // })
        // console.log(body,"body")
        // return

        await fetch(
            `${config["baseUrl"]}/leavesReport/LeaveTransactionButton`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": isEmployeeCode !== null ? isEmployeeCode : Emp_Code,
                    "section": isSectionCode !== null ? isSectionCode : -1,
                    "LocationCode": isBranchLocation !== null ? isBranchLocation : -1,
                    "FromDate": FromDate,
                    "ToDate": ToDate
                })
            }
        )
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.messsage == "unauthorized") {
                    await fetch(
                        `${config["baseUrl"]}/leavesReport/LeaveTransactionButton`,
                        {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                refereshToken: `Bareer ${get_refresh_token}`,
                            },
                            body: JSON.stringify({
                                "Emp_code": isEmployeeCode !== null ? isEmployeeCode : Emp_Code,
                                "section": isSectionCode !== null ? isSectionCode : -1,
                                "LocationCode": isBranchLocation !== null ? isBranchLocation : -1,
                                "FromDate": FromDate,
                                "ToDate": ToDate
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
                                // if (response.success) {
                                //     showAlert("You have Applied Holidays", "success")
                                // } else {
                                //     showAlert(response.data, "warning")
                                // }
                            }
                        })
                        .catch((error) => {
                            showAlert(error.message, "warning")
                        });
                } else {
                    
                    if (response.success){
                        setLeaveBalance(false)
                        setLeaveTransaction(true)
                        setLeaveTransData(response.data[0])
                        console.log(response.data,"response.data")
                        setFailed(false)
                        setLoading(false)

                    } else if (response.failed){
                        setFailed(true)
                        setLeaveBalance(false)
                        setLoading(false)


                        console.log("failed", response)

                    }else{
                        setFailed(false)
                        setLeaveBalance(false)
                        setLeaveTransData(response.data[0])

                    }
                }
            })
            .catch((error) => {
                showAlert(error.message, "warning")
            });
    }

    useEffect(() => {
        GetLeaveReportLocation()
        GetLeaveReportSection()
        GetEmployeesName()
    }, [])

    const currentDate = new Date().toISOString().slice(0, 10); 
    const [FromDate, setFromDate] = useState(currentDate)
    const [ToDate, setToDate] = useState(currentDate)


    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';

    const DownloadExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(ExportBalanceData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "data" + fileExtension);
    }

    return (
        <>
            <div className="container  p-2">
                <div className="container mt-1 Reports_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Reports_listHeader">
                            Leave Application Form
                        </span>
                    </div>
                    {/* <form action=""> */}
                    <div className="row px-3 mt-2 py-1 d-flex justify-content-center">
                        <div className="col-lg-10 ReportContainer">
                            <div className="form-group w-100 ReportDateCont">
                                <div className=' w-100'>
                                    <label htmlFor="">From Date</label>
                                    <input type="Date" name="" id="" value={FromDate}    className='form-control' onChange={(e) => setFromDate(e.target.value)} />
                                </div>
                                <div className=' w-100'>
                                    <label htmlFor="">To Date</label>
                                    <input type="Date" name="" id="" value={ToDate}  className='form-control' onChange={(e) => setToDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group w-100">
                                <label htmlFor="">Section</label>
                                <select name="" id="" className='form-select' onChange={(e) => { setSectionCode(e.target.value) }}>
                                    {getSectionLeaveBalance?.map((item) => {
                                        return (
                                            <>
                                                <option value={item?.Section_code}>{item?.Section_name ? item?.Section_name : "Not Found"}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group w-100">
                                <label htmlFor="">Branch/Location</label>
                                <select name="" id="" className='form-select'  onChange={(e) => { setBranchLocation(e.target.value) }}>
                                    {getReportLocation?.map((item) => {
                                        return (
                                            <option value={item.Loc_code}>{item.Loc_name ? item.Loc_name : "Not Found"}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {/* <div className="form-group w-100">
                          <label htmlFor="">Cost Center</label>
                          <select name="" id="" className='form-select'>
                              <option value="">1</option>
                              <option value="">2</option>
                              <option value="">3</option>
                          </select>
                      </div> */}
                            <div className="form-group w-100">
                                <label htmlFor="">Employee</label>
                                <select  className='form-select' onChange={(e) => setisEmployeeCode(e.target.value)}>
                                    {getEmployeeDetail?.map((item) => {
                                        return (
                                            <option selected={item.Emp_code == Emp_Code ? true : false} value={item.Emp_code}>{item.Emp_name ? item.Emp_name : "Not Found"}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1 p-2 d-flex justify-content-center">
                        <div className="col-md-10  px-3">
                            <div className="LeaveTransactionBtn">
                                <button className='btn btn-dark mx-1' onClick={LeaveTransactionReport}>
                                    Leave Transaction
                                </button>
                                <button type="submit" className='btn btn-dark mx-1' onClick={ExportBalanceLeave}>
                                    View Leave Balances
                                </button>

                               
                               

                            </div>
                        </div>
                    </div>
                    {/* </form> */}

                </div>
            </div>
            {isFailedBl  ? <h5 className='eRRORtXT'>Please Fill Info First</h5> :
    <>     
      
            {isLeaveBalance ?
                <div className="container px-2">
                            <div className="container-fluid  Reports_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Reports_listHeader">
                            Leave Balance
                              <button type="submit" className='btn btn-dark mx-1' onClick={DownloadExcel}>
                                    Export Leave Balances
                              </button> 
                        </span>
                                    {isloading && (
                                        <div
                                            className="d-flex justify-content-center align-items-center w-100"
                                            style={{ height: "100px", background: "#d3d3d345" }}
                                        >
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only"></span>
                                            </div>
                                        </div>
                                    )}
                    </div>
                    <div className="row  p-3">
                        <div className="col-12 approvaltable">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Leave Name</th>
                                        <th scope="col">Leave Days</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ExportBalanceData?.map((item) => {
                                        return (
                                            <tr>
                                                <td scope="row">{item.leavename}</td>
                                                <td>{item.Leave_days}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> 
            : ""}  
            
            </>
            }
       
         
          {isFailed  ? <h5 className='eRRORtXT'>Please Fill Info First</h5> :
            
            <>
            {isLeaveTransaction ? <div className="container px-2">
                <div className="container-fluid  Reports_listContainer">
                    <div className="row w-100 mx-0">
                        <span className="Reports_listHeader">
                            Leave Transaction
                        </span>
                    </div>
                            {isloading && (
                                <div
                                    className="d-flex justify-content-center align-items-center w-100"
                                    style={{ height: "100px", background: "#d3d3d345" }}
                                >
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                </div>
                            )}
                    <div className="row  p-3">
                        <div className="col-12 approvaltable">
                            {LeaveTransData.length > 0 ?
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {LeaveTransData?.map((item) => {
                                        return (
                                            <tr>
                                                <td scope="row">{item.Employee_Code}</td>
                                                <td scope="row">{item.Employee_Name}</td>
                                                <td scope="row">{item.Loc_name}</td>
                                                <td scope="row">{item.LeaveDescription}</td>
                                                <td scope="row">{item.Start_Date}</td>
                                                <td scope="row">{item.End_Date}</td>
                                                <td scope="row">{item.Leave_Days}</td>
                                                <td scope="row">{item.Status}</td>
                                                <td scope="row">{item.Posting_Date.slice(0, 10)}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table> : 
                            <span>There is no data</span>
                            }
                        </div>
                    </div>
                </div>
            </div> : ""}
             </>
             
            }

        </>
    )
}

export default Reports