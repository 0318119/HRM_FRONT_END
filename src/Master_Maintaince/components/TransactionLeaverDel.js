import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import '../assets/css/TransactionLeaverDel.css'
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')


function TransactionLeaverDel() {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var Emp_code = localStorage.getItem("Emp_code");
    var Company_code = localStorage.getItem("company_code");
    const navigate = useNavigate()
    const [isGetEmpData, setGetEmpData] = useState([])
    const [isGetEmpDataErr,setGetEmpDataErr] = useState(false)
    const [isEmpCode,setEmpCode] = useState(null)
    const [isDepartAndDesignErr,setDepartAndDesignErr] = useState(false)
    const [isDepartAndDesign,setDepartAndDesign] = useState({
        Department: "",
        Designation: ""
    })
    const [isGetDataOFLeave, setGetDataOFLeave] = useState([])
    const [isGetDataOFLeaveErr, setGetDataOFLeaveErr] = useState(false)


    // GET ALL EMPLOYEES DATA API CALL ================================
    const GetAllEmployeeData = async (e) => {
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
                if(response.success){
                    setGetEmpData(response?.data)
                    console.log("check Employee data",response)
                }else{
                    setGetEmpDataErr(response.messsage)
                }
            }).catch((errs) => { setGetEmpDataErr(errs.messsage) })
          }
          else if (response.messsage == "timeout error") { navigate('/') }
          else {
            if(response.success){
                  setGetEmpData(response?.data)
            }else{
                setGetEmpDataErr(response.messsage)
            }
          }
        }).catch((errs) => {
            setGetEmpDataErr(errs.messsage)
        })
    }
    // GET DEPARTMENT AND DESIGNATION API CALL ========================
    const GetDepartAndDesignation = async (e) => {
        await fetch(`${config['baseUrl']}/leavesDeletion/GetDeptAndDesigNAme`, {
          method: "POST",
          headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
          body: JSON.stringify({
            "Emp_code": isEmpCode
          })
        }).then((response) => {
          return response.json()
        }).then(async (response) => {
          if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/leavesDeletion/GetDeptAndDesigNAme`, {
              method: "POST",
              headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
              body: JSON.stringify({
                "Emp_code": isEmpCode
              })
            }).then(response => {
              return response.json()
            }).then(response => {
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                if(response.success){
                    setDepartAndDesign({
                        Department : response.data[0]?.[0]?.Dept_name,
                        Designation: response.data[0]?.[0]?.Desig_name
                    })
                }else{
                    setDepartAndDesignErr(response?.message)
                }
            }).catch((errs) => { setDepartAndDesignErr(errs?.message) })
          }
          else if (response.messsage == "timeout error") { navigate('/') }
          else {
            if(response.success){
                setDepartAndDesign({
                    Department : response.data[0]?.[0]?.Dept_name,
                    Designation: response.data[0]?.[0]?.Desig_name
                })
            }else{
                setDepartAndDesignErr(response?.message)
            }
          }
        }).catch((errs) => { setDepartAndDesignErr(errs?.message) })
    }

    

    // GET DEPARTMENT AND DESIGNATION API CALL ========================
    const getDataOfLeaveDeletion = async (e) => {
        await fetch(`${config['baseUrl']}/leavesDeletion/GetLeaveDeletionList`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
            "Emp_code": isEmpCode
            })
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
            await fetch(`${config['baseUrl']}/leavesDeletion/GetLeaveDeletionList`, {
                method: "POST",
                headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                body: JSON.stringify({
                "Emp_code": isEmpCode
                })
            }).then(response => {
                return response.json()
            }).then(response => {
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
            }).catch((errs) => { setGetDataOFLeaveErr(errs?.message)})
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
            if(response.success){
                setGetDataOFLeave(response.data[0])
                console.log("success data",response.data)
            }else{
                setGetDataOFLeaveErr(response?.message)
            }
            }
        }).catch((errs) => { setGetDataOFLeaveErr(errs?.message) })
    }

    useEffect(()=>{
        GetAllEmployeeData();
    }, [])

    useEffect(()=>{
        if(isEmpCode !== null){
            GetDepartAndDesignation()
            getDataOfLeaveDeletion()
        }
    }, [isEmpCode])


    return (
        <div className="container-fluid mt-5 p-2">
            <div className="container-fluid mt-5 TransacLeaveDel_listContainer">
                <div className="row w-100 mx-0">
                    <span className="TransacLeaveDel_listHeader">
                        Leave Deletion
                    </span>
                </div>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-md-7">
                    <div className="form-group">
                        <label htmlFor="">Select Employee</label>
                        <select value={isEmpCode} className="form-select" onChange={(e) => {setEmpCode(e.target.value)}}>
                            {isGetEmpDataErr && (
                                <li className={`alert alert-warning` + " " + "mt-2"}>{`${isGetEmpDataErr}`}</li>
                            )}
                            {
                                isGetEmpData?.map((items) => {
                                    return(
                                        <>
                                         <option value={items?.Emp_code}>{`${items?.Emp_code} ${items?.Emp_name}`}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                        <div className="form-group">
                            <label htmlFor="">Designation</label>
                            <input type="text" value={isDepartAndDesign.Designation ? isDepartAndDesign.Designation : "Not Found"} readOnly className="form-control" />
                            {isDepartAndDesignErr && (
                                <li className={`alert alert-warning` + " " + "mt-2 px-2 py-2"}>{`${isDepartAndDesignErr}`}</li>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                        <div className="form-group">
                            <label htmlFor="">Department</label>
                            <input type="text" readOnly value={isDepartAndDesign.Department ? isDepartAndDesign.Department : "Not Found"} className="form-control" />
                            {isDepartAndDesignErr && (
                                <li className={`alert alert-warning` + " " + "mt-2 px-2 py-2"}>{`${isDepartAndDesignErr}`}</li>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row  p-3">
                    {isGetDataOFLeaveErr && (
                        <li className={`alert alert-warning` + " " + "mt-2"}>{`${isGetDataOFLeaveErr}`}</li>
                    )}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>

                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>

                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TransactionLeaverDel;