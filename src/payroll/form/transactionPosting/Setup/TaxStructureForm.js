import React, { useEffect, useState } from 'react'
import Input from '../../../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../../../components/basic/button";
import * as TAX_STRUCTURE from "../../../../store/actions/payroll/taxStructure"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { TaxStructureSchema } from '../Setup/schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../../../src/config.json'

function TaxStructureForm({ cancel, mode, isCode, page, Red_TaxStructure, getTaxStructure, Get_Tax_Structure_By_Id }) {
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
                ADD_STRUCTURE_DATA(data)
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
            Tax_Percentage: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Tax_Percentage,
            Taxable_Income_From: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Taxable_Income_From,
            Taxable_Income_To: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Taxable_Income_To,
            Fixed_Amount: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Fixed_Amount,
        },
        mode: "onChange",
        resolver: yupResolver(TaxStructureSchema),
    });

    useEffect(() => {
        if (isCode !== null) {
            Get_Tax_Structure_By_Id(isCode)

        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Taxable_Income_From: "",
                    Taxable_Income_To: "",
                    Fixed_Amount: "",
                    Tax_Percentage: ""
                },
            )
        } else {
            reset(
                {
                    Tax_Percentage: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Tax_Percentage,
                    Taxable_Income_From: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Taxable_Income_From,
                    Taxable_Income_To: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Taxable_Income_To,
                    Fixed_Amount: Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]?.Fixed_Amount,
                },
            )
        }
    }, [Red_TaxStructure?.dataSingle?.[0]?.res?.data?.[0]])



    async function ADD_STRUCTURE_DATA(body) {

        setLoading(true);
        await fetch(`${baseUrl.baseUrl}/taxStructure/AddTaxStructure`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Structure_Code": mode == "create" ? 0 : isCode,
                "Taxable_Income_From": body.Taxable_Income_From,
                "Taxable_Income_To": body.Taxable_Income_To,
                "Fixed_Amount": body.Fixed_Amount,
                "Tax_Percentage": body.Tax_Percentage
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then(async (response) => {
                if (response.success) {
                    messageApi.open({
                        type: "success",
                        content: response?.message || response?.messsage,
                    });
                    setLoading(false);
                    setTimeout(() => {
                        cancel("read");
                        getTaxStructure({
                            pageSize: pageSize,
                            pageNo: page,
                            search: null,
                        });
                    }, 3000);
                } else {
                    setLoading(false);
                    messageApi.open({
                        type: "error",
                        content: response?.message || response?.messsage,
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                messageApi.open({
                    type: "error",
                    content: error?.message || error?.messsage,
                });
            });
    }




    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Tax Structure</h4>
                <hr />
                <div className="form-group formBoxEducation">

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
