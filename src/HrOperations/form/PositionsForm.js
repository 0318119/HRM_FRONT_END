import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as COST_CENTRE_ACTIONS from "../../store/actions/HrOperations/Cost_Centre/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { Cost_CentreSchema } from '../schema';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'








function PositionsForm({ cancel, isCode, Get_Cost_Centre_By_ID, Red_Cost_centre, mode }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)




    // FORM CANCEL FUNCTION =================================================================
    const EditBack = () => {
        cancel('read')
    }
    const submitForm = async (data) => {
        try {
            const isValid = await Cost_CentreSchema.validate(data);
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
            Cost_Centre_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code ?
                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code : 0,

            Cost_Centre_name: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
            Cost_Centre_abbr: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
            Train_Cost_Budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
            Train_Cost_Actual: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
            JV_Code1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
            JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
            JVCode: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
            Temporary_JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
            emp_category_1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
            emp_category_2: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
            emp_category_3: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
            Functional_Category_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
            Major_Code_Mgmt: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
            Major_Code_Union: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
            Sort_Key: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            total_cost_budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
            Azad_Kashmir_Tax_Flag: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
            Pay_Grade_Areas_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
            Business_Sector_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
            org_unit_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
        },
        mode: "onChange",
        resolver: yupResolver(Cost_CentreSchema),
    });



    useEffect(() => {
        if (isCode !== null) {
            Get_Cost_Centre_By_ID(isCode)
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
                    Cost_Centre_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code,
                    Cost_Centre_name: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
                    Cost_Centre_abbr: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
                    Train_Cost_Budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
                    Train_Cost_Actual: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
                    JV_Code1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
                    JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
                    JVCode: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
                    Temporary_JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
                    emp_category_1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
                    emp_category_2: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
                    emp_category_3: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
                    Functional_Category_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
                    Major_Code_Mgmt: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
                    Major_Code_Union: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
                    Sort_Key: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    total_cost_budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
                    Azad_Kashmir_Tax_Flag: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
                    Pay_Grade_Areas_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
                    Business_Sector_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
                    org_unit_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
                },
            )
        }
    }, [Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]])

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
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Cost Centers List</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Position Code'}
                        placeholder={'Position Code'}
                        id="Position_Code"
                        name="Position_Code"
                        type="text"
                        showLabel={true}
                        readOnly
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Position Name'}
                        placeholder={'Position Name'}
                        id="Position_Name"
                        name="Position_Name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Position_Active_Flag"
                            name="Position_Active_Flag"
                            labelText={'Position Active Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Position_Active_Flag"
                            name="Position_Active_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <FormInput
                        label={'Position Active Date'}
                        placeholder={'Position Active Date'}
                        id="Position_Active_Date"
                        name="Position_Active_Date"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Permanent Employee Code'}
                        placeholder={'Permanent Employee Code'}
                        id="PermanentEmp_Code"
                        name="PermanentEmp_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Official Employee Code'}
                        placeholder={'Official Employee Code'}
                        id="OfficiatingEmp_Code"
                        name="OfficiatingEmp_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Backup Employee Code'}
                        placeholder={'Backup Employee Code'}
                        id="BackupEmp_Code"
                        name="BackupEmp_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Supervisor Position Code'}
                        placeholder={'Supervisor Position Code'}
                        id="SupervisorPosition_Code"
                        name="SupervisorPosition_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Designation Code'}
                        placeholder={'Designation Code'}
                        id="Desig_code"
                        name="Desig_code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Cost Centre Code'}
                        placeholder={'Cost Centre Code'}
                        id="Cost_Centre_Code"
                        name="Cost_Centre_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormInput
                            label={'Section Code'}
                            placeholder={'Section Code'}
                            id="Section_code"
                            name="Section_code"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Grade Code'}
                            placeholder={'Grade Code'}
                            id="Grade_code"
                            name="Grade_code"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={'Location Code'}
                            placeholder={'Location Code'}
                            id="Loc_Code"
                            name="Loc_Code"
                            type="number"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                  
                    </div>
                </div>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Default Workflow Levels For Leaves normal'}
                        placeholder={'Default  Workflow Levels For Leaves normal'}
                        id="Default_Workflow_levels_For_Leaves_normal"
                        name="Default_Workflow_levels_For_Leaves_normal"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Default Workflow Levels For Leaves Special'}
                        placeholder={'Default Workflow Levels For Leaves Special'}
                        id="Default_Workflow_levels_For_Leaves_Special"
                        name="Default_Workflow_levels_For_Leaves_Special"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Minimum Salary'}
                        placeholder={'Minimum Salary'}
                        id="Minimum_Salary"
                        name="Minimum_Salary"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Maximum Salary'}
                        placeholder={'Maximum Salary'}
                        id="Maximum_Salary"
                        name="Maximum_Salary"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Average Salary in Market Survey'}
                        placeholder={'Average Salary in Market Survey'}
                        id="Avg_Salary_in_Market_survey"
                        name="Avg_Salary_in_Market_survey"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Budgeted Basic Salary'}
                        placeholder={'Budgeted Basic Salary'}
                        id="Budgeted_Basic_Salary"
                        name="Budgeted_Basic_Salary"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Budgeted Other Salary'}
                        placeholder={'Budgeted Other Salary'}
                        id="Budgeted_Other_Salary"
                        name="Budgeted_Other_Salary"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Assign Delegation To All Sub Ordinate'}
                        placeholder={'Assign Delegation To All Sub Ordinate'}
                        id="Assign_Delegation_to_all_subordinate"
                        name="Assign_Delegation_to_all_subordinate"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Budgeted_Flag"
                            name="Budgeted_Flag"
                            labelText={'Budgeted Flag'}
                            label={"Male"}
                            value={'Y'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Budgeted_Flag"
                            name="Budgeted_Flag"
                            label={'Female'}
                            value={'N'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <FormInput
                        label={'Budget Type Name'}
                        placeholder={'Budget Type Name'}
                        id="Budget_Type_Name"
                        name="Budget_Type_Name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Budget Report Heading 1'}
                        placeholder={'Budget Report Heading 1'}
                        id="Budget_Report_Heading_1"
                        name="Budget_Report_Heading_1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Budget Report  Heading 2'}
                        placeholder={'Budget Report Heading 2'}
                        id="Budget_Report_Heading_2"
                        name="Budget_Report_Heading_2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Budget Report Heading 3'}
                        placeholder={'Budget Report Heading 3'}
                        id="Budget_Report_Heading_3"
                        name="Budget_Report_Heading_3"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                   
                    
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Preferable_Gender"
                            name="Preferable_Gender"
                            labelText={'Preferable_Gender'}
                            label={"Male"}
                            value={'Y'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Preferable_Gender"
                            name="Preferable_Gender"
                            label={'Female'}
                            value={'N'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <FormInput
                        label={'Updated On'}
                        placeholder={'Updated On'}
                        id="updated_on"
                        name="updated_on"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Updated By'}
                        placeholder={'Updated By'}
                        id="updated_by"
                        name="updated_by"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                 
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="SubmitFlag"
                            name="SubmitFlag"
                            labelText={'Submit Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="SubmitFlag"
                            name="SubmitFlag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    
                    <FormInput
                        label={'Submitted On'}
                        placeholder={'Submitted On'}
                        id="SubmittedOn"
                        name="SubmittedOn"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                 
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="ApprovedFlag"
                            name="ApprovedFlag"
                            labelText={'Approved Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="ApprovedFlag"
                            name="ApprovedFlag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    
                    <FormInput
                        label={'Approved By'}
                        placeholder={'Approved By'}
                        id="ApprovedBy"
                        name="ApprovedBy"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Approved On'}
                        placeholder={'Approved On'}
                        id="ApprovedOn"
                        name="ApprovedOn"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Budget Year'}
                        placeholder={'Budget Year'}
                        id="BudgetYear"
                        name="BudgetYear"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="BudgetConfirmFlag"
                            name="BudgetConfirmFlag"
                            labelText={'BudgetConfirmFlag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="BudgetConfirmFlag"
                            name="BudgetConfirmFlag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                </div>
                <div className='CountryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} /> 
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>
        </>
    )
}

function mapStateToProps({ Red_Cost_centre }) {
    return { Red_Cost_centre };
}
export default connect(mapStateToProps, COST_CENTRE_ACTIONS)(PositionsForm)