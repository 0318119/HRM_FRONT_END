import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import Header from "../components/Includes/Header";
import Country from "./Country.json"
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as AppointExp_Actions from "../store/actions/Appointments/AppointmentExprience/index"
import { connect } from "react-redux";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import * as yup from "yup";
import { message, Table } from 'antd';
import baseUrl from '../config.json'
import { Link } from "react-router-dom";



function TAExperienceForm({ cancel, mode2, isCode2, page2, isUpdate, Red_AppointExprience, GetEmployeeInfo, GetEmployeeCode, SaveExpForm, GetEmployer, UpdatedExpForm }) {


    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const EditBack = () => {
        cancel('read')
    }

    const AppointExpSchema = yup.object().shape({
        EmployerCode: yup.string().required("EmployerCode required"),
        designation: yup.string().required("designation is required"),
        department: yup.string().required("department is required"),
        Start_Date: yup.string().required("Start_Date is required"),
        End_Date: yup.string().required("End_Date is required"),
        SubmitFlag: yup.string().required("SubmitFlag is required"),

    });

    // ==================================================
    const submitForm = async (data) => {
        try {
            const isValid = await AppointExpSchema.validate(data);
            if (isValid) {
                isUpdate ? UpdateForm(data) : SaveForm(data)
                
            }
        } catch (error) {
            console.error(error);
        }
    };




    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Employer_Code: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.Employer_Code,
            designation: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.designation,
            department: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.department,
            Start_Date: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.Start_Date,
            End_Date: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.End_Date,
            SubmitFlag: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.SubmitFlag,
        },
        mode: "onChange",
        resolver: yupResolver(AppointExpSchema),
    });






    useEffect(() => {
        GetEmployer(isCode2)
        GetEmployeeInfo(isCode2)
        GetEmployeeCode()
    }, [])

    const Employers = Red_AppointExprience?.getEmployer?.[0]?.res?.data

useEffect(() => {
        if (mode2 == "create") {
            reset({
                Emp_name: Red_AppointExprience?.data?.[0]?.res?.data?.[0]?.Emp_name,
                Desig_name: Red_AppointExprience?.data?.[0]?.res?.data?.[0]?.Desig_name,
                Dept_name: Red_AppointExprience?.data?.[0]?.res?.data?.[0]?.Dept_name,
            });
        } else {
            reset(
                {
                    Emp_name: Red_AppointExprience?.data?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_AppointExprience?.data?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_AppointExprience?.data?.[0]?.res?.data?.[0]?.Dept_name,
                },
            )
        }

    }, [Red_AppointExprience?.data?.[0]?.res?.data?.[0]])

    

    console.log(Red_AppointExprience, 'Red_AppointExprience')

    useEffect(() => {
        if (isUpdate) {
            reset({
                EmployerCode: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.[0]?.Employer_Code,
                designation: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.[0]?.Designation,
                department: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.[0]?.Department,
                Start_Date: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.[0]?.StartDate,
                End_Date: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.[0]?.EndDate,
                SubmitFlag: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.[0]?.Submit_Flag,
            });
        }
        //  else {
        //     reset(
        //         {
        //             Employer_Code: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.Employer_Code,
        //             designation: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.designation,
        //             department: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.department,
        //             Start_Date: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.Start_Date,
        //             End_Date: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.End_Date,
        //             SubmitFlag: Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]?.SubmitFlag,
        //         },
        //     )
        // }

    }, [Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0]])
    console.log(Red_AppointExprience?.getEmp?.[0]?.res?.data?.[0], 'hgavdfu')




const SaveForm = async (data) => {
    setLoading(true)
        try {
            const response = await SaveExpForm({
                Sequence_no: isCode2,
                EmployerCode: data?.EmployerCode,
                designation: data?.designation,
                department: data?.department,
                Start_Date: data?.Start_Date,
                End_Date: data?.End_Date,
                SubmitFlag: data?.SubmitFlag,
            });

            if (response && response.success) {
                messageApi.success("Save Exprience");
                setTimeout(() => {
                    cancel('read')
                    // setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Exprience';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while changing Exprience:", error);
            messageApi.error("An error occurred while Save Exprience");
        }
    };




 const UpdateForm = async (data) => {
        setLoading(true)
        try {
            const response = await UpdatedExpForm({
                id: isUpdate,
                EmployerCode: data?.EmployerCode,
                designation: data?.designation,
                department: data?.department,
                Start_Date: data?.Start_Date,
                End_Date: data?.End_Date,
                SubmitFlag: data?.SubmitFlag,
            });

            if (response && response.success) {
                messageApi.success("Updated Exprience");
                setTimeout(() => {
                    cancel('read')
                    // setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Update Exprience';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Update Exprience:", error);
            messageApi.error("An error occurred while Update Exprience");
        }
    };




    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass2">
                        <div>
                            <h2 className="text-dark"> Transaction - Experience</h2>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <h6 className="text-dark">Employee Salary</h6>
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
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        label={'Employer Name'}
                                        placeholder={'select Employer Name'}
                                        id="EmployerCode"
                                        name="EmployerCode"
                                        options={Employers?.map((item,) => ({
                                            value: item.Employer_Code,
                                            label: item.Employer_Name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Designation'}
                                        placeholder={'Designation'}
                                        id="designation"
                                        name="designation"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Department'}
                                        placeholder={'Department'}
                                        id="department"
                                        name="department"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Start Date'}
                                        placeholder={'Start Date'}
                                        id="Start_Date"
                                        name="Start_Date"
                                        type="Date"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'End Date'}
                                        placeholder={'End Date'}
                                        id="End_Date"
                                        name="End_Date"
                                        type="Date"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Industry Flag'}
                                        placeholder='select Industry Flag'
                                        id="SubmitFlag"
                                        name="SubmitFlag"
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
                                </div>

                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'Cancel'} />
                                    {isUpdate ? <SimpleButton type={'submit'} loading={isLoading} title="Update" />
                                    : 
                                        <SimpleButton type={'submit'} loading={isLoading} title="Save" />}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function mapStateToProps({ Red_AppointExprience }) {
    return { Red_AppointExprience };
}
export default connect(mapStateToProps, AppointExp_Actions)(TAExperienceForm)