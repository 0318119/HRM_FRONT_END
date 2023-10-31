import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as EDUCATION_LEVEL_ACTIONS from "../../store/actions/HrOperations/Education_level/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { EduLevelScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCheckBox, FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function EducationLevelForm({ cancel, mode, isCode, page, Red_Education_level, GetEducationLevelData,Get_Education_Level_By_ID }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);

    const EditBack = () => {
        cancel('read')
    }

    const submitForm = async (data) => {
        try {
            const isValid = await EduLevelScheme.validate(data);
            if (isValid) {
                POST_EduLevel_FORM(data)
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
            Edu_level_code: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_code ?
            Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_code : 0,
            Edu_level_name: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_name,
            Edu_level_abbr: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_abbr,
            Sort_key: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        },
        mode: "onChange",
        resolver: yupResolver(EduLevelScheme),
    });

    useEffect(() => {
        if (isCode !== null) {
            Get_Education_Level_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Edu_level_code: 0,
                    Edu_level_name: "",
                    Edu_level_abbr: "",
                    Sort_key: "",
                },
            )
        } else {
            reset(
                {
                    Edu_level_code: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_code ?
                    Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_code : 0,
                    Edu_level_name: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_name,
                    Edu_level_abbr: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Edu_level_abbr,
                    Sort_key: Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                },
            )
        }
    }, [Red_Education_level?.dataSingle?.[0]?.res?.data?.[0]])

    // EDUCATION LEVEL FORM DATA API CALL =========================== 
    async function POST_EduLevel_FORM(body) {
        setLoading(true)
        await fetch(
        `${baseUrl.baseUrl}/educationlevel/AddEducationLevel`, {
        method: "POST",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
        body: JSON.stringify({
            "Edu_level_code": body.Edu_level_code,
            "Edu_level_abbr": body.Edu_level_abbr,
            "Edu_level_name": body.Edu_level_name,
            "Sort_key": body.Sort_key,
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
                GetEducationLevelData({ 
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
                <h4 className="text-dark">Education List</h4>
                <hr />
                <div className="form-group formBoxEducation">
                    <FormInput
                        label={'Education Level Code'}
                        placeholder={'Education Level Code'}
                        id="Edu_level_code"
                        name="Edu_level_code"
                        type="number"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Education Name'}
                        placeholder={'Education Name'}
                        id="Edu_level_name"
                        name="Edu_level_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Education Abbrivation'}
                        placeholder={'Education Abbrivation'}
                        id="Edu_level_abbr"
                        name="Edu_level_abbr"
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
                <div className='EducationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}


function mapStateToProps({ Red_Education_level }) {
    return { Red_Education_level };
}
export default connect(mapStateToProps, EDUCATION_LEVEL_ACTIONS)(EducationLevelForm)

