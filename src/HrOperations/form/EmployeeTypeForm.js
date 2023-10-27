import React, { useEffect, useState } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Select from '../../components/basic/select'
import * as EMPLOYEE_TYPE_ACTIONS from "../../store/actions/HrOperations/EmployeeType/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { EmployeeTypeScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput, FormSelect } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function EmployeeTypeForm({ cancel, mode, isCode, Red_Employee_type, GetEmployeeTypeData, Get_Employee_Type_By_ID }) {
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
                // POST_Education_FORM(data)
                console.log("data", data)
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
            Company_Employee_Flag: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Company_Employee_Flag,
            Emp_Code_Prefix: Red_Employee_type?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Code_Prefix,
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

    // EDUCATION LEVEL FORM DATA API CALL =========================== 
    async function POST_Education_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/eduation_code/AddEducation`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Edu_abbr": body?.Edu_abbr,
                "Edu_code": body?.Edu_code,
                "Edu_name": body?.Edu_name,
                "Sort_key": body?.Sort_key,
                "Edu_level_code": body?.Edu_level_code
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            console.log("response.success", response)
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
                setTimeout(() => {
                    cancel('read')
                    // GetEducationData({
                    //     pageSize: pageSize,
                    //     pageNo: 1,
                    //     search: null
                    // })
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
                        label={'Company Code'}
                        placeholder={'Company Code'}
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
                        type="date"
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
                            // defaultChecked={
                            //     Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            // }
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
                            // defaultChecked={
                            //     Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            // }
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
                            // defaultChecked={
                            //     Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            // }
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
                            // defaultChecked={
                            //     Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            // }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
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
                                value: '1',
                                label: '1',
                            },
                            {
                                value: '2',
                                label: '2',
                            },
                            {
                                value: '3',
                                label: '3',
                            },

                        ]}
                    />
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
