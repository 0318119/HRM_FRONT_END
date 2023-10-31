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
                // POST_Emp_Type_FORM(data)
                console.log("data",data)
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

            // Emp_Category_code: yup.number().required("Emp_Category_code is required"),
            // Emp_Category_name: yup.string().required("Emp_Category_name is required"),
            // Emp_Category_abbr: yup.string().required("Emp_Category_abbr is required"),
            // graduity_fund_percentage: yup.number().required("graduity_fund_percentage is required"),
            // Sort_key: yup.number().required("Sort_key is required"),

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

    console.log("Edit Data",Red_Employee_Cat?.dataSingle?.[0]?.res?.data?.[0])


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
                    <Input placeholder={'Employee Category Name'} label={'Employee Category Name'} type="text" />
                    <Input placeholder={'Employee Category Abbrivation'} label={'Employee Category Abbrivation'} type="text" />
                    <Input placeholder={'Graduity Fund Percentage'} label={'Graduity Fund Percentage'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxDivisions">
                    <Input placeholder={'Division Head'} label={'Division Head'} type="number" />
                    <Input placeholder={'Division Category Code'} label={'Division Category Code'} type="number" />
                </div> */}
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
