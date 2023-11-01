import React, { useEffect, useState } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as EDUCATION_ACTIONS from "../../store/actions/HrOperations/Education/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { EducationScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function EducationForm({ cancel, mode, isCode, page,Red_Education, GetEducationData, Get_Education_By_ID }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await EducationScheme.validate(data);
            if (isValid) {
                POST_Education_FORM(data)
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
            Edu_code: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_code ?
                Red_Education?.dataSingle?.[0]?.res?.data?.Edu_code : 0,
            Edu_name: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_name,
            Edu_abbr: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_abbr,
            Edu_level_code: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_level_code,
            Sort_key: Red_Education?.dataSingle?.[0]?.res?.data?.Sort_key,
        },
        mode: "onChange",
        resolver: yupResolver(EducationScheme),
    });

    useEffect(() => {
        if (isCode !== null) {
            Get_Education_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Edu_code: 0,
                    Edu_name: "",
                    Edu_abbr: "",
                    Edu_level_code: "",
                    Sort_key: ""
                },
            )
        } else {
            reset(
                {
                    Edu_code: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_code ?
                    Red_Education?.dataSingle?.[0]?.res?.data?.Edu_code : 0,
                    Edu_name: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_name,
                    Edu_abbr: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_abbr,
                    Edu_level_code: Red_Education?.dataSingle?.[0]?.res?.data?.Edu_level_code,
                    Sort_key: Red_Education?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                },
            )
        }
    }, [Red_Education?.dataSingle?.[0]?.res?.data])


    // EDUCATION FORM DATA API CALL =========================== 
    async function POST_Education_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/eduation_code/AddEducation`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Edu_abbr": body?.Edu_abbr,
                "Edu_code": body?.Edu_code, 
                "Edu_name": body?.Edu_name, 
                "Sort_key": body?.Sort_key,
                "Edu_level_code" : body?.Edu_level_code
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            console.log("response.success",response)
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
                setTimeout(() => {
                    cancel('read')
                    GetEducationData({
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
                <h4 className="text-dark">Education List</h4>
                <hr />
                <div className="form-group formBoxEducation">
                    <FormInput
                        label={'Education Code'}
                        placeholder={'Education Code'}
                        id="Edu_code"
                        name="Edu_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Education Name'}
                        placeholder={'Education Name'}
                        id="Edu_name"
                        name="Edu_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Education Abbrivation'}
                        placeholder={'Education Abbrivation'}
                        id="Edu_abbr"
                        name="Edu_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'Education Level Code'}
                        placeholder={'Education Level Code'}
                        id="Edu_level_code"
                        name="Edu_level_code"
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
                <div className='EducationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}


function mapStateToProps({ Red_Education }) {
    return { Red_Education };
}
export default connect(mapStateToProps, EDUCATION_ACTIONS)(EducationForm)
