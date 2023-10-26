import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as DEPARTMENT_ACTIONS from "../../store/actions/HrOperations/Departments/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { DepartmentScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'



function DepartmentForm({ cancel, mode, isCode, Red_Department,Get_department_Data_By_Id,GetDataDepartment }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setLoading] = useState(false)

    const EditBack = () => {
        cancel('read')
    }
    const submitForm = async (data) => {
        try {
            const isValid = await DepartmentScheme.validate(data);
            if (isValid) {
                POST_DEPARTMENT_FORM(data)
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
            Dept_code: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code ?
            Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code : 0,

            Dept_name: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_name,
            Dept_abbr: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_abbr,
            Div_code: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Div_code,
            Dept_Head: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_Head,
            Permanent_Budget: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Permanent_Budget,
            Temporary_Budget: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_Budget,
            Sort_key: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        },
        mode: "onChange",
        resolver: yupResolver(DepartmentScheme),
    });

    useEffect(() => {
        if (isCode !== null) {
            Get_department_Data_By_Id(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
          reset(
            {
                Dept_code: 0,
                Dept_name: "",
                Dept_abbr: "",
                Div_code: "",
                Dept_Head: "",
                Permanent_Budget: "",
                Temporary_Budget: "",
                Sort_key: "",
            },
          )
        } else {
          reset(
            {
                Dept_code: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code ?
                Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code : 0,

                Dept_name: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_name,
                Dept_abbr: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_abbr,
                Div_code: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Div_code,
                Dept_Head: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Dept_Head,
                Permanent_Budget: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Permanent_Budget,
                Temporary_Budget: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_Budget,
                Sort_key: Red_Department?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            },
          )
        }
    }, [Red_Department?.dataSingle?.[0]?.res?.data?.[0]])
    
    
    // DEPARTMENTS FORM DATA API CALL =========================== 
    async function POST_DEPARTMENT_FORM(body) {
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
        if(response.success){
            messageApi.open({
                type: 'success',
                content: response?.message || response?.messsage,
            });
            setLoading(false)
            setTimeout(() => {
                cancel('read')
                GetDataDepartment({
                    pageSize: pageSize,
                    pageNo: 1,
                    search: null
                })
            }, 3000);
        }
        else{
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
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Departments List</h4>
                <hr />
                <div className="form-group formBoxDepartments">
                    <FormInput
                        label={'Dept code'}
                        placeholder={'Dept code'}
                        id="Dept_code"
                        name="Dept_code"
                        type="numebr"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Dept name'}
                        placeholder={'Dept name'}
                        id="Dept_name"
                        name="Dept_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Dept Abbrivation'}
                        placeholder={'Dept Abbrivation'}
                        id="Dept_abbr"
                        name="Dept_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
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
                </div>
                <hr />
                <div className="form-group formBoxDepartments">
                    <FormInput
                        label={'Division Code'}
                        placeholder={'Division Code'}
                        id="Div_code"
                        name="Div_code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Department Head'}
                        placeholder={'Department Head'}
                        id="Dept_Head"
                        name="Dept_Head"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Permanent Budget'}
                        placeholder={'Permanent Budget'}
                        id="Permanent_Budget"
                        name="Permanent_Budget"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Temporary Budget'}
                        placeholder={'Temporary Budget'}
                        id="Temporary_Budget"
                        name="Temporary_Budget"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <div className='DepartmentsBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" type={'submit'} loading={isLoading} />
                </div>
            </form>
        </>
    )
}

function mapStateToProps({ Red_Department }) {
    return { Red_Department };
}
export default connect(mapStateToProps, DEPARTMENT_ACTIONS)(DepartmentForm)
