import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as MASTER_PERSONAL from "../../store/actions/MasterMaintaince/MasterPersonal/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { MasterPersonal } from '../schema';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function MasterPersonalForm({ cancel, isCode, page, GetMasterPersonalData, Red_Master_Personal, mode }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);

    // FORM CANCEL FUNCTION =================================================================
    const EditBack = () => {
        cancel('read')
    }
    const submitForm = async (data) => {
        try {
            const isValid = await MasterPersonal.validate(data);
            if (isValid) {
                POST_COST_CENTRE_FORM(data)
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
            Cost_Centre_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code ?
                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code : 0,

            Cost_Centre_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
            Cost_Centre_abbr: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
            Train_Cost_Budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
            Train_Cost_Actual: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
            JV_Code1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
            JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
            JVCode: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
            Temporary_JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
            emp_category_1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
            emp_category_2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
            emp_category_3: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
            Functional_Category_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
            Major_Code_Mgmt: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
            Major_Code_Union: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
            Sort_Key: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            total_cost_budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
            Azad_Kashmir_Tax_Flag: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
            Pay_Grade_Areas_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
            Business_Sector_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
            org_unit_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
        },
        mode: "onChange",
        resolver: yupResolver(MasterPersonal),
    });



    useEffect(() => {
        if (isCode !== null) {
            // Get_Cost_Centre_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Cost_Centre_code: 0,
                    Cost_Centre_name: "",
                    Cost_Centre_abbr: "",
                    Train_Cost_Budget: "",
                    Train_Cost_Actual: "",
                    JV_Code1: "",
                    JV_Code: "",
                    JVCode: "",
                    Temporary_JV_Code: "",
                    emp_category_1: "",
                    emp_category_2: "",
                    emp_category_3: "",
                    Functional_Category_code: "",
                    Major_Code_Mgmt: "",
                    Major_Code_Union: "",
                    Sort_Key: "",
                    total_cost_budget: "",
                    Azad_Kashmir_Tax_Flag: "",
                    Pay_Grade_Areas_code: "",
                    Business_Sector_Code: "",
                    org_unit_code: "",
                },
            )
        } else {
            reset(
                {
                    Cost_Centre_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code,
                    Cost_Centre_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
                    Cost_Centre_abbr: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
                    Train_Cost_Budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
                    Train_Cost_Actual: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
                    JV_Code1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
                    JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
                    JVCode: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
                    Temporary_JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
                    emp_category_1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
                    emp_category_2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
                    emp_category_3: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
                    Functional_Category_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
                    Major_Code_Mgmt: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
                    Major_Code_Union: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
                    Sort_Key: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    total_cost_budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
                    Azad_Kashmir_Tax_Flag: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
                    Pay_Grade_Areas_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
                    Business_Sector_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
                    org_unit_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
                },
            )
        }
    }, [Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]])

    // COST CENTRE FORM DATA API CALL =========================== 
    async function POST_COST_CENTRE_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/employment_cost_center/AddCostCenter`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Cost_Centre_code": body.Cost_Centre_code,
                "Cost_Centre_name": body.Cost_Centre_name,
                "Cost_Centre_abbr": body.Cost_Centre_abbr,
                "Train_Cost_Budget": body.Train_Cost_Budget,
                "Train_Cost_Actual": body.Train_Cost_Actual,
                "Train_Cost_Actual": body.Train_Cost_Actual,
                "JV_Code1": body.JV_Code1,
                "JV_Code": body.JV_Code,
                "JVCode": body.JVCode,
                "Temporary_JV_Code": body.Temporary_JV_Code,
                "emp_category_1": body.emp_category_1,
                "emp_category_2": body.emp_category_2,
                "emp_category_3": body.emp_category_3,
                "Functional_Category_code": body.Functional_Category_code,
                "Major_Code_Mgmt": body.Major_Code_Mgmt,
                "Major_Code_Union": body.Major_Code_Union,
                "Sort_Key": body.Sort_Key,
                "total_cost_budget": body.total_cost_budget,
                "Azad_Kashmir_Tax_Flag": body.Azad_Kashmir_Tax_Flag,
                "Pay_Grade_Areas_code": body.Pay_Grade_Areas_code,
                "Business_Sector_Code": body.Business_Sector_Code,
                "org_unit_code": body.org_unit_code,
            })
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
                    GetMasterPersonalData({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
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
            <form >
                <h4 className="text-dark">Master Personal</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Emp_marital_status" 
                            name="Emp_marital_status"
                            labelText={'Marital Status'}
                            label={"Single"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Emp_marital_status"
                            name="Emp_marital_status"
                            label={'Married'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Genders"
                            name="Genders"
                            labelText={'Genders'}
                            label={"Male"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Genders == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Genders"
                            name="Genders"
                            label={'Female'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Genders == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Confirmation_Flag"
                            name="Confirmation_Flag"
                            labelText={'Confirm Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Confirmation_Flag"
                            name="Confirmation_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                 

                    <FormInput
                        label={'Confirmation Date'}
                        placeholder={'Confirmation Date'}
                        id="Emp_Confirm_date"
                        name="Emp_Confirm_date"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    {/* <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Azad_Kashmir_Tax_Flag"
                            name="Azad_Kashmir_Tax_Flag"
                            labelText={'Azad_Kashmir_Tax_Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Azad_Kashmir_Tax_Flag"
                            name="Azad_Kashmir_Tax_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div> */}
                </div>
                <hr />
                <div className="form-group formBoxCountry">
                    {/* <FormInput
                        label={'Employe category 1'}
                        placeholder={'Employe category 1'}
                        id="emp_category_1"
                        name="emp_category_1"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    /> */}
           
                </div>
                <div className='CountryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} /> 
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>
        </>
    )
}
function mapStateToProps({ Red_Master_Personal }) {
    return { Red_Master_Personal };
}

export default connect(mapStateToProps, MASTER_PERSONAL)(MasterPersonalForm); 