import React, { useEffect, useState } from "react";
import "./assets/css/transactionAppointment.css";
import { BsCheckSquare as Check_ico } from "react-icons/bs";
import { BsFillPersonFill as Person_ico } from "react-icons/bs";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DownloadingSharpIcon from '@mui/icons-material/DownloadingSharp';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { saveAs } from 'file-saver';
import Word from "./Word";
const config = require("../config.json");

function TransactionAppointmentCom() {
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_Emp_code = localStorage.getItem('Emp_code')
  const navigate = useNavigate();
  const [getAppointStatus, setgetAppointStatus] = useState([]);
  const [isSearchData, setSearchData] = useState([])
  const [isVal, setVal] = useState("")
  const [AppointData, setAppointData] = useState([])
  const [getAppointStatusErr, setgetAppointStatusErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);
  const [chkproapi, setchkproapi] = useState(false)
  const [isFileData, setFileData] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [isGetCode, setGetCode] = useState(null)


  async function getAppointStatusCall() {
    await fetch(
      `${config["baseUrl"]}/appointments/GetTranAppointmentsByCompanyCode`,
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
            `${config["baseUrl"]}/appointments/GetTranAppointmentsByCompanyCode`,
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
                setgetAppointStatus(response.data[0]);
                setSearchData(response.data[0])
                setDataLoader(true);
              }
            })
            .catch((error) => {
              setgetAppointStatusErr(error.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setgetAppointStatus(response.data[0]);
          setSearchData(response.data[0])
          setDataLoader(true);
        }
      })
      .catch((error) => {
        setgetAppointStatusErr(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const AppointmentProcess = async (item) => {
    await fetch(`${config["baseUrl"]}/master_all_employees/ProcessTranAppointment`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Sequence_No": getAppointStatus.filter(data => data.Sequence_no == item)[0].Sequence_no,
        "Emp_code": getAppointStatus.filter(data => data.Sequence_no == item)[0].Sequence_no,
        "Payroll_Month": "6",
        "UserCode": getAppointStatus.filter(data => data.Sequence_no == item)[0].UserCode,
        "Replacement_Flag": "N",
        "Replacement_Emp_Code": "1"

      })
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config["baseUrl"]}/master_all_employees/ProcessTranAppointment`, {
          method: "POST",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
          body: JSON.stringify({
            "Sequence_No": getAppointStatus.filter(data => data.Sequence_no == item)[0].Sequence_no,
            "Emp_code": getAppointStatus.filter(data => data.Sequence_no == item)[0].Sequence_no,
            "Payroll_Month": "6",
            "UserCode": getAppointStatus.filter(data => data.Sequence_no == item)[0].UserCode,
            "Replacement_Flag": "N",
            "Replacement_Emp_Code": "1"

          })
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            alert(`${response?.message}`)
            setchkproapi(!chkproapi)
          }
        }).catch((errs) => {
        })
      }
      else {
        alert(`${response?.message}`)
        setchkproapi(!chkproapi)
      }
    }).catch((errs) => {
      alert(`${errs?.message}`)
    })
  }
  const SearchFunctionality = (e) => {
    if (e.target.value == ' ') {
      setgetAppointStatus(isSearchData)
    } else {
      setLoading(true)
      setDataLoader(false)
      setTimeout(() => {
        const SearchResult = isSearchData.filter(item =>
          item.Emp_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          `${item.Sequence_no}`.includes(e.target.value)
        )
        setgetAppointStatus(SearchResult)
        setLoading(false)
        setDataLoader(true)
      }, 2000);
    }
    setVal(e.target.value)
  }
  async function AppointLetter(id) {
    await fetch(
      `${config["baseUrl"]}/tranAppointment/Tran_AppoinmentLetterByEmpCode`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Emp_Code": getAppointStatus.filter(data => data?.Sequence_no == id)?.[0]?.Sequence_no
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        // messageApi.open({
        //   type: 'success',
        //   content: 'Successfully Download',
        // });
        setAppointData(response.data)
        GetAppointLetter(id)
      }
      else {
        // messageApi.open({
        //   type: 'error',
        //   content: response?.message,
        // });
      }
    }).catch((error) => {
      // messageApi.open({
      //   type: 'error',
      //   content: error?.message,
      // });
    });
  }


  useEffect(() => {
    // AppointLetter()
    // if(isGetCode !==null){
    // }else{
    //   console.log("Can't run AppointLetter function api call!")
    // }
  }, [])

  async function GetAppointLetter(itemid) {
    await fetch(
      `${config["baseUrl"]}/tranAppointment/Get_EmployeeletterByEmpCode`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Emp_Code": getAppointStatus.filter(data => data?.Sequence_no == itemid)?.[0]?.Sequence_no
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: "Successfully Download",
        });
        setFileData(response.data[0].FileName);
        console.log("response.data", response.data)

        let htmlContent = `
          <div>
            <div style="padding: 30px 50px">
              <h style="text-align: center;font-size:20px">LETTER OF APPOINTMENT</h>
              <p>Dear Emp_Name,</p>
               <p>We are pleased to offer you the position of P4 - P5 in the cadre of P7 at Summit Bank Limited-(SMBL). The position will be based in P6. </p>
               <p>Your remuneration will be as follows:</p>
              <table>
                <thead> 
                 <tr>
                  <th>S.No</th>
                  <th>Salary And Other Cash Benefits</th>
                  <th>Per Month-(In Rupees)</th>
                </tr>
              </thead>
              <tbody>
              `;
        AppointData.forEach((item, index) => {
          htmlContent += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.Allowance_name ? item.Allowance_name : "Not Found"}</td>
                   <td>${item.Amount ? item.Amount : "Not Found"}</td>
                </tr>
               `;
        });

        htmlContent += `
             </tbody>
             </table>
             <p>Note: All applicable taxes will be deducted at source.</p>
                    <p>In addition to the above, you are entitled to the following:</p>
                    <ul style="padding-left:15px">
                      <li> Cash reimbursement equivalent to 100 liters petrol per month.</li>
                      <li>Gratuity, PF, Hospitalization, Group Insurance, Loan entitlement, Leave entitlement <br/> based on Bank’s approved salary and benefit policy.</li>
                      <li>And all other benefits as per Bank’s approved policy.</li>
                    </ul>
                    <p>Your service will be on probation for a period of three months and is liable to termination without assigning any reason and without any notice during the period of probation. Your service will be confirmed after successful completion of the probation period, subject to following:.</p>
                                           <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(i)	Satisfactory references from your present and previous employers.</p>
                    <p>After confirmation, termination of this contract will require either party i.e. you or the Bank to serve 60 calendar days advance notice or in lieu of notice period, two months Gross Salary will be paid.</p>
                    <p>You will perform any and all functions assigned to you from time to time and you can be transferred to any location/city at Bank’s discretion.</p>
                    <p>You will be required to sign Bank’s Standard Declaration of Secrecy and Fidelity Form along with any other form/undertaking which the Bank may consider necessary and will abide by all the terms and conditions of the Bank’s HR Policy and Rules & Regulations</p>
                    <p>You shall stand retired on attaining the superannuation age of (60) years.</p>
                    <p>In agreement of the terms and conditions here of, you are requested to sign both the pages (1 & 2) of this appointment offer and return a copy to Human Resource Division, Summit Bank Limited.</p>
                    <p>The proposed date of your assuming the responsibility is Q3 or earlier.</p>
                    <p>We are confident that you will play a positive role towards the growth and expansion of Summit Bank Limited-SMBL and look forward to a long and mutually rewarding professional relationship.</p>
                    <p>Warm Regards,<br />
                      For Company Name
                    </p>
                    <p>Name,<br />
                      Authorised Signatory Designation
                    </p>
                    <p><div style="float:right;width:30%;">I have read the above terms and conditions of my appointment. I accept the same.<br />
                      _____________________ <br />
                      Applicant Name<br />
                      Employee Code
                   </div>
                      </p>
                      <p style="clear: both;">Encl:<br />
                        1) Service Agreement
                      </p>
            </div>
          </div>
        `;


        console.log("first", htmlContent)
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        saveAs(blob, isFileData);
      }
      else {
        messageApi.open({
          type: 'error',
          content: response?.message,
        });
      }
    }).catch((error) => {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    });
  }

  // const downloadWordFile = () => {
  //   // const content = <Word /> ;
  //   const content = <h5>rehman</h5>;


  //   const blob = new Blob([content], { type: 'application/msword' });

  //   saveAs(blob, isFileData);
  // };

  useEffect(() => {
    getAppointStatusCall();
  }, [chkproapi]);

  return (
    <>
      {contextHolder}
      <div className="container-fluid  MainCont">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 p-3 d-flex TaRes">
            <div className="form-group TransAppointFormGroup">
              {/* <label htmlFor="">Search</label> */}
              <input type="search" className="from-control"
                value={isVal} placeholder="Enter a value"
                onChange={SearchFunctionality}
              />
              {/* <button onClick={SearchFunctionality}>Search</button> */}
            </div>
            <div className="form-group d-flex ml-2 TransAppointFormGroup">
              {/* <label htmlFor="">Excel Record</label> */}
              <input type="file" className="from-control TAFile" />
            </div>
            {/* <div className="form-group ml-2 TransAppointFormGroup">
              <button>Excel Upload</button>
              <input type="button" value="Download" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row TAHeadingRow">
          <div className="col-lg-12  py-2 TAPList_Container">
            <span className="TAPlist_Header">
              <Check_ico /> &nbsp; Transaction - Appointment
            </span>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-2 Tatble">
            <table className="w-100 Tatble">
              <thead>
                <tr className="TaLiLIstHeader">
                  <th>Sequence No</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Personal</th>
                  <th>Education</th>
                  <th>Salary</th>
                  <th>Exprience</th>
                  <th>Payroll</th>
                  <th>CheckList</th>
                  <th>Family</th>
                  <th>Process</th>
                  <th>Appointment Letter</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ height: "100px", background: "#d3d3d345" }}
                  >
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only"></span>
                    </div>
                  </div>
                )}
                {dataLoader && (
                  <>
                    <span className="m-0 p-0 alert-warning">
                      {getAppointStatusErr ? getAppointStatusErr : false}
                    </span>
                    {getAppointStatus.map((items) => {
                      return (
                        items.Status == "Process Done" ? false :
                          <tr className="TaListBody">
                            <td>
                              {items.Sequence_no ? items.Sequence_no : "Empty"}
                            </td>
                            <td>{items.Emp_name ? items.Emp_name : "Empty"}</td>
                            <td>
                              {items.Status ? items.Status : "Empty"}
                            </td>
                            <td className="text-center">
                              <Link to={`/TAPersonalform?userId=${items.Sequence_no}`}>
                                {" "}
                                <Person_ico className="List_ico" />{" "}
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link
                                to={`/TAEducationForm?userId=${items.Sequence_no}`}
                              >
                                {" "}
                                <LibraryBooksIcon className="List_ico" />{" "}
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link to={`/TASalaryForm?userId=${items.Sequence_no}`}>
                                {" "}
                                <LocalAtmIcon className="List_ico" />
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link
                                to={`/TAExprienceForm?userId=${items.Sequence_no}`}
                              >
                                {" "}
                                <BusinessCenterIcon className="List_ico" />{" "}
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link to={`/TAppointmentMasterPayroll?userId=${items.Sequence_no}`}>
                                <WbSunnyIcon className="List_ico" />
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link to={`/TACheckList?userId=${items.Sequence_no}`} >
                                {" "}
                                <CheckBoxRoundedIcon className="List_ico" />
                              </Link>
                            </td>

                            <td className="text-center">
                              <Link to={`/TAFamilyForm?userId=${items.Sequence_no}`}>
                                {" "}
                                <Diversity3Icon className="List_ico" />
                              </Link>
                            </td>
                            <td className="text-center">
                              {" "}
                              <Link href="" onClick={(e) => AppointmentProcess(items.Sequence_no)}>
                                <SettingsSuggestRoundedIcon className="List_ico" />
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link
                                onClick={(e) => {
                                  AppointLetter(items.Sequence_no)
                                }
                                  // GetAppointLetter(items.Sequence_no)
                                }
                              >
                                {" "}
                                <DownloadingSharpIcon className="List_ico" />
                              </Link>
                            </td>
                            {/* <td className="text-center">
                              <a href="">
                                <DeleteIcon className="List_ico" />
                              </a>
                            </td> */}
                          </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="col-12 mt-4 mb-3">
            <Link to='/TAPersonalform' className="TaAddBtn">Add New</Link>
          </div>
        </div>
        <div className="row d-flex"></div>
      </div>
    </>
  );
}

export default TransactionAppointmentCom;
