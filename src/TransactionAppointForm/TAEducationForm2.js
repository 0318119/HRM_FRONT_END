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
import { message } from 'antd';
import baseUrl from '../config.json'
import { Link } from "react-router-dom";



function TAEducationForm2({ cancel, mode, isCode, page }) {


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
    const currentDate = new Date();
    const EditBack = () => {
        cancel('read')
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
                console.log(response.data, 'sdff');
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
    // ==================================================
    const submitForm = async (data) => {
        try {
            const isValid = await TAPersonalSchema.validate(data);
            if (isValid) {
                POST_MASTER_PERSONAL_FORM(data)
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
        defaultValues: {
            Emp_name: "",
            Desig_name: "",
            Dept_name: "",
            Edu_code: "",
            Inst_name: "",
            topFlag: "",
            eduYear: "",
            Grade_code: "",
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
                "Emp_name": body?.Emp_name,
                "Desig_name": body?.Desig_name,
                "Dept_name": body?.Dept_name,
                "Edu_code": body?.Edu_code,
                "Inst_name": body?.Inst_name,
                "topFlag": body?.Emp_topFlag,
                "eduYear": body?.eduYear,
                "Grade_code": body?.Grade_code,
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
                    window.location.href = "/TAShortsCut"
                }, 1000);
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
            <Header />
            {contextHolder}{setEmpCodeErr}{setEmpCategoryDataErr}{setleaveCatErr}
            {setPayCategoryErr}{setShiftsCodeErr}{setDesignationCodeErr}{setCostCenterCodeErr}
            {setSectionCodeErr}{setGradeCodeErr}{setEducationCodeErr}{setLocationCodeErr}
            {setReligionCodeErr}{setSupervisorCodeErr}
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass">
                        <div>
                            <h2 className="text-dark"> Transaction - Education</h2>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <h4 className="text-dark">Employee Information</h4>
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
                                <h4 className="text-dark">Education History</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        label={'Education'}
                                        placeholder='select Education'
                                        id="Edu_code"
                                        name="Edu_code"
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
                                        label={'Institute'}
                                        placeholder='select institute'
                                        id="Inst_name"
                                        name="Inst_name"
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
                                        label={'Top flag'}
                                        placeholder='select top flag'
                                        id="topFlag"
                                        name="topFlag"
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
                                    <FormInput
                                        label={'Year'}
                                        placeholder='select year'
                                        id="eduYear"
                                        name="eduYear"
                                        type="number"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Grade'}
                                        placeholder={'Select grade'}
                                        id="Grade_code"
                                        name="Grade_code"
                                        options={Country.Country?.map((item,) => ({
                                            value: item.value,
                                            label: item.label,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'Cancel'} />
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

export default TAEducationForm2;