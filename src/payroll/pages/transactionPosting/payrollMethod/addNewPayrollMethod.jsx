import React, { useEffect, useState } from "react";
import * as AddPayrollMethod_Action from "../../../../store/actions/payroll/addPayrollMethod/index";
import { connect } from "react-redux";
import { FormInput, FormSelect } from "../../../../components/basic/input/formInput";
import { SimpleButton, CancelButton } from "../../../../components/basic/button";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddNewPayrollMethod = ({SaveAllowance, addNewFunction }) => {
    const [loading, setLoading] = useState(false)

    const AddLoans = yup.object().shape({
        name: yup.string().required("Name is required"),
        abbreviation: yup.string().required("Abbreviation is required"),
        basicFlag: yup.string().required("Basic is required"),
        appointmentFlag: yup.string().required("Appointment is required"),
        increamentFlag: yup.string().required("Increament is required"),
        EOBIFlag: yup.string().required("EOBI is required"),
        SESSIFLag: yup.string().required("SESSI is required"),
        overTimeFlag: yup.string().required("Over time Flag is required"),
        colaFlag: yup.string().required("Cola flag is required"),
        specialFlag: yup.string().required("Special flag is required"),
        unionColaFlag: yup.string().required("Special flag is required"),
        LFAFlag: yup.string().required("LFA is required"),
        LFADefaultFlag: yup.string().required("LFA default is required"),
        taxTreatmentFlag: yup.string().required("Tax treatment flag is required"),
        textExemptPercentage: yup.string().required("Tax exempt percentage is required"),
        SectionColumnNumber: yup.string().required("Section column number is required"),
        FixSheetColumn: yup.string().required("Fix sheet column is required"),
        oneSheetColumn: yup.string().required("One sheet column is required"),
        jvCode: yup.string().required("Jv code is required"),
        jvSummaryCode: yup.string().required("Jv summary code is required"),
        incomeTaxColumn: yup.string().required("Income Tax column is required"),
        ProjectionFlag: yup.string().required("Projection flag is required"),
        cashSalaryFlag: yup.string().required("Cash salary flag is required"),
        sortKey: yup.string().required("Sort key is required"),
        incomeTaxIncomeColumn: yup.string().required("Income tax income column is required"),
        incomeTaxExamptionColumn: yup.string().required("Income tax examption column is required"),
        perquisiteFlag: yup.string().required("Perquisite flag is required"),
        description: yup.string().required("Description is required"),
        bonusFlag: yup.string().required("Bonus Flag is required"),
        showOnLetterFlag: yup.string().required("Show On Letter Flag is required"),
        grossSalaryflag: yup.string().required("Gross Salary Flag is required"),
        fixedTransactionIncrementFlag: yup.string().required("Fixed Transaction Increment Flag is required"),
        advanceFlag: yup.string().required("Advance Flag is required"),
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            name: "",
            abbreviation: "",
            basicFlag: "Y",
            appointmentFlag: "Y",
            increamentFlag: "Y",
            EOBIFlag: "Y",
            SESSIFLag: "Y",
            overTimeFlag: "Y",
            colaFlag: "Y",
            specialFlag: "Y",
            unionColaFlag: "Y",
            LFAFlag: "Y",
            LFADefaultFlag: "Y",
            taxTreatmentFlag: "Y",
            textExemptPercentage: "",
            SectionColumnNumber: "",
            FixSheetColumn: "",
            oneSheetColumn: "",
            jvCode: "",
            jvSummaryCode: "",
            incomeTaxColumn: "Y",
            ProjectionFlag: "Y",
            cashSalaryFlag: "Y",
            sortKey: "",
            incomeTaxIncomeColumn: "",
            incomeTaxExamptionColumn: "",
            perquisiteFlag: "Y",
            description: "",
            bonusFlag: "Y",
            showOnLetterFlag: "Y",
            grossSalaryflag: "Y",
            fixedTransactionIncrementFlag: "Y",
            advanceFlag: "Y",
        },
        mode: "onChange",
        resolver: yupResolver(AddLoans),
    });

    const submitForm = async (data) => {
        setLoading(true)
        try {
            const isValid = await AddLoans.validate(data);
            if (isValid) {
                const isSaved = await SaveAllowance(data)
                if (isSaved.success == "success") {
                    setLoading(false)
                    message.success('Loan Successfully created')
                    addNewFunction(true)
                }
                else{
                    setLoading(false)
                    message.error('Something went wrong')
                    addNewFunction(true)
                }
            }
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="d-flex">
                <FormInput
                    errors={errors}
                    control={control}
                    name={'name'} placeholder={'Name'} label={'Loan Name'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'abbreviation'} placeholder={'Abbreviation'} label={'Abbreviation'} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Basic Flag"}
                    name={'basicFlag'} label={'Basic Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Appointment Flag"}
                    name={'appointmentFlag'} label={'Appointment Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
            </div>


            <div className="d-flex">
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Increament Flag"}
                    name={'increamentFlag'} label={'Increament Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"EOBI Flag"}
                    name={'EOBIFlag'} label={'EOBI Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"SESSI Flag"}
                    name={'SESSIFLag'} label={'SESSI Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Over Time Flag"}
                    name={'overTimeFlag'} label={'Over Time Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
            </div>


            <div className="d-flex">
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Cola Flag"}
                    name={'colaFlag'} label={'Cola Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Special Flag"}
                    name={'specialFlag'} label={'Special Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Union Cola Flag"}
                    name={'unionColaFlag'} label={'Union Cola Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"LFA Flag"}
                    name={'LFAFlag'} label={'LFA Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
            </div>


            <div className="d-flex">
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"LFA Default Flag"}
                    name={'LFADefaultFlag'} label={'LFA Default Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Tax Treatment Flag"}
                    name={'taxTreatmentFlag'} label={'Tax Treatment Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />

                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'textExemptPercentage'} placeholder={'Text Exempt Percentage'} label={'Text Exempt Percentage'} />
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'SectionColumnNumber'} placeholder={'Section 149 Column Number'} label={'Section 149 Column Number'} />
            </div>



            <div className="d-flex">
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'FixSheetColumn'} placeholder={'Fix Sheet Column'} label={'Fix Sheet Column'} />
                <FormInput
                    errors={errors}
                    type={'number'}
                    control={control}
                    name={'oneSheetColumn'} placeholder={'One Sheet Column'} label={'One Sheet Column'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'jvCode'} placeholder={'Jv Code'} label={'Jv Code'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'jvSummaryCode'} placeholder={'Jv Summary Code'} label={'Jv Summary Code'} />
            </div>



            <div className="d-flex">
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'incomeTaxColumn'} placeholder={'Income Tax Column'} label={'Income Tax Column'} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Projection Flag"}
                    name={'ProjectionFlag'} label={'Projection Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Cash Salary Flag"}
                    name={'cashSalaryFlag'} label={'Cash Salary Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'sortKey'} placeholder={'Sort Key'} label={'Sort Key'} />
            </div>



            <div className="d-flex">
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'incomeTaxIncomeColumn'} placeholder={'Income Tax Income Column'} label={'Income Tax Income Column'} />
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'incomeTaxExamptionColumn'} placeholder={'Income Tax Examption Column'} label={'Income Tax Examption Column'} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Perquisite Flag"}
                    name={'perquisiteFlag'} label={'Perquisite Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'description'} placeholder={'Description'} label={'Description'} />
            </div>


            <div className="d-flex">

                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Bonus Flag"}
                    name={'bonusFlag'} label={'Bonus Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Show On Letter Flag"}
                    name={'showOnLetterFlag'} label={'Show On Letter Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Gross Salary Flag"}
                    name={'grossSalaryflag'} label={'Gross Salary Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Fixed Transaction Increment Flag"}
                    name={'fixedTransactionIncrementFlag'} label={'Fixed Transaction Increment Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
            </div>


            <div className="d-flex">
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"Advance Flag"}
                    name={'advanceFlag'} label={'Advance Flag'} options={[
                        {
                            value: "Y",
                            label: "Yes",
                        },
                        {
                            value: "N",
                            label: "No",
                        },
                    ]} />
            </div>



            <div className="d-flex align-items-center justify-content-end">
                <CancelButton onClick={() => addNewFunction(true)} title={"Cancel"} />
                <SimpleButton loading={loading} type={'submit'} title={"Submit"} />
            </div>
        </form>
    )

}


function mapStateToProps({ addPayrollMethod }) {
    return { addPayrollMethod };
}
export default connect(mapStateToProps, AddPayrollMethod_Action)(AddNewPayrollMethod);