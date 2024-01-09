import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import * as AppointPayroll_Action from "../store/actions/Appointments/AppointPayroll/index";
import { message } from 'antd';
import * as yup from "yup";
import { connect } from "react-redux";
import baseUrl from '../config.json'
import { Link } from "react-router-dom";



function TAappointmentMasterPayrollForm({
    cancel,
    mode,
    isCode,
    page,
    GetEmployeeInfo,
    Red_AppointPayroll,
    GetModeOfPay,
    GetBankBranches,
    SavePayForm
}) {

    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)

    const EditBack = () => {
        cancel('read')
    }

    const AppointPayrollSchema = yup.object().shape({
        Mode_Of_Payment: yup.string().required("Mode_Of_Payment is required"),
        Recreation_Club_Flag: yup.string().required("Recreation_Club_Flag is required"),
        Meal_Deduction_Flag: yup.string().required("Meal_Deduction_Flag is required"),
        Union_Flag: yup.string().required("Union_Flag is required"),
        Overtime_Flag: yup.string().required("Overtime_Flag is required"),
        Incentive_Flag: yup.string().required("Incentive_Flag is required"),
        SESSI_Flag: yup.string().required("SESSI_Flag is required"),
        EOBI_Flag: yup.string().required("EOBI_Flag is required"),
        SESSI_Number: yup.string().notRequired("SESSI_Number is required"),
        EOBI_Number: yup.string().notRequired("EOBI_Number is required"),
        Account_Type1: yup.string().required("Account_Type1 is required"),
        Bank_Account_No1: yup.string().required("Bank_Account_No1 is required"),
        Branch_Code1: yup.string().required("Branch_Code1 is required"),
        Bank_Amount_1: yup.string().required("Bank_Amount_1 is required"),
        Bank_Percent_1: yup.string().required("Bank_Percent_1 is required"),

    });

    const submitForm = async (data) => {
        try {
            const isValid = await AppointPayrollSchema.validate(data);
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
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(AppointPayrollSchema),
    });



    const watchSESSIFlag = useWatch({
        control,
        name: 'SESSI_Flag',
        defaultValue: '',
    });
    const watchEOBIFlag = useWatch({
        control,
        name: 'EOBI_Flag',
        defaultValue: '',
    });



    useEffect(() => {

        reset(
            {
                Dept_name: Red_AppointPayroll?.GetInfo?.[0]?.res?.data?.[0]?.Dept_name,
                Desig_name: Red_AppointPayroll?.GetInfo?.[0]?.res?.data?.[0]?.Desig_name,
                Emp_name: Red_AppointPayroll?.GetInfo?.[0]?.res?.data?.[0]?.Emp_name
            },
        )

    }, [Red_AppointPayroll?.GetInfo?.[0]?.res?.data[0]])




    const modeOFPay = Red_AppointPayroll?.data?.[0]?.res?.data?.[0]
    const Bandbranch = Red_AppointPayroll?.GetBB?.[0]?.res?.data?.[0]

    useEffect(() => {
        GetModeOfPay()
        GetEmployeeInfo(isCode)
        GetBankBranches()
    }, [])


    const SaveForm = async (data) => {
        try {
            const response = await SavePayForm({
                Sequence_no: isCode,
                Mode_Of_Payment: data?.Mode_Of_Payment,
                Recreation_Club_Flag: data?.Recreation_Club_Flag,
                Meal_Deduction_Flag: data?.Meal_Deduction_Flag,
                Union_Flag: data?.Union_Flag,
                Overtime_Flag: data?.Overtime_Flag,
                Incentive_Flag: data?.Incentive_Flag,
                Bonus_Type: "0",
                SESSI_Flag: data?.SESSI_Flag,
                EOBI_Flag: data?.EOBI_Flag,
                SESSI_Number: data?.SESSI_Flag === "Y" ? data?.SESSI_Number : '',
                EOBI_Number: data?.EOBI_Flag === "Y" ? data?.EOBI_Number : '',
                Account_Type1: data?.Account_Type1,
                Bank_Account_No1: data?.Bank_Account_No1,
                Branch_Code1: data?.Branch_Code1,
                Bank_Amount_1: data?.Bank_Amount_1,
                Bank_Percent_1: data?.Bank_Percent_1,
            });

            if (response && response.success) {
                messageApi.success("Save Exprience");
                setTimeout(() => {
                    cancel('read')
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Payroll';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Saving Payroll:", error);
            messageApi.error("An error occurred while Save Payroll");
        }
    };


    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass2">
                        <div>
                            <h2 className="text-dark"> Transaction - Master Payroll</h2>
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
                                        readOnly
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
                                        readOnly
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
                                        readOnly
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <h4 className="text-dark">Payroll Information</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        label={'Mode Of Payment'}
                                        placeholder='select Mode Of Payment'
                                        id="Mode_Of_Payment"
                                        name="Mode_Of_Payment"
                                        options={modeOFPay?.map((item,) => ({
                                            value: item.Payment_code,
                                            label: item.Payment_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'SE&SI'}
                                        placeholder='select SE&SI'
                                        id="SESSI_Flag"
                                        name="SESSI_Flag"
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
                                    {watchSESSIFlag === 'Y' && (
                                        <FormInput
                                            label={'SE&SI'}
                                            placeholder='SE&SI'
                                            id="SESSI_Number"
                                            name="SESSI_Number"
                                            type="number"
                                            showLabel={true}
                                            errors={errors}
                                            control={control}
                                        />
                                    )}
                                    <FormSelect
                                        label={'Over Time'}
                                        placeholder='select Over Time'
                                        id="Overtime_Flag"
                                        name="Overtime_Flag"
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
                                        label={'Registration Club'}
                                        placeholder={'Select Registration Club'}
                                        id="Recreation_Club_Flag"
                                        name="Recreation_Club_Flag"
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
                                        label={'EOBI Flag'}
                                        placeholder='EOBI Flag'
                                        id="EOBI_Flag"
                                        name="EOBI_Flag"
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
                                    {watchEOBIFlag === 'Y' && (
                                        <FormInput
                                            label={'EOBI Number'}
                                            placeholder='EOBI Number'
                                            id="EOBI_Number"
                                            name="EOBI_Number"
                                            type="Number"
                                            showLabel={true}
                                            errors={errors}
                                            control={control}
                                        />
                                    )}


                                    <FormSelect
                                        label={'Incentive'}
                                        placeholder='select Incentive'
                                        id="Incentive_Flag"
                                        name="Incentive_Flag"
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
                                        label={'Meal Deduction'}
                                        placeholder='select Meal Deduction'
                                        id="Meal_Deduction_Flag"
                                        name="Meal_Deduction_Flag"
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
                                        label={'Union'}
                                        placeholder='select Union'
                                        id="Union_Flag"
                                        name="Union_Flag"
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
                                <h4 className="text-dark">Bank Accounts</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormInput
                                        label={'Account Type'}
                                        placeholder={'Account Type'}
                                        id="Account_Type1"
                                        name="Account_Type1"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Account Number'}
                                        placeholder={'Account Number'}
                                        id="Bank_Account_No1"
                                        name="Bank_Account_No1"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Branch'}
                                        placeholder='select Branch'
                                        id="Branch_Code1"
                                        name="Branch_Code1"
                                        options={Bandbranch?.map((item) => ({
                                            value: item.Branch_code,
                                            label: item.Branch_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Amount'}
                                        placeholder={'Select Amount'}
                                        id="Bank_Amount_1"
                                        name="Bank_Amount_1"
                                        type="number"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />

                                    <FormInput
                                        label={'Percent'}
                                        placeholder={'Select Percent'}
                                        id="Bank_Percent_1"
                                        name="Bank_Percent_1"
                                        type="number"
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

function mapStateToProps({ Red_AppointPayroll }) {
    return { Red_AppointPayroll };
}
export default connect(mapStateToProps, AppointPayroll_Action)(TAappointmentMasterPayrollForm)