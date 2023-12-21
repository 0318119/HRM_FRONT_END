import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import Header from "../components/Includes/Header";
import Country from "./Country.json"
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import * as AppointSalaryForm_Actions from "../store/actions/Appointments/AppointSalaryForm/index";
import { message } from 'antd';
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import { connect } from "react-redux";
import * as yup from "yup";
import baseUrl from '../config.json'
import { Link, useNavigate, useLocation } from "react-router-dom";



function TASalaryForm2({ cancel, mode, isCode, page, Red_AppointSalary, GetEmployeeInfo, EmployeeSalaryAmount, GetSalaryByCode, SalaryAlowanceCall }) {

    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    
    const EditBack = () => {
        cancel('read')
    }

    const AppointSalarySchema = yup.object().shape({
        // Emp_name: yup.string().required("Emp name is required"),
        // Desig_name: yup.string().required("Desig name is required"),
        // Dept_name: yup.string().required("Dept name is required")
    });


    // console.log(Red_AppointSalary?.getAllowance?.data  ,' Red_AppointSalary')

    // ==================================================

    useEffect(() => {
        GetEmployeeInfo(isCode)
        EmployeeSalaryAmount(isCode)
        // GetSalaryByCode(isCode)
        SalaryAlowanceCall()
    }, [])

    useEffect(() => {
        reset(
            {
                Emp_name: Red_AppointSalary?.data?.[0]?.res?.data?.[0]?.Emp_name,
                Desig_name: Red_AppointSalary?.data?.[0]?.res?.data?.[0]?.Desig_name,
                Dept_name: Red_AppointSalary?.data?.[0]?.res?.data?.[0]?.Dept_name,
            },
        )
    }, [Red_AppointSalary?.data?.[0]?.res?.data?.[0]])

    const Emp_name = Red_AppointSalary?.Emp_name?.[0]?.res?.data
    const Desig_name = Red_AppointSalary?.Desig_name?.[0]?.res?.data
    const Dept_name = Red_AppointSalary?.Dept_name?.[0]?.res?.data


    const submitForm = async (data) => {
        try {
            const isValid = await AppointSalarySchema.validate(data);
            if (isValid) {
                SaveForm(data)
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
        defaultValues: {
            Emp_name: "",
            Desig_name: "",
            Dept_name: "",
        },
        mode: "onChange",
        resolver: yupResolver(AppointSalarySchema),
    });

   

    const SaveForm = async (data) => {
        try {
            const response = await GetSalaryByCode({
                Emp_name:  data?.Emp_name,
                Desig_name: data?.Desig_name,
                Dept_name: data?.Dept_name,
            });

            if (response && response.success) {
                messageApi.success("Save Education Information");
                setTimeout(() => {
                    GetSalaryByCode(true)
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
    

    const columns = [
      
        {
            title: "Allowance name",
            dataIndex: "Allowance_name",
            key: "Allowance_name",
          },
        
        {
            title: "Allowance Code",
            dataIndex: "allowance_code",
            key: "allowance_code"

        },
        {
            title: "Amount",
            value: "Amount",
            render: (data) => (
                <input type="text" />
              ),
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
                                <div className="">
                                    <Table
                                        columns={columns}
                                        loading={Red_AppointSalary?.loading}
                                        dataSource={Red_AppointSalary?.getAllowance?.data}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'cancel'} />
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
function mapStateToProps({ Red_AppointSalary }) {
    return { Red_AppointSalary };
}
export default connect(mapStateToProps, AppointSalaryForm_Actions)(TASalaryForm2);