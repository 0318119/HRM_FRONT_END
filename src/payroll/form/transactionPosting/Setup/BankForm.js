import React, { useEffect, useState } from 'react'
import Input from '../../../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../../../components/basic/button";
import * as BankActions from "../../../../store/actions/payroll/bank"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { BankSchema } from '../Setup/schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../../config.json'

function Bankform({ cancel, mode, page,isCode, Red_Bank, GetBank, GET_BANK_BY_CODE }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }



    const submitForm = async (data) => {
        try {
            const isValid = await BankSchema.validate(data);
            if (isValid) {
                ADD_Bank_DATA(data)
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
           
            bank_name: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_name,
            bank_abbr: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_abbr,
            Bank_Address1: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Address1,
            Bank_Address2: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Address2,
            Bank_Address3: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Address3,
            Current_Account: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Current_Account,
            IMDCode: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.IMDCode,
            Swift: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Swift,
            Sort_key: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        },
        mode: "onChange",
        resolver: yupResolver(BankSchema),
    });

    useEffect(() => {
        if (isCode !== null) {
            GET_BANK_BY_CODE(isCode)
        }
    },[])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    bank_name: "",
                    bank_abbr: "",
                    Sort_key: "",
                    Bank_Address1: "",
                    Bank_Address2: "",
                    Bank_Address3: "",
                    Current_Account: "",
                    IMDCode: "",
                    Swift: ""
                },
            )
        } else {
            reset(
                {
                  
                    bank_name: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_name,
                    bank_abbr: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_abbr,
                    Bank_Address1: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Address1,
                    Bank_Address2: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Address2,
                    Bank_Address3: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Address3,
                    Current_Account: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Current_Account,
                    IMDCode: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.IMDCode,
                    Swift: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Swift,
                    Sort_key: Red_Bank?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                },
            )
        }
    }, [Red_Bank?.dataSingle?.[0]?.res?.data?.[0]])



    async function ADD_Bank_DATA(body) {

        setLoading(true);
        await fetch(`${baseUrl.baseUrl}/addbank/AddBank`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Bank_code": mode == 'create' ? "0" : isCode,
                "bank_name": body.bank_name,
                "bank_abbr": body.bank_abbr,
                "Sort_key": body.Sort_key,
                "Bank_Address1": body.Bank_Address1,
                "Bank_Address2": body.Bank_Address2,
                "Bank_Address3": body.Bank_Address3,
                "Current_Account": body.Current_Account,
                "IMDCode": body.IMDCode,
                "Swift": body.Swift
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
                        GetBank({
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
                <h4 className="text-dark">Bank</h4>
                <hr />
                <div className="form-group formBoxEducation">
                   

                    <FormInput
                        label={'Bank name'}
                        placeholder={'Bank name'}
                        id="bank_name"
                        name="bank_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Bank Abbreviation'}
                        placeholder={'Bank Abbreviation'}
                        id="bank_abbr"
                        name="bank_abbr"
                        type="text"
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

                    <FormInput
                        label={'Bank Address 1'}
                        placeholder={'Bank Address 1'}
                        id="Bank_Address1"
                        name="Bank_Address1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Bank Address 2'}
                        placeholder={'Bank Address 2'}
                        id="Bank_Address2"
                        name="Bank_Address2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Bank Address 3'}
                        placeholder={'Bank Address 3'}
                        id="Bank_Address3"
                        name="Bank_Address3"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Current Account'}
                        placeholder={'Current Account'}
                        id="Current_Account"
                        name="Current_Account"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'IMD Code'}
                        placeholder={'IMD Code'}
                        id="IMDCode"
                        name="IMDCode"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Swift'}
                        placeholder={'Swift'}
                        id="Swift"
                        name="Swift"
                        type="text"
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


function mapStateToProps({ Red_Bank }) {
    return { Red_Bank };
}
export default connect(mapStateToProps, BankActions)(Bankform)
