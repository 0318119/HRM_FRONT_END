import React, { useEffect, useState } from "react";
import "./assets/css/TAShortsCut.css";
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import Header from "../components/Includes/Header";
import { Link, useNavigate } from "react-router-dom";
import  {BsPlus as Plus_ico} from 'react-icons/bs'
import { GiHamburgerMenu as Payslip_ico } from 'react-icons/gi'
import { RxDashboard as RxDashboard_ico } from 'react-icons/rx'
import { BsClipboardData as BsClipboardData_ico } from 'react-icons/bs'
import { FaRegStickyNote as FaRegStickyNote_ico } from 'react-icons/fa'
import secureLocalStorage from "react-secure-storage";
// import CryptoJS from "crypto-js";
const config = require('../config.json')

 

function TAShortsCut() {
  // var refresh_token_decrypt  = CryptoJS.AES.decrypt(localStorage.getItem("referesh_token1"), 'referesh_token1');
  // var refresh_token_string = JSON.parse(refresh_token_decrypt.toString(CryptoJS.enc.Utf8));

  // var access_token_decrypt  = CryptoJS.AES.decrypt(localStorage.getItem("access_token1"), 'access_token1');
  // var access_token_string = JSON.parse(access_token_decrypt.toString(CryptoJS.enc.Utf8));


  
  const [isTaskData,setTaskData] = useState([])
  const [isTaskApiErr,setTaskApiErr] = useState(false)
  var get_access_token = localStorage.getItem("access_token");
  var get_refresh_token = localStorage.getItem("refresh");
  const navigate = useNavigate()

  async function GetTask() {
    await fetch(`${config['baseUrl']}/dashboard/TasksDashboard`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/dashboard/TasksDashboard`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            secureLocalStorage.setItem("refresh", response.referesh_token);
            secureLocalStorage.setItem("access_token", response.access_token);
            setTaskData(response.data[0])
          }
        }).catch((error) => {
            setTaskApiErr(error.message)
        })
      }
      else {
        setTaskData(response.data[0])
        console.log("response.data[0]",response.data[0])
      }
    }).catch((error) => {
      setTaskApiErr(error.message)
    })
  }

  useEffect(() => {
    GetTask()
  }, [])
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container mt-5 p-2 TaFamliyHeaderText">
        <div className="row w-100 mx-0">
        {/* <span>Transaction - Appointment (ShortsCut)</span> */}
        </div>
      </div>
      <div className="container mt-2 TaShortsCutFormContainer">
        <div className="row w-100 mx-0">
        <span className="TaShortsCutFormHead">
              Transaction - Appointment
        </span>
        </div>
        <div className="row p-3 BoxRow">
          
          <div className="col-lg-3 box">
            <Link to={'/Dashboard'} className="TaShortCuttext">
              <span className="TaShortCutIco">
                <RxDashboard_ico />
              </span>
              <span className="icotext">
                Attendance Dashboard
              </span>
              </Link>
          </div>
          <div className="col-lg-3 box">
            <Link to="/Leave_Applications" className="TaShortCuttext">
            <span className="TaShortCutIco"> <Plus_ico /></span>
            <span className="icotext">Leave</span>
            </Link>
          </div>
          {/* <div className="col-lg-3 box">
            <Link className="TaShortCuttext">  
            <span className="TaShortCutIco"><BsClipboardData_ico /></span>
            <span className="icotext">Payslip</span>
            </Link>
          </div> */}
          {/* <div className="col-lg-3 box">
            <Link className="TaShortCuttext">
            <span className="TaShortCutIco"><FaRegStickyNote_ico /></span>
              <span className="icotext">Tax liability</span>
            </Link>
          </div> */}
        </div>
      </div>
      <div className="container mt-4 TaShortsCutFormContainer">
        <div className="row w-100 mx-0">
        <span className="TaShortsCutFormHead">
             Task
        </span>
        </div>
        <div className="row d-flex p-3">
          <div className="ResponsiveTable">
       {isTaskData.length > 0 ? 
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Task Name</th>
                <th scope="col">Application Name</th>
                <th scope="col">Emp Code</th>
                <th scope="col">Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                <>
                  {isTaskData.map((items) => {
                    return(
                      <tr>
                        <td>{items?.TaskName? items?.TaskName : "Not Found"}</td>
                        <td>{items?.ApplicationName? items?.ApplicationName : "Not Found"}</td>
                        <td>{items?.Emp_Code? items?.Emp_Code : "Not Found"}</td>
                        <td>{items?.Created_Date? items?.Created_Date : "Not Found"}</td>
                        <td><button className="editBtnTable" ><Link to={`/LeaveSummary?userId=${items.Tran_Code}`} target="_blank" style={{color: "white"}}>View</Link></button></td>
                      </tr>
                    )
                  })}
                </>
              
            </tbody>
          </table>
                :<h5 className="NotFoundTask"> Not Found Task Data</h5>}
          </div>
        </div>
      </div>
    </>
  );
}

export default TAShortsCut;
