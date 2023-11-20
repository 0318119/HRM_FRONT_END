import React, { useEffect, useState } from 'react'
import Input from '../../../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../../../components/basic/button";
import * as TAX_STRUCTURE from "../../../../store/actions/payroll/taxStructure"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { TaxStructureSchema } from '../../../../payroll/pages/Setup/schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../../../src/config.json'

function TaxStructureForm({ cancel, mode, isCode, page, Red_TaxStructure, getTaxStructure ,AddTax_Structure}) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await TaxStructureSchema.validate(data);
            if (isValid) {
                // POST_Education_FORM(data)
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
            Structure_Code: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Structure_Code ?
                Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Structure_Code : 0,
            Tax_Percentage: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Tax_Percentage,
            Taxable_Income_From: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Taxable_Income_From,
            Taxable_Income_To: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Taxable_Income_To,
            Fixed_Amount: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Fixed_Amount,
        },
        mode: "onChange",
        resolver: yupResolver(TaxStructureSchema),
    });

    useEffect(() => {
        if (isCode !== null) {
            getTaxStructure(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Structure_Code: "",
                    Taxable_Income_From: "",
                    Taxable_Income_To: "",
                    Fixed_Amount: "",
                    Tax_Percentage: ""
                },
            )
        } else {
            reset(
                {
                    Structure_Code: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Structure_Code ?
                        Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Structure_Code : 0,
                    Tax_Percentage: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Tax_Percentage,
                    Taxable_Income_From: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Taxable_Income_From,
                    Taxable_Income_To: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Taxable_Income_To,
                    Fixed_Amount: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.Fixed_Amount,
                },
            )
        }
    }, [Red_TaxStructure?.dataSingle?.[0]?.res?.data])




    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Tax Structure</h4>
                <hr />
                <div className="form-group formBoxEducation">
                    <FormInput
                        label={'Structure Code'}
                        placeholder={'Structure Code'}
                        id="Structure_Code"
                        name="Structure_Code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Tax Percentage'}
                        placeholder={'Tax Percentage'}
                        id="Tax_Percentage"
                        name="Tax_Percentage"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Taxable Income From'}
                        placeholder={'Taxable Income From'}
                        id="Taxable_Income_From"
                        name="Taxable_Income_From"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Taxable Income To'}
                        placeholder={'Taxable Income To'}
                        id="Taxable_Income_To"
                        name="Taxable_Income_To"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Fixed Amount'}
                        placeholder={'Fixed Amount'}
                        id="Fixed_Amount"
                        name="Fixed_Amount"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />



                </div>
                <div className='EducationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}


function mapStateToProps({ Red_TaxStructure }) {
    return { Red_TaxStructure };
}
export default connect(mapStateToProps, TAX_STRUCTURE)(TaxStructureForm)
