import React, { useEffect, useState } from 'react'
import Input from '../../../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../../../components/basic/button";
import * as  OutstandingRecoveriesActions from "../../../../store/actions/payroll/outstandingRecoveries/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { OutstandingRecoveries } from '../Setup/schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, FormInput } from '../../../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../../config.json'

function OutstandingRecoveriesForm({ cancel, mode, page, isCode, Red_outstandingRecoveries, GetOutstandingRecoveries, GET_Outstanding_Recoveries_BY_CODE }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }



    const submitForm = async (data) => {
        try {
            const isValid = await OutstandingRecoveries.validate(data);
            if (isValid) {
                ADD_Outstanding_Recoveries_DATA(data)
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

            Outstanding_Recovery_name: Red_outstandingRecoveries?.dataSingle?.[0]?.res?.data?.[0]?.Outstanding_Recovery_name,
            Final_Settlement_Report_Mandatory_Flag: Red_outstandingRecoveries?.dataSingle?.[0]?.res?.data?.[0]?.Final_Settlement_Report_Mandatory_Flag,
        },
        mode: "onChange",
        resolver: yupResolver(OutstandingRecoveries),
    });

    useEffect(() => {
        if (isCode !== null) {
            GET_Outstanding_Recoveries_BY_CODE(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Outstanding_Recovery_name: "",
                    Final_Settlement_Report_Mandatory_Flag: "",
                },
            )
        } else {
            reset(
                {
                    Outstanding_Recovery_name: Red_outstandingRecoveries?.dataSingle?.[0]?.res?.data?.[0]?.Outstanding_Recovery_name,
                    Final_Settlement_Report_Mandatory_Flag: Red_outstandingRecoveries?.dataSingle?.[0]?.res?.data?.[0]?.Final_Settlement_Report_Mandatory_Flag,
                },
            )
        }
    }, [Red_outstandingRecoveries?.dataSingle?.[0]?.res?.data?.[0]])



    async function ADD_Outstanding_Recoveries_DATA(body) {

        setLoading(true);
        await fetch(`${baseUrl.baseUrl}/outstandingRecoveries/AddOutstandingrecoveries`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Outstanding_Recovery_code": mode == 'create' ? "0" : isCode,
                "Outstanding_Recovery_name": body.Outstanding_Recovery_name,
                "Final_Settlement_Report_Mandatory_Flag": body.Final_Settlement_Report_Mandatory_Flag
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
                        GetOutstandingRecoveries({
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
                <h4 className="text-dark">Outstanding Recoveries Form</h4>
                <hr />
                <div className="form-group formBoxEducation">

                    <FormInput
                        label={'Outstanding Recovery Name'}
                        placeholder={'Outstanding Recovery Name'}
                        id="Outstanding_Recovery_name"
                        name="Outstanding_Recovery_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormSelect
                        label={'Final Settlement Report Mandatory Flag'}
                        placeholder='Final Settlement Report Mandatory Flag'
                        id="Final_Settlement_Report_Mandatory_Flag"
                        name="Final_Settlement_Report_Mandatory_Flag"
                        options={[
                            {
                                value: 'M',
                                label: 'Yes',
                            },
                            {
                                value: "N",
                                label: 'NO',
                            },
                        ]}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        type="text"
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


function mapStateToProps({ Red_outstandingRecoveries }) {
    return { Red_outstandingRecoveries };
}
export default connect(mapStateToProps, OutstandingRecoveriesActions)(OutstandingRecoveriesForm)
