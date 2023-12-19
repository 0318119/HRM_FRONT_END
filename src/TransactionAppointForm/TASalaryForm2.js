import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import Header from "../components/Includes/Header";
import Country from "./Country.json"
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import { TAPersonalSchema } from './schema';
import { message, Table } from 'antd';
import baseUrl from '../config.json'
import { Link, useNavigate, useLocation } from "react-router-dom";



function TASalaryForm2({ cancel, mode, isCode, page }) {

    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [getInfo, setInfo] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState(false);
    const [getEmpTypeCode, setgetEmpTypeCode] = useState([])
    const [EmployeeCategory, setEmployeeCategory] = useState([])
    const [LeaveCategory, setLeaveCategory] = useState([])
    const [PayCategory, setPayCategory] = useState([])
    const [Shifts, setShifts] = useState([])
    const [Designation, setDesignation] = useState([])
    const [CostCenter, setCostCenter] = useState([])
    const [Section, setSection] = useState([])
    const [Grade, setGrade] = useState([])
    const [Education, setEducation] = useState([])
    const [Location, setLocation] = useState([])
    const [Religion, setReligion] = useState([])
    const [Supervisor, setSupervisor] = useState([])
    const [AllowanceData, setAllowanceData] = useState([])
    const [getInfoErr, setInfoErr] = useState(false)
    const [getEmpCodeErr, setEmpCodeErr] = message.useMessage();
    const [EmpCategoryDataErr, setEmpCategoryDataErr] = message.useMessage();
    const [leaveCatErr, setleaveCatErr] = message.useMessage();
    const [PayCategoryErr, setPayCategoryErr] = message.useMessage();
    const [ShiftsCodeErr, setShiftsCodeErr] = message.useMessage();
    const [DesignationCodeErr, setDesignationCodeErr] = message.useMessage();
    const [CostCenterCodeErr, setCostCenterCodeErr] = message.useMessage();
    const [SectionCodeErr, setSectionCodeErr] = message.useMessage();
    const [GradeCodeErr, setGradeCodeErr] = message.useMessage();
    const [EducationCodeErr, setEducationCodeErr] = message.useMessage();
    const [LocationCodeErr, setLocationCodeErr] = message.useMessage();
    const [ReligionCodeErr, setReligionCodeErr] = message.useMessage();
    const [loader, setloader] = useState(false)
    const [postAllownces, setpostAllownces] = useState([])
    const [GetEmployeeSalary, setGetEmployeeSalary] = useState([])
    const [GetEmployeeSalaryErr, setGetEmployeeSalaryErr] = useState(false)
    var get_refresh_token = localStorage.getItem("refresh");
    const [AllowanceErr, setAllowanceErr] = useState(false)
    const search = useLocation().search
    const navigate = useNavigate()
    const [formErr, setformErr] = useState(false)
    const [total, settotal] = useState(0)
    var userId = new URLSearchParams(search).get('userId')

    const [SupervisorCodeErr, setSupervisorCodeErr] = message.useMessage();
    const currentDate = new Date();
    const EditBack = () => {
        cancel('read')
    }

    const showAlert = (message, type) => {
        setformErr({
          message: message,
          type: type,
        })
      }

    async function getInfoCall() {
        await fetch(`${baseUrl['baseUrl']}/appointments/GetAppointmentsBySeqNo/${userId}`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${baseUrl['baseUrl']}/appointments/GetAppointmentsBySeqNo/${userId}`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setInfo(response.data[0][0])
                    }
                }).catch((error) => {
                    setInfoErr(error.message)
                })
            }
            else {
                setInfo(response.data[0][0])
            }
        }).catch((error) => {
            setInfoErr(error.message)
        })
    }

    async function AllowanceCall() {
        await fetch(`${baseUrl['baseUrl']}/allownces/GetAllAllownces`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${baseUrl['baseUrl']}/allownces/GetAllAllownces`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setAllowanceData(response.data[0])
                        var temp = []
                        if (response.data[0].length > 0) {
                            for (var i of response.data[0]) {
                                var obj = {
                                    "code": i.allowance_code,
                                    "amount": 0
                                }
                                temp.push(obj)
                                setpostAllownces([...temp])
                            }
                        }
                    }
                }).catch((error) => {
                    setAllowanceErr(error.message)
                })
            }
            else {
                setAllowanceData(response.data[0])
                var temp = []
                if (response.data[0].length > 0) {
                    for (var i of response.data[0]) {
                        var obj = {
                            "code": i.allowance_code,
                            "amount": 0
                        }
                        temp.push(obj)
                        setpostAllownces([...temp])
                    }
                }
            }
        }).catch((error) => {
            setAllowanceErr(error.message)
        })
    }

    const CreateAllowance = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        await fetch(`${baseUrl['baseUrl']}/employee_salary/InsertEmployeeSalary`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sequence_no": userId,
                "FirstTimeFlag": GetEmployeeSalary.length > 0 ? "Y" : "N",
                "allownces": postAllownces
            })
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${baseUrl['baseUrl']}/employee_salary/InsertEmployeeSalary`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: JSON.stringify({
                        "Sequence_no": userId,
                        "FirstTimeFlag": GetEmployeeSalary.length > 0 ? "Y" : "N",
                        "allownces": postAllownces
                    })
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        if (response.success == "success") {
                            setLoading(false);
                            setBtnEnaledAndDisabled(false);
                            showAlert(response.success, "success")
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000)
                        } else {
                            setLoading(false);
                            setBtnEnaledAndDisabled(false);
                            showAlert(response?.messsage, "warning")
                        }
                    }
                }).catch((errs) => {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAlert(errs.messsage, "warning")
                })
            }
            else {
                if (response.success == "success") {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAlert(response.success, "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } else {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    showAlert(response?.messsage, "warning")
                }
            }
        }).catch((errs) => {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            showAlert(errs.messsage, "warning")
        })
    }

    async function GetEmployeeSalaryCall() {
        setloader(true)
        await fetch(`${baseUrl['baseUrl']}/employee_salary/GetEmployeeSalaryBySeqNo/${userId}`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${baseUrl['baseUrl']}/employee_salary/GetEmployeeSalaryBySeqNo/${userId}`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh", response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmployeeSalary(response.data[0])
                        if (response && response.data && response.data.length > 0 && response.data[0] && response.data[0].length > 0) {
                            var temp = 0
                            var temparray = []
                            for (var i of response.data[0]) {
                                temp = temp + parseInt(i?.Amount)
                                temparray.push({ "code": i?.Allowance_code, "amount": i?.Amount })
                            }
                            setpostAllownces(temparray)
                            settotal(temp)
                        }
                        setloader(false)
                    }
                }).catch((error) => {
                    setGetEmployeeSalaryErr(error.message)
                })
            }
            else {
                setGetEmployeeSalary(response.data[0])
                if (response && response.data && response.data.length > 0 && response.data[0] && response.data[0].length > 0) {
                    var temp = 0
                    var temparray = []
                    for (var i of response.data[0]) {
                        temp = temp + parseInt(i?.Amount)
                        temparray.push({ "code": i?.Allowance_code, "amount": i?.Amount })
                    }
                    setpostAllownces(temparray)
                    settotal(temp)
                }
                setloader(false)
            }
        }).catch((error) => {
            setGetEmployeeSalaryErr(error.message)
            setloader(false)
        })
    }


    useEffect(() => {
        getInfoCall()
        AllowanceCall()
        CreateAllowance()
        GetEmployeeSalaryCall()
    }, [])
    // ==================================================
    const submitForm = async (data) => {
        try {
            const isValid = await TAPersonalSchema.validate(data);
            if (isValid) {
                // POST_MASTER_PERSONAL_FORM(data)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(TAPersonalSchema),
    });

    // // MASTER PERSNOL FORM DATA API CALL =========================== 
    // async function POST_MASTER_PERSONAL_FORM(body) {
    //     setLoading(true)
    //     await fetch(
    //         `${baseUrl.baseUrl}/appointments/AppointmentsSavePersonel`, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             accessToken: `Bareer ${get_access_token}`,
    //         },
    //         body: JSON.stringify({
    //             "Emp_name": body?.Emp_name,
    //             "Desig_name": body?.Desig_name,
    //             "Dept_name": body?.Dept_name,
    //         })
    //     }
    //     ).then((response) => {
    //         return response.json();
    //     }).then(async (response) => {
    //         if (response.success) {
    //             messageApi.open({
    //                 type: 'success',
    //                 content: response?.message || response?.messsage,
    //             });
    //             setLoading(false)
    //             setTimeout(() => {
    //                 window.location.href = "/TAShortsCut"
    //             }, 1000);
    //         }
    //         else {
    //             messageApi.open({
    //                 type: 'error',
    //                 content: response?.message || response?.messsage,
    //             });
    //             setLoading(false)
    //         }
    //     }).catch((error) => {
    //         messageApi.open({
    //             type: 'error',
    //             content: error?.message || error?.messsage,
    //         });
    //         setLoading(false)
    //     });
    // }

    const columns = [
        {
            title: "Allowance Code",
            value: "AllowanceCode"

        },
 
        
        {
            title: "Allowance",
            value: "Allowance"
        },
        
        {
            title: "Amount",
            value: "Amount"
        },
    ];

    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass2">
                        <div>
                            <h2 className="text-dark"> Transaction - Salary</h2>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <h4 className="text-dark">Employee Salary</h4>
                                <Link to="/Appointment" className="backLink text-dark">Back</Link>
                                <hr />

                                <div className="form-group formBoxCountry">
                                    <FormInput
                                        label={'Employee Name'}
                                        placeholder={'Employee Name'}
                                        id="Emp_name"
                                        name="Emp_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Designation'}
                                        placeholder={'Designation'}
                                        id="Desig_name"
                                        name="Desig_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    
                                        
                                    <FormInput
                                        label={'Department'}
                                        placeholder={'Department'}
                                        id="Dept_name"
                                        name="Dept_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <h4 className="text-dark">Salary Break Up</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <Table
                                        columns={columns}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    {/* <CancelButton onClick={EditBack} title={'Cancel'} /> */}
                                    <SimpleButton type={'submit'} loading={isLoading} title="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TASalaryForm2;