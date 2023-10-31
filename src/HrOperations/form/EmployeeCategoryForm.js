import React, { useState,useEffect } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as EMPLOYEE_CAT_ACTIONS from "../../store/actions/HrOperations/EmployeeCat/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { EmployeeCatScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput, FormSelect } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function EmployeeCategoryForm({ cancel, mode, isCode, page, Red_Employee_Cat, GetEmployeeCatData, Get_Employee_Cat_By_ID }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await EmployeeCatScheme.validate(data);
            if (isValid) {
                POST_Emp_cat_FORM(data)
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
            Emp_Category_code: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_code ?
            Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_code : 0,
            
            Emp_Category_name: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_name,
            Emp_Category_abbr: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_abbr,
            graduity_fund_percentage: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.graduity_fund_percentage,
            Sort_key: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        },
        mode: "onChange",
        resolver: yupResolver(EmployeeCatScheme),
    });



    useEffect(() => {
        if (isCode !== null) {
            Get_Employee_Cat_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Emp_Category_code: 0,
                    Emp_Category_name: "",
                    Emp_Category_abbr: "",
                    graduity_fund_percentage: "",
                    Sort_key: "",
                },
            )
        } else {
            reset(
                {
                    Emp_Category_code: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_code ?
                    Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_code : 0,
                    Emp_Category_name: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_name,
                    Emp_Category_abbr: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Category_abbr,
                    graduity_fund_percentage: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.graduity_fund_percentage,
                    Sort_key: Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                },
            )
        }
    }, [Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0]])

    // EMPLOYEE TYPE FORM DATA API CALL =========================== 
    async function POST_Emp_cat_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/employment_category/AddEmploymentCategory`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Emp_Category_code": body?.Emp_Category_code,
                "Emp_Category_name": body?.Emp_Category_name,
                "Emp_Category_abbr": body?.Emp_Category_abbr,
                "graduity_fund_percentage": body?.graduity_fund_percentage,
                "Sort_key": body?.Sort_key,
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
                    GetEmployeeCatData({ 
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
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
                <h4 className="text-dark">Employee Category</h4>
                <hr />
                <div className="form-group formBoxDivisions">
                    <FormInput
                        label={'Emp Category code'}
                        placeholder={'Emp Category code'}
                        id="Emp_Category_code"
                        name="Emp_Category_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Emp Category Name'}
                        placeholder={'Emp Category Name'}
                        id="Emp_Category_name"
                        name="Emp_Category_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Emp Category Abbreviation'}
                        placeholder={'Emp Category Abbreviation'}
                        id="Emp_Category_abbr"
                        name="Emp_Category_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Graduity fund percentage'}
                        placeholder={'Graduity fund percentage'}
                        id="graduity_fund_percentage"
                        name="graduity_fund_percentage"
                        type="number"
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
                <div className='EmployeCategoryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}

function mapStateToProps({ Red_Employee_Cat }) {
    return { Red_Employee_Cat };
}
export default connect(mapStateToProps, EMPLOYEE_CAT_ACTIONS)(EmployeeCategoryForm)
