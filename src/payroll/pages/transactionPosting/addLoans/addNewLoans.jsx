import React, { useEffect, useState } from "react";
import * as AddLoans_Action from "../../../../store/actions/payroll/addLoans/index";
import { connect } from "react-redux";
import { FormInput, FormSelect } from "../../../../components/basic/input/formInput";
import { SimpleButton, CancelButton } from "../../../../components/basic/button";
import {message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddNewLoans = ({ getDeductionList, SaveLoans,addNewFunction}) => {
    const [deductionCode, setDeductionCode] = useState()
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        DataLoader()
    }, [])


    const AddLoans = yup.object().shape({
        loanName: yup.string().required("Loan Name is required"),
        abbreviation: yup.string().required("Abbreviation is required"),
        deduction: yup.string().required("Allowance is required"),
        sortKey: yup.string().required("Sort Key is required"),
        flag: yup.string().required("Flag is required"),
    });


    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            loanName: "",
            abbreviation: "",
            deduction: "",
            sortKey: "",
            flag: "",
        },
        mode: "onChange",
        resolver: yupResolver(AddLoans),
    });
    
    const DataLoader = async () => {
        const deductionList = await getDeductionList()
        setDeductionCode(deductionList)
    }

    const submitForm = async (data) => {
        setLoading(true)
        try {
            const isValid = await AddLoans.validate(data);
            if (isValid) {
                const isSaved = await SaveLoans(data)
                if(isSaved.success == "success"){
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
                    name={'loanName'} placeholder={'Loan Name'} label={'Loan Name'} />
                <FormInput
                    errors={errors}
                    control={control}
                    name={'abbreviation'} placeholder={'Abbreviation'} label={'Abbreviation'} />
                <FormSelect
                    errors={errors}
                    control={control}
                    deduction={'deduction'}
                    placeholder={"Select Allowance"}
                    name={'deduction'} label={'Select Allowance'} options={deductionCode} />
            </div>
            <div className="d-flex">
                <FormInput
                    errors={errors}
                    control={control}
                    name={'sortKey'} placeholder={'Sort Key'} label={'Sort Key'} />
                <FormSelect
                    deduction={'deductionFlag'}
                    errors={errors}
                    control={control}
                    placeholder={"PF Flag"}
                    name={'flag'} label={'PF Flag'} options={[
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
                <CancelButton onClick={()=>addNewFunction(true)} title={"Cancel"} />
                <SimpleButton loading={loading} type={'submit'} title={"Submit"} />
            </div>
        </form>
    )

}


function mapStateToProps({ addLoans }) {
    return { addLoans };
}
export default connect(mapStateToProps, AddLoans_Action)(AddNewLoans);