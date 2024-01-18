import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import Header from '../components/Includes/Header'
import Country from "./Country.json"
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import { TAPersonalSchema } from './schema';
import { message } from 'antd';
import baseUrl from '../config.json'
import { Link, useLocation } from "react-router-dom";



function TAPersonalform({ cancel, mode, isCode, page, GetAppointStatusCall, Red_Appointment }) {
  var get_access_token = localStorage.getItem("access_token");
  var get_company_code = localStorage.getItem("company_code");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false)
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
  const [getData, setGetData] = useState([])
  const [pageSize, setPageSize] = useState(10);
  const currentDate = new Date();
  const EditBack = () => {
    cancel("read");
  };
  const search = useLocation().search
  var userId = new URLSearchParams(search).get('userId')
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
  async function getDataByID(isCode) {
    await fetch(`${baseUrl.baseUrl}/appointments/GetAppointmentBySequenceNo/${isCode}`, {
      method: "GET",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setGetData(response.data)
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
    getDataByID(isCode)
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
  // ==================================================
  const submitForm = async (data) => {

    try {
      const isValid = await TAPersonalSchema.validate(data);
      if (isValid) {
        const joiningDate = new Date(data?.Emp_joining_date);
        const confirmDate = new Date(data?.Emp_confirm_date);
        const differenceInDays = Math.floor((confirmDate - joiningDate) / (24 * 60 * 60 * 1000));
        if (differenceInDays >= 90) {
          POST_MASTER_PERSONAL_FORM(data)
        } else {
          messageApi.open({
            type: 'error',
            content: "Confirm Date Should be Greater Then Joining Date by 90 days",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset({
      Sequence_no: getData?.Sequence_no,
      Emp_name: getData?.Emp_name,
      Emp_Father_name: getData?.Emp_Father_name,
      Emp_joining_date: getData?.Emp_appointment_date,
      Emp_confirm_date: getData?.Emp_confirm_date,
      Emp_email: getData?.Emp_email,
      Vehicle_Registration_Number: getData?.Vehicle_Registration_Number,
      Emp_nic_no: getData?.Emp_nic_no,
      Emp_ntn_no: getData?.Emp_ntn_no,
      Emp_NIC_Issue_date: getData?.Emp_nic_issue_date,
      Emp_NIC_Expiry_date: getData?.Emp_nic_expiry_date,
      Emp_Retirement_age: getData?.Emp_retirement_age,
      Emp_address_line1: getData?.Emp_address_line1,
      Emp_address_line2: getData?.Emp_address_line2,
      Permanent_address: getData?.Permanent_address,
      Emp_home_tel1: getData?.Emp_home_tel1,
      Emp_home_tel2: getData?.Emp_home_tel2,
      Emp_office_tel1: getData?.Emp_office_tel1,
      Emp_office_tel2: getData?.Emp_office_tel2,
      Emp_mobile_No: getData?.Emp_mobile_No,
      Emp_birth_date: getData?.Emp_birth_date,
      Offer_Letter_date: getData?.Offer_Letter_date,
      Tentative_Joining_date: getData?.Tentative_Joining_date,
      ContractExpiryDate: getData?.ContractExpiryDate,
      Probationary_period_months: getData?.Probationary_period_months,
      Notice_period_months: getData?.Notice_period_months,
      RefferedBy: getData?.RefferedBy,
      Emp_marital_status: getData?.Emp_marital_status,
      Confirmation_Flag: getData?.Confirmation_Flag,
      Emp_Blood_Group: getData?.Emp_Blood_Group,
      Emp_sex_code: getData?.Emp_sex_code,
      Religion_Code: getData?.Religion_Code,
      Nationality: getData?.Nationality,
      Employment_Type_code: getData?.Empt_Type_code,
      Emp_category: getData?.Emp_category,
      Emp_Leave_category: getData?.Emp_Leave_category,
      Emp_Payroll_category: getData?.Emp_Payroll_category,
      Shift_code: getData?.Shift_code,
      Desig_code: getData?.Desig_code,
      Cost_Centre_code: getData?.Cost_Centre_code,
      Section_code: getData?.Section_code,
      Grade_code: getData?.Grade_code,
      Edu_code: getData?.Edu_code,
      Loc_code: getData?.Loc_code,
      Supervisor_Code: getData?.Supervisor_Code,
      Contact_Person_Name: getData?.Contact_Person_Name,
      Relationship: getData?.Relationship,
      Contact_address1: getData?.Contact_address1,
      Contact_address2: getData?.Contact_address2,
      Contact_home_tel1: getData?.Contact_home_tel1,
      Contact_home_tel2: getData?.Contact_home_tel2
    })
  }, [getData])

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      Sequence_no: "",
      Emp_name: "",
      Emp_Father_name: "",
      Emp_sex_code: "",
      Emp_marital_status: "",
      Confirmation_Flag: "",
      Emp_address_line1: "",
      Emp_address_line2: "",
      Emp_home_tel1: "",
      Emp_home_tel2: "",
      Emp_office_tel1: "",
      Emp_office_tel2: "",
      Emp_mobile_No: "",
      Emp_email: "",
      Emp_nic_no: "",
      Emp_NIC_Issue_date: "",
      Emp_NIC_Expiry_date: "",
      Emp_Retirement_age: "",
      Emp_ntn_no: "",
      Emp_birth_date: "",
      Vehicle_Registration_Number: "",
      Contact_Person_Name: "",
      Relationship: "",
      Contact_address1: "",
      Contact_address2: "",
      Contact_home_tel1: "",
      Contact_home_tel2: "",
      Emp_Blood_Group: "",
      Employment_Type_code: "",
      Emp_category: "",
      Emp_Leave_category: "",
      Emp_Payroll_category: "",
      Shift_code: "",
      Desig_code: "",
      Cost_Centre_code: "",
      Section_code: "",
      Grade_code: "",
      Edu_code: "",
      Loc_code: "",
      Religion_Code: "",
      Supervisor_Code: "",
      ContractExpiryDate: "",
      Offer_Letter_date: "",
      Tentative_Joining_date: "",
      RefferedBy: "",
      Probationary_period_months: "",
      Notice_period_months: "",
      Emp_confirm_date: "",
      Emp_joining_date: "",
      Permanent_address: "",
      Nationality: "",
    },
    mode: "onChange",
    resolver: yupResolver(TAPersonalSchema),
  });

  // MASTER PERSNOL FORM DATA API CALL =========================== 
  async function POST_MASTER_PERSONAL_FORM(body) {
    setLoading(true)
    await fetch(
      `${baseUrl.baseUrl}/appointments/AppointmentsSavePersonel`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Sequence_no": body?.Sequence_no,
        "Emp_name": body?.Emp_name,
        "Emp_Father_name": body?.Emp_Father_name,
        "Emp_sex_code": body?.Emp_sex_code,
        "Emp_marital_status": body?.Emp_marital_status,
        "Confirmation_Flag": body?.Confirmation_Flag,
        "Emp_address_line1": body?.Emp_address_line1,
        "Emp_address_line2": body?.Emp_address_line2,
        "Emp_home_tel1": body?.Emp_home_tel1,
        "Emp_home_tel2": body?.Emp_home_tel2,
        "Emp_office_tel1": body?.Emp_office_tel1,
        "Emp_office_tel2": body?.Emp_office_tel2,
        "Emp_mobile_No": body?.Emp_mobile_No,
        "Emp_email": body?.Emp_email,
        "Emp_nic_no": body?.Emp_nic_no,
        "Emp_NIC_Issue_date": body?.Emp_NIC_Issue_date,
        "Emp_NIC_Expiry_date": body?.Emp_NIC_Expiry_date,
        "Emp_Retirement_age": body?.Emp_Retirement_age,
        "Emp_ntn_no": body?.Emp_ntn_no,
        "Emp_birth_date": body?.Emp_birth_date,
        "Vehicle_Registration_Number": body?.Vehicle_Registration_Number,
        "Contact_Person_Name": body?.Contact_Person_Name,
        "Relationship": body?.Relationship,
        "Contact_address1": body?.Contact_address1,
        "Contact_address2": body?.Contact_address2,
        "Contact_home_tel1": body?.Contact_home_tel1,
        "Contact_home_tel2": body?.Contact_home_tel2,
        "Emp_Blood_Group": body?.Emp_Blood_Group,
        "Employment_Type_code": body?.Employment_Type_code,
        "Emp_category": body?.Emp_category,
        "Emp_Leave_category": body?.Emp_Leave_category,
        "Emp_Payroll_category": body?.Emp_Payroll_category,
        "Shift_code": body?.Shift_code,
        "Desig_code": body?.Desig_code,
        "Cost_Centre_code": body?.Cost_Centre_code,
        "Section_code": body?.Section_code,
        "Grade_code": body?.Grade_code,
        "Edu_code": body?.Edu_code,
        "Loc_code": body?.Loc_code,
        "Religion_Code": body?.Religion_Code,
        "Supervisor_Code": body?.Supervisor_Code,
        "ContractExpiryDate": body?.ContractExpiryDate,
        "Offer_Letter_date": body?.Offer_Letter_date,
        "Tentative_Joining_date": body?.Tentative_Joining_date,
        "RefferedBy": body?.RefferedBy,
        "Probationary_period_months": body?.Probationary_period_months,
        "Notice_period_months": body?.Notice_period_months,
        "Extended_confirmation_days": currentDate ? currentDate : 0,
        "Emp_confirm_date": body?.Emp_confirm_date,
        "Emp_joining_date": body?.Emp_joining_date,
        "Permanent_address": body?.Permanent_address,
        "Nationality": body?.Nationality,
        "roster_group_code": 0,
        "card_no": 0,
        "Position_Code": 0,
        "Company_Code": get_company_code,
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
          cancel("read");
          // GetAppointStatusCall({
          //   pageSize: pageSize,
          //   pageNo: page,
          //   search: null,
          // });
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
  return (
    <>

      {contextHolder}{setEmpCodeErr}{setEmpCategoryDataErr}{setleaveCatErr}
      {setPayCategoryErr}{setShiftsCodeErr}{setDesignationCodeErr}{setCostCenterCodeErr}
      {setSectionCodeErr}{setGradeCodeErr}{setEducationCodeErr}{setLocationCodeErr}
      {setReligionCodeErr}{setSupervisorCodeErr}
      <div className="container">
        <div className="row">
          <div className="col-12 maringClass">
            <div>
              <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Appointment (Personal)</h4>
                <Link to="/Appointment" className="backLink text-dark">Back</Link>
                <hr />
                <div className="form-group formBoxCountry">
                  <FormInput
                    label={'Employee Code'}
                    placeholder={'Employee Code'}
                    id="Sequence_no"
                    name="Sequence_no"
                    type="number"

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
                    label={'Father Name'}
                    placeholder={'Father Name'}
                    id="Emp_Father_name"
                    name="Emp_Father_name"
                    type="text"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Joining Date'}
                    placeholder={'Joining Date'}
                    id="Emp_joining_date"
                    name="Emp_joining_date"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Emp Confirmation Date'}
                    placeholder={'Emp Confirmation Date'}
                    id="Emp_confirm_date"
                    name="Emp_confirm_date"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Email Address'}
                    placeholder={'Email Address'}
                    id="Emp_email"
                    name="Emp_email"
                    type="email"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Vehicle Registration Number'}
                    placeholder={'Vehicle Registration Number'}
                    id="Vehicle_Registration_Number"
                    name="Vehicle_Registration_Number"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'CNIC No'}
                    placeholder={'CNIC No'}
                    id="Emp_nic_no"
                    name="Emp_nic_no"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'NTN No'}
                    placeholder={'NTN No'}
                    id="Emp_ntn_no"
                    name="Emp_ntn_no"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'CNIC Issue Date'}
                    placeholder={'CNIC Issue Date'}
                    id="Emp_NIC_Issue_date"
                    name="Emp_NIC_Issue_date"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'CNIC Expiry Date'}
                    placeholder={'CNIC Expiry Date'}
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
                    label={'Address Line 1'}
                    placeholder={'Address Line 1'}
                    id="Emp_address_line1"
                    name="Emp_address_line1"
                    type="text"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Address Line 2'}
                    placeholder={'Address Line 2'}
                    id="Emp_address_line2"
                    name="Emp_address_line2"
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
                    label={'Phone Home 1'}
                    placeholder={'Phone Home 1'}
                    id="Emp_home_tel1"
                    name="Emp_home_tel1"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Phone Home 2'}
                    placeholder={'Phone Home 2'}
                    id="Emp_home_tel2"
                    name="Emp_home_tel2"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Emp office tel 1'}
                    placeholder={'Emp office tel 1'}
                    id="Emp_office_tel1"
                    name="Emp_office_tel1"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Emp office tel 2'}
                    placeholder={'Emp office tel 2'}
                    id="Emp_office_tel2"
                    name="Emp_office_tel2"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Mobile No'}
                    placeholder={'Mobile No'}
                    id="Emp_mobile_No"
                    name="Emp_mobile_No"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Birth Date'}
                    placeholder={'Birth Date'}
                    id="Emp_birth_date"
                    name="Emp_birth_date"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Offer Letter Date'}
                    placeholder={'Offer Letter Date'}
                    id="Offer_Letter_date"
                    name="Offer_Letter_date"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Tentative Joining Date'}
                    placeholder={'Tentative Joining Date'}
                    id="Tentative_Joining_date"
                    name="Tentative_Joining_date"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Contract Expiry Date'}
                    placeholder={'Contract Expiry Date'}
                    id="ContractExpiryDate"
                    name="ContractExpiryDate"
                    type="date"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Probationary Period Months'}
                    placeholder={'Probationary Period Months'}
                    id="Probationary_period_months"
                    name="Probationary_period_months"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Notice Period (months)'}
                    placeholder={'Notice Period (months)'}
                    id="Notice_period_months"
                    name="Notice_period_months"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Referred By'}
                    placeholder={'Referred By'}
                    id="RefferedBy"
                    name="RefferedBy"
                    type="text"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                </div>
                <hr />
                <div className="form-group formBoxCountry">
                  <FormSelect
                    label={'Marital Status'}
                    placeholder='Marital Status'
                    id="Emp_marital_status"
                    name="Emp_marital_status"
                    options={[
                      {
                        value: 'M',
                        label: 'Married',
                      },
                      {
                        value: "N",
                        label: 'Unmarried',
                      },
                    ]}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    label={'Confirmation Flag'}
                    placeholder='Confirmation Flag'
                    id="Confirmation_Flag"
                    name="Confirmation_Flag"
                    options={[
                      {
                        value: 'Y',
                        label: 'Yes',
                      },
                      {
                        value: "N",
                        label: 'No',
                      },
                    ]}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    label={'Gender'}
                    placeholder='Gender'
                    id="Emp_sex_code"
                    name="Emp_sex_code"
                    options={[
                      {
                        value: 'M',
                        label: 'Male',
                      },
                      {
                        value: "F",
                        label: 'Female',
                      },
                    ]}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    label={'Blood Group'}
                    placeholder='Blood Group'
                    id="Emp_Blood_Group"
                    name="Emp_Blood_Group"
                    options={[
                      {
                        value: 'A+',
                        label: 'A+',
                      },
                      {
                        value: "A-",
                        label: 'A-',
                      },
                      {
                        value: "B+",
                        label: 'B+',
                      },
                      {
                        value: "B-",
                        label: 'B-',
                      },
                      {
                        value: "O+",
                        label: 'O+',
                      },
                      {
                        value: "O-",
                        label: 'O-',
                      },
                      {
                        value: "AB+",
                        label: 'AB+',
                      },
                      {
                        value: "AB-",
                        label: 'AB-',
                      },
                    ]}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    label={'Nationality'}
                    placeholder={'Nationality'}
                    id="Nationality"
                    name="Nationality"
                    options={Country.Country?.map((item,) => ({
                      value: item.value,
                      label: item.label,
                    })
                    )}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
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
                  />
                  <FormSelect
                    label={'Emp Category'}
                    placeholder='Emp Category'
                    id="Emp_category"
                    name="Emp_category"
                    options={EmployeeCategory.map(
                      (item) => ({
                        value: item.Emp_Category_code,
                        label: item.Emp_Category_name,
                      })
                    )}
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
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    label={'Pay Category'}
                    placeholder={'Pay Category'}
                    id="Emp_Payroll_category"
                    name="Emp_Payroll_category"
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
                    options={Supervisor.map((item) => ({
                      value: item.Emp_code,
                      label: item.Emp_name,
                    })
                    )}
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
                    label={'Contact Address 1'}
                    placeholder={'Contact Address 1'}
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
                    label={'Contact home tel 1'}
                    placeholder={'Contact home tel 1'}
                    id="Contact_home_tel1"
                    name="Contact_home_tel1"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Contact home tel 2'}
                    placeholder={'Contact home tel 2'}
                    id="Contact_home_tel2"
                    name="Contact_home_tel2"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className='CountryBtnBox'>
                  <CancelButton onClick={EditBack} title={'Back'} />
                  {isCode ?
                    <SimpleButton type={'submit'} loading={isLoading} title="Update" />
                    :
                    <SimpleButton type={'submit'} loading={isLoading} title="Save" />
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TAPersonalform;
