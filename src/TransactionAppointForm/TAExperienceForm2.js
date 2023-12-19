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
import { Link } from "react-router-dom";



function TAExperienceForm2({ cancel, mode, isCode, page }) {


    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const EditBack = () => {
        cancel('read')
    }


   

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
        defaultValues: {
            Emp_name: "",
            Desig_name: "",
            Dept_name: "",
            Employer_Name: "",
            start_Date: "",
            End_Date: "",
            IndustryFlag: "",
        },
        mode: "onChange",
        resolver: yupResolver(TAPersonalSchema),
    });





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
                                        placeholder='select Employer Name'
                                        id="Employer_Name"
                                        name="Employer_Name"
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
                                    <FormInput
                                        label={'Start Date'}
                                        placeholder={'Start Date'}
                                        id="start_Date"
                                        name="start_Date"
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
                                        id="IndustryFlag"
                                        name="IndustryFlag"
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

export default TAExperienceForm2;