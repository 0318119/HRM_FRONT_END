import React, { useEffect, useState } from 'react'
import Input from '../../../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../../../components/basic/button";
import * as PayrollCategoryAccessActions from "../../../../store/actions/payroll/PayrollCategoryAccess";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { PayrollCategoryAccess } from '../Setup/schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, FormInput } from '../../../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../../config.json'

function PayrollCategoryAccessForm({ cancel, mode, page, isCode, Red_PayrollCategoryAccess, GetPayrollCateryAccess, GET_Payroll_Category_Access_BY_CODE }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }



    const submitForm = async (data) => {
        try {
            const isValid = await PayrollCategoryAccess.validate(data);
            if (isValid) {
                ADD_Payroll_Category_Access_DATA(data)
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

            Payroll_Category_name: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Category_name,
            Payroll_Category_abbr: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Category_abbr,
            Payroll_Month: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Month,
            Payroll_Year: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Year,
            Payroll_Last_Month: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Last_Month,
            Payroll_Last_Year: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Last_Year,
            Payroll_Undo_Flag: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Undo_Flag,
            Loan_Completion_Flag: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Loan_Completion_Flag,
            Sort_key: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            pf_percentage: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.pf_percentage,
            active_flag: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.active_flag,
        },
        mode: "onChange",
        resolver: yupResolver(PayrollCategoryAccess),
    });

    useEffect(() => {
        if (isCode !== null) {
            GET_Payroll_Category_Access_BY_CODE(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Payroll_Category_code: "",
                    Payroll_Category_name: "",
                    Payroll_Category_abbr: "",
                    Payroll_Month: "",
                    Payroll_Year: "",
                    Payroll_Last_Month: "",
                    Payroll_Last_Year: "",
                    Payroll_Undo_Flag: "",
                    Loan_Completion_Flag: "",
                    Sort_key: "",
                    pf_percentage: "",
                    active_flag: "",

                },
            )
        } else {
            reset(
                {
                    Payroll_Category_name: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Category_name,
                    Payroll_Category_abbr: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Category_abbr,
                    Payroll_Month: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Month,
                    Payroll_Year: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Year,
                    Payroll_Last_Month: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Last_Month,
                    Payroll_Last_Year: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Last_Year,
                    Payroll_Undo_Flag: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Payroll_Undo_Flag,
                    Loan_Completion_Flag: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Loan_Completion_Flag,
                    Sort_key: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    pf_percentage: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.pf_percentage,
                    active_flag: Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]?.active_flag,
                },
            )
        }
    }, [Red_PayrollCategoryAccess?.dataSingle?.[0]?.res?.data?.[0]])


    async function ADD_Payroll_Category_Access_DATA(body) {
        setLoading(true);
        await fetch(`${baseUrl.baseUrl}/payrollCategories/AddPayrollCategories`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Payroll_Category_code": mode == 'create' ? "0" : isCode,
                "Payroll_Category_name": body.Payroll_Category_name,
                "Payroll_Category_abbr": body.Payroll_Category_abbr,
                "Payroll_Month": body.Payroll_Month,
                "Payroll_Year": body.Payroll_Year,
                "Payroll_Last_Month": body.Payroll_Last_Month,
                "Payroll_Last_Year": body.Payroll_Last_Year,
                "Payroll_Undo_Flag": body.Payroll_Undo_Flag,
                "Loan_Completion_Flag": body.Loan_Completion_Flag,
                "Sort_key": body.Sort_key,
                "pf_percentage": body.pf_percentage,
                "active_flag": body.active_flag,

            }),
        })
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.success) {
                    messageApi.open({
                        type: "success",
                        content: response?.message || response?.messsage,
                    });
                    setLoading(false);
                    setTimeout(() => {
                        cancel("read");
                        GetPayrollCateryAccess({
                            pageSize: pageSize,
                            pageNo: page,
                            search: null,
                        });
                    }, 3000);
                } else {
                    setLoading(false);
                    messageApi.open({
                        type: "error",
                        content: response?.message || response?.messsage,
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                messageApi.open({
                    type: "error",
                    content: error?.message || error?.messsage,
                });
            });
    }




    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Payroll Category Access</h4>
                <hr />
                <div className="form-group formBoxEducation">
                    <FormInput
                        label={'Payroll Category Name'}
                        placeholder={'Payroll Category Name'}
                        id="Payroll_Category_name"
                        name="Payroll_Category_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Payroll Category Abbreviation'}
                        placeholder={'Payroll Category Abbreviation'}
                        id="Payroll_Category_abbr"
                        name="Payroll_Category_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Payroll Month'}
                        placeholder={'Payroll Month'}
                        id="Payroll_Month"
                        name="Payroll_Month"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Payroll Year'}
                        placeholder={'Payroll Year'}
                        id="Payroll_Year"
                        name="Payroll_Year"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Payroll Last Month'}
                        placeholder={'Payroll Last Month'}
                        id="Payroll_Last_Month"
                        name="Payroll_Last_Month"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Payroll Last Year'}
                        placeholder={'Payroll Last Year'}
                        id="Payroll_Last_Year"
                        name="Payroll_Last_Year"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Payroll Undo Flag'}
                        placeholder='Payroll Undo Flag'
                        id="Payroll_Undo_Flag"
                        name="Payroll_Undo_Flag"
                        options={[
                            {
                                value: 'M',
                                label: 'Yes',
                            },
                            {
                                value: "N",
                                label: 'NO',
                            },
                        ]}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        type="text"
                    />


                    <FormSelect
                        label={'Loan Completion Flag'}
                        placeholder='Loan Completion Flag'
                        id="Loan_Completion_Flag"
                        name="Loan_Completion_Flag"
                        options={[
                            {
                                value: 'M',
                                label: 'Yes',
                            },
                            {
                                value: "N",
                                label: 'NO',
                            },
                        ]}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        type="text"
                    />

                    <FormInput
                        label={'Sort key'}
                        placeholder={'Sort key'}
                        id="Sort_key"
                        name="Sort_key"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'PF Percentage'}
                        placeholder={'PF Percentage'}
                        id="pf_percentage"
                        name="pf_percentage"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormSelect
                        label={'Active flag'}
                        placeholder='Active Flag'
                        id="active_flag"
                        name="active_flag"
                        options={[
                            {
                                value: 'M',
                                label: 'Yes',
                            },
                            {
                                value: "N",
                                label: 'NO',
                            },
                        ]}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        type="text"
                    />


                </div>
                <div className='EducationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}


function mapStateToProps({ Red_PayrollCategoryAccess }) {
    return { Red_PayrollCategoryAccess };
}
export default connect(mapStateToProps, PayrollCategoryAccessActions)(PayrollCategoryAccessForm)
