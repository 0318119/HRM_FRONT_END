import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/css/attendance_Check.css";
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')



function CheckAttendance() {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const navigate = useNavigate()
     
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [formErr, setformErr] = useState(false)


    const showAlert = (message, type) => {
        setformErr({
            message: message,
            type: type,
        })
    }
    
    const CheckAttendanceData = JSON.stringify({
       
        "startingDate": startDate,
        "endingDate": endDate
        

    })

    const CheckAttendance = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        await fetch(`${config['baseUrl']}/attendance/ProcessAttendance`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: CheckAttendanceData
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/attendance/ProcessAttendance`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: CheckAttendanceData
                }).then(response => {
                    return response.json()
                }).then(response => {
                    localStorage.setItem("refresh",  response.referesh_token);
                    localStorage.setItem("access_token", response.access_token);
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    setTimeout(() => {
                        showAlert(response.messsage, "success")
                    }, 2000);

                }).catch((errs) => {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAlert(errs.messsage, "warning")
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                setTimeout(() => {
                    showAlert(response.messsage, "success")
                }, 2000);
            }
        }).catch((errs) => {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(errs.messsage, "warning")
        })
    }




    return (
        <>
            <div className="container-fluid p-2 mt-5">
                <div className="container-fluid mt-2  AttendanceCheckContainer">
                    <div className="row w-100 mx-0">
                        <span className="AttendanceCheckHeader py-2">Date Processing</span>
                    </div>
                    <div className="row mt-1 p-2">
                        <div className="col-lg-12 col-md-12 p-5">
                            <form action="" onSubmit={CheckAttendance} className="d-flex flex-column justify-content-center align-items-center p-5">
                                <div className="form-group">
                                    <label htmlFor="">Start Date</label>
                                    <input type="Date" name="" id="" className="form-control AttendanceCheckInput" onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div className="form-group mx-2">
                                    <label htmlFor="">End Date</label>
                                    <input type="Date" name="" id="" className="form-control AttendanceCheckInput" onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                 
                                    <button className="btn btn-dark mx-1 AttendanceCheckbtn" type="submit">
                                       </button>
                            </form>

                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}

export default CheckAttendance;
