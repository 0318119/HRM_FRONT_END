import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import Header from "../components/Includes/Header";
import Country from "./Country.json"
import { Space, Table, Tag, Tooltip } from 'antd';
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import * as AppointmentEducation_Actions from "../store/actions/Appointments/AppointEducationForm/index";
import { connect } from "react-redux";
import { FaEdit } from 'react-icons/fa';
import * as yup from "yup";
import { message } from 'antd';
import { Link } from "react-router-dom";
import baseUrl from '../config.json'




function TAEducationForm2({
    cancel,
    mode2,
    isCode2,
    page,
    isUpdate,
    Red_AppointEducation,
    GetEmployeeInfo,
    GetEducationData,
    GetInstituteData,
    GetGradeData,
    GetEducationSavedData,
    SaveFormEdu,
    UpdateEducation
}) {

    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [isUpdateBtn, setUpdatebtn] = useState(false)
    // const [pageSize, setPageSize] = useState(10);
    const [isLoading, setLoading] = useState(false)
    const [isSavedEdu, setSavedEdu] = useState(false)


    const EditBack = () => {
        cancel('read')
    }

    const AppointEducationSchema = yup.object().shape({
        EduCode: yup.string().required("EduCode is required"),
        EduYear: yup.string().required("EduYear is required"),
        EduGrade: yup.string().required("EduGrade is required"),
        Topflag: yup.string().required("Topflag is required"),
        institutecode: yup.string().required("institutecode is required"),

    });

    useEffect(() => {
        GetEmployeeInfo(isCode2)
        GetEducationData()
        GetInstituteData()
        GetGradeData()
        GetEducationSavedData(isCode2)
    }, [])


    useEffect(() => {
        if (mode2 == "create") {
            reset({
                Emp_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Emp_name,
                Desig_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Desig_name,
                Dept_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Dept_name,
            });
        } else {
            reset(
                {
                    Emp_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Dept_name,
                },
            )
        }

    }, [Red_AppointEducation?.data?.[0]?.res?.data?.[0]])
    



    useEffect(() => {
        if (isUpdate) {
            reset({
                EduCode: Red_AppointEducation?.data?.[0]?.res?.data?.Edu_Code,
                EduYear: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Edu_Year,
                EduGrade: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Edu_Grade,
                Topflag: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Top_flag,
                institutecode: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.institute_code,
            });
        } 
            

    }, [Red_AppointEducation?.getSavedData?.[0]?.res?.data?.[0]])
    console.log(Red_AppointEducation, 'R')

    const EduData = Red_AppointEducation?.getEdu?.[0]?.res?.data
    const InsData = Red_AppointEducation?.getInsti?.[0]?.res?.data
    const GradeData = Red_AppointEducation?.getGrade?.[0]?.res?.data


    // ==================================================
    const submitForm = async (data) => {
        try {
            const isValid = await AppointEducationSchema.validate(data);
            if (isValid) {
                isUpdate ? UdpateForm(data) : SaveForm(data);
                // if(isUpdate){
                //     UdpateForm(data)
                // }else{
                //     SaveForm(data)
                // }
            }
        } catch (error) {
            console.error(error);
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
        resolver: yupResolver(AppointEducationSchema),
    });


    const SaveForm = async (data) => {
        setLoading(true)
        try {
            const response = await SaveFormEdu({
                Sequence_no: isCode2,
                EduCode: data?.EduCode,
                EduYear: data?.EduYear,
                EduGrade: data?.EduGrade,
                Topflag: data?.Topflag,
                institutecode: data?.institutecode,
            });

            if (response && response.success) {
                messageApi.success("Save Education Information");
                setTimeout(() => {
                    cancel('read')
                    setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Information';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while changing password:", error);
            messageApi.error("An error occurred while Save Information");
        }
    };


    



const UdpateForm = async (data) => {
    setLoading(true)
        try {
            const response = await UpdateEducation({
                srNo: isUpdate,
                EduCode: data?.EduCode,
                EduYear: data?.EduYear,
                EduGrade: data?.EduGrade,
                Topflag: data?.Topflag,
                institutecode: data?.institutecode,
            });

            if (response && response.success) {
                messageApi.success("Updated Education Information");
                
                setTimeout(() => {
                    cancel('read')
                    setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Updated Education ';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Updated Education:", error);
            messageApi.error("An error occurred while Updated Education");
        }
    };





    return (
        <>
            {contextHolder}

            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass">
                        <div>
                            <h2 className="text-dark">Education</h2>
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
                                        id="EduCode"
                                        name="EduCode"
                                        options={EduData?.map((item,) => ({
                                            value: item.Edu_code,
                                            label: item.Edu_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Institute'}
                                        placeholder='select institute'
                                        id="institutecode"
                                        name="institutecode"
                                        options={InsData?.map((item,) => ({
                                            value: item.Inst_code,
                                            label: item.Inst_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Top flag'}
                                        placeholder='select top flag'
                                        id="Topflag"
                                        name="Topflag"
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
                                    <FormInput
                                        label={'Year'}
                                        placeholder='select year'
                                        id="EduYear"
                                        name="EduYear"
                                        type="number"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Grade'}
                                        placeholder={'Select grade'}
                                        id="EduGrade"
                                        name="EduGrade"
                                        options={GradeData?.map((item,) => ({
                                            value: item.Grade_code,
                                            label: item.Grade_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'Cancel'} />
                                    {isUpdate ?
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
function mapStateToProps({ Red_AppointEducation }) {
    return { Red_AppointEducation };
}
export default connect(mapStateToProps, AppointmentEducation_Actions)(TAEducationForm2);