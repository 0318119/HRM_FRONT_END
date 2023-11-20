import React, { useEffect, useState } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as EMPLOYEE_TYPE_ACTIONS from "../../store/actions/HrOperations/EmployeeType/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { EmployeeTypeScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput, FormSelect } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function EmployeeTypeForm({ cancel, mode, isCode, page, Red_Employee_type,GetEmployeeTypeData, Get_Employee_Type_By_ID }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await EmployeeTypeScheme.validate(data);
            if (isValid) {
                POST_Emp_Type_FORM(data)
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
            Empt_Type_code: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_code ?
            Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_code : 0,

            Empt_Type_name: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_name,
            Empt_Type_abbr: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_abbr,
            Emp_Code_Prefix: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Code_Prefix,
            Company_Employee_Flag: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Company_Employee_Flag,
            PermanantFlag: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.PermanantFlag,
            Retirement_Age: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Retirement_Age,
            ProbationMonths: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.ProbationMonths,
            AllowChangeProbationMonths: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.AllowChangeProbationMonths,
            Sort_key: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        },
        mode: "onChange",
        resolver: yupResolver(EmployeeTypeScheme),
    });


    useEffect(() => {
        if (isCode !== null) {
            Get_Employee_Type_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Empt_Type_code: 0,
                    Empt_Type_name: "",
                    Empt_Type_abbr: "",
                    Company_Employee_Flag: "",
                    Emp_Code_Prefix: "",
                    PermanantFlag: "",
                    Retirement_Age: "",
                    ProbationMonths: "",
                    AllowChangeProbationMonths: "",
                    Sort_key: "",
                },
            )
        } else {
            reset(
                {
                    Empt_Type_code: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_code ?
                    Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_code : 0,
        
                    Empt_Type_name: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_name,
                    Empt_Type_abbr: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Empt_Type_abbr,
                    Company_Employee_Flag: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Company_Employee_Flag,
                    Emp_Code_Prefix: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Code_Prefix,
                    PermanantFlag: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.PermanantFlag,
                    Retirement_Age: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Retirement_Age,
                    ProbationMonths: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.ProbationMonths,
                    AllowChangeProbationMonths: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.AllowChangeProbationMonths,
                    Sort_key: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                },
            )
        }
    }, [Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]])

    console.log("object",Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0])

    // EMPLOYEE TYPE FORM DATA API CALL =========================== 
    async function POST_Emp_Type_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/employment_type_code/AddEmploymentType`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Empt_Type_code": body.Empt_Type_code,
                "AllowChangeProbationMonths": body?.AllowChangeProbationMonths,
                "Company_Employee_Flag": body?.Company_Employee_Flag,
                "Emp_Code_Prefix": body?.Emp_Code_Prefix,
                "Empt_Type_abbr": body?.Empt_Type_abbr,
                "Empt_Type_name": body?.Empt_Type_name,
                "PermanantFlag": body?.PermanantFlag,
                "ProbationMonths": body?.ProbationMonths,
                "Retirement_Age": body?.Retirement_Age,
                "Sort_key": body?.Sort_key
            }),
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
                    cancel('read')
                    GetEmployeeTypeData({ 
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                    console.log("page",page)
                }, 3000);
            }
            else {
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }


    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Employee Type</h4>
                <hr />
                <div className="form-group formBoxEmployeeType">
                    <FormInput
                        label={'Emp Type Code'}
                        placeholder={'Emp Type Code'}
                        id="Empt_Type_code"
                        name="Empt_Type_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Emp Type Name'}
                        placeholder={'Emp Type Name'}
                        id="Empt_Type_name"
                        name="Empt_Type_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Empt Type abbr'}
                        placeholder={'Empt_Type_abbr'}
                        id="Empt_Type_abbr"
                        name="Empt_Type_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Emp Code Prefix'}
                        placeholder={'Emp Code Prefix'}
                        id="Emp_Code_Prefix"
                        name="Emp_Code_Prefix"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Sort Key'}
                        placeholder={'Sort Key'}
                        id="Sort_key"
                        name="Sort_key"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'Change Probation Month'}
                        placeholder={'Change Probation Month'}
                        id="AllowChangeProbationMonths"
                        name="AllowChangeProbationMonths"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        options={[
                            {
                                value: 'Y',
                                label: 'Yes',
                            },
                            {
                                value: 'N',
                                label: 'No',
                            },

                        ]}
                    />
                </div>
                <hr />

                <div className="form-group formBoxEmployeeType">
                    <FormInput
                        label={'Retirement Age'}
                        placeholder={'Retirement Age'}
                        id="Retirement_Age"
                        name="Retirement_Age"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Probation Month'}
                        placeholder={'Probation Month'}
                        id="ProbationMonths"
                        name="ProbationMonths"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <hr />
                <div className="form-group formBoxEmployeeType">
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Company_Employee_Flag"
                            name="Company_Employee_Flag"
                            labelText={'Company Employee Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Company_Employee_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Company_Employee_Flag"
                            name="Company_Employee_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Company_Employee_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="PermanantFlag"
                            name="PermanantFlag"
                            labelText={'Permanant Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.PermanantFlag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="PermanantFlag"
                            name="PermanantFlag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.PermanantFlag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    
                </div>
                <div className='EmployeeTypeBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}


function mapStateToProps({ Red_Employee_type }) {
    return { Red_Employee_type };
}
export default connect(mapStateToProps, EMPLOYEE_TYPE_ACTIONS)(EmployeeTypeForm)
