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



function TASalaryForm2({ cancel, mode, isCode, page }) {


    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
  



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