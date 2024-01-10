// import React, { useState, useEffect } from 'react'
// import '../assets/css/Transaction_incre_form.css'
// import Header from '../../components/Includes/Header'
// import secureLocalStorage from 'react-secure-storage';
// import { ImCross as Cross } from 'react-icons/im'
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// const config = require('../../config.json')


// const Transaction_Increment_form = (props) => {

//     var get_refresh_token = localStorage.getItem("refresh");
//     var get_access_token = localStorage.getItem("access_token");
//     const search = useLocation().search
//     var incId = new URLSearchParams(search).get('Emp_code')
//     var AlreadyProcess = new URLSearchParams(search).get('Process')
//     // AlreadyProcess !== null ? "DeleteAndProcess" :
//     const [WhichAction, setWhichAction] = useState("Save")
//     const [isSaved, setSaved] = useState(false)
//     const [loading, setLoading] = useState(false);
//     const currentDate = new Date().toISOString().slice(0, 10);
//     const [IncreamentDate, setIncreamentDate] = useState(currentDate);
//     const [isAmount, setAmount] = useState('')
//     const [isGetInfo, setGetInfo] = useState([])
//     const [isEmployeeInfo, setEmployeeInfo] = useState([])
//     const [isGetInfoErr, setGetInfoErr] = useState("")
//     const [postAllownces, setpostAllownces] = useState([])
//     const [isBtn, setBtn] = useState({
//         saveBtnLoading: false,
//         saveBtnDisabled: false,
//         // =================================================================
//         processBtnLoading: false,
//         processBtnDisabled: false,
//         // =================================================================
//         deleteBtnLoading: false,
//         deleteBtnDisabled: false,
//         // =================================================================
//     })

//     const navigate = useNavigate()
//     const showAlert = (message, type) => {
//         setSaved({
//             message: message,
//             type: type,
//         })
//     }

//     /*####################################-Employee InFo-##################################*/
//     async function getInfo() {
//         await fetch(
//             `${config["baseUrl"]}/tranIncrement/TranIncrements_List_By_Code`,
//             {
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json",
//                     accessToken: `Bareer ${get_access_token}`,
//                 },
//                 body: JSON.stringify({
//                     "Emp_code": incId
//                 }),
//             }
//         ).then((response) => {
//             return response.json();
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(
//                     `${config["baseUrl"]}/tranIncrement/TranIncrements_List_By_Code`,
//                     {
//                         method: "POST",
//                         headers: {
//                             "content-type": "application/json",
//                             refereshToken: `Bareer ${get_refresh_token}`,
//                         },
//                         body: JSON.stringify({
//                             "Emp_code": incId
//                         }),
//                     }
//                 ).then((response) => {
//                     return response.json();
//                 })
//                     .then((response) => {
//                         if (response.messsage == "timeout error") {
//                             navigate("/");
//                         } else {
//                             if (response.success) {
//                                 localStorage.setItem("refresh", response.referesh_token);
//                                 localStorage.setItem("access_token", response.access_token);
//                                 setGetInfo(response?.data)
//                                 setEmployeeInfo(response?.data)
//                                 var temp = []
//                                 if (response.data2[0].length > 0) {
//                                     for (var i of response.data2[0]) {
//                                         var obj = {
//                                             "'code'": i.Allowance_code,
//                                             "amount": 0
//                                         }
//                                         temp.push(obj)
//                                         setpostAllownces([...temp])
//                                     }
//                                 }
//                             } else {
//                                 setGetInfoErr(response.message)
//                             }
//                         }
//                     }).catch((error) => { setGetInfoErr(error.messsage) });
//             } else {
//                 if (response.success) {
//                     setGetInfo(response.data2[0])
//                     setEmployeeInfo(response?.data1[0][0])
//                     var temp = []
//                     if (response.data2[0].length > 0) {
//                         for (var i of response.data2[0]) {
//                             var obj = {
//                                 "code": i.Allowance_code,
//                                 "amount": 0
//                             }
//                             temp.push(obj)
//                             setpostAllownces([...temp])
//                         }
//                     }
//                 } else {
//                     setGetInfoErr(response.message)
//                 }
//             }
//         }).catch((error) => { setGetInfoErr(error.message) });
//     }
//     /*####################################-Save-##################################*/
//     const increamentPayload = JSON.stringify({
//         "Emp_code": incId,
//         "Allowance": postAllownces,
//         "Transaction_Date": currentDate,
//         "Increment_Date": IncreamentDate,
//     })
//     const SaveDetail = async (e) => {
//         e.preventDefault();
//         setBtn({
//             saveBtnLoading: true,
//             saveBtnDisabled: true,
//         })
//         await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsSave`, {
//             method: "POST",
//             headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
//             body: increamentPayload
//         }).then((response) => {
//             return response.json()
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsSave`, {
//                     method: "POST",
//                     headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
//                     body: increamentPayload
//                 }).then(response => {
//                     return response.json()
//                 }).then(response => {
//                     localStorage.setItem("refresh", response.referesh_token);
//                     secureLocalStorage.setItem("access_token", response.access_token);
//                     showAlert(response.messsage[0], "success")
//                 }).catch((errs) => {
//                     setLoading(false);
//                     showAlert(errs.messsage, "warning")
//                 })
//             }
//             else if (response.messsage == "timeout error") { navigate('/') }
//             else {
//                 if (response.success) {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert("Your Request Has been Saved", "success")
//                     setTimeout(() => {
//                         showAlert("")
//                     }, 3000)
//                     setWhichAction('DeleteAndProcess')
//                 }
//             }
//         }).catch((errs) => {
//             setLoading(false);
//             showAlert(errs.messsage, "warning")
//         })
//     }
//     /*####################################-Process-##################################*/
//     const ProcessForm = async (e) => {
//         e.preventDefault();
//         setBtn({
//             saveBtnLoading: true,
//             saveBtnDisabled: true,
//         })
//         await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsProcess`, {
//             method: "POST",
//             headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
//             body: JSON.stringify({
//                 "Emp_code": incId,
//                 "Increment_Date": IncreamentDate
//             })
//         }).then((response) => {
//             return response.json()
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsProcess`, {
//                     method: "POST",
//                     headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
//                     body: JSON.stringify({
//                         "Emp_code": incId,
//                         "Increment_Date": IncreamentDate
//                     })
//                 }).then(response => {
//                     return response.json()
//                 }).then(response => {
//                     localStorage.setItem("refresh", response.referesh_token);
//                     secureLocalStorage.setItem("access_token", response.access_token);
//                     if (response.success) {
//                         setBtn({
//                             saveBtnLoading: false,
//                             saveBtnDisabled: false,
//                         })
//                         showAlert("Request Proccessed Successfully", "success")
//                         setTimeout(() => {
//                             showAlert("")
//                             navigate('/Increment')
//                         }, 3000);
//                     } else {
//                         setBtn({
//                             saveBtnLoading: false,
//                             saveBtnDisabled: false,
//                         })
//                         showAlert(response.message, "warning")
//                     }
//                 }).catch((errs) => {
//                     setLoading(false);
//                     showAlert(errs.messsage, "warning")
//                 })
//             }
//             else if (response.messsage == "timeout error") { navigate('/') }
//             else {
//                 if (response.success) {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert("Request Proccessed Successfully", "success")
//                     setTimeout(() => {
//                         showAlert("")
//                         navigate('/Increment')
//                     }, 3000);
//                 } else {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert(response.message, "warning")
//                 }
//             }
//         }).catch((errs) => {
//             setLoading(false);
//             showAlert(errs.messsage, "warning")
//         })
//     }
//     /*####################################Delete##################################*/
//     const DeleteInc = async (e) => {
//         e.preventDefault();
//         setBtn({
//             saveBtnLoading: true,
//             saveBtnDisabled: true,
//         })
//         await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsDelete`, {
//             method: "POST",
//             headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
//             body: JSON.stringify({
//                 "Emp_code": incId,
//             })
//         }).then((response) => {
//             return response.json()
//         }).then(async (response) => {
//             if (response.messsage == "unauthorized") {
//                 await fetch(`${config['baseUrl']}/tranIncrement/TranIncrementsDelete`, {
//                     method: "POST",
//                     headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
//                     body: JSON.stringify({
//                         "Emp_code": incId,
//                     })
//                 }).then(response => {
//                     return response.json()
//                 }).then(response => {
//                     localStorage.setItem("refresh", response.referesh_token);
//                     secureLocalStorage.setItem("access_token", response.access_token);
//                     showAlert(response.messsage[0], "success")
//                 }).catch((errs) => {
//                     showAlert(errs.messsage, "warning")
//                 })
//             }
//             else if (response.messsage == "timeout error") { navigate('/') }
//             else {
//                 if (response.success) {
//                     setBtn({
//                         saveBtnLoading: false,
//                         saveBtnDisabled: false,
//                     })
//                     showAlert("Delete Successfully", "success")
//                     setTimeout(() => {
//                         showAlert("")
//                         navigate('/Increment')
//                     }, 3000);
//                 }
//             }
//         }).catch((errs) => {
//             showAlert(errs.messsage, "warning")
//         })
//     }




//     useEffect(() => {
//         getInfo()
//     }, [])
//     const [isExistingTotal, setExistingTotal] = useState(0)
//     const [isRevisedTotal, setRevisedTotal] = useState(0)
//     useEffect(() => {
//         var temp = 0
//         for (var i of isGetInfo) {
//             temp = temp + i.Amount
//             setExistingTotal(temp)
//         }
//     }, [])

//     useEffect(() => {
//         var temp = 0
//         for (var i of postAllownces) {
//             // if (!NaN(i.amount)) {
//             temp = temp + parseInt(i.amount)
//             setRevisedTotal(temp)
//             //   }
//         }

//     }, [postAllownces])

//     return (
//         <>
//             <div>
//                 <Header />
//             </div>
//             <div className="transaction_Increament_Section px-1 ">
//                 <div className="container-fluid Transaction_Increment_container">
//                     <div className="row mx-0 w-100 Transaction_Increment_Header">
//                         <span className="Transaction_Increment_Header">
//                             Transaction Increment
//                             <Link to="#" className="backLink" onClick={props.onClick} ></Link>
//                         </span>
//                     </div>
//                     <form className="responsiveform">
//                         <div className="row mx-0 increment_row">
//                             <div className='Increment_heading'>
//                                 Employee Information
//                             </div>

//                             <div className="col-lg-12 Increment_Info">
//                                 <div className="form-group Inrement_Input">
//                                     <label htmlFor="">Employee Name</label>
//                                     <input type="text" name="" id="" className='form-control  input' readOnly value={isEmployeeInfo?.Emp_name ? isEmployeeInfo?.Emp_name : "Not Found"} />
//                                 </div>
//                                 <div className="form-group Inrement_Input">
//                                     <label htmlFor="">Designation</label>
//                                     <input type="text" name="" id="" className='form-control input' readOnly value={isEmployeeInfo?.Desig_name ? isEmployeeInfo?.Desig_name : "Not Found"} />
//                                 </div>
//                                 <div className="form-group Inrement_Input">
//                                     <label htmlFor="">Department</label>
//                                     <input type="text" name="" id="" className='form-control input' readOnly value={isEmployeeInfo?.Dept_name ? isEmployeeInfo?.Dept_name : "Not Found"} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row mx-0 increment_row">
//                             <div className='Increment_heading'>
//                                 Increment
//                             </div>
//                             <div className="col-lg-12 Increment_Info">
//                                 <div className="Inrement_Date">
//                                     <div className='form-group  Increment_select mx-1'>
//                                         <label htmlFor="">Increment Date</label>
//                                         <input type="Date" Value={IncreamentDate} className='form-control' onChange={(e) => setIncreamentDate(e.target.value)} />
//                                     </div>
//                                     <div className='form-group Increment_select mx-1'>
//                                         <label htmlFor="">Transaction Date</label>
//                                         <input type="Date" Value={currentDate} readOnly className='form-control' />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row p-0 m-0">
//                             <div className="col-lg-6 Existing_Container">
//                                 <div className='Existing_Heading'>
//                                     <p>Existing</p>
//                                 </div>
//                                 <div className='existingTable'>
//                                     <table class="table table-striped">
//                                         <thead>
//                                             <tr>
//                                                 <th scope="col">Allowance Code</th>
//                                                 <th scope="col">Allowance Name</th>
//                                                 <th scope="col">Amount</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>

//                                             {isGetInfo?.map((item) => {
//                                                 return (
//                                                     <>
//                                                         <tr>
//                                                             <td scope="row">{item.Allowance_code}</td>
//                                                             <td scope="row">{item.Allowance_name}</td>
//                                                             <td><input type="number" readOnly Value={item?.Amount ? item?.Amount : "Not Found"} /></td>
//                                                         </tr>
//                                                     </>
//                                                 )
//                                             })}
//                                             <tr>
//                                                 <td scope="row">{0}</td>
//                                                 <td>Total</td>
//                                                 <td>
//                                                     <input type="text" readOnly value={isExistingTotal} />
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 Existing_Container">
//                                 <div className='Existing_Heading'>
//                                     <p>Revised</p>
//                                 </div>
//                                 <div className='revisedTable'>
//                                     <table class="table table-striped">
//                                         <thead>
//                                             <tr>
//                                                 <th scope="col">Allowance Code</th>
//                                                 <th scope="col">Allowance Name</th>
//                                                 <th scope="col">Amount</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {isGetInfo?.map((item, index) => {
//                                                 return (
//                                                     <>
//                                                         <tr>
//                                                             <td scope="row">{item.Allowance_code}</td>
//                                                             <td scope="row">{item.Allowance_name}</td>
//                                                             <td><input type="number" onChange={(e) => {
//                                                                 postAllownces[index].amount = e.target.value
//                                                                 setpostAllownces([...postAllownces])
//                                                             }} /></td>
//                                                         </tr>
//                                                     </>
//                                                 )
//                                             })}
//                                             <tr>
//                                                 <td>{1}</td>
//                                                 <td>Total</td>
//                                                 <td>
//                                                     <input type="text" readOnly value={isRevisedTotal} />
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                     <div className="row TAFormBtn mt-3 p-3">
//                         <div className="col-md-12 col-sm-12">
//                             {WhichAction == "Save" ?
//                                 <>
//                                     <button type="submit" disabled={isBtn.saveBtnDisabled} className="btn btn-dark" onClick={SaveDetail}>{isBtn.saveBtnLoading ? "Please wait..." : "Save"}</button>
//                                 </>
//                                 : WhichAction == "DeleteAndProcess" ?
//                                     <>
//                                         <button type="button" disabled={isBtn.processBtnDisabled} className="ml-2 btn btn-dark" onClick={ProcessForm}>{isBtn.processBtnLoading ? "Please Wait..." : "Process"}</button>
//                                         <button type="button" disabled={isBtn.deleteBtnDisabled} className="ml-2 btn btn-dark" onClick={DeleteInc}>{isBtn.deleteBtnLoading ? "Please Wait..." : "Delete"}</button>
//                                     </>
//                                     : ""}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <ul style={{ position: "fixed", bottom: "0", width: "50%", right: "10px" }}>
//                 {isSaved && (
//                     <li className={`alert alert-${isSaved.type}` + " " + "mt-4"}>{`${isSaved.message}`}</li>
//                 )}
//             </ul>

//         </>
//     )
// }

// export default Transaction_Increment_form


// New Code Starts from here

import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton, Button } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Increment/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from "antd";
import { Popconfirm, Space } from "antd";
import * as yup from "yup";

function Incrementform({
    cancel,
    mode,
    isCode,
    status,
    Red_Increment,
    getEmployeeInfo,
    SaveIncrementExInfo,
    SaveConfirmationExInFoProcess,
    Delete_Confirmation
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [mode2, setMode2] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const currentDate = new Date().toISOString().split('T')[0]
    const empInfo = Red_Increment?.GetInfo?.[0]?.res
    const [isProcessbtn, setProcessbtn] = useState(false)
    const [isDeleteLeave, setDeleteLeave] = useState(false)

    const EditBack = () => {
        cancel("read");
    };
    const ConfirmationExtension = yup.object().shape({
        Transaction_Date: yup.string().required("Transaction Date is Required"),
        Confirmation_Date: yup.string().required("Confirmation Date is Required"),
        Remarks: yup.string().required("Remarks is Required"),
    });
    const submitForm = async (data) => {
        try {
            const isValid = await ConfirmationExtension.validate(data);
            if (isValid) {
                if (status == "Process") {
                    processConfirm(data)
                } else if (isProcessbtn == true) {
                    processConfirm(data)
                }
                else {
                    saveConfirm(data)
                }
            }
        } catch (error) {
            console.error(error, "error message");
        }
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(ConfirmationExtension),
    });


    const saveConfirm = async (data) => {
        setLoading(true)
        const Savepayload = JSON.stringify({
            "Emp_code": isCode,
            "Transaction_Date": data?.Transaction_Date,
            "Confirmation_Date": data?.Confirmation_Date,
            "Remarks": data?.Remarks
        })
        const response = await SaveIncrementExInfo(Savepayload);
        if (response.success) {
            messageApi.success(response?.message || response?.messssage);
            setProcessbtn(true)
            setLoading(false)
        } else {
            messageApi.error(response?.message || response?.messssage);
            setLoading(false)
        }
    }
    const processConfirm = async (data) => {
        setLoading(true)
        const Processpayload = JSON.stringify({
            "Emp_code": isCode,
            "Increment_Date": data?.Increment_Date,
        })
        const isCheck = await SaveConfirmationExInFoProcess(Processpayload);
        if (isCheck?.success) {
            message.success(isCheck?.message || isCheck?.messsage)
            setLoading(false)
            setTimeout(() => {
                cancel("read")
            }, 1000);
        } else {
            message.success(isCheck?.message || isCheck?.messsage)
            setLoading(false)
        }
    }
    const DeleteConfrim = async (data) => {
        setDeleteLeave(true)
        message.loading("Please wait...")
        const isCheck = await Delete_Confirmation(data)
        if (isCheck?.success) {
            message.success(isCheck?.message || isCheck?.messsage)
            setDeleteLeave(false)
            setTimeout(() => {
                cancel("read")
            }, 1000);
        } else {
            message.success(isCheck?.message || isCheck?.messsage)
            message.destroy()
            setDeleteLeave(false)
        }
    }
    useEffect(() => {
        if (isCode !== null) {
            getEmployeeInfo(isCode)
        }
    }, [isCode])
    useEffect(() => {
        if (mode == "Edit") {
            reset({
                Emp_name: empInfo?.data?.[0]?.[0]?.Emp_name,
                Desig_name: empInfo?.data?.[0]?.[0]?.Desig_name,
                Dept_name: empInfo?.data?.[0]?.[0]?.Dept_name,
                Joining_Date: empInfo?.data?.[0]?.[0]?.emp_appointment_date,
                emp_confirm_date: empInfo?.data?.[0]?.[0]?.emp_confirm_date,
                Transaction_Date: empInfo?.data?.[0]?.[0]?.Transaction_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Transaction_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Transaction_Date,
                Confirmation_Date: empInfo?.data?.[0]?.[0]?.Confirmation_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Confirmation_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Confirmation_Date,
                Remarks: empInfo?.data?.[0]?.[0]?.remarks == "undefined" || empInfo?.data?.[0]?.[0]?.remarks == null ? "" : empInfo?.data?.[0]?.[0]?.remarks,
            })
        }
    }, [empInfo])
    useEffect(() => {
        if (empInfo?.message == "failed" || empInfo?.messsage == "failed") {
            message.error(`In info Api call: ${empInfo?.message || empInfo?.messsage}`)
        }
    }, [empInfo])

    return (
        <>

            {contextHolder}
            {mode2 == false ? <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Employee Information</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
                        name="Emp_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Designation'}
                        placeholder={'Designation'}
                        name="Desig_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Department'}
                        placeholder={'Department'}
                        name="Dept_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <h4 className="text-dark mt-4">Increment</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Increment Date'}
                        name={'Transaction_Date'}
                        label={'Increment Date'}
                        type="date"
                        style={{ background: "#f5f4f4" }}

                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Transaction Date'}
                        label={'Transaction Date'}
                        name={'Confirmation_Date'}
                        type="date"
                        disabled
                    />
                </div>

                <div className="row">
                    <div className="col-lg-6 maringClass">
                        <h4 className="text-dark">Existing</h4>
                        <hr />
                        <div className='existingTable'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Allowance Code</th>
                                        <th scope="col">Allowance Name</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td scope="row">{0}</td>
                                        <td>Total</td>
                                        <td>
                                            <input type="text" readOnly />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-6 maringClass">
                        <h4 className="text-dark">Revised</h4>
                        <hr />
                        <div className='revisedTable'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Allowance Code</th>
                                        <th scope="col">Allowance Name</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">{0}</td>
                                        <td>Total</td>
                                        <td>
                                            <input type="text" readOnly />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 Existing_Container"></div>
                <div className="BaseCItyBtnBox">
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    {status == "Process" || isProcessbtn == true ? "" : <PrimaryButton type={"submit"} loading={isLoading} title="Save" />}
                    {isProcessbtn == true || status == "Process" ?
                        <>
                            {/* <Button title="Process" loading={isLoading} onClick={(e) => processFun(e)} /> */}
                            <PrimaryButton type={"submit"} loading={isLoading} title="Process" />
                            <Space size="middle">
                                <Popconfirm
                                    title="Delete the Confirmation Extension"
                                    description="Are you sure you want to delete this Confirmation Extension?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => {
                                        DeleteConfrim(isCode)
                                    }}
                                >
                                    <Button title="Delete" loading={isDeleteLeave} onClick={(e) => e.preventDefault(e)} />
                                </Popconfirm>
                            </Space>
                        </> : ""
                    }
                </div>
            </form> : ""}


        </>
    );
}
function mapStateToProps({ Red_Increment }) {
    return { Red_Increment };
}
export default connect(mapStateToProps, ACTIONS)(Incrementform);
