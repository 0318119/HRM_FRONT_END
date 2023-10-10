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
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const config = require("../config.json");

function TransactionAppointmentCom() {
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_Emp_code = secureLocalStorage.getItem('Emp_code')
  const navigate = useNavigate();
  const [getAppointStatus, setgetAppointStatus] = useState([]);
  const [isSearchData, setSearchData] = useState([])
  const [isVal,setVal] = useState("")

  const [getAppointStatusErr, setgetAppointStatusErr] = useState(false);

  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);
  const [chkproapi,setchkproapi]=useState(false)

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
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem(
                  "access_token",
                  response.access_token
                );
                setgetAppointStatus(response.data[0]);
                setSearchData(response.data[0])
                // console.log(response.data[0], "respoced")
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
          console.log(response.data, "respoced")
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

  useEffect(() => {
    getAppointStatusCall();
  }, [chkproapi]);



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
      console.log(response)
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
            localStorage.setItem("refresh",  response.referesh_token);
            secureLocalStorage.setItem("access_token", response.access_token);
            alert(`${response?.message}`)
            setchkproapi(!chkproapi)
          }
        }).catch((errs) => {
        })
      }
      else {
        alert(`${response?.message}`)
        console.log("hamza", response)
        setchkproapi(!chkproapi)
      }
    }).catch((errs) => {
      alert(`${errs?.message}`)
    })
  }


const SearchFunctionality  = (e) =>{
  if(e.target.value == ' '){
    setgetAppointStatus(isSearchData)
  }else{
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
    },2000);
  }
  setVal(e.target.value)
}

  return (
    <>
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
                  <th>Process</th>
                  <th>Family</th>
                  <th>Print</th>
                  <th>Delete</th>
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
                            {" "}
                            <Link href="" onClick={(e) => AppointmentProcess(items.Sequence_no)}>
                              <SettingsSuggestRoundedIcon className="List_ico"  />
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link to={`/TAFamilyForm?userId=${items.Sequence_no}`}>
                              {" "}
                              <Diversity3Icon className="List_ico" />
                            </Link>
                          </td>
                          <td className="text-center">
                            <a href="">
                              {" "}
                              <PrintIcon className="List_ico" />
                            </a>
                          </td>
                          <td className="text-center">
                            <a href="">
                              <DeleteIcon className="List_ico" />
                            </a>
                          </td>
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
