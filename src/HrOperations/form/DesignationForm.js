import React, { useEffect, useState } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as DESIGNATIONS_ACTIONS from "../../store/actions/HrOperations/Departments/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { DesignationScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function DesignationForm({ cancel, mode, isCode, Red_Designation, Get_Designation_Data_By_Id }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (isCode !== null) {
            // Get_Designation_Data_By_Id(isCode)
        }
    }, [])

    const EditBack = () => {
        cancel('read')
    }
    const submitForm = async (data) => {
        console.log("data",data)
        try {
            const isValid = await DesignationScheme.validate(data);
            if (isValid) {
                // POST_DEPARTMENT_FORM(data)
                console.log("data","data")
            }
        } catch (error) {
            console.error(error);
            console.log("error","error")
        }
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Desig_code: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code ?
            Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code : 0,

            Desig_abbr: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_abbr,
            Sort_key: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            Job_Evaluation_Flag: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Job_Evaluation_Flag,
            Dept_code: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code,
            SatAllowance: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.SatAllowance,
            EveAllowance: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.EveAllowance,
            JD_Desig_Code: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.JD_Desig_Code,
        },
        mode: "onChange",
        resolver: yupResolver(DesignationScheme),
    });

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Desig_code:  0,
                    Desig_abbr: "",
                    Sort_key: "",
                    Job_Evaluation_Flag: "",
                    Dept_code: "",
                    SatAllowance: "",
                    EveAllowance: "",
                    JD_Desig_Code: "",
                },
            )
        } else {
            reset(
                {
                    Desig_code: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code ?
                    Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code : 0,
        
                    Desig_abbr: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_abbr,
                    Sort_key: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    Job_Evaluation_Flag: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Job_Evaluation_Flag,
                    Dept_code: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code,
                    SatAllowance: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.SatAllowance,
                    EveAllowance: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.EveAllowance,
                    JD_Desig_Code: Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.JD_Desig_Code,
                },
            )
        }
    }, [Red_Designation?.dataSingle?.[0]?.res?.data?.[0]])
    

      console.log("Red_Designation",Red_Designation)

    // DESIGNATION FORM DATA API CALL =========================== 
    async function POST_DEPARTMENT_FORM(body) {
        return
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/department/AddDepartmentList`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Dept_code": body.Dept_code,
                "Dept_name": body.Dept_name,
                "Dept_abbr": body.Dept_abbr,
                "Div_code": body.Dept_code,
                "Dept_Head": body.Dept_Head,
                "Permanent_Budget": body.Permanent_Budget,
                "Temporary_Budget": body.Temporary_Budget,
                "Sort_key": body.Sort_key
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            console.log("response", response)
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.messsage,
                });
                setLoading(false)
                setTimeout(() => {
                    cancel('read')
                }, 3000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.messsage || response?.messsage,
                });
                setLoading(false)
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message,
            });
            setLoading(false)
        });
    }


    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Designation List</h4>
                <hr />
                <div className="form-group formBoxDesignations">
                    <FormInput
                        label={'Desig code'}
                        placeholder={'Desig code'}
                        id="Desig_code"
                        name="Desig_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Designation Name'}
                        placeholder={'Designation Name'}
                        id="Desig_name"
                        name="Desig_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Desig abbr'}
                        placeholder={'Desig abbr'}
                        id="Desig_abbr"
                        name="Desig_abbr"
                        type="text"
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
                <div className="form-group formBoxDesignations">
                    <FormInput
                        label={'Department Code'}
                        placeholder={'Department Code'}
                        id="Dept_code"
                        name="Dept_code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Sat Allowance'}
                        placeholder={'Sat Allowance'}
                        id="SatAllowance"
                        name="SatAllowance"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Eve Allowance'}
                        placeholder={'Eve Allowance'}
                        id="EveAllowance"
                        name="EveAllowance"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'JD Designation Code'}
                        placeholder={'JD Designation Code'}
                        id="JD_Desig_Code"
                        name="JD_Desig_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Job_Evaluation_Flag"
                            name="Job_Evaluation_Flag"
                            labelText={'Job Evaluation Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Job_Evaluation_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Job_Evaluation_Flag"
                            name="Job_Evaluation_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Designation?.dataSingle?.[0]?.res?.data?.[0]?.Job_Evaluation_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                </div>
                <div className='DesignationsBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" type={'submit'} loading={isLoading} />
                </div>
            </form>
        </>
    )
}


function mapStateToProps({ Red_Designation }) {
    return { Red_Designation };
}
export default connect(mapStateToProps, DESIGNATIONS_ACTIONS)(DesignationForm)
