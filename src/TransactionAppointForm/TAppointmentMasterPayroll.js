import React, { useEffect, useState } from "react";
import "./assets/css/TAppointmentMasterPayroll.css";
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import Header from "../components/Includes/Header";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate, useLocation } from "react-router-dom";
const config = require("../config.json");

function TAppointmentMasterPayroll() {
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_company_code = localStorage.getItem("company_code");
  const navigate = useNavigate();
  const search = useLocation().search;
  var userId = new URLSearchParams(search).get("userId");

  const [getInfo, setInfo] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);
  async function getInfoCall() {
    await fetch(
      `${config["baseUrl"]}/appointments/GetAppointmentsBySeqNo/${userId}`,
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
            `${config["baseUrl"]}/appointments/GetAppointmentsBySeqNo/${userId}`,
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
                localStorage.setItem("access_token", response.access_token);
                setInfo(response.data[0][0]);
              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setInfo(response.data[0][0]);
          // console.log(response.data[0], 'hello');
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }

  const [ModeOfPay, setModeOfPay] = useState([]);
  const [ModeOfPayErr, setModeOfPayErr] = useState(false);
  async function getPayRollData() {
    await fetch(`${config["baseUrl"]}/payment_mode/GetPaymentMode`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}payment_mode/GetPaymentMode`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
          })
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
                setModeOfPay(response.data[0]);
              }
            })
            .catch((error) => {
              setModeOfPayErr(error.message);
            });
        } else {
          setModeOfPay(response.data[0]);
          // console.log(response.data[0], "hello");
          //  console.log("response.data", response.data[0]);
        }
      })
      .catch((error) => {
        setModeOfPayErr(error.message);
      });
  }

  const [BankBrances, setBankBrances] = useState([]);
  const [BankBrancesErr, setBankBrancesErr] = useState(false);
  async function getBankBrancesData() {
    await fetch(`${config["baseUrl"]}/banks/GetBankBranches`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/banks/GetBankBranches`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
          })
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
                setBankBrances(response.data[0]);
              }
            })
            .catch((error) => {
              setBankBrancesErr(error.message);
            });
        } else {
          setBankBrances(response.data[0]);
          // console.log(response.data[0], "hello");
        }
      })
      .catch((error) => {
        setBankBrancesErr(error.message);
      });
  }

  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const [PayRollformErr, setPayRollformErr] = useState(false);
  const [Mode_Of_Payment, setMode_Of_Payment] = useState("");
  const [Recreation_Club_Flag, setRecreation_Club_Flag] = useState("");
  const [Meal_Deduction_Flag, setMeal_Deduction_Flag] = useState("");
  const [Union_Flag, setUnion_Flag] = useState("");
  const [Overtime_Flag, setOvertime_Flag] = useState("");
  const [Incentive_Flag, setIncentive_Flag] = useState("");
  const [Bonus_Type, setBonus_Type] = useState("");
  const [SESSI_Flag, setSESSI_Flag] = useState(null);
  const [EOBI_Flag, setEOBI_Flag] = useState("");
  const [SESSI_Number, setSESSI_Number] = useState("");
  const [EOBI_Number, setEOBI_Number] = useState("");
  const [Account_Type1, setAccount_Type1] = useState("");
  const [Bank_Account_No1, setBank_Account_No1] = useState("");
  const [Branch_Code1, setBranch_Code1] = useState("");
  const [Bank_Amount_1, setBank_Amount_1] = useState(null);
  const [Bank_Percent_1, setBank_Percent_1] = useState(null);
  const [YesSESI, setYesSESI] = useState(false);
  const [YesEobi, setYesEobi] = useState(false);

  const showAlert = (message, type) => {
    setPayRollformErr({
      message: message,
      type: type,
    });
  };
  const createPayRoll = async (e) => {
    e.preventDefault();
    // var data = {
    //   "Sequence_no": userId,
    //   "Mode_Of_Payment": Mode_Of_Payment,
    //   "Recreation_Club_Flag": Recreation_Club_Flag,
    //   "Meal_Deduction_Flag": Meal_Deduction_Flag,
    //   "Union_Flag": Union_Flag,
    //   "Overtime_Flag": Overtime_Flag,
    //   "Incentive_Flag": Incentive_Flag,
    //   "Bonus_Type": "0",
    //   "SESSI_Flag": SESSI_Flag,
    //   "EOBI_Flag": EOBI_Flag,
    //   "SESSI_Number": SESSI_Number,
    //   "EOBI_Number": EOBI_Number,
    //   "Account_Type1": Account_Type1,
    //   "Bank_Account_No1": Bank_Account_No1,
    //   "Branch_Code1": Branch_Code1,
    //   "Bank_Amount_1": Bank_Amount_1,
    //   "Bank_Percent_1": Bank_Percent_1,
    // }
    // console.log(data, "data")
    // return
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    await fetch(`${config["baseUrl"]}/payroll/InsertPayroll`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Sequence_no": userId,
        "Mode_Of_Payment": Mode_Of_Payment,
        "Recreation_Club_Flag": Recreation_Club_Flag,
        "Meal_Deduction_Flag": Meal_Deduction_Flag,
        "Union_Flag": Union_Flag,
        "Overtime_Flag": Overtime_Flag,
        "Incentive_Flag": Incentive_Flag,
        "Bonus_Type": "0",
        "SESSI_Flag": SESSI_Number ? "Y" : "",
        "EOBI_Flag": EOBI_Flag,
        "SESSI_Number": SESSI_Number,
        "EOBI_Number": EOBI_Number,
        "Account_Type1": Account_Type1,
        "Bank_Account_No1": Bank_Account_No1,
        "Branch_Code1": Branch_Code1,
        "Bank_Amount_1": Bank_Amount_1,
        "Bank_Percent_1": Bank_Percent_1,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/payroll/InsertPayroll`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
            body: JSON.stringify({
              "Sequence_no": userId,
              "Mode_Of_Payment": Mode_Of_Payment,
              "Recreation_Club_Flag": Recreation_Club_Flag,
              "Meal_Deduction_Flag": Meal_Deduction_Flag,
              "Union_Flag": Union_Flag,
              "Overtime_Flag": Overtime_Flag,
              "Incentive_Flag": Incentive_Flag,
              "Bonus_Type": "0",
              "SESSI_Flag": SESSI_Flag,
              "EOBI_Flag": EOBI_Flag,
              "SESSI_Number": SESSI_Number,
              "EOBI_Number": EOBI_Number,
              "Account_Type1": Account_Type1,
              "Bank_Account_No1": Bank_Account_No1,
              "Branch_Code1": Branch_Code1,
              "Bank_Amount_1": Bank_Amount_1,
              "Bank_Percent_1": Bank_Percent_1,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                // navigate("/");
              } else {
                localStorage.setItem("refresh",  response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            })
            .catch((errs) => {
              console.log("errs 1", errs)
            });
        } else {
          setLoading(false);
          setBtnEnaledAndDisabled(false);
          showAlert(response.messsage, "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(response, "naskdhnka")
        }
      })
      .catch((errs) => {
        showAlert(errs.messsage, "warning");
        console.log("errs 2", errs)
      });
  };

  useEffect(() => {
    getInfoCall();
    getPayRollData();
    getBankBrancesData();
  }, []);




  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container p-2  mt-1 TaMasterPayrollHeaderText">
        {/* <span>Transaction - Appointment (Master Payroll)</span> */}
      </div>
      <div className="container-fluid mt-5 TaMasterPayrollContainer">
        <div className="row mx-0 w-100">
          <span className="TaMasterPayrollFormHead py-2">
            Transaction - Appointment (Master Payroll)
            <Link to="/Appointment" className="backLink">Back to  Appointment List</Link>
          </span>
        </div>
        <ul className="p-0 mx-2 mt-2">
          {PayRollformErr && (
            <li className={`alert alert-${PayRollformErr.type}` + " " + "mt-1"}>{`${PayRollformErr.message}`}</li>
          )}
        </ul>
        <form action="" onSubmit={createPayRoll} className="p-2">
          <div className="row">
            <div className="col-md-12">
              <span className="TaMasterPayrollFromHeading">
                Employee Information
              </span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                { }
                <label htmlFor="">Employee Name</label>
                <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Emp_name ? getInfo?.Emp_name : "Not Found"} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                { }
                <label htmlFor="">Designation</label>
                <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Desig_name ? getInfo?.Desig_name : "Not Found"} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaMasterPayrollFormgroup">
                <label htmlFor="">Department</label>
                <input type="text" name="" id="" className="form-control" readOnly value={getInfo?.Dept_name ? getInfo?.Dept_name : "Not Found"} />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <span className="TaSalaryFromHeading">Payroll Information</span>
            </div>
          </div>
          <div className="row mt-2 p-2">
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaMasterPayrollFormgroup">
                <h6 style={{ fontSize: "12px", color: "red" }}>
                  {ModeOfPayErr ? ModeOfPayErr : false}
                </h6>
                <label htmlFor="">Mode Of Payment</label>
                <select name="" id="" className="form-select" required="true" onChange={(e) => setMode_Of_Payment(e.target.value)}>
                  <option selected disabled value="">
                    Select Mode of payment
                  </option>
                  {ModeOfPay?.map((items) => {
                    return (
                      <>
                        <option value={items?.Payment_code}>
                          {items?.Payment_name}
                        </option>
                      </>
                    );
                  })}
                </select>
                <label htmlFor="">Registration Club</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">
                  <input type="Radio" name="RegistrationClub" required id="" className="form-check-input" value="Y" onChange={(e) => setRecreation_Club_Flag(e.target.checked == true ? e.target.value : null
                  )} />
                  &nbsp;
                  <label htmlFor="" className="yes">Yes</label>

                  &nbsp;
                  <input type="Radio" name="RegistrationClub" className="form-check-input" id="" value="N"
                    onChange={(e) => setRecreation_Club_Flag(e.target.checked == true ? e.target.value : null)} />{" "}
                  &nbsp;
                  <label htmlFor="" className="yes">No</label>
                </div>
                <label htmlFor="">Meal Deduction</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">
                  <input
                    type="Radio"
                    className="form-check-input"
                    name="Meal"
                    required
                    id=""
                    value="Y"
                    onChange={(e) =>
                      setMeal_Deduction_Flag(
                        e.target.checked == true ? e.target.value : null
                      )
                    }
                  />{" "}
                  &nbsp; <label htmlFor="" className="yes">Yes</label>
                  &nbsp;
                  <input
                    type="Radio"
                    className="form-check-input"
                    name="Meal"
                    id=""
                    value="N"
                    onChange={(e) =>
                      setMeal_Deduction_Flag(
                        e.target.checked == true ? e.target.value : null
                      )
                    }
                  />{" "}
                  &nbsp; <label htmlFor="" className="yes" >No</label>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaMasterPayrollFormgroup">

                <label htmlFor="">SE&SI</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">

                  <input type="Radio" name="SE&SI" required className="form-check-input" value="Y" id="yesShowInput" onClick={() => { setYesSESI(!YesSESI) }} />
                  &nbsp;
                  <label htmlFor="yesShowInput" className="yes">Yes</label>

                  &nbsp;
                  <input type="Radio" name="SE&SI" className="form-check-input" id="hideInput" value="N" onClick={() => { setYesSESI(false) }} onChange={(e) => {
                    setSESSI_Flag(e.target.value);
                  }} />
                  &nbsp; <label htmlFor="hideInput" className="yes">No</label>
                </div>

                {YesSESI ?
                  <input type="number" id="" className="mt-1 form-control" required={YesSESI == true ? true : false}
                    onChange={(e) => setSESSI_Number(e.target.value)}

                  /> : null
                }

                <label htmlFor="">EOBI Number</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">
                  <input
                    type="Radio"
                    required
                    name="Eobi"
                    id=""
                    value='Y'
                    onClick={() => setYesEobi(!YesEobi)}
                  />
                  &nbsp; <label htmlFor="" className="yes">Yes</label>
                  &nbsp;
                  <input
                    type="Radio"
                    name="Eobi"
                    className="form-check-input"
                    id=""
                    value="N"
                    onChange={(e) => {
                      setEOBI_Flag(e.target.value);
                    }}
                    onClick={() => setYesEobi(false)}

                  />{" "}
                  &nbsp; <label htmlFor="" className="yes">No</label>
                </div>
                {YesEobi ? (
                  <input type="number" className="mt-1 form-control" name="Se&bi" id="" required={YesEobi == true ? true : false}
                    onChange={(e) => setEOBI_Number(e.target.value)} />
                ) : (
                  ""
                )}
                <label htmlFor="">Union</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">
                  <input
                    type="Radio"
                    name="Union"
                    required
                    id=""
                    className="form-check-input"
                    value="Y"
                    onChange={(e) =>
                      setUnion_Flag(
                        e.target.checked == true ? e.target.value : null
                      )
                    }
                  />{" "}

                  &nbsp; <label htmlFor="" className="yes">Yes</label>
                  &nbsp;
                  <input
                    type="Radio"
                    name="Union"
                    id=""
                    className="form-check-input"
                    value="N"
                    onChange={(e) =>
                      setUnion_Flag(
                        e.target.checked == true ? e.target.value : null
                      )
                    }
                  />{" "}
                  &nbsp; <label htmlFor="" className="yes">No</label>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group d-flex flex-column TaMasterPayrollFormgroup">
                <label htmlFor="">Over Time</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">
                  <input type="Radio" name="OverTime" required className="form-check-input" id="" value="Y" onChange={(e) => setOvertime_Flag(e.target.checked == true ? e.target.value : "null")} />{" "}
                  &nbsp; <label htmlFor="" className="yes">Yes</label>
                  &nbsp;
                  <input type="Radio" name="OverTime" id="" className="form-check-input" value="N" onChange={(e) => setOvertime_Flag(e.target.checked == true ? e.target.value : "null")} />{" "}
                  &nbsp; <label htmlFor="" className="yes">No</label>
                </div>
                <label htmlFor="">Incentive</label>
                <div className="form-control d-flex align-items-center TaMasterPayrollFormControl">
                  <input type="Radio" name="Incentive" required id="" className="form-check-input" value="Y" onChange={(e) => setIncentive_Flag(e.target.checked == true ? e.target.value : "null")} />{" "}
                  &nbsp; <label htmlFor="" className="yes">Yes</label>
                  &nbsp;
                  <input type="Radio" name="Incentive" id="" className="form-check-input" value="N" onChange={(e) =>
                    setIncentive_Flag(e.target.checked == true ? e.target.value : "null")} />{" "}
                  &nbsp; <label htmlFor="" className="yes">No</label>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <span className="TaSalaryFromHeading">Bank Accounts</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-1  col-sm-2 responsive">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                <label htmlFor="">S.NO</label>
                <label htmlFor="">1</label>
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                <label htmlFor="">Acc Type</label>
                <input
                required
                  type="number"
                  name=""
                  id=""
                  className="mt-1 form-control"
                  onChange={(e) => setAccount_Type1(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                <label htmlFor="">Account Number</label>
                <input
                required
                  type="number"
                  name=""
                  id=""
                  className="mt-1 form-control"
                  onChange={(e) => setBank_Account_No1(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                <label htmlFor="">Branch</label>
                <p style={{ fontSize: "10px", color: "red" }}>
                  {BankBrancesErr ? BankBrancesErr : false}
                </p>
                <select
                require="true"
                  name=""
                  id=""
                  className="mt-1 form-select"
                  required
                  onChange={(e) => setBranch_Code1(e.target.value)}
                >
                  <option selected disabled value="">
                    Select Bank Branch
                  </option>
                  {BankBrances.map((items) => {
                    return (
                      <>
                        <option value={items.Branch_code}>
                          {items.Branch_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                <label htmlFor="">Amount</label>
                <input
                required
                  type="number"
                  name=""
                  id=""
                  className="mt-1 form-control"
                  onChange={(e) => setBank_Amount_1(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="form-group d-flex flex-column  TaMasterPayrollFormgroup">
                <label htmlFor="">Percent</label>
                <input
                required
                  type="number"
                  name=""
                  id=""
                  className="mt-1 form-control"
                  onChange={(e) => setBank_Percent_1(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12 col-sm-12 p-2">
              <div className="salarybtncontainer MasterPayrollbtncontainer">
                <button
                  type="submit"
                  disabled={btnEnaledAndDisabled}
                  className="btn btn-dark"
                >
                  {loading ? "A moment please..." : "Save"}
                </button>
                {/* <button>Reset</button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default TAppointmentMasterPayroll;
