import React, { useEffect, useState } from 'react'
import { PrimaryButton } from "../../../components/basic/button";
import './Payroll_Master.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../../../components/basic/input/formInput';
import { MasterPayrollSchema } from './Schema';
import { message } from 'antd';
import baseUrl from '../../../config.json'

function Payroll_Master() {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)


    const submitForm = async (data) => {
        try {
            const isValid = await MasterPayrollSchema.validate(data);
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
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(MasterPayrollSchema),
    });


    // MASTER PERSNOL FORM DATA API CALL =========================== 

    async function POST_MASTER_PERSONAL_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/appointments/TranAppointmentSavePayroll`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify(
                {
                    "Sequence_no": body?.Sequence_no,
                    "Mode_Of_Payment": body?.Mode_Of_Payment,
                    "Recreation_Club_Flag": body?.Recreation_Club_Flag,
                    "Meal_Deduction_Flag": body?.Meal_Deduction_Flag,
                    "Union_Flag": body?.Union_Flag,
                    "Overtime_Flag": body?.Overtime_Flag,
                    "Incentive_Flag": body?.Incentive_Flag,
                    "SESSI_Flag": body?.SESSI_Flag,
                    "EOBI_Flag": body?.EOBI_Flag,
                    "SESSI_Number": body?.SESSI_Number,
                    "EOBI_Number": body?.EOBI_Number,
                    "Account_Type1": body?.Account_Type1,
                    "Bank_Account_No1": body?.Bank_Account_No1,
                    "Branch_Code1": body?.Branch_Code1,
                    "Bank_Amount_1": body?.Bank_Amount_1,
                    "Bank_Percent_1": body?.Bank_Percent_1,
                    "Account_Type2": body?.Account_Type2,
                    "Bank_Account_No2": body?.Bank_Account_No2,
                    "Branch_Code2": body?.Branch_Code2,
                    "Bank_Amount_2": body?.Bank_Amount_2,
                    "Bank_Percent_2": body?.Bank_Percent_2,
                    "Account_Type3": body?.Account_Type3,
                    "Bank_Account_No3": body?.Bank_Account_No3,
                    "Branch_Code3": body?.Branch_Code3,
                    "Bank_Amount_3": body?.Bank_Amount_3,
                    "Bank_Percent_3": body?.Bank_Percent_3,
                    "Account_Type4": body?.Account_Type4,
                    "Bank_Account_No4": body?.Bank_Account_No4,
                    "Branch_Code4": body?.Branch_Code4,
                    "Bank_Amount_4": body?.Bank_Amount_4,
                    "Bank_Percent_4": body?.Bank_Percent_4,
                    "Fuel": body?.Fuel,
                    "Fuel_Amount": body?.Fuel_Amount,
                    "Tax_Exemption": body?.Tax_Exemption,
                    "UserCode": body?.UserCode
                }
            )
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
                    window.location.href = '/TAShortsCut';
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
            {contextHolder}
            {/* <Header /> */}
            <div className="container mt-5">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h4 className="text-dark">Master Payroll</h4>
                    <hr />
                    <div className="form-group MasterPayrollformBox">
                        <FormInput
                            label={'Emp Code'}
                            placeholder={'Emp Code'}
                            id="Sequence_no"
                            name="Sequence_no"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Mode Of Payment'}
                            placeholder={'Mode Of Payment'}
                            id="Mode_Of_Payment"
                            name="Mode_Of_Payment"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />


                    </div>
                    <hr />
                    <div className="form-group MasterPayrollformBox">
                        <FormSelect
                            label={'Recreation Club Flag'}
                            placeholder='Recreation Club Flag'
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
                            label={'Meal Deduction Flag'}
                            placeholder='Meal Deduction Flag'
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
                            label={'Union Flag'}
                            placeholder='Union Flag'
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
                        <FormSelect
                            label={'Overtime_Flag'}
                            placeholder='Overtime_Flag'
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
                            label={'Incentive_Flag'}
                            placeholder='Incentive_Flag'
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
                            label={'SESSI_Flag'}
                            placeholder={'SESSI_Flag'}
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
                        <FormSelect
                            label={'EOBI lag'}
                            placeholder={'EOBI Flag'}
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
                        <FormSelect
                            label={'Fuel'}
                            placeholder={'Fuel'}
                            id="Fuel"
                            name="Fuel"
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
                            label={'Tax_Exemption'}
                            placeholder={'Tax_Exemption'}
                            id="Tax_Exemption"
                            name="Tax_Exemption"
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
                    <hr />
                    <div className="form-group MasterPayrollformBox">
                        <FormInput
                            label={'SESSI Number'}
                            placeholder={'SESSI Number'}
                            id="SESSI_Number"
                            name="SESSI_Number"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'EOBI Number'}
                            placeholder={'EOBI Number'}
                            id="EOBI_Number"
                            name="EOBI_Number"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Account Type1'}
                            placeholder={'Account Type1'}
                            id="Account_Type1"
                            name="Account_Type1"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Account No1'}
                            placeholder={'Bank Account No1'}
                            id="Bank_Account_No1"
                            name="Bank_Account_No1"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Branch  Code 1'}
                            placeholder={'Branch Code 1'}
                            id="Branch_Code1"
                            name="Branch_Code1"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Amount 1'}
                            placeholder={'Bank Amount 1'}
                            id="Bank_Amount_1"
                            name="Bank_Amount_1"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Percent 1'}
                            placeholder={'Bank Percent 1'}
                            id="Bank_Percent_1"
                            name="Bank_Percent_1"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Account_Type2'}
                            placeholder={'Account_Type2'}
                            id="Account_Type2"
                            name="Account_Type2"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank_Account_No2'}
                            placeholder={'Bank_Account_No2'}
                            id="Bank_Account_No2"
                            name="Bank_Account_No2"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Branch Code2'}
                            placeholder={'Branch Code2'}
                            id="Branch_Code2"
                            name="Branch_Code2"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Amount 2'}
                            placeholder={'Bank Amount 2'}
                            id="Bank_Amount_2"
                            name="Bank_Amount_2"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Percent 2'}
                            placeholder={'Bank Percent 2'}
                            id="Bank_Percent_2"
                            name="Bank_Percent_2"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Account Type3'}
                            placeholder={'Account Type3'}
                            id="Account_Type3"
                            name="Account_Type3"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank_Account_No3'}
                            placeholder={'Bank_Account_No3'}
                            id="Bank_Account_No3"
                            name="Bank_Account_No3"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Branch Code3'}
                            placeholder={'Branch Code3'}
                            id="Branch_Code3"
                            name="Branch_Code3"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Amount 3'}
                            placeholder={'Bank Amount 3'}
                            id="Bank_Amount_3"
                            name="Bank_Amount_3"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Percent 3'}
                            placeholder={'Bank Percent 3'}
                            id="Bank_Percent_3"
                            name="Bank_Percent_3"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Account Type4'}
                            placeholder={'Account Type4'}
                            id="Account_Type4"
                            name="Account_Type4"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Account No4'}
                            placeholder={'Bank Account No4'}
                            id="Bank_Account_No4"
                            name="Bank_Account_No4"
                            type="text"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Branch Code4'}
                            placeholder={'Branch Code4'}
                            id="Branch_Code4"
                            name="Branch_Code4"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Amount 4'}
                            placeholder={'Bank Amount_4'}
                            id="Bank_Amount_4"
                            name="Bank_Amount_4"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Bank Percent 4'}
                            placeholder={'Bank Percent 4'}
                            id="Bank_Percent_4"
                            name="Bank_Percent_4"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Fuel Amount'}
                            placeholder={'Fuel Amount'}
                            id="Fuel_Amount"
                            name="Fuel_Amount"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'User Code'}
                            placeholder={'User Code'}
                            id="UserCode"
                            name="UserCode"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className='CountryBtnBox'>
                        {/* <CancelButton onClick={EditBack} title={'Cancel'} /> */}
                        <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                    </div>
                </form>
            </div>
        </>
    )
}


export default Payroll_Master; 