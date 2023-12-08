import React, { useEffect, useState } from "react";
import '../LoginScreens/Login.css';
import { HiOutlineMailOpen as Login_Email_ico } from "react-icons/hi";
import { AiOutlineLock as Login_Password_ico } from "react-icons/ai";
import { TbSelect as Select_ico } from "react-icons/tb";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from 'react-router-dom'
import CryptoJS from "crypto-js";
const config = require('../config.json')

export const Login = () => {
  const [isGetCompanyCode, setGetCompanyCode] = useState([])
  const [isLoginError, setLoginError] = useState(false)
  const [companyCodeError, setcompanyCodeError] = useState(false)
  const [getUserName, setUserName] = useState("")
  const [getPwd, setPwd] = useState("")
  const [getCompanyId, setCompanyId] = useState("")
  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")
  const [isLogin, setLogin] = useState(true)

    
    
  const navigate = useNavigate()
  const showAlert = (message, type) => {
    setLoginError({
      message: message,
      type: type,
    })
  }
  async function getCompanyCodes() {
    try {
      await fetch(`${config['baseUrl']}/companies/getCompanies`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      }).then((response) => {
        return response.json()
      }).then((response) => {
        if (response.success) {
          setGetCompanyCode(response.data)
        } else {
          setcompanyCodeError(response.message)
        }
      })
    } catch (error) {
      setcompanyCodeError(error.message)
    }

  }
  const HandleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    try {
      await fetch(`${config['baseUrl']}/auth/SuperAdminLogin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          "Emp_name": getUserName,
          "Emp_password": getPwd,
          "company_code": getCompanyId
        })
      }).then((response) => {
        return response.json()
      }).then((response) => {
        setLoading(false);
        setBtnEnaledAndDisabled(false);
        if (response.success) {
          showAlert(response.message, "success")
          localStorage.setItem("refresh", response.referesh_token);
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("Emp_code", response.data[0].Emp_code);
          localStorage.setItem("company_code", response.data[0].company_code);
          localStorage.setItem("Payroll_Category", response.data[0].Payroll_Category);
          navigate("/TAShortsCut");
        } else {
          showAlert(response.message, "warning")
          setLoading(false);
          setBtnEnaledAndDisabled(false);
        }
      })
    } catch (error) {
      showAlert("Something went wrong.", "warning")
      setLoading(false);
      setBtnEnaledAndDisabled(false);
    }
  }

  useEffect(() => {
    getCompanyCodes()
  }, [])

  return (
    <>
      {isLogin ? <div className="LoginMainContainer">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-6">
              <form onSubmit={HandleLogin} className="LoginForm">
                <div className="LoginHeader">
                  <span>Login Form</span>
                </div>
                <ul className="px-3">
                  {companyCodeError && (
                    <li className={`alert alert-warning` + " " + "mt-2"}>{`${companyCodeError}`}</li>
                  )}
                  {isLoginError && (
                    <li className={`alert alert-${isLoginError.type}` + " " + "mt-4"}>{`${isLoginError.message}`}</li>
                  )}
                </ul>
                <div className="form-group p-1">
                  <label htmlFor="" className="p-1 heading">
                    User Name
                  </label>
                  <div className="form-control LoginForm_input">
                    <span>
                      <Login_Email_ico className="login_email_ico" />
                    </span>
                    <input
                      onChange={(e) => { setUserName(e.target.value) }}
                      type="text"
                      className="Login_email"
                      placeholder="Enter Your User Name" required
                    />
                  </div>
                </div>
                <div className="form-group p-1">
                  <label htmlFor="" className="p-1 heading">
                    Password
                  </label>
                  <div className="form-control LoginForm_input">
                    <span>
                      <Login_Password_ico className="login_email_ico" />
                    </span>
                    <input
                      onChange={(e) => { setPwd(e.target.value) }}
                      type="password"
                      className="Login_email"
                      placeholder="Enter Your Password" required
                    />
                  </div>

                </div>
                <div className="form-group p-1">
                  <label htmlFor="" className="p-1 heading">
                    Select Company
                  </label>
                  <div className="form-control LoginForm_input">
                    <span>
                      <Select_ico className="login_email_ico" />
                    </span>
                    <select required="true" onChange={(e) => { setCompanyId(e.target.value) }}>
                      <option selected disabled value="">Select Your Company</option>
                      {isGetCompanyCode.map((items) => {
                        return (
                          <>
                            <option value={items.company_code}>{items.company_name}</option>
                          </>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <Link>Forget PassWord</Link>
                </div>
                <div className="login_button">
                  <button className="LoginButton" type="submit" disabled={btnEnaledAndDisabled}>  {loading ? "Loading..." : "Login"} </button><br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> :"" }
      
    </>
  );
};