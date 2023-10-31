<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as EDUCATION_ACTIONS from "../../store/actions/HrOperations/Education/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { EducationScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'
=======
import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a

function EducationForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


<<<<<<< HEAD
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
                    Sort_key: Red_Education?.dataSingle?.[0]?.res?.data?.Sort_key,
                },
            )
        }
    }, [Red_Education?.dataSingle?.[0]?.res?.data])

    // EDUCATION  FORM DATA API CALL =========================== 
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
                "Edu_level_code": body?.Edu_level_code
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            console.log("response.success", response)
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
                        pageNo: 1,
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

=======
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a
    return (
        <>
            <div>
                <h4 className="text-dark">Education List</h4>
                <hr />
                <div className="form-group formBoxEducation">
                    <Input placeholder={'Education Name'} label={'Education Name'} type="text" />
                    <Input placeholder={'Education Abbrivation'} label={'Education Abbrivation'} type="text" />
                    <Input placeholder={'Education Level Code'} label={'Education Level Code'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxEducation">
                    <Input placeholder={'Division Head'} label={'Division Head'} type="number" />
                    <Input placeholder={'Division Category Code'} label={'Division Category Code'} type="number" />
                </div> */}
                <div className='EducationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default EducationForm
