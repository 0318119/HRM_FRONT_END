import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as POSITION_ACTIONS from "../../store/actions/HrOperations/Positions/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { PositionScheme } from '../schema';
import { message } from 'antd';
import baseUrl from '../../config.json'








function PositionsForm({ cancel, isCode, page, GetPositionData, Get_Position_By_ID, Red_Position, mode }) {
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
            const isValid = await PositionScheme.validate(data);
            if (isValid) {
                POST_POSITIONS_FORM(data)
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
            Position_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Code ?
                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Code : 0,
            PositionName : Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.PositionName,
            Position_Active_Flag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Active_Flag,
            Position_Active_Date: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Active_Date,
            PermanentEmp_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.PermanentEmp_Code,
            OfficiatingEmp_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.OfficiatingEmp_Code,
            BackupEmp_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BackupEmp_Code,
            SupervisorPosition_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SupervisorPosition_Code,
            Desig_code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code,
            Cost_Centre_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_Code,
            Section_code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Section_code,
            Grade_code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code,
            Loc_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Loc_Code,
            Default_Workflow_levels_For_Leaves_normal: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Default_Workflow_levels_For_Leaves_normal,
            Default_Workflow_levels_For_Leaves_Special: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Default_Workflow_levels_For_Leaves_Special,
            Minimum_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Minimum_Salary,
            Maximum_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Maximum_Salary,
            Avg_Salary_in_Market_survey: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Avg_Salary_in_Market_survey,
            Budgeted_Basic_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Basic_Salary,
            Budgeted_Other_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Other_Salary,
            Assign_Delegation_to_all_subordinate: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Assign_Delegation_to_all_subordinate,
            Budgeted_Flag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Flag,
            Budget_Type_Name: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Type_Name,
            Budget_Report_Heading_1: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Report_Heading_1,
            Budget_Report_Heading_2: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Report_Heading_2,
            Budget_Report_Heading_3: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Report_Heading_3,
            Preferable_Gender: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Preferable_Gender,
            SubmitFlag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SubmitFlag,
            SubmittedOn: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SubmittedOn,
            ApprovedFlag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.ApprovedFlag,
            BudgetYear: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BudgetYear,
            BudgetConfirmFlag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BudgetConfirmFlag,
        },
        mode: "onChange",
        resolver: yupResolver(PositionScheme),
    });



    useEffect(() => {
        if (isCode !== null) {
            Get_Position_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Position_Code: 0,
                    PositionName: "",
                    Position_Active_Flag: "",
                    Position_Active_Date: "",
                    PermanentEmp_Code: "",
                    OfficiatingEmp_Code: "",
                    BackupEmp_Code: "",
                    SupervisorPosition_Code: "",
                    Desig_code: "",
                    Cost_Centre_Code: "",
                    Section_code: "",
                    Grade_code: "",
                    Loc_Code: "",
                    Default_Workflow_levels_For_Leaves_normal: "",
                    Default_Workflow_levels_For_Leaves_Special: "",
                    Minimum_Salary: "",
                    Maximum_Salary: "",
                    Avg_Salary_in_Market_survey: "",
                    Budgeted_Basic_Salary: "",
                    Budgeted_Other_Salary: "",
                    Assign_Delegation_to_all_subordinate:"",
                    Budgeted_Flag: "",
                    Budget_Type_Name: "",
                    Budget_Report_Heading_1: "",
                    Budget_Report_Heading_2: "",
                    Budget_Report_Heading_3: "",
                    Preferable_Gender: "",
                    SubmitFlag: "",
                    SubmittedOn: "",
                    ApprovedFlag: "",
                    BudgetYear: "",
                    BudgetConfirmFlag: ""
                },
            )
        } else {
            reset(
                {
                    Position_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Code,
                    PositionName: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.PositionName,
                    Position_Active_Flag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Active_Flag,
                    Position_Active_Date: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Active_Date,
                    PermanentEmp_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.PermanentEmp_Code,
                    OfficiatingEmp_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.OfficiatingEmp_Code,
                    BackupEmp_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BackupEmp_Code,
                    SupervisorPosition_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SupervisorPosition_Code,
                    Desig_code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Desig_code,
                    Cost_Centre_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_Code,
                    Section_code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Section_code,
                    Grade_code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code,
                    Loc_Code: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Loc_Code,
                    Default_Workflow_levels_For_Leaves_normal: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Default_Workflow_levels_For_Leaves_normal,
                    Default_Workflow_levels_For_Leaves_Special: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Default_Workflow_levels_For_Leaves_Special,
                    Minimum_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Minimum_Salary,
                    Maximum_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Maximum_Salary,
                    Avg_Salary_in_Market_survey: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Avg_Salary_in_Market_survey,
                    Budgeted_Basic_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Basic_Salary,
                    Budgeted_Other_Salary: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Other_Salary,
                    Assign_Delegation_to_all_subordinate: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Assign_Delegation_to_all_subordinate,
                    Budgeted_Flag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Flag,
                    Budget_Type_Name: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Type_Name,
                    Budget_Report_Heading_1: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Report_Heading_1,
                    Budget_Report_Heading_2: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Report_Heading_2,
                    Budget_Report_Heading_3: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budget_Report_Heading_3,
                    Preferable_Gender: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Preferable_Gender,
                    SubmitFlag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SubmitFlag,
                    SubmittedOn: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SubmittedOn,
                    ApprovedFlag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.ApprovedFlag,
                    BudgetYear: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BudgetYear,
                    BudgetConfirmFlag: Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BudgetConfirmFlag,
                },
            )
        }
    }, [Red_Position?.dataSingle?.[0]?.res?.data?.[0]])

    // COST CENTRE FORM DATA API CALL =========================== 
    async function POST_POSITIONS_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/Positions/AddPosition`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Position_Code": body?.Position_Code,
                "PositionName": body.PositionName,
                "Position_Active_Flag": body.Position_Active_Flag,
                "Position_Active_Date": body.Position_Active_Date,
                "PermanentEmp_Code": body.PermanentEmp_Code,
                "OfficiatingEmp_Code": body.OfficiatingEmp_Code,
                "BackupEmp_Code": body.BackupEmp_Code,
                "SupervisorPosition_Code": body.SupervisorPosition_Code,
                "Desig_code": body.Desig_code,
                "Cost_Centre_Code": body.Cost_Centre_Code,
                "Section_code": body.Section_code,
                "Grade_code": body.Grade_code,
                "Loc_Code": body.Loc_Code,
                "Default_Workflow_levels_For_Leaves_normal": body.Default_Workflow_levels_For_Leaves_normal,
                "Default_Workflow_levels_For_Leaves_Special": body.Default_Workflow_levels_For_Leaves_Special,
                "Minimum_Salary": body.Minimum_Salary,
                "Maximum_Salary": body.Maximum_Salary,
                "Avg_Salary_in_Market_survey": body.Avg_Salary_in_Market_survey,
                "Budgeted_Basic_Salary": body.Budgeted_Basic_Salary,
                "Budgeted_Other_Salary": body.Budgeted_Other_Salary,
                "Assign_Delegation_to_all_subordinate": body.Assign_Delegation_to_all_subordinate,
                "Budgeted_Flag": body.Budgeted_Flag,
                "Budget_Type_Name": body.Budget_Type_Name,
                "Budget_Report_Heading_1": body.Budget_Report_Heading_1,
                "Budget_Report_Heading_2": body.Budget_Report_Heading_2,
                "Budget_Report_Heading_3": body.Budget_Report_Heading_3,
                "Preferable_Gender": body.Preferable_Gender,
                "SubmitFlag": body.SubmitFlag,
                "SubmittedOn": body.SubmittedOn,
                "ApprovedFlag": body.ApprovedFlag,
                "BudgetYear": body.BudgetYear,
                "BudgetConfirmFlag": body.BudgetConfirmFlag
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
                    GetPositionData({
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
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Positions</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Position Code'}
                        placeholder={'Position Code'}
                        id="Position_Code"
                        name="Position_Code"
                        type="number"
                        showLabel={true}
                        readOnly
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Position Name'}
                        placeholder={'Position Name'}
                        id="PositionName"
                        name="PositionName"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

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
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
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
                    <FormInput
                        label={'Budget Year'}
                        placeholder={'Budget Year'}
                        id="BudgetYear"
                        name="BudgetYear"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <hr />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Position_Active_Flag"
                            name="Position_Active_Flag"
                            labelText={'Position_Active_Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Active_Flag == "Y" ? true : false
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
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Position_Active_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Budgeted_Flag"
                            name="Budgeted_Flag"
                            labelText={'Budgeted Flag'}
                            label={"Male"}
                            value={'Y'}
                            defaultChecked={
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Flag == "Y" ? true : false
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
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Budgeted_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Preferable_Gender"
                            name="Preferable_Gender"
                            labelText={'Preferable_Gender'}
                            label={"Male"}
                            value={'Y'}
                            defaultChecked={
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Preferable_Gender == "Y" ? true : false
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
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.Preferable_Gender == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="SubmitFlag"
                            name="SubmitFlag"
                            labelText={'Submit Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SubmitFlag == "Y" ? true : false
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
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.SubmitFlag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="ApprovedFlag"
                            name="ApprovedFlag"
                            labelText={'Approved Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.ApprovedFlag == "Y" ? true : false
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
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.ApprovedFlag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="BudgetConfirmFlag"
                            name="BudgetConfirmFlag"
                            labelText={'BudgetConfirmFlag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BudgetConfirmFlag == "Y" ? true : false
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
                                Red_Position?.dataSingle?.[0]?.res?.data?.[0]?.BudgetConfirmFlag == "N" ? true : false
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

function mapStateToProps({ Red_Position }) {
    return { Red_Position };
}
export default connect(mapStateToProps, POSITION_ACTIONS)(PositionsForm)