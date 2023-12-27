import React, { useState, useEffect } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as GRADES_ACTIONS from "../../store/actions/HrOperations/Grades/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { GradesScheme } from '../schema';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function GradeForm({ cancel, mode, isCode, page, Red_Grades, GetGradesData, Get_Grades_By_ID }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);

    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await GradesScheme.validate(data);
            if (isValid) {
                POST_GRADES_FORM(data)
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
            Grade_code: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code ?
                Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code : 0,

            Grade_name: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_name,
            Grade_abbr: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_abbr,
            ProbationMonths: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Probation_Months,
            Incentive_Hour_Rate: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Hour_Rate,
            Incentive_Weekdays_Limit_Hour: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Weekdays_Limit_Hour,
            Incentive_Saturday_Limit_Hour: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Saturday_Limit_Hour,
            Medical_Insurance_Amount: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Medical_Insurance_Amount,
            Meal_Deduction: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Meal_Deduction,
            Sort_key: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            Litres_for_Petrol: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Litres_for_Petrol,
            Insurance_Category: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Insurance_Category,
            Life_Insurance_Category: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Life_Insurance_Category,
            Long_Name: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Long_Name,
            job_description_flag: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.job_description_flag,
            next_promotion_grade: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.next_promotion_grade,
            Assigning_Critaria_For_Next_Promotion: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Assigning_Critaria_For_Next_Promotion,
            Overtime_flag: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Overtime_flag,
            mobile_amount: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.mobile_amount,
            Car_Amount: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Car_Amount,
        },
        mode: "onChange",
        resolver: yupResolver(GradesScheme),
    });


    useEffect(() => {
        if (isCode !== null) {
            Get_Grades_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Grade_code: 0,
                    Grade_name: "",
                    Grade_abbr: "",
                    ProbationMonths: "",
                    Incentive_Hour_Rate: "",
                    Incentive_Weekdays_Limit_Hour: "",
                    Incentive_Saturday_Limit_Hour: "",
                    Medical_Insurance_Amount: "",
                    Meal_Deduction: "",
                    Sort_key: "",
                    Litres_for_Petrol: "",
                    Insurance_Category: "",
                    Life_Insurance_Category: "",
                    Long_Name: "",
                    job_description_flag: "''",
                    next_promotion_grade: "",
                    Assigning_Critaria_For_Next_Promotion: "",
                    Overtime_flag: "",
                    mobile_amount: "",
                    Car_Amount: "",
                },
            )
        } else {
            reset(
                {
                    Grade_code: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code ?
                        Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_code : 0,

                    Grade_name: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_name,
                    Grade_abbr: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Grade_abbr,
                    ProbationMonths: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Probation_Months,
                    Incentive_Hour_Rate: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Hour_Rate,
                    Incentive_Weekdays_Limit_Hour: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Weekdays_Limit_Hour,
                    Incentive_Saturday_Limit_Hour: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Saturday_Limit_Hour,
                    Medical_Insurance_Amount: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Medical_Insurance_Amount,
                    Meal_Deduction: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Meal_Deduction,
                    Sort_key: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    Litres_for_Petrol: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Litres_for_Petrol,
                    Insurance_Category: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Insurance_Category,
                    Life_Insurance_Category: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Life_Insurance_Category,
                    Long_Name: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Long_Name,
                    job_description_flag: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.job_description_flag,
                    next_promotion_grade: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.next_promotion_grade,
                    Assigning_Critaria_For_Next_Promotion: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Assigning_Critaria_For_Next_Promotion,
                    Overtime_flag: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Overtime_flag,
                    mobile_amount: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.mobile_amount,
                    Car_Amount: Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Car_Amount,
                },
            )
        }
    }, [Red_Grades?.dataSingle?.[0]?.res?.data?.[0]])


    //  GRADE FORM DATA API CALL =========================== 
    async function POST_GRADES_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/grade_code/AddGrade`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Grade_code": body?.Grade_code,
                "Grade_name": body?.Grade_name,
                "Grade_abbr": body?.Grade_abbr,
                "ProbationMonths": body?.ProbationMonths,
                "Incentive_Hour_Rate": body?.Incentive_Hour_Rate,
                "Incentive_Weekdays_Limit_Hour": body?.Incentive_Weekdays_Limit_Hour,
                "Incentive_Saturday_Limit_Hour": body?.Incentive_Saturday_Limit_Hour,
                "Medical_Insurance_Amount": body?.Medical_Insurance_Amount,
                "Meal_Deduction": body?.Meal_Deduction,
                "Sort_key": body?.Sort_key,
                "Litres_for_Petrol": body?.Litres_for_Petrol,
                "Insurance_Category": body?.Insurance_Category,
                "Life_Insurance_Category": body?.Life_Insurance_Category,
                "Long_Name": body?.Long_Name,
                "job_description_flag": body?.job_description_flag,
                "next_promotion_grade": body?.next_promotion_grade,
                "Assigning_Critaria_For_Next_Promotion": body?.Assigning_Critaria_For_Next_Promotion,
                "Overtime_flag": body?.Overtime_flag,
                "mobile_amount": body?.mobile_amount,
                "Car_Amount": body?.Car_Amount
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
                    GetGradesData({
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
                <h4 className="text-dark">Grade</h4>
                <hr />
                <div className="form-group formBoxGrade">
                    <FormInput
                        label={'Grade Code'}
                        placeholder={'Grade Code'}
                        id="Grade_code"
                        name="Grade_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Grade Name'}
                        placeholder={'Grade Name'}
                        id="Grade_name"
                        name="Grade_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Grade Abbrivation'}
                        placeholder={'Grade Abbrivation'}
                        id="Grade_abbr"
                        name="Grade_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Probation Months'}
                        placeholder={'Probation Months'}
                        id="ProbationMonths"
                        name="ProbationMonths"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Incentive Hour Rate'}
                        placeholder={'Incentive Hour Rate'}
                        id="Incentive_Hour_Rate"
                        name="Incentive_Hour_Rate"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Incentive Weekdays Limit Hour'}
                        placeholder={'Incentive Weekdays Limit Hour'}
                        id="Incentive_Weekdays_Limit_Hour"
                        name="Incentive_Weekdays_Limit_Hour"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Incentive Saturday Limit Hour'}
                        placeholder={'Incentive Saturday Limit Hour'}
                        id="Incentive_Saturday_Limit_Hour"
                        name="Incentive_Saturday_Limit_Hour"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Medical Insurance Amount'}
                        placeholder={'Medical Insurance Amount'}
                        id="Medical_Insurance_Amount"
                        name="Medical_Insurance_Amount"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Meal Deduction'}
                        placeholder={'Meal Deduction'}
                        id="Meal_Deduction"
                        name="Meal_Deduction"
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
                <div className="form-group formBoxGrade">
                    <FormInput
                        label={'Litres For Petrol'}
                        placeholder={'Litres For Petrol'}
                        id="Litres_for_Petrol"
                        name="Litres_for_Petrol"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Insurance Category'}
                        placeholder={'Insurance Category'}
                        id="Insurance_Category"
                        name="Insurance_Category"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Life Insurance Category'}
                        placeholder={'Life Insurance Category'}
                        id="Life_Insurance_Category"
                        name="Life_Insurance_Category"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Long Name'}
                        placeholder={'Long Name'}
                        id="Long_Name"
                        name="Long_Name"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Next Promotion Grade'}
                        placeholder={'Next Promotion Grade'}
                        id="next_promotion_grade"
                        name="next_promotion_grade"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Assigning Critaria For Next Promotion'}
                        placeholder={'Assigning Critaria For Next Promotion'}
                        id="Assigning_Critaria_For_Next_Promotion"
                        name="Assigning_Critaria_For_Next_Promotion"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Mobile Amount'}
                        placeholder={'Mobile Amount'}
                        id="mobile_amount"
                        name="mobile_amount"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Car Amount'}
                        placeholder={'Car Amount'}
                        id="Car_Amount"
                        name="Car_Amount"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="job_description_flag"
                            name="job_description_flag"
                            labelText={'job_description_flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.job_description_flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="job_description_flag"
                            name="job_description_flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.job_description_flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Overtime_flag"
                            name="Overtime_flag"
                            labelText={'Overtime Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Overtime_flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Overtime_flag"
                            name="Overtime_flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Grades?.dataSingle?.[0]?.res?.data?.[0]?.Overtime_flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                </div>
                <div className='GradeBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}

function mapStateToProps({ Red_Grades }) {
    return { Red_Grades };
}
export default connect(mapStateToProps, GRADES_ACTIONS)(GradeForm)
