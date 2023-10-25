import React, { useState, useEffect } from 'react'
import './assets/css/TACheckList.css'
import Header from '../components/Includes/Header'
import { Link, useNavigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { CheckRounded, RadioButtonUnchecked } from '@mui/icons-material';
import { List } from '@mui/material';
const config = require("../config.json");


function TACheckList() {

  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_company_code = localStorage.getItem("company_code");
  const navigate = useNavigate();
  const search = useLocation().search;
  var userId = new URLSearchParams(search).get("userId");


  const [Checklist, setChecklist] = useState([]);
  const [ChecklistErr, setChecklistErr] = useState(false);

  async function getCheckListData() {
    await fetch(`${config["baseUrl"]}/checklist/GetAllCheckList`, {
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
          await fetch(`${config["baseUrl"]}/checklist/GetAllCheckList`, {
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
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setChecklist(response.data[0]);
              }
            })
            .catch((error) => {
              setChecklistErr(error.message);
            });
        } else {
          setChecklist(response.data[0]);
          // console.log("response.data",response.data[0]);
        }
      })
      .catch((error) => {
        setChecklistErr(error.message);
      });
  }

  const [ChecklistTraining, setChecklistTraining] = useState([]);
  const [ChecklistTrainingErr, setChecklistTrainingErr] = useState(false);
  const [listNO, setListNo] = useState([])


  async function getCheckListTrainingData() {
    console.log('userererre', userId)
    await fetch(`${config["baseUrl"]}/checklist/GetTranhiringchecklistBySeqNo/${userId}`, {
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
        console.log('dtatattattatata', response)
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/checklist/GetTranhiringchecklistBySeqNo/${userId}`, {
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
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setChecklistTraining(response.data[0]);
                var temp = [];
                if (response.data[0].length > 0) {
                  for (var i of response.data[0]) {
                    var obj = {
                      "item": i.List_No
                    }
                    temp.push(obj)
                    setListNo([...temp])
                  }
                }
              }
            })
            .catch((error) => {
              setChecklistTrainingErr(error.message);
            });
        } else {
          setChecklistTraining(response.data[0]);
          setFirstTimeFlag(response.data[0].map((items) => { return (items.SeqNo) }))
          console.log("get Tran Check list", response.data[0]);
          var temp = [];
          if (response.data[0].length > 0) {
            for (var i of response.data[0]) {
              console.log(i)
              var obj = {
                "item": i.List_No
              }
              temp.push(obj)
              setListNo([...temp])
            }
          }
        }
      })
      .catch((error) => {
        setChecklistTrainingErr(error.message);
      });
  }

  const [loading, setLoading] = useState(false);
  const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
  const [FirstTimeFlag, setFirstTimeFlag] = useState("")

  const [itemsValue, setitemsValue] = useState([])
  const [itemsNo, setitemsNo] = useState([])

  const [ChecklistitemErr, setChecklistitemErr] = useState("")

  const showAlert = (message, type) => {
    setChecklistitemErr({
      message: message,
      type: type,
    });
  };
  const createChecklist = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnEnaledAndDisabled(true);
    //  console.log('han hai', listNO)
    //  return
    await fetch(`${config["baseUrl"]}/checklist/InsertCheckList`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Sequence_no": userId,
        "FirstTimeFlag": FirstTimeFlag,
        "items": listNO
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(`${config["baseUrl"]}/checklist/InsertCheckList`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
            body: JSON.stringify({
              "Sequence_no": userId,
              "FirstTimeFlag": FirstTimeFlag,
              "items": listNO
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setLoading(false);
                setBtnEnaledAndDisabled(false);
                showAlert(response.messsage, "success");
                console.log("response", response)
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
          console.log("response", response)
        }
      })
      .catch((errs) => {
        showAlert(errs.messsage, "warning");
        console.log("errs 2", errs)
      });
  };


  useEffect(() => {
    getCheckListData()
    getCheckListTrainingData()
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container-fluid p-2">

      </div>
      <div className="container-fluid  rounded mt-5 TaCheckListContainer">
        <div className="row mt-5 w-100 mx-0">
          <span className="ChecKListHeader">
            Transaction - Appointment (Check List)
            <Link to="/Appointment" className="backLink">Back to  Appointment List</Link>
          </span>
        </div>
        <ul className="p-0 mx-2">
          {ChecklistitemErr && (
            <li className={`alert alert-${ChecklistitemErr.type}` + " " + "mt-2"}>{`${ChecklistitemErr.message}`}</li>
          )}
        </ul>
        <form action="" onSubmit={createChecklist}>
          <div className="row  CheckListRow">
            <div className="col-md-12 col-sm-12">
              <h6 style={{ fontSize: "12px", color: "red", marginTop: "2px", padding: "1px 5px" }}>{ChecklistErr ? ChecklistErr : false}</h6>
              <table className='w-100'>
                <thead className='Checklisttablehead'>
                  <tr className='checklistHeadtr'>
                    <th>Check</th>
                    <th>Serial NO</th>
                    <th>Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='Checklisttablebody'>
                  {Checklist.map((items, index) => {
                    return (
                      <>

                        <tr className='checklistHeadtr mt-1'>
                          <td>
                            <input type="checkbox" className='form-check-input' value={items.Item_Name}
                              checked={listNO.filter(data => data.item == items.List_no).length > 0 ? true : false}
                              onChange={(e) => {
                                setFirstTimeFlag(e.target.checked == true ? "Y" : "N")
                                if (listNO.filter(data => data.item == items.List_no).length > 0) {
                                  var temp = listNO.filter(data => data.item !== items.List_no)
                                  console.log(listNO)
                                  setListNo([])
                                  setListNo([...temp])
                                }
                                else {
                                  listNO.push({ "item": items.List_no })
                                  setListNo(listNO)
                                }
                              }}
                            />
                          </td>
                          <td className="mt-1 CheckListText">{items.List_no}</td>
                          <td className="mt-1 CheckListText">{items.Item_Name}</td>
                          <td className="mt-1 CheckListText"></td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-lg-12 mt-2 col-md-12 col-sm-12 ChecklistBtnCo">
              <button className='btn btn-dark' type='submit' disabled={btnEnaledAndDisabled} >{loading ? "A  Moment Please.." : ChecklistTraining.length > 0 ? "Submit" : "Submit"}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default TACheckList