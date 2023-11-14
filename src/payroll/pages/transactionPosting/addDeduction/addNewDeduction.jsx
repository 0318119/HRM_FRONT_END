import React, { useEffect, useState } from "react";
import * as AddDeduction_Action from "../../../../store/actions/payroll/addDeduction/index";
import { connect } from "react-redux";
import { FormInput, FormSelect } from "../../../../components/basic/input/formInput";
import { SimpleButton, CancelButton } from "../../../../components/basic/button";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddNewDeduciton = ({SaveDeduction, addNewFunction }) => {
    const [loading, setLoading] = useState(false)


    const AddDeduction = yup.object().shape({
        Deduction_name: yup.string().required("Deduction name is required"),
        Deduction_abbr: yup.string().required("Abbreviation is required"),
        Fix_Sheet_Col_no: yup.string().required("Fix sheet column number is required"),
        One_Sheet_Col_no: yup.string().required("One sheet column number is required"),
        JV_Code: yup.string().required("Jv code is required"),
        JV_Summary_Code: yup.string().required("Jv summary code  is required"),
        Sort_key: yup.string().required("sort key is required"),
    });


    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Deduction_name: "",
            Deduction_abbr: "",
            Fix_Sheet_Col_no: "",
            One_Sheet_Col_no: "",
            JV_Code: "",
            JV_Summary_Code: "",
            Sort_key: "",
        },
        mode: "onChange",
        resolver: yupResolver(AddDeduction),
    });

    const submitForm = async (data) => {
        setLoading(true)
        try {
            const isValid = await AddDeduction.validate(data);
            if (isValid) {
                const isSaved = await SaveDeduction(data)
                if (isSaved.success == "success") {
                    setLoading(false)
                    message.success('Loan Successfully created')
                    addNewFunction(true)
                }
                else {
                    setLoading(false)
                    message.success('Something went wrong')
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
                    name={'Deduction_name'} placeholder={'Deduction Name'} label={'Deduction Name'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'Deduction_abbr'} placeholder={'Abbreviation'} label={'Abbreviation'} />
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'Fix_Sheet_Col_no'} placeholder={'Fix sheet column number'} label={'Fix sheet column number'} />
                <FormInput
                    errors={errors}
                    control={control}
                    type={'number'}
                    name={'One_Sheet_Col_no'} placeholder={'One sheet column number'} label={'One sheet column number'} />
            </div>
            <div className="d-flex">
                <FormInput
                    errors={errors}
                    control={control}
                    name={'JV_Code'} placeholder={'Jv code'} label={'Jv code'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'JV_Summary_Code'} placeholder={'Jv summary code'} label={'Jv summary code'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'Sort_key'} placeholder={'Sort Key'} label={'Sort Key'} />
            </div>
            <div className="d-flex align-items-center justify-content-end">
                <CancelButton onClick={() => addNewFunction(true)} title={"Cancel"} />
                <SimpleButton loading={loading} type={'submit'} title={"Submit"} />
            </div>
        </form>
    )

}


function mapStateToProps({ addDeduction }) {
    return { addDeduction };
}
export default connect(mapStateToProps, AddDeduction_Action)(AddNewDeduciton);