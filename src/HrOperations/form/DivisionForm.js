import React, { useEffect, useState } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as DIVISION_ACTIONS from "../../store/actions/HrOperations/Divisions/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { DivisionScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function DivisionForm({ cancel, mode, isCode, Red_Division, page, Get_Division_By_ID, GetDivisionData }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);

    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await DivisionScheme.validate(data);
            if (isValid) {
                POST_DIVISION_FORM(data)
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
            Div_code: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_code ?
                Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_code : 0,
            Div_name: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_name,
            Div_abbr: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_abbr,
            Div_Head: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_Head,
            Sort_key: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            division_category_code: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.division_category_code,
        },
        mode: "onChange",
        resolver: yupResolver(DivisionScheme),
    });

    useEffect(() => {
        if (isCode !== null) {
            Get_Division_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Div_code: 0,
                    Div_name: "",
                    Div_abbr: "",
                    Div_Head: "",
                    Sort_key: "",
                    division_category_code: "",
                },
            )
        } else {
            reset(
                {
                    Div_code: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_code ?
                    Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_code : 0,
                    Div_name: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_name,
                    Div_abbr: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_abbr,
                    Div_Head: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Div_Head,
                    Sort_key: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    division_category_code: Red_Division?.dataSingle?.[0]?.res?.data?.[0]?.division_category_code,
                },
            )
        }
    }, [Red_Division?.dataSingle?.[0]?.res?.data?.[0]])

    // Division FORM DATA API CALL =========================== 
    async function POST_DIVISION_FORM(body) {
        setLoading(true)
        await fetch(
        `${baseUrl.baseUrl}/division/AddDivision`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: JSON.stringify({
            "Div_code": body.Div_code,
            "Div_name": body.Div_name,
            "Div_abbr": body.Div_abbr,
            "Div_Head": body.Div_Head,
            "Sort_key": body.Sort_key,
            "division_category_code": body.division_category_code
        }),
        }
        ).then((response) => {
        return response.json();
        }).then(async (response) => {
        if(response.success){
            messageApi.open({
                type: 'success',
                content: response?.message || response?.messsage,
            });
            setLoading(false)
            setTimeout(() => {
                cancel('read')
                GetDivisionData({ 
                    pageSize: pageSize,
                    pageNo: page,
                    search: null
                })
            }, 3000);
        }
        else{
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
                <h4 className="text-dark">Division List</h4>
                <hr />
                <div className="form-group formBoxDivisions">
                    <FormInput
                        label={'Div code'}
                        placeholder={'Div code'}
                        id="Div_code"
                        name="Div_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Division name'}
                        placeholder={'Division name'}
                        id="Div_name"
                        name="Div_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Division Abbreviation'}
                        placeholder={'Division Abbreviation'}
                        id="Div_abbr"
                        name="Div_abbr"
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
                </div>
                <hr />
                <div className="form-group formBoxDivisions">
                    <FormInput
                        label={'Division Head'}
                        placeholder={'Division Head'}
                        id="Div_Head"
                        name="Div_Head"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Division Category Code'}
                        placeholder={'Division Category Code'}
                        id="division_category_code"
                        name="division_category_code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <div className='DivisionsBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}

function mapStateToProps({ Red_Division }) {
    return { Red_Division };
}
export default connect(mapStateToProps, DIVISION_ACTIONS)(DivisionForm)
