import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as MASTER_PERSONAL from "../../store/actions/MasterMaintaince/MasterPersonal/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox, FormSelect } from '../../components/basic/input/formInput';
import { MasterPersonal_schema } from '../schema';
// import FormSelect from '../../components/basic/select/index'
import { message } from 'antd';
import baseUrl from '../../config.json'

function MasterPersonalForm({ cancel, isCode, page, Get_Master_Personal_By_Id, GetMasterPersonalData, Red_Master_Personal, mode }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
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
    const [SupervisorCodeErr, setSupervisorCodeErr] = message.useMessage();
    const currentDate = new Date();


    // FORM CANCEL FUNCTION =================================================================
    const EditBack = () => {
        cancel('read')
    }
    const submitForm = async (data) => {
        console.log("data",data)
        // try {
        //     const isValid = await MasterPersonal_schema.validate(data);
        //     if (isValid) {
        //         // Transition_Family_Update(data)
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Emp_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_code ?
                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_code : 0,

            Emp_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_name,
            Emp_Father_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Father_name,
            Emp_sex_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_sex_code,
            Emp_marital_status: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status,
            Emp_birth_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_birth_date,
            Emp_Confirm_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Confirm_date,
            Emp_category: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_category,
            Emp_Leave_category: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Leave_category,
            Emp_address_line1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_address_line1,
            Emp_address_line2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_address_line2,
            Emp_home_tel1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_home_tel1,
            Emp_home_tel2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_home_tel2,
            Emp_office_tel2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_office_tel2,
            Emp_mobile_No: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_mobile_No,
            Emp_nic_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_nic_no,
            Emp_NIC_Issue_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_NIC_Issue_date,
            Emp_NIC_Expiry_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_NIC_Expiry_date,
            Emp_Retirement_age: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Retirement_age,
            Emp_ntn_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_ntn_no,
            Emp_email: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_email,
            Confirmation_Flag: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag,
            Employment_Type_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Employment_Type_code,
            Desig_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code,
            Grade_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code,
            Cost_Centre_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code,
            Section_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Section_code,
            Shift_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Shift_code,
            Loc_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Loc_code,
            Edu_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Edu_code,
            Supervisor_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Supervisor_Code,
            Religion_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Religion_Code,
            Contact_Person_Name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_Person_Name,
            Relationship: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Relationship,
            Contact_address1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_address1,
            Contact_address2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_address2,
            Contact_home_tel1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_home_tel1,
            Contact_home_tel2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_home_tel2,
            Emp_Blood_Group: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Blood_Group,
            Vehicle_Registration_Number: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Vehicle_Registration_Number,
            Emp_Payroll_Category: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Payroll_Category,
            Offer_Letter_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Offer_Letter_date,
            Tentative_Joining_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Tentative_Joining_date,
            RefferedBy: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.RefferedBy,
            Probationary_period_months: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Probationary_period_months,
            Notice_period_months: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Notice_period_months,
            Extended_confirmation_days: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Extended_confirmation_days,
            Permanent_address: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Permanent_address,
            Nationality: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Nationality,
            roster_group_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.roster_group_code,
            card_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.card_no,
            position_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.position_code,
        },
        mode: "onChange",
        resolver: yupResolver(MasterPersonal_schema),
    });

    useEffect(() => {
        if (isCode !== null) {
            Get_Master_Personal_By_Id(isCode)
        }
    }, [])



    console.log("Red_Master_Personal",Red_Master_Personal)

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Emp_code: 0,
                    Emp_name: "",
                    Emp_Father_name: "",
                    Emp_sex_code: "",
                    Emp_marital_status: "",
                    Emp_birth_date: "",
                    Emp_Confirm_date: "",
                    Emp_category: "",
                    Emp_Leave_category: "",
                    Emp_address_line1: "",
                    Emp_address_line2: "",
                    Emp_home_tel1: "",
                    Emp_home_tel2: "",
                    Emp_office_tel1: "",
                    Emp_office_tel2: "",
                    Emp_mobile_No: "",
                    Emp_nic_no: "",
                    Emp_NIC_Issue_date: "",
                    Emp_NIC_Expiry_date: "",
                    Emp_Retirement_age: "",
                    Emp_ntn_no: "",
                    Emp_email: "",
                    Confirmation_Flag: "",
                    Employment_Type_code: "",
                    Desig_code: "",
                    Grade_code: "",
                    Cost_Centre_code: "",
                    Section_code: "",
                    Shift_code: "",
                    Loc_code: "",
                    Edu_code: "",
                    Supervisor_Code: "",
                    Religion_Code: "",
                    Contact_Person_Name: "",
                    Relationship: "",
                    Contact_address1: "",
                    Contact_address2: "",
                    Contact_home_tel1: "",
                    Contact_home_tel2: "",
                    Emp_Blood_Group: "",
                    Vehicle_Registration_Number: "",
                    Emp_Payroll_Category: "",
                    Offer_Letter_date: "",
                    Tentative_Joining_date: "",
                    RefferedBy: "",
                    Probationary_period_months: "",
                    Notice_period_months: "",
                    Extended_confirmation_days: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Extended_confirmation_days,
                    Permanent_address: "",
                    Nationality: "",
                    roster_group_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.roster_group_code,
                    card_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.card_no,
                    position_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.position_code,
                },
            )
        } else {
            reset(
                {
                    Emp_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_code,
                    Emp_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_name,
                    Emp_Father_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Father_name,
                    Emp_sex_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_sex_code,
                    Emp_marital_status: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status,
                    Emp_birth_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_birth_date,
                    Emp_Confirm_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Confirm_date,
                    Emp_category: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_category,
                    Emp_Leave_category: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Leave_category,
                    Emp_address_line1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_address_line1,
                    Emp_address_line2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_address_line2,
                    Emp_home_tel1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_home_tel1,
                    Emp_home_tel2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_home_tel2,
                    Emp_office_tel1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_office_tel1,
                    Emp_office_tel2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_office_tel2,
                    Emp_mobile_No: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_mobile_No,
                    Emp_nic_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_nic_no,
                    Emp_NIC_Issue_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_NIC_Issue_date,
                    Emp_NIC_Expiry_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_NIC_Expiry_date,
                    Emp_Retirement_age: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Retirement_age,
                    Emp_ntn_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_ntn_no,
                    Emp_email: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_email,
                    Confirmation_Flag: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag,
                    Employment_Type_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Employment_Type_code,
                    Desig_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code,
                    Grade_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code,
                    Cost_Centre_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code,
                    Section_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Section_code,
                    Shift_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Shift_code,
                    Loc_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Loc_code,
                    Edu_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Edu_code,
                    Supervisor_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Supervisor_Code,
                    Religion_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Religion_Code,
                    Contact_Person_Name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_Person_Name,
                    Relationship: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Relationship,
                    Contact_address1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_address1,
                    Contact_address2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_address2,
                    Contact_home_tel1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_home_tel1,
                    Contact_home_tel2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Contact_home_tel2,
                    Emp_Blood_Group: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Blood_Group,
                    Vehicle_Registration_Number: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Vehicle_Registration_Number,
                    Emp_Payroll_Category: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Payroll_Category,
                    Offer_Letter_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Offer_Letter_date,
                    Tentative_Joining_date: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Tentative_Joining_date,
                    RefferedBy: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.RefferedBy,
                    Probationary_period_months: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Probationary_period_months,
                    Notice_period_months: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Notice_period_months,
                    Extended_confirmation_days: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Extended_confirmation_days,
                    Permanent_address: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Permanent_address,
                    Nationality: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Nationality,
                    roster_group_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.roster_group_code,
                    card_no: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.card_no,
                    position_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.position_code,
                },
            )
        }
    }, [Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]])

    // COST CENTRE FORM DATA API CALL =========================== 
    async function POST_MASTER_PERSONAL_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/allemployees/MasterEmployeesSavePersonel`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": body.Emp_code,
                "Emp_name": body.Edu_name,
                "Emp_Father_name": body.Emp_Father_name,
                "Emp_sex_code": body.Emp_sex_code,
                "Emp_marital_status": body.Emp_marital_status,
                "Emp_birth_date": body.Emp_birth_date,
                "Emp_Confirm_date": body.Emp_Confirm_date,
                "Emp_category": body.Emp_category,
                "Emp_Leave_category": body.Emp_Leave_category,
                "Emp_address_line1": body.Emp_address_line1,
                "Emp_address_line2": body.Contact_address2,
                "Emp_home_tel1": body.Contact_home_tel1,
                "Emp_home_tel2": body.Contact_home_tel2,
                "Emp_office_tel1": body.Emp_office_tel1,
                "Emp_office_tel2": body.Emp_office_tel2,
                "Emp_mobile_No": body.Emp_mobile_No,
                "Emp_nic_no": body.Emp_nic_no,
                "Emp_NIC_Issue_date": body.Emp_NIC_Issue_date,
                "Emp_NIC_Expiry_date": body.Emp_NIC_Expiry_date,
                "Emp_Retirement_age": body.Emp_Retirement_age,
                "Emp_ntn_no": body.Emp_ntn_no,
                "Emp_email": body.Emp_email,
                "Confirmation_Flag": body.Confirmation_Flag,
                "Employment_Type_code": body.Employment_Type_code,
                "Desig_code": body.Desig_code,
                "Grade_code": body.Grade_code,
                "Cost_Centre_code": body.Cost_Centre_code,
                "Section_code": body.Section_code,
                "Shift_code": body.Shift_code,
                "Loc_code": body.Loc_code,
                "Edu_code": body.Edu_code,
                "Supervisor_Code": body.Supervisor_Code,
                "Religion_Code": body.Religion_Code,
                "Contact_Person_Name": body.Contact_Person_,
                "Relationship": body.Relationship,
                "Contact_address1": body.Contact_Address1,
                "Contact_address2": body.Contact_Address2,
                "Contact_home_tel1": body.Contact_Home_tel1,
                "Contact_home_tel2": body.Contact_home_tel2,
                "Emp_Blood_Group": body.Emp_Blood_Group,
                "Vehicle_Registration_Number": body.Vehicle_Registration_Number,
                "Emp_Payroll_Category": body.Emp_Payroll_Category,
                "Offer_Letter_date": body.Offer_Letter_date,
                "Tentative_Joining_date": body.Tentative_Joining_date,
                "RefferedBy": body.RefferedBy,
                "Probationary_period_months": body.Probationary_period_months,
                "Notice_period_months": body.Notice_period_months,
                "Extended_confirmation_days": body.Extended_confirmation_days ? body.Extended_confirmation_days : currentDate,
                "Permanent_address": body.Permanent_address,
                "Nationality": body.Nationality,
                "roster_group_code": body.roster_group_code ? body.roster_group_code : 0,
                "card_no": body.card_no ? body.card_no : 0,
                "position_code": body.position_code ? body.position_code : 0,
            })
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
                setTimeout(() => {
                    cancel('read')
                    GetMasterPersonalData({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
            setLoading(false)
        });
    }
    async function getEmpTypeCodeData() {
        await fetch(`${baseUrl.baseUrl}/employment_type_code/GetEmploymentTypeCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setgetEmpTypeCode(response.data)
            }
            else {
                getEmpCodeErr.open({
                    type: 'error',
                    content: "in Emp type code :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            getEmpCodeErr.open({
                type: 'error',
                content: "in Emp type code :" + error?.message || error?.messsage,
            });
        });
    }
    async function EmpCategoryData() {
        await fetch(`${baseUrl.baseUrl}/employment_category/GetEmploymentCategoryWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response?.success) {
                setEmployeeCategory(response?.data)
            }
            else {
                EmpCategoryDataErr.open({
                    type: 'error',
                    content: "in Emp Category :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            EmpCategoryDataErr.open({
                type: 'error',
                content: "in Emp Category :" + error?.message || error?.messsage,
            });
        });
    }
    async function LeaveCategoryData() {
        await fetch(`${baseUrl.baseUrl}/employment_leave_category/GetEmploymentLeaveCategoryWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setLeaveCategory(response.data)
            }
            else {
                leaveCatErr.open({
                    type: 'error',
                    content: "in Leave Category :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            leaveCatErr.open({
                type: 'error',
                content: "in Leave Category :" + error?.message || error?.messsage,
            });
        });
    }
    async function PayCategoryData() {
        await fetch(`${baseUrl.baseUrl}/employment_payroll/GetEmploymentPayrollWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setPayCategory(response.data)
            }
            else {
                PayCategoryErr.open({
                    type: 'error',
                    content: "in Pay Category :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            PayCategoryErr.open({
                type: 'error',
                content: "in Pay Category :" + error?.message || error?.messsage,
            });
        });
    }
    async function ShiftsData() {
        await fetch(`${baseUrl.baseUrl}/employment_shift/GetEmploymentShiftWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setShifts(response.data)
            }
            else {
                ShiftsCodeErr.open({
                    type: 'error',
                    content: "in Shifts Error :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            ShiftsCodeErr.open({
                type: 'error',
                content: "in Shifts Error :" + error?.message || error?.messsage,
            });
        });
    }
    async function DesignationData() {
        await fetch(`${baseUrl.baseUrl}/employment_desig/GetEmploymentDesignationWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setDesignation(response.data)
            }
            else {
                DesignationCodeErr.open({
                    type: 'error',
                    content: "in Designation :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            DesignationCodeErr.open({
                type: 'error',
                content: "in Designation :" + error?.message || error?.messsage,
            });
        });
    }
    async function CostCenterData() {
        await fetch(`${baseUrl.baseUrl}/employment_cost_center/GetEmploymentCostCenterWithoutPagination`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setCostCenter(response.data)
            }
            else {
                CostCenterCodeErr.open({
                    type: 'error',
                    content: "in Cost centre :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            CostCenterCodeErr.open({
                type: 'error',
                content: "in Cost centre :" + error?.message || error?.messsage,
            });
        });
    }
    async function SectionData() {
        await fetch(`${baseUrl.baseUrl}/employment_section_code/GetEmploymentSectionCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setSection(response.data)
            }
            else {
                SectionCodeErr.open({
                    type: 'error',
                    content: "in Section :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            SectionCodeErr.open({
                type: 'error',
                content: "in Section :" + error?.message || error?.messsage,
            });
        });
    }
    async function GradeData() {
        await fetch(`${baseUrl.baseUrl}/grade_code/GetGradeCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setGrade(response.data)
            }
            else {
                GradeCodeErr.open({
                    type: 'error',
                    content: "in Grade Code :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            GradeCodeErr.open({
                type: 'error',
                content: "in Grade Code :" + error?.message || error?.messsage,
            });
        });
    }
    async function EducationData() {
        await fetch(`${baseUrl.baseUrl}/education_code/GetEducationCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setEducation(response.data)
            }
            else {
                EducationCodeErr.open({
                    type: 'error',
                    content: "in Education :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            EducationCodeErr.open({
                type: 'error',
                content: "in Education :" + error?.message || error?.messsage,
            });
        });
    }
    async function LocationData() {
        await fetch(`${baseUrl.baseUrl}/location_code/GetLocationsWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setLocation(response.data)
            }
            else {
                LocationCodeErr.open({
                    type: 'error',
                    content: "in Location :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            LocationCodeErr.open({
                type: 'error',
                content: "in Location :" + error?.message || error?.messsage,
            });
        });
    }
    async function ReligionData() {
        await fetch(`${baseUrl.baseUrl}/religion_code/GetEmploymentReligionCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setReligion(response.data)
            }
            else {
                ReligionCodeErr.open({
                    type: 'error',
                    content: "in Religion :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            ReligionCodeErr.open({
                type: 'error',
                content: "in Religion :" + error?.message || error?.messsage,
            });
        });
    }
    async function SupervisorData() {
        await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeesNameWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setSupervisor(response.data)
            }
            else {
                SupervisorCodeErr.open({
                    type: 'error',
                    content: "in Supervisor :" + response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            SupervisorCodeErr.open({
                type: 'error',
                content: "in Supervisor :" + error?.message || error?.messsage,
            });
        });
    }


    useEffect(() => {
        getEmpTypeCodeData()
        EmpCategoryData()
        LeaveCategoryData()
        PayCategoryData()
        ShiftsData()
        DesignationData()
        CostCenterData()
        SectionData()
        GradeData()
        EducationData()
        LocationData()
        ReligionData()
        SupervisorData()
    }, [])


    return (
        <>
            {contextHolder}{setEmpCodeErr}{setEmpCategoryDataErr}{setleaveCatErr}{setPayCategoryErr}{setShiftsCodeErr}
            {setDesignationCodeErr}{setCostCenterCodeErr}{setSectionCodeErr}{setGradeCodeErr}{setEducationCodeErr}
            {setLocationCodeErr}{setReligionCodeErr}{setSupervisorCodeErr}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Master Personal</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Employee Code'}
                        placeholder={'Employee Code'}
                        id="Emp_code"
                        name="Emp_code"
                        type="number"
                        readOnly={true}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
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
                        label={'Employee Father Name'}
                        placeholder={'Employee Father Name'}
                        id="Emp_Father_name"
                        name="Emp_Father_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Date Of Birth'}
                        placeholder={'Date Of Birth'}
                        id="Emp_birth_date"
                        name="Emp_birth_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    {/* <FormInput
                        label={'Appointment Date'}
                        placeholder={'Appointment Date'}
                        id="Emp_appointment_date"
                        name="Emp_appointment_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    /> */}
                    <FormInput
                        label={'Confirm Date'}
                        placeholder={'Confirm Date'}
                        id="Emp_Confirm_date"
                        name="Emp_Confirm_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Emp Blood Group'}
                        placeholder={'Emp Blood Group'}
                        id="Emp_Blood_Group"
                        name="Emp_Blood_Group"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee address line1'}
                        placeholder={'Employee address line1'}
                        id="Emp_address_line1"
                        name="Emp_address_line1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee address line2'}
                        placeholder={'Employee address line2'}
                        id="Emp_address_line2"
                        name="Emp_address_line2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Home telephone 1'}
                        placeholder={'Employee Home telephone 1'}
                        id="Emp_home_tel1"
                        name="Emp_home_tel1"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Home telephone 2'}
                        placeholder={'Employee Home telephone 2'}
                        id="Emp_home_tel2"
                        name="Emp_home_tel2"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Office Telephone1'}
                        placeholder={'Employee Office Telephone 1'}
                        id="Emp_office_tel1"
                        name="Emp_office_tel1"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Office Telephone2'}
                        placeholder={'Employee Office Telephone 2'}
                        id="Emp_office_tel2"
                        name="Emp_office_tel2"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Email'}
                        placeholder={'Employee Email'}
                        id="Emp_email"
                        name="Emp_email"
                        type="email"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Mobile Number'}
                        placeholder={'Employee Mobile Number'}
                        id="Emp_mobile_No"
                        name="Emp_mobile_No"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee CNIC Number'}
                        placeholder={'Employee CNIC Number'}
                        id="Emp_nic_no"
                        name="Emp_nic_no"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee CNIC Issue Date'}
                        placeholder={'Employee CNIC Issue Date'}
                        id="Emp_NIC_Issue_date"
                        name="Emp_NIC_Issue_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee CNIC Expiry Date'}
                        placeholder={'Employee CNIC Expiry Date'}
                        id="Emp_NIC_Expiry_date"
                        name="Emp_NIC_Expiry_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Retirement Age'}
                        placeholder={'Employee Retirement Age'}
                        id="Emp_Retirement_age"
                        name="Emp_Retirement_age"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee NTN No'}
                        placeholder={'Employee NTN No'}
                        id="Emp_ntn_no"
                        name="Emp_ntn_no"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Vehicle Registration Number'}
                        placeholder={'Vehicle Registration Number'}
                        id="Vehicle_Registration_Number"
                        name="Vehicle_Registration_Number"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Permanent Address'}
                        placeholder={'Permanent Address'}
                        id="Permanent_address"
                        name="Permanent_address"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Nationality'}
                        placeholder={'Nationality'}
                        id="Nationality"
                        name="Nationality"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Emp_marital_status"
                            name="Emp_marital_status"
                            labelText={'Marital Status'}
                            label={"Single"}
                            value={'S'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status == "S" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Emp_marital_status"
                            name="Emp_marital_status"
                            label={'Married'}
                            value={'M'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status == "Mz" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Confirmation_Flag"
                            name="Confirmation_Flag"
                            labelText={'Confirmation Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Confirmation_Flag"
                            name="Confirmation_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Emp_sex_code"
                            name="Emp_sex_code"
                            labelText={'Genders'}
                            label={"Male"}
                            value={'M'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_sex_code == "M" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Emp_sex_code"
                            name="Emp_sex_code"
                            label={'Female'}
                            value={'M'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_sex_code == "M" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                </div>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormSelect
                        label={'Form Select Type'}
                        placeholder='Form Select Employee Type'
                        id="Employment_Type_code"
                        name="Employment_Type_code"
                        options={getEmpTypeCode?.map(
                            (item) => ({
                                value: item.Empt_Type_code,
                                label: item.Empt_Type_name,
                            })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        type={"text"}
                    />
                    <FormSelect
                        label={'Form Select Category'}
                        placeholder='Form Select Category'
                        id="Emp_category"
                        name="Emp_category"
                        options={EmployeeCategory.map(
                            (item) => ({
                                value: item.Emp_Category_code,
                                label: item.Emp_Category_name,
                            })
                        )}
                        type={"text"}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Leave Cat'}
                        placeholder={'Leave Cat'}
                        id="Emp_Leave_category"
                        name="Emp_Leave_category"
                        options={LeaveCategory.map(
                            (item) => ({
                                value: item.Leave_Category_code,
                                label: item.Leave_Category_name,
                            })
                        )}
                        type={"text"}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Pay Category'}
                        placeholder={'Pay Category'}
                        id="Emp_Payroll_Category"
                        name="Emp_Payroll_Category"
                        type="number"
                        options={PayCategory?.map(
                            (item) => ({
                                value: item.Payroll_Category_code,
                                label: item.Payroll_Category_name,
                            })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Shifts'}
                        placeholder={'Shifts'}
                        id="Shift_code"
                        name="Shift_code"
                        type="text"
                        options={Shifts?.map(
                            (item) => ({
                                value: item.Shift_code,
                                label: item.Shift_Name,
                            })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Designation'}
                        placeholder={'Designation'}
                        id="Desig_code"
                        name="Desig_code"
                        type="text"
                        options={Designation.map((item) => ({
                            value: item.Desig_code,
                            label: item.Desig_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Cost Center'}
                        placeholder={'Cost Center'}
                        id="Cost_Centre_code"
                        name="Cost_Centre_code"
                        type="text"
                        options={CostCenter.map((item) => ({
                            value: item.Cost_Centre_code,
                            label: item.Cost_Centre_name,
                        }))}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Section'}
                        placeholder={'Section'}
                        id="Section_code"
                        name="Section_code"
                        type="text"
                        options={Section?.map((item) => ({
                            value: item.Section_code,
                            label: item.Section_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Grade'}
                        placeholder={'Grade'}
                        id="Grade_code"
                        name="Grade_code"
                        type="text"
                        options={Grade.map((item) => ({
                            value: item.Grade_code,
                            label: item.Grade_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Education'}
                        placeholder={'Education'}
                        id="Edu_code"
                        name="Edu_code"
                        type="text"
                        options={Education.map((item) => ({
                            value: item.Edu_code,
                            label: item.Edu_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Location'}
                        placeholder={'Location'}
                        id="Loc_code"
                        name="Loc_code"
                        type="text"
                        options={Location?.map((item) => ({
                            value: item.Loc_code,
                            label: item.Loc_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Religion'}
                        placeholder={'Religion'}
                        id="Religion_Code"
                        name="Religion_Code"
                        type="text"
                        options={Religion?.map((item) => ({
                            value: item.Religion_code,
                            label: item.Religion_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Supervisor'}
                        placeholder={'Supervisor'}
                        id="Supervisor_Code"
                        name="Supervisor_Code"
                        type="text"
                        options={Supervisor.map((item) => ({
                            value: item.Emp_code,
                            label: item.Emp_name,
                        })
                        )}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Probability Period (months)'}
                        placeholder={'Probability Period'}
                        id="Probationary_period_months"
                        name="Probationary_period_months"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'*Referred By'}
                        placeholder={'*Referred By'}
                        id="RefferedBy"
                        name="RefferedBy"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Notice Period (months)'}
                        placeholder={'Notice Period'}
                        id="Notice_period_months"
                        name="Notice_period_months"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Offer Letter Date'}
                        placeholder={'Offer Letter'}
                        id="Offer_Letter_date"
                        name="Offer_Letter_date"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Tentative Joining Date'}
                        placeholder={'Tentative Joining Date'}
                        id="Tentative_Joining_date"
                        name="Tentative_Joining_date"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Person Name'}
                        placeholder={'Person Name'}
                        id="Contact_Person_Name"
                        name="Contact_Person_Name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Relationship'}
                        placeholder={'Relationship'}
                        id="Relationship"
                        name="Relationship"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Contact address1'}
                        placeholder={'Contact address1'}
                        id="Contact_address1"
                        name="Contact_address1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Contact Address 2'}
                        placeholder={'Contact Address 2'}
                        id="Contact_address2"
                        name="Contact_address2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Telephone 1'}
                        placeholder={'Telephone 1'}
                        id="Contact_home_tel1"
                        name="Contact_home_tel1"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Telephone 2'}
                        placeholder={'Telephone 2'}
                        id="Contact_home_tel2"
                        name="Contact_home_tel2"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <div className='CountryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>
        </>
    )
}
function mapStateToProps({ Red_Master_Personal }) {
    return { Red_Master_Personal };
}

export default connect(mapStateToProps, MASTER_PERSONAL)(MasterPersonalForm); 