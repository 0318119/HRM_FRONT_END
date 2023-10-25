import React, { useState, useEffect } from 'react'
import '../assets/css/Transaction_incre_form.css'
import Header from '../../components/Includes/Header'
import secureLocalStorage from 'react-secure-storage';
import { ImCross as Cross } from 'react-icons/im'
import { Link, useLocation, useNavigate } from 'react-router-dom';
const config = require('../../config.json')


const Transaction_Increment_form = (props) => {

    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const search = useLocation().search
    var incId = new URLSearchParams(search).get('incId')
    var AlreadyProcess = new URLSearchParams(search).get('Process')
    // AlreadyProcess !== null ? "DeleteAndProcess" :
    const [WhichAction, setWhichAction] = useState("Save")
    const [isSaved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false);
    const currentDate = new Date().toISOString().slice(0, 10);
    const [IncreamentDate, setIncreamentDate] = useState(currentDate);
    const [isAmount, setAmount] = useState('')
    const [isGetInfo, setGetInfo] = useState([])
    const [isEmployeeInfo, setEmployeeInfo] = useState([])
    const [isGetInfoErr, setGetInfoErr] = useState("")
    const [postAllownces, setpostAllownces] = useState([])
    const [isBtn, setBtn] = useState({
        saveBtnLoading: false,
        saveBtnDisabled: false,
        // =================================================================
        processBtnLoading: false,
        processBtnDisabled: false,
        // =================================================================
        deleteBtnLoading: false,
        deleteBtnDisabled: false,
        // =================================================================
    })

    const navigate = useNavigate()
    const showAlert = (message, type) => {
        setSaved({
            message: message,
            type: type,
        })
    }

    /*####################################-Employee InFo-##################################*/
    async function getInfo() {
        await fetch(
            `${config["baseUrl"]}/tranIncrement/TranIncrements_List_By_Code`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": incId
                }),
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranIncrement/TranIncrements_List_By_Code`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": incId
                        }),
                    }
                ).then((response) => {
                    return response.json();
                })
                    .then((response) => {
                        if (response.messsage == "timeout error") {
                            navigate("/");
                        } else {
                            if (response.success) {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem("access_token", response.access_token);
                                setGetInfo(response?.data)
                                setEmployeeInfo(response?.data)
                                var temp = []
                                if (response.data2[0].length > 0) {
                                    for (var i of response.data2[0]) {
                                        var obj = {
                                        "code": i.Allowance_code,
                                        "amount": 0
                                        }
                                        temp.push(obj)
                                        setpostAllownces([...temp])
                                    }
                                }
                            } else {
                                setGetInfoErr(response.message)
                            }
                        }
                    }).catch((error) => { setGetInfoErr(error.messsage) });
            } else {
                if (response.success) {
                    setGetInfo(response.data2[0])
                    setEmployeeInfo(response?.data1[0][0])
                    var temp = []
                    if (response.data2[0].length > 0) {
                        for (var i of response.data2[0]) {
                            var obj = {
                            "code": i.Allowance_code,
                            "amount": 0
                            }
                            temp.push(obj)
                            setpostAllownces([...temp])
                        }
                    }
                } else {
                    setGetInfoErr(response.message)
                }
            }
        }).catch((error) => { setGetInfoErr(error.message) });
    }
    /*####################################-Save-##################################*/
    const increamentPayload = JSON.stringify({
        "Emp_code": incId,
        "Allowance": postAllownces,
        "Transaction_Date": currentDate,
        "Increment_Date": IncreamentDate,
    })
    const SaveDetail = async (e) => {
        e.preventDefault();
        setBtn({
            saveBtnLoading: true,
            saveBtnDisabled: true,
        })
        await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsSave`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: increamentPayload
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsSave`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: increamentPayload
                }).then(response => {
                    return response.json()
                }).then(response => {
                    localStorage.setItem("refresh", response.referesh_token);
                    secureLocalStorage.setItem("access_token", response.access_token);
                    showAlert(response.messsage[0], "success")
                }).catch((errs) => {
                    setLoading(false);
                    showAlert(errs.messsage, "warning")
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                if (response.success) {
                    setBtn({
                        saveBtnLoading: false,
                        saveBtnDisabled: false,
                    })
                    showAlert("Your Request Has been Saved", "success")
                    setTimeout(() => {
                        showAlert("")
                    }, 3000)
                    setWhichAction('DeleteAndProcess')
                }
            }
        }).catch((errs) => {
            setLoading(false);
            showAlert(errs.messsage, "warning")
        })
    }
    /*####################################-Process-##################################*/
    const ProcessForm = async (e) => {
        e.preventDefault();
        setBtn({
            saveBtnLoading: true,
            saveBtnDisabled: true,
        })
        await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsProcess`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Emp_code": incId,
                "Increment_Date": IncreamentDate
            })
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsProcess`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: JSON.stringify({
                        "Emp_code": incId,
                        "Increment_Date": IncreamentDate
                    })
                }).then(response => {
                    return response.json()
                }).then(response => {
                    localStorage.setItem("refresh", response.referesh_token);
                    secureLocalStorage.setItem("access_token", response.access_token);
                    if (response.success) {
                        setBtn({
                            saveBtnLoading: false,
                            saveBtnDisabled: false,
                        })
                        showAlert("Request Proccessed Successfully", "success")
                        setTimeout(() => {
                            showAlert("")
                            navigate('/Increment')
                        }, 3000);
                    }else{
                        setBtn({
                            saveBtnLoading: false,
                            saveBtnDisabled: false,
                        })
                        showAlert(response.message,"warning")
                    }
                }).catch((errs) => {
                    setLoading(false);
                    showAlert(errs.messsage, "warning")
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                if (response.success) {
                    setBtn({
                        saveBtnLoading: false,
                        saveBtnDisabled: false,
                    })
                    showAlert("Request Proccessed Successfully", "success")
                    setTimeout(() => {
                        showAlert("")
                        navigate('/Increment')
                    }, 3000);
                }else{
                    setBtn({
                        saveBtnLoading: false,
                        saveBtnDisabled: false,
                    })
                    showAlert(response.message,"warning")
                }
            }
        }).catch((errs) => {
            setLoading(false);
            showAlert(errs.messsage, "warning")
        })
    }
    /*####################################Delete##################################*/
    const DeleteInc = async (e) => {
        e.preventDefault();
        setBtn({
            saveBtnLoading: true,
            saveBtnDisabled: true,
        })
        await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsDelete`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Emp_code": incId,
            })
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsDelete`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: JSON.stringify({
                        "Emp_code": incId,
                    })
                }).then(response => {
                    return response.json()
                }).then(response => {
                    localStorage.setItem("refresh", response.referesh_token);
                    secureLocalStorage.setItem("access_token", response.access_token);
                    showAlert(response.messsage[0], "success")
                }).catch((errs) => {
                    showAlert(errs.messsage, "warning")
                })
            }
            else if (response.messsage == "timeout error") { navigate('/') }
            else {
                if (response.success) {
                    setBtn({
                        saveBtnLoading: false,
                        saveBtnDisabled: false,
                    })
                    showAlert("Delete Successfully", "success")
                    setTimeout(() => {
                        showAlert("")
                        navigate('/Increment')
                    }, 3000);
                }
            }
        }).catch((errs) => {
            showAlert(errs.messsage, "warning")
        })
    }

   


    useEffect(() => {
        getInfo()
    }, [])
    const [isExistingTotal, setExistingTotal] = useState(0)
    const [isRevisedTotal,setRevisedTotal] = useState(0)
    useEffect(() => {
      var temp = 0
      for (var i of isGetInfo) {
        temp = temp + i.Amount
        setExistingTotal(temp)
      }
    }, [])

    useEffect(() => {
        var temp = 0
        for (var i of postAllownces) {
            // if (!NaN(i.amount)) {
                temp = temp + parseInt(i.amount)
                setRevisedTotal(temp)
            //   }
          }
       
      }, [postAllownces])

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="transaction_Increament_Section px-1 ">
                <div className="container-fluid Transaction_Increment_container">
                    <div className="row mx-0 w-100 Transaction_Increment_Header">
                        <span className="Transaction_Increment_Header">
                            Transaction Increment
                            <Link to="#" className="backLink" onClick={props.onClick} ></Link>
                        </span>
                    </div>
                    <form className="responsiveform">
                        <div className="row mx-0 increment_row">
                            <div className='Increment_heading'>
                                Employee Information
                            </div>
                            
                            <div className="col-lg-12 Increment_Info">
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Employee Name</label>
                                    <input type="text" name="" id="" className='form-control  input' readOnly value={isEmployeeInfo?.Emp_name ? isEmployeeInfo?.Emp_name : "Not Found"} />
                                </div>
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" name="" id="" className='form-control input' readOnly value={isEmployeeInfo?.Desig_name ? isEmployeeInfo?.Desig_name : "Not Found"} />
                                </div>
                                <div className="form-group Inrement_Input">
                                    <label htmlFor="">Department</label>
                                    <input type="text" name="" id="" className='form-control input' readOnly value={isEmployeeInfo?.Dept_name ? isEmployeeInfo?.Dept_name : "Not Found"} />
                                </div>
                            </div>
                        </div>
                        <div className="row mx-0 increment_row">
                            <div className='Increment_heading'>
                                Increment
                            </div>
                            <div className="col-lg-12 Increment_Info">
                                <div className="Inrement_Date">
                                    <div className='form-group  Increment_select mx-1'>
                                        <label htmlFor="">Increment Date</label>
                                        <input type="Date" Value={IncreamentDate} className='form-control' onChange={(e) => setIncreamentDate(e.target.value)} />
                                    </div>
                                    <div className='form-group Increment_select mx-1'>
                                        <label htmlFor="">Transaction Date</label>
                                        <input type="Date" Value={currentDate} readOnly className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-0 m-0">
                            <div className="col-lg-6 Existing_Container">
                                <div className='Existing_Heading'>
                                    <p>Existing</p>
                                </div>
                                <div className='existingTable'>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Allowance Code</th>
                                                <th scope="col">Allowance Name</th>
                                                <th scope="col">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {isGetInfo?.map((item) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td scope="row">{item.Allowance_code}</td>
                                                            <td scope="row">{item.Allowance_name}</td>
                                                            <td><input type="number" readOnly Value={item?.Amount ? item?.Amount : "Not Found"} /></td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                            <tr>
                                                <td scope="row">{0}</td>
                                                <td>Total</td>
                                                <td>
                                                    <input type="text" readOnly value={isExistingTotal}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-6 Existing_Container">
                                <div className='Existing_Heading'>
                                    <p>Revised</p>
                                </div>
                                <div className='revisedTable'>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Allowance Code</th>
                                                <th scope="col">Allowance Name</th>
                                                <th scope="col">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isGetInfo?.map((item,index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td scope="row">{item.Allowance_code}</td>
                                                            <td scope="row">{item.Allowance_name}</td>
                                                            <td><input type="number"   onChange={(e) => {
                                                                postAllownces[index].amount = e.target.value
                                                                setpostAllownces([...postAllownces])
                                                            }}/></td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                            <tr>
                                                <td>{1}</td>
                                                <td>Total</td>
                                                <td>
                                                    <input type="text" readOnly value={isRevisedTotal}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row TAFormBtn mt-3 p-3">
                        <div className="col-md-12 col-sm-12">
                            {WhichAction == "Save" ?
                                <>
                                    <button type="submit" disabled={isBtn.saveBtnDisabled} className="btn btn-dark" onClick={SaveDetail}>{isBtn.saveBtnLoading ? "Please wait..." : "Save"}</button>
                                </>
                                : WhichAction == "DeleteAndProcess" ?
                                    <>
                                        <button type="button" disabled={isBtn.processBtnDisabled} className="ml-2 btn btn-dark" onClick={ProcessForm}>{isBtn.processBtnLoading ? "Please Wait..." : "Process"}</button>
                                        <button type="button" disabled={isBtn.deleteBtnDisabled} className="ml-2 btn btn-dark" onClick={DeleteInc}>{isBtn.deleteBtnLoading ? "Please Wait..." : "Delete"}</button>
                                    </>
                                    : ""}
                        </div>
                    </div>
                </div>
            </div>

            <ul style={{position: "fixed",bottom: "0",width: "50%",right: "10px"}}>
                {isSaved && (
                    <li className={`alert alert-${isSaved.type}` + " " + "mt-4"}>{`${isSaved.message}`}</li>
                )}
            </ul>

        </>
    )
}

export default Transaction_Increment_form