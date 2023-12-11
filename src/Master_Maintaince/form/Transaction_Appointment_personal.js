import React, { useEffect, useState } from "react";
import "../assets/css/Transaction_Appointment_personal.css";
import Header from '../../components/Includes/Header'
import { BsFillCheckSquareFill as FormCheck_ico } from 'react-icons/bs'
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "@mui/icons-material";
import axios from "axios";
const config = require('../../config.json')



function Transaction_Appointment_personal() {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    var get_Emp_code = localStorage.getItem("Emp_code");
    const navigate = useNavigate()
    const [Err, setErr] = useState(false)
    const showAlert = (message, type) => {
        setErr({
            message: message,
            type: type,
        })
    }
    





    const [getEmpTypeCode, setgetEmpTypeCode] = useState([])
    const [getEmptypeErr, setgetEmptypeErr] = useState(false)
    async function getEmpTypeCodeData() {
        await fetch(`${config['baseUrl']}/employment_type_code/GetEmploymentTypeCode`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_type_code/GetEmploymentTypeCode`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setgetEmpTypeCode(response.data[0][0])
                    }
                }).catch((error) => {
                    setgetEmptypeErr(error.message)
                })
            }
            else {
                setgetEmpTypeCode(response.data[0][0])
            }
        }).catch((error) => {
            setgetEmptypeErr(error.message)
        })
    }

    // ========================= 2
    const [getEmploymentCategory, setgetEmploymentCategory] = useState([])
    const [getEmploymentCategoryErr, setgetEmploymentCategoryErr] = useState(false)
    async function EmploymentCategoryData() {
        await fetch(`${config['baseUrl']}/employment_category/GetEmploymentCategory`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_category/GetEmploymentCategory`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setgetEmploymentCategory(response.data[0])
                    }
                }).catch((error) => {
                    setgetEmploymentCategoryErr(error.message)
                })
            }
            else {
                setgetEmploymentCategory(response.data[0])
            }
        }).catch((error) => {
            setgetEmploymentCategoryErr(error.message)
        })
    }

    // ========================= 3
    const [employmentLeaveCategory, setemploymentLeaveCategory] = useState([])
    const [employmentLeaveCategoryErr, setemploymentLeaveCategoryErr] = useState(false)
    async function GetemploymentLeaveCategory() {
        await fetch(`${config['baseUrl']}/employment_leave_category/GetEmploymentLeaveCategory`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_leave_category/GetEmploymentLeaveCategory`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setemploymentLeaveCategory(response.data[0])
                    }
                }).catch((error) => {
                    setemploymentLeaveCategoryErr(error.message)
                })
            }
            else {
                setemploymentLeaveCategory(response.data[0])
            }
        }).catch((error) => {
            setemploymentLeaveCategoryErr(error.message)
        })
    }

    // ========================= 4
    const [GetEmploymentPayrollData, setGetEmploymentPayrollData] = useState([])
    const [GetEmploymentPayrollErr, setGetEmploymentPayrollErr] = useState(false)
    async function GetEmploymentPayrollFunction() {
        await fetch(`${config['baseUrl']}/employment_payroll/GetEmploymentPayroll`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_payroll/GetEmploymentPayroll`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentPayrollData(response.data[0][0])
                    }
                }).catch((error) => {
                    setGetEmploymentPayrollErr(error.message)
                })
            }
            else {
                setGetEmploymentPayrollData(response.data[0][0])
            }
        }).catch((error) => {
            setGetEmploymentPayrollErr(error.message)
        })
    }


    // ========================= 5
    const [GetEmploymentShiftData, setGetEmploymentShiftData] = useState([])
    const [GetEmploymentShiftErr, setGetEmploymentShiftErr] = useState(false)
    async function GetEmploymentShiftDataCall() {
        await fetch(`${config['baseUrl']}/employment_shift/GetEmploymentShift`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_shift/GetEmploymentShift`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentShiftData(response.data[0])
                    }
                }).catch((error) => {
                    setGetEmploymentShiftErr(error.message)
                })
            }
            else {
                setGetEmploymentShiftData(response.data[0])
            }
        }).catch((error) => {
            setGetEmploymentShiftErr(error.message)
        })
    }

    // ========================= 6
    const [GetEmploymentDesigData, setGetEmploymentDesigData] = useState([])
    const [GetEmploymentDesigErr, setGetEmploymentDesigErr] = useState(false)
    async function GetEmploymentDesigDataCall() {
        await fetch(`${config['baseUrl']}/employment_desig/GetEmploymentDesignation`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_desig/GetEmploymentDesignation`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentDesigData(response.data[0])
                    }
                }).catch((error) => {
                    setGetEmploymentDesigErr(error.message)
                })
            }
            else {
                setGetEmploymentDesigData(response.data[0])

            }
        }).catch((error) => {
            setGetEmploymentDesigErr(error.message)
        })
    }


    // ========================= 7
    const [GetEmploymentCostCenterData, setGetEmploymentCostCenterData] = useState([])
    const [GetEmploymentCostCenterErr, setGetEmploymentCostCenterErr] = useState(false)
    async function GetEmploymentCostCenterDataCall() {
        await fetch(`${config['baseUrl']}/employment_cost_center/GetEmploymentCostCenter`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_cost_center/GetEmploymentCostCenter`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentCostCenterData(response.data[0])
                    }
                }).catch((error) => {
                    setGetEmploymentCostCenterErr(error.message)
                })
            }
            else {
                setGetEmploymentCostCenterData(response.data[0])
            }
        }).catch((error) => {
            setGetEmploymentCostCenterErr(error.message)
        })
    }

    // ========================= 8
    const [GetEmploymentSectionCodeData, setGetEmploymentSectionCodeData] = useState([])
    const [GetEmploymentSectionCodeErr, setGetEmploymentSectionCodeErr] = useState(false)
    async function GetEmploymentSectionCodeDataCall() {
        await fetch(`${config['baseUrl']}/employment_section_code/GetEmploymentSectionCode`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/employment_section_code/GetEmploymentSectionCode`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setGetEmploymentSectionCodeData(response.data[0])
                    }
                }).catch((error) => {
                    setGetEmploymentSectionCodeErr(error.message)
                })
            }
            else {
                setGetEmploymentSectionCodeData(response.data[0])
            }
        }).catch((error) => {
            setGetEmploymentSectionCodeErr(error.message)
        })
    }

    // ========================= 9
    const [grade_codeData, setgrade_codeData] = useState([])
    const [grade_codeErr, setgrade_codeErr] = useState(false)
    async function gradecodeDataCall() {
        await fetch(`${config['baseUrl']}/grade_code/GetGradeCode`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/grade_code/GetGradeCode`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setgrade_codeData(response.data[0])
                    }
                }).catch((error) => {
                    setgrade_codeErr(error.message)
                })
            }
            else {
                setgrade_codeData(response.data[0])
            }
        }).catch((error) => {
            setgrade_codeErr(error.message)
        })
    }

    // ========================= 10
    const [EduCodeData, setEduCodeData] = useState([])
    const [EduCodeDataErr, setEduCodeDataErr] = useState(false)
    async function EduCodeDataCall() {
        await fetch(`${config['baseUrl']}/education_code/GetEducationCode`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/education_code/GetEducationCode`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setEduCodeData(response.data[0])
                    }
                }).catch((error) => {
                    setEduCodeDataErr(error.message)
                })
            }
            else {
                setEduCodeData(response.data[0])
            }
        }).catch((error) => {
            setEduCodeDataErr(error.message)
        })
    }

    // =========================  11
    const [location_codeData, setlocation_codeData] = useState([])
    const [location_codeErr, setlocation_codeErr] = useState(false)
    async function locationCodeDataCall() {
        await fetch(`${config['baseUrl']}/location_code/GetEmploymentLocationCode`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/location_code/GetEmploymentLocationCode`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setlocation_codeData(response.data[0])
                    }
                }).catch((error) => {
                    setlocation_codeErr(error.message)
                })
            }
            else {
                setlocation_codeData(response.data[0])
            }
        }).catch((error) => {
            setlocation_codeErr(error.message)
        })
    }

    // =========================  12
    const [religion_codeData, setreligion_codeData] = useState([])
    const [religion_codeErr, setreligion_codeErr] = useState(false)
    async function religionCodeDataCall() {
        await fetch(`${config['baseUrl']}/religion_code/GetEmploymentReligionCode`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/religion_code/GetEmploymentReligionCode`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setreligion_codeData(response.data[0])
                    }
                }).catch((error) => {
                    setreligion_codeErr(error.message)
                })
            }
            else {
                setreligion_codeData(response.data[0])
            }
        }).catch((error) => {
            setreligion_codeErr(error.message)
        })
    }

    // =========================  13
    const [master_all_employeesData, setmaster_all_employeesData] = useState([])
    const [master_all_employeesErr, setmaster_all_employeesErr] = useState(false)
    async function master_all_employeesDataCall() {
        await fetch(`${config['baseUrl']}/master_all_employees/GetMasterAllEmployees`, {
            method: "GET",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`${config['baseUrl']}/master_all_employees/GetMasterAllEmployees`, {
                    method: "GET",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setmaster_all_employeesData(response.data[0])
                    }
                }).catch((error) => {
                    setmaster_all_employeesErr(error.message)
                })
            }
            else {
                setmaster_all_employeesData(response.data[0])
            }
        }).catch((error) => {
            setmaster_all_employeesErr(error.message)
        })
    }






    useEffect(() => {
        // 1
        getEmpTypeCodeData()
        // 2
        EmploymentCategoryData()
        // 3
        GetemploymentLeaveCategory()
        // 4
        GetEmploymentPayrollFunction()
        // 5
        GetEmploymentShiftDataCall()
        // 6
        GetEmploymentDesigDataCall()
        // 7 
        GetEmploymentCostCenterDataCall()
        // 8
        GetEmploymentSectionCodeDataCall()
        // 9
        gradecodeDataCall()
        // 10
        EduCodeDataCall()
        // 11
        locationCodeDataCall()
        // 12
        religionCodeDataCall()
        // 13
        master_all_employeesDataCall()
    }, [])
    const [EmployeeId, setEmployeeId] = useState(0)
    const [MaritalStatus, setMaritalStatus] = useState(0)
    const [EmployeeYesAndNo, setEmployeeYesAndNo] = useState(0)
    const [EmployeePicture, setEmployeePicture] = useState("")
    const [EmployeeGender, setEmployeeGender] = useState(0)
    const [confirmDate, setConfirmDate] = useState('0')
    const [ConfirmFlag, setConfirmFlag] = useState(0)
    const [EmployeeName, setEmployeeName] = useState('')
    const [EmployeeCode, setEmployeeCode] = useState('')
    const [FatherName, setFatherName] = useState('')
    const [BloodGroup, setBloodGroup] = useState('')
    const [JoiningDate, setJoiningDate] = useState('')
    const [AddressLine1, setAddressLine1] = useState('')
    const [AddressLine2, setAddressLine2] = useState('')
    const [MobileNo, setMobileNo] = useState(0)
    const [MobileNoRes1, setMobileNoRes1] = useState(0)
    const [MobileNoRes2, setMobileNoRes2] = useState(0)
    const [MobileNoOffice1, setMobileNoOffice1] = useState(0)
    const [MobileNoOffice2, setMobileNoOffice2] = useState(0)
    const [emailAddress, setemailAddress] = useState('')
    const [CNICNo, setCNICNo] = useState(0)
    const [NTNNo, setNTNNo] = useState(0)
    const [BirthDate, setBirthDate] = useState("")
    const [VehicleRegistrationNumber, setVehicleRegistrationNumber] = useState(0)
    const [PermanentAddress, setPermanentAddress] = useState('')
    const [Nationality, setNationality] = useState('')
    const [OfferLetterate, setOfferLetterate] = useState(0)
    const [TentativeJoiningDate, setTentativeJoiningDate] = useState(0)
    const [GetEmploymentSectionCodeVal, setGetEmploymentSectionCodeVal] = useState()
    const [grade_codeVal, setgrade_codeVal] = useState()
    const [religion_codeVal, setreligion_codeVal] = useState()
    const [ReferredBy, setReferredBy] = useState("")
    const [Contract, setContract] = useState("")
    const [master_all_employeesVal, setmaster_all_employeesVal] = useState()
    const [location_codeVal, setlocation_codeVal] = useState()
    const [EduCodeDataVal, setEduCodeDataVal] = useState()
    const [getEmpTypeVal, setgetEmpTypeVal] = useState()
    const [GetEmploymentCostCenterVal, setGetEmploymentCostCenterVal] = useState()
    const [getEmploymentCategoryVal, setgetEmploymentCategoryVal] = useState()
    const [employmentLeaveCategoryVal, setemploymentLeaveCategoryVal] = useState()
    const [GetEmploymentPayrollVal, setGetEmploymentPayrollVal] = useState()
    const [GetEmploymentShiftVal, setGetEmploymentShiftVal] = useState()
    const [GetEmploymentDesigVal, setGetEmploymentDesigVal] = useState()
    const [ProbabilityPeriodMonths, setProbabilityPeriodMonths] = useState(0)
    const [NoticePeriodMonths, setNoticePeriodMonths] = useState(0)
    const [EmergencypersonName, setEmergencypersonName] = useState("")
    const [EmergencyRelationship, setEmergencyRelationship] = useState("")
    const [EmergencyAddress1, setEmergencyAddress1] = useState("")
    const [EmergencyAddress2, setEmergencyAddress2] = useState("")
    const [EmergencyPhone1, setEmergencyPhone1] = useState(0)
    const [EmergencyPhone2, setEmergencyPhone2] = useState(0)
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")
    const [CNICExpiryDate, setCNICExpiryDate] = useState(0)
    const [CNICIssueDate, setCNICIssueDate] = useState(0)
    const [Emp_Confirm_date, setEmp_Confirm_date] = useState('')

    const SaveForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        await fetch(`https://hrm-api.logomish.com/appointments/AppointmentsSavePersonel`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sequence_no": EmployeeCode,
                "Emp_name": EmployeeName,
                "Emp_Father_name": FatherName,
                "Emp_sex_code": EmployeeGender,
                "Emp_marital_status": MaritalStatus,
                "Confirmation_Flag": ConfirmFlag ? ConfirmFlag : "N",
                "Emp_address_line1": AddressLine1,
                "Emp_address_line2": AddressLine2,
                "Emp_home_tel1": MobileNoRes1,
                "Emp_home_tel2": MobileNoRes2,
                "Emp_office_tel1": MobileNoOffice1,
                "Emp_office_tel2": MobileNoOffice2,
                "Emp_mobile_No": MobileNo,
                "Emp_email": emailAddress,
                "Emp_nic_no": CNICNo,
                "Emp_NIC_Issue_date": CNICIssueDate,
                "Emp_NIC_Expiry_date": CNICExpiryDate,
                "Emp_Retirement_age": 40,
                "Emp_ntn_no": NTNNo,
                "Emp_birth_date": BirthDate,
                "Vehicle_Registration_Number": VehicleRegistrationNumber,
                "Contact_Person_Name": EmergencypersonName,
                "Relationship": EmergencyRelationship,
                "Contact_address1": EmergencyAddress1,
                "Contact_address2": EmergencyAddress2,
                "Contact_home_tel1": EmergencyPhone1,
                "Contact_home_tel2": EmergencyPhone2,
                "Emp_Blood_Group": BloodGroup,
                "Employment_Type_code": getEmpTypeVal,
                "Emp_category": getEmploymentCategoryVal,
                "Emp_Leave_category": employmentLeaveCategoryVal,
                "Emp_Payroll_category": GetEmploymentPayrollVal,
                "Shift_code": GetEmploymentShiftVal,
                "Desig_code": GetEmploymentDesigVal,
                "Cost_Centre_code": GetEmploymentCostCenterVal,
                "Section_code": GetEmploymentSectionCodeVal,
                "Grade_code": grade_codeVal,
                "Edu_code": EduCodeDataVal,
                "Loc_code": location_codeVal,
                "Religion_Code": religion_codeVal,
                "Supervisor_Code": 0,
                "ContractExpiryDate": "2023/12/09",
                "Emp_ID": get_Emp_code == null ? 0 : get_Emp_code,
                "Offer_Letter_date": OfferLetterate,
                "Tentative_Joining_date": TentativeJoiningDate,
                "RefferedBy": ReferredBy,
                "Probationary_period_months": ProbabilityPeriodMonths,
                "Notice_period_months": NoticePeriodMonths,
                "Extended_confirmation_days": confirmDate,
                "Emp_confirm_date": confirmDate,
                "Permanent_address": PermanentAddress,
                "Nationality": Nationality,
                "roster_group_code": 0,
                "card_no": 0,
                "Position_Code": 0,
                "Company_Code": get_company_code,
                "UserCode": get_Emp_code == null ? 0 : get_Emp_code
            })
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(`https://hrm-api.logomish.com/appointments/AppointmentsSavePersonel`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` },
                    body: JSON.stringify({
                        "Sequence_no": 12,
                        "Emp_name": EmployeeName,
                        "Emp_Father_name": FatherName,
                        "Emp_sex_code": EmployeeGender,
                        "Emp_marital_status": MaritalStatus,
                        "Confirmation_Flag": ConfirmFlag ? ConfirmFlag : "N",
                        "Emp_address_line1": AddressLine1,
                        "Emp_address_line2": AddressLine2,
                        "Emp_home_tel1": MobileNoRes1,
                        "Emp_home_tel2": MobileNoRes2,
                        "Emp_office_tel1": MobileNoOffice1,
                        "Emp_office_tel2": MobileNoOffice2,
                        "Emp_mobile_No": MobileNo,
                        "Emp_email": emailAddress,
                        "Emp_nic_no": CNICNo,
                        "Emp_NIC_Issue_date": CNICIssueDate,
                        "Emp_NIC_Expiry_date": CNICExpiryDate,
                        "Emp_Retirement_age": 40,
                        "Emp_ntn_no": NTNNo,
                        "Emp_birth_date": BirthDate,
                        "Vehicle_Registration_Number": VehicleRegistrationNumber,
                        "Contact_Person_Name": EmergencypersonName,
                        "Relationship": EmergencyRelationship,
                        "Contact_address1": EmergencyAddress1,
                        "Contact_address2": EmergencyAddress2,
                        "Contact_home_tel1": EmergencyPhone1,
                        "Contact_home_tel2": EmergencyPhone2,
                        "Emp_Blood_Group": BloodGroup,
                        "Employment_Type_code": getEmpTypeVal,
                        "Emp_category": getEmploymentCategoryVal,
                        "Emp_Leave_category": employmentLeaveCategoryVal,
                        "Emp_Payroll_category": GetEmploymentPayrollVal,
                        "Shift_code": GetEmploymentShiftVal,
                        "Desig_code": GetEmploymentDesigVal,
                        "Cost_Centre_code": GetEmploymentCostCenterVal,
                        "Section_code": GetEmploymentSectionCodeVal,
                        "Grade_code": grade_codeVal,
                        "Edu_code": EduCodeDataVal,
                        "Loc_code": location_codeVal,
                        "Religion_Code": religion_codeVal,
                        "Supervisor_Code": 0,
                        "ContractExpiryDate": "2023/12/09",
                        "Emp_ID": get_Emp_code == null ? 0 : get_Emp_code,
                        "Offer_Letter_date": OfferLetterate,
                        "Tentative_Joining_date": TentativeJoiningDate,
                        "RefferedBy": ReferredBy,
                        "Probationary_period_months": ProbabilityPeriodMonths,
                        "Notice_period_months": NoticePeriodMonths,
                        "Extended_confirmation_days": confirmDate,
                        "Emp_confirm_date": confirmDate,
                        "Permanent_address": PermanentAddress,
                        "Nationality": Nationality,
                        "roster_group_code": 0,
                        "card_no": 0,
                        "Position_Code": 0,
                        "Company_Code": get_company_code,
                        "UserCode": get_Emp_code == null ? 0 : get_Emp_code
                    })
                }).then(response => {
                    return response.json()
                }).then(response => {
                    if (response.messsage == "timeout error") { navigate('/') }
                    else {
                        localStorage.setItem("refresh",  response.referesh_token);
                        localStorage.setItem("access_token", response.access_token);
                        setLoading(false);
                        setBtnEnaledAndDisabled(false);
                        if (response?.message) {
                            alert(`${response?.message}`)
                        } else if (response?.messsage) {
                            alert(`${response?.messsage}`)
                        }
                    }
                }).catch((errs) => {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                    alert(`${errs?.messsage}`)

                })
            }
            else {
                setLoading(false);
                setBtnEnaledAndDisabled(false);

                if (response?.message) {
                    alert(`${response?.message}`)
                } else if (response?.messsage) {
                    alert(`${response?.messsage}`)
                }
            }
        }).catch((errs) => {
            setLoading(false);
            setBtnEnaledAndDisabled(false);
            alert(`${errs?.messsage}`)

        })
    }

    const [checkCnicDateErr, setcheckCnicDateErr] = useState(false)
    useEffect(() => {
        if (CNICExpiryDate > CNICIssueDate) {
            setCNICExpiryDate(CNICExpiryDate)
            setCNICIssueDate(CNICIssueDate)
            setcheckCnicDateErr(false)
        }
        else if (CNICIssueDate >= CNICExpiryDate) {
            setcheckCnicDateErr("Expiry date must be greater then issue date.")
        } else { setcheckCnicDateErr(false) }

    }, [CNICExpiryDate, CNICIssueDate])




    return (
        <>
            <div>
                <Header />
            </div>
            <div className="TaFormSection px-1 mt-5 p-3">
                <div className="container-fluid TAFormCont ">
                    <div className="col-lg-12 HeadingBYpersonForm p-2">
                        <span className="FormHeadText">
                            Transaction - Appointment (Personal)
                            <Link to="#" className="backLink">Back to  Appointment List</Link>
                        </span>
                    </div>
                    <form onSubmit={SaveForm} className=" p-2">

                        <div className="row p-1">
                            <div className="">
                                <ul className='p-0'>
                                    {Err && (
                                        <li className={`alert alert-${Err.type}` + " " + "mt-3"}>{`${Err.message}`}</li>
                                    )}
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="form-group  d-flex  flex-column infoForm">
                                    <label htmlFor="">Marital Status</label>
                                    <div className="d-flex flex-row">
                                        <input type="Radio" className="mx-1 form-check-input" name="Marital_Status" id="married" value="M" onChange={(e) => { setMaritalStatus(e.target.checked == true ? e.target.value : "") }} />
                                        <label className="m-0" htmlFor="married">Married</label>
                                        <input type="Radio" className="mx-1 form-check-input" name="Marital_Status" id="single" value="M" onChange={(e) => { setMaritalStatus(e.target.checked == true ? e.target.value : "") }} />
                                        <label className="m-0" htmlFor="single">Single</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Gender</label>
                                    <div className="d-flex ">
                                        <input type="Radio" name="Genders" id="Male" value="M" className="mx-1 form-check-input" onChange={(e) => { setEmployeeGender(e.target.checked == true ? e.target.value : "null") }} />
                                        <label htmlFor="Male" className="m-0">Male</label>
                                        <input type="Radio" name="Genders" id="Female" value="F" className="mx-1 form-check-input" onChange={(e) => { setEmployeeGender(e.target.checked == true ? e.target.value : "null") }} />
                                        <label htmlFor="Female" className="m-0">Female</label>
                                    </div>
                                </div>
                                <div className="form-group p-0 ctrlFlag d-flex  mx-1 mt-2">
                                    <input type="Radio" name="Confirm Flag" id="" value="Y" className="form-check-input" onChange={(e) => { setConfirmFlag(e.target.checked == true ? e.target.value : "null") }} />
                                    <label htmlFor="" >Confirm Flag</label>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">

                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Confirmation Date</label>
                                    <input type="date" name="" id="" required className="form-control" onChange={(e) => { setEmp_Confirm_date(e.target.value) }} />
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="form-group d-flex flex-column  infoForm">
                                    <label htmlFor="">Employee Picture</label>
                                    {/* required */}
                                    <input type="file" className="TAfile form-control" onChange={(e) => { setEmployeePicture(e.target.files[0]) }} />
                                </div>
                            </div>

                        </div>
                        <div className="row mt-3">
                            <span className="TaRowFormHeading">Personal Information</span>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Employee Code</label>
                                    <input type="number" className="form-control" name="" id="" required onChange={(e) => { setEmployeeCode(e.target.value) }} />

                                    <label htmlFor="">Employee Name</label>
                                    <input type="text" className="form-control" name="" id="" required onChange={(e) => { setEmployeeName(e.target.value) }} />

                                    <label htmlFor="">*Address Line 1</label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setAddressLine1(e.target.value) }} />

                                    <label htmlFor="">Phone (Res) 1</label>
                                    <input type="number" name="" id="" className="form-control" required onChange={(e) => { setMobileNoRes1(e.target.value) }} />

                                    <label htmlFor="">Email Address</label>
                                    <input type="email" name="" id="" className="form-control" required onChange={(e) => { setemailAddress(e.target.value) }} />

                                    <label htmlFor="">Car / M.Cycle No </label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setVehicleRegistrationNumber(e.target.value) }} />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Father Name</label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setFatherName(e.target.value) }} />

                                    {/* <label htmlFor="">*Transaction Date</label> */}
                                    {/* <input type="text" name="" id="" required /> */}

                                    <label htmlFor="">Phone (Res) 2</label>
                                    <input type="number" name="" id="" className="form-control" required onChange={(e) => { setMobileNoRes2(e.target.value) }} />

                                    <label htmlFor="">CNIC No.</label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setCNICNo(e.target.value) }} />

                                    <label htmlFor="">CNIC Issue Date.</label>
                                    <input type="date" name="" id="" className="form-control" required onChange={(e) => { setCNICIssueDate(e.target.value) }} />

                                    <label htmlFor="">CNIC Expiry Date.</label>
                                    <input type="date" name="" id="" className="form-control" required onChange={(e) => {
                                        setCNICExpiryDate(e.target.value)
                                        // else{
                                        //    setcheckCnicDateErr(false)
                                        // }
                                    }} />
                                    <span className="p-0 m-0" style={{ color: "red", fontSize: "15px" }}>{checkCnicDateErr ? checkCnicDateErr : false}</span>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Blood Group</label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setBloodGroup(e.target.value) }} />

                                    <label htmlFor="">*Address Line 2</label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setAddressLine2(e.target.value) }} />

                                    <label htmlFor="">Phone (Office) 1</label>
                                    <input type="number" name="" id="" className="form-control" required onChange={(e) => { setMobileNoOffice1(e.target.value) }} />

                                    <label htmlFor="">NTN No.</label>
                                    <input type="number" name="" id="" className="form-control" required onChange={(e) => { setNTNNo(e.target.value) }} />

                                    <label htmlFor="">Nationality</label>
                                    <input type="text" name="" id="" className="form-control" required onChange={(e) => { setNationality(e.target.value) }} />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Joining Date</label>
                                    <input type="date" name="" id="" className="form-control" required onChange={(e) => { setJoiningDate(e.target.value) }} />

                                    <label htmlFor="">Mobile No</label>
                                    <input type="number" name="" id="" className="form-control" required onChange={(e) => { setMobileNo(e.target.value) }} />

                                    <label htmlFor="">Phone (Office) 2</label>
                                    <input type="number" name="" id="" className="form-control" required onChange={(e) => { setMobileNoOffice2(e.target.value) }} />

                                    <label htmlFor="">Birth Date</label>
                                    <input type="date" name="" id="" className="form-control" required onChange={(e) => { setBirthDate(e.target.value) }} />

                                    <label htmlFor="">Permanent Address </label>
                                    <textarea name="" id="" className="form-control" required onChange={(e) => { setPermanentAddress(e.target.value) }}></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="row mt-3">
                            <span className="TaRowFormHeading">Relationship</span>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Type</label>
                                    <h6 style={{ fontSize: "12px", color: "red" }}>{getEmptypeErr ? getEmptypeErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setgetEmpTypeVal(e.target.value) }}>
                                        <option selected disabled value="">Select Type</option>
                                        <option value={getEmpTypeCode?.Empt_Type_code}>{getEmpTypeCode?.Empt_Type_name}</option>
                                    </select>

                                    <label htmlFor="">*Shifts</label>
                                    <h6 style={{ fontSize: "12px", color: "red" }} className="m-0 p-0">{GetEmploymentShiftErr ? GetEmploymentShiftErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentShiftVal(e.target.value) }}>
                                        <option selected disabled value="">Select Shifts</option>
                                        {GetEmploymentShiftData.map((items => {
                                            return (<option key={items.Shift_code} value={items.Shift_code}>{items.Shift_Name}</option>)
                                        }))}
                                    </select>

                                    <label htmlFor="">*Grade</label>
                                    <h6 style={{ fontSize: "12px", color: "red" }} className="m-0 p-0">{grade_codeErr ? grade_codeErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setgrade_codeVal(e.target.value) }}>
                                        <option selected disabled value="">Select Grade</option>
                                        {grade_codeData.map((items => {
                                            return (<option key={items.Grade_code} value={items.Grade_code}>{items.Grade_name}</option>)
                                        }))}
                                    </select>

                                    <label htmlFor="">*Religion</label>
                                    <h6 style={{ fontSize: "12px", color: "red" }} className="m-0 p-0">{religion_codeErr ? religion_codeErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setreligion_codeVal(e.target.value) }}>
                                        <option selected disabled value="">Select Religion</option>
                                        {religion_codeData.map((items => {
                                            return (<option key={items.Religion_code} value={items.Religion_code}>{items.Religion_name}</option>)
                                        }))}
                                    </select>

                                    <label htmlFor="">*Offer Letter Date:</label>
                                    <input type="date" name="" id="" className="form-control" onChange={(e) => { setOfferLetterate(e.target.value) }} />

                                    {/* <label htmlFor="">Employee HR Category</label>
                  <h6 style={{fontSize: "12px",color: "red"}} className="m-0 p-0">{master_all_employeesErr? master_all_employeesErr : false}</h6>
                  <select name="" id=""  onChange={(e) => {setmaster_all_employeesVal(e.target.value)}}>
                      <option selected disabled value="">Select Employee HR Category</option>
                      {master_all_employeesData.map((items => {
                        return(<option key={items.Emp_code} value={items.Emp_code}>{items.Emp_name}</option>)
                      }))}
                  </select> */}
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Category</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{getEmploymentCategoryErr ? getEmploymentCategoryErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setgetEmploymentCategoryVal(e.target.value) }}>
                                        <option selected disabled value="">Select Category</option>
                                        {getEmploymentCategory.map((items => {
                                            return (<option key={items.Emp_Category_code} value={items.Emp_Category_code}>{items.Emp_Category_name}</option>)
                                        }))}
                                    </select>
                                    <label htmlFor="">*Designation</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{GetEmploymentDesigErr ? GetEmploymentDesigErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentDesigVal(e.target.value) }}>
                                        <option selected disabled value="">Select Designation</option>
                                        {GetEmploymentDesigData.map((items => {
                                            return (<option key={items.Desig_code} value={items.Desig_code}>{items.Desig_name}</option>)
                                        }))}
                                    </select>
                                    <label htmlFor="">*Education</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{EduCodeDataErr ? EduCodeDataErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setEduCodeDataVal(e.target.value) }}>
                                        <option selected disabled value="">Select Education</option>
                                        {EduCodeData.map((items => {
                                            return (<option key={items.Edu_code} value={items.Edu_code}>{items.Edu_name}</option>)
                                        }))}
                                    </select>
                                    <label htmlFor="">*Supervisor</label>
                                    <select name="" className="form-select" id="" >
                                        <option value="">a</option>
                                        <option value="">b</option>
                                        <option value="">c</option>
                                    </select>
                                    <label htmlFor="">*Tentative Joining Date:</label>
                                    <input type="date" name="" id="" className="form-control" onChange={(e) => { setTentativeJoiningDate(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">*Leave Cat</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{employmentLeaveCategoryErr ? employmentLeaveCategoryErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setemploymentLeaveCategoryVal(e.target.value) }}>
                                        <option selected disabled value="">Select Leave Cat</option>
                                        {employmentLeaveCategory.map((items) => {
                                            return (
                                                <option value={items.Leave_Category_code}>{items.Leave_Category_name}</option>
                                            )
                                        })}
                                    </select>
                                    <label htmlFor="">*Cost Center</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{GetEmploymentCostCenterErr ? GetEmploymentCostCenterErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentCostCenterVal(e.target.value) }}>
                                        <option selected disabled value="">Select Cost Center</option>
                                        {GetEmploymentCostCenterData.map((items => {
                                            return (<option key={items.Cost_Centre_code} value={items.Cost_Centre_code}>{items.Cost_Centre_name}</option>)
                                        }))}
                                    </select>
                                    <label htmlFor="">*Location</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{location_codeErr ? location_codeErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setlocation_codeVal(e.target.value) }}>
                                        <option selected disabled value="">Select Location</option>
                                        {location_codeData.map((items => {
                                            return (<option key={items.Loc_code} value={items.Loc_code}>{items.Loc_name}</option>)
                                        }))}
                                    </select>


                                    <label htmlFor="">*Referred By:</label>
                                    <input type="text" name="" id="" className="form-control" onChange={(e) => { setReferredBy(e.target.value) }} />

                                    {/* <label htmlFor="">*Contract</label>
                  <input type="text" name="" id="" required onChange={(e)=> {setContract(e.target.value)}}/> */}
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">*Pay Cat</label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{GetEmploymentPayrollErr ? GetEmploymentPayrollErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentPayrollVal(e.target.value) }}>
                                        <option selected disabled value="">Select Pay Cat</option>
                                        <option value={GetEmploymentPayrollData.Payroll_Category_code}>{GetEmploymentPayrollData.Payroll_Category_name}</option>
                                    </select>
                                    <label htmlFor="">*Section </label>
                                    <h6 className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{GetEmploymentSectionCodeErr ? GetEmploymentSectionCodeErr : false}</h6>
                                    <select name="" id="" className="form-select" onChange={(e) => { setGetEmploymentSectionCodeVal(e.target.value) }}>
                                        <option selected disabled value="">Select Section</option>
                                        {GetEmploymentSectionCodeData.map((items => {
                                            return (<option key={items.Section_code} value={items.Section_code}>{items.Section_name}</option>)
                                        }))}
                                    </select>
                                    {/* <label htmlFor="">*Network ID:</label>
                  <input type="text" name="" id="" required /> */}


                                    <label htmlFor="">*Probability Period (months)</label>
                                    <input type="number" name="" id="" className="form-control" onChange={(e) => { setProbabilityPeriodMonths(e.target.value) }} />

                                    <label htmlFor="">*Notice Period (months):</label>
                                    <input type="number" name="" id="" className="form-control" onChange={(e) => { setNoticePeriodMonths(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <span className="TaRowFormHeading">
                                Emergency Contact Information
                            </span>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Person Name</label>
                                    <input type="text" name="" id="" className="form-control" onChange={(e) => { setEmergencypersonName(e.target.value) }} />

                                    <label htmlFor="">Address 2</label>
                                    <input type="text" name="" id="" className="form-control" onChange={(e) => { setEmergencyAddress1(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Relationship</label>
                                    <input type="text" name="" id="" className="form-control" onChange={(e) => { setEmergencyRelationship(e.target.value) }} />

                                    <label htmlFor="">Phone 1 </label>
                                    <input type="number" name="" id="" className="form-control" onChange={(e) => { setEmergencyPhone1(e.target.value) }} />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group d-flex flex-column infoForm">
                                    <label htmlFor="">Address 1</label>
                                    <input type="text" name="" id="" className="form-control" onChange={(e) => { setEmergencyAddress2(e.target.value) }} />

                                    <label htmlFor="">Phone 2</label>
                                    <input type="number" name="" id="" className="form-control" onChange={(e) => { setEmergencyPhone2(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="row TAFormBtn mt-3">
                            <div className="col-md-12 col-sm-12">
                                <button type="submit" className="btn btn-dark" disabled={btnEnaledAndDisabled}>  {loading ? "A moment please..." : "save"} </button>
                                <button type="button" className="ml-2 btn btn-dark">reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Transaction_Appointment_personal;
