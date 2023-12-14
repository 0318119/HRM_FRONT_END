import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as ConfirmationActions from "../../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox, FormSelect } from '../../components/basic/input/formInput';
import { message } from 'antd';
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import baseUrl from '../../config.json'

const config = require('../../config.json')

function ConfirmationForm({
    cancel,
    isCode,
    page,
    Get_Conformation_Data,
    Get_confirmation_By_ID,
    Red_Confirmation,
    mode
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const search = useLocation().search
    var ConfirmId = new URLSearchParams(search).get('ConfirmId')
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [currentDate, setCurrentDate] = useState(formattedDate);
    var get_access_token = localStorage.getItem("access_token");
    const [isLoading, setLoading] = useState(false);
    const [isBtn, setBtn] = useState(false);
    const [isBtn2, setBtn2] = useState(false);
    const pageSize = 10;

    const EditBack = () => {
        cancel('read')
    }

    const ConfirmationSchema = yup.object().shape({
        ConfirmationDate: yup.date().required("Confirmation Date is required"),
    });

    const submitForm = async (data) => {
        try {
            const isValid = await ConfirmationSchema.validate(data);
            if (isValid) {
                if (isBtn != true){
                    POST_CONFORMATION_SAVE(data)
                }else
                    POST_CONFORMATION_PROCESS(data)
                
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
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(ConfirmationSchema),
    });


    useEffect(() => {
        Get_confirmation_By_ID(isCode)
    }, [])



    useEffect(() => {
            reset(
                {
                    Emp_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Dept_name,
                    PF_Nomination_Flag: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.PF_Nomination_Flag,
                    Tentative_Joining_date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Tentative_Joining_date,
                    Emp_Confirm_date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Confirm_date,
                    Transaction_Date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Transaction_Date,
                },
            )
    }, [Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]])


    // Confirmation save =========================== 
    const ConfirmID = Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0].Emp_code
    const AllDAta = Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]
    console.log(AllDAta , "AllDAta")
    const ConfirmDate = Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0].Emp_Confirm_date
    async function POST_CONFORMATION_SAVE(body) {
        setLoading(true);
        await fetch(`${baseUrl.baseUrl}/tranConfirmation/TranConfirmations_save`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmID,
                "TransactionDate": currentDate,
                "ConfirmationDate": body?.ConfirmationDate,
                "Confirmation_DueDate": ConfirmDate
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
                    setBtn(true);
                    // setTimeout(() => {
                    //     cancel("read");
                    //     Get_Conformation_Data({
                    //         pageSize: 10,
                    //         pageNo: 1,
                    //         search: null,
                    //     });
                    // }, 3000);
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

    async function POST_CONFORMATION_PROCESS(body) {

        setLoading(true);
        await fetch(`${baseUrl.baseUrl}/tranConfirmation/TranConfirmations_Process`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmID,
                "TransactionDate": currentDate,
                "ConfirmationDate": body?.ConfirmationDate,
                "Confirmation_DueDate": ConfirmDate
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
                    setBtn(true)
                    setTimeout(() => {
                        cancel("read");
                        Get_Conformation_Data({
                            pageSize: 10,
                            pageNo: 1,
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
                <h4 className="text-dark">Confirmation</h4>
                <h5 className="text-dark mt-4">Employee Information</h5>
                <div className="form-group formBoxCountry">

                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
                        id="Emp_name"
                        name="Emp_name"
                        type="text"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Designation'}
                        placeholder={'Designation'}
                        id="Desig_name"
                        name="Desig_name"
                        type="text"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}

                    />
                    <FormInput
                        label={'Department'}
                        placeholder={'Department'}
                        id="Dept_name"
                        name="Dept_name"
                        type="text"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormSelect
                        label={'PF Nomination Flag'}
                        placeholder={'PF Nomination Flag'}
                        id="PF_Nomination_Flag"
                        name="PF_Nomination_Flag"
                        type='text'
                        showLabel={true}
                        errors={errors}
                        control={control}
                        options={[
                            {
                                value: 'Y',
                                label: 'Yes',
                            },
                            {
                                value: "N",
                                label: 'NO',
                            },
                        ]}
                    />
                </div>
                <h5 className="text-dark">Confirmation Information</h5>
                <div className="form-group formBoxCountry">

                    <FormInput
                        label={'Joining Date'}
                        placeholder={'Joining Date'}
                        id="Tentative_Joining_date"
                        name="Tentative_Joining_date"
                        type="date"
                        value={AllDAta?.Tentative_Joining_date ? AllDAta?.Tentative_Joining_date : currentDate}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        readOnly
                    />
                    <FormInput
                        label={'Transaction Date'}
                        placeholder={'Transaction Date'}
                        id="Transaction_Date"
                        name="Transaction_Date"
                        type="date"
                        value={currentDate}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        readOnly
                    />
                    <FormInput
                        label={'Confirmation Date'}
                        placeholder={'Confirmation Date'}
                        id="Emp_Confirm_date"
                        name="Emp_Confirm_date"
                        type="date"
                        value={AllDAta?.Emp_Confirm_date ? AllDAta?.Emp_Confirm_date : currentDate}
                        showLabel={true}
                        errors={errors}
                        control={control}
                        readOnly
                    />
                    <FormInput
                        label={'Confirmation Due'}
                        placeholder={'Confirmation Due'}
                        id="ConfirmationDate"
                        name="ConfirmationDate"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <div className='CountryBtnBox'>
                    {isBtn ?
                        <>
                            <CancelButton onClick={EditBack} title={'Cancel'} />
                            <PrimaryButton loading={isLoading} title="Process" type={'submit'} />
                        </>
                        :
                        <>
                            <CancelButton onClick={EditBack} title={'Cancel'} />
                            <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                        </>
                    }
                </div>
            </form>
            <div className='CountryBtnBox'>
              
            </div>
        </>
    )
}

function mapStateToProps({ Red_Confirmation }) {
    return { Red_Confirmation };
}
export default connect(mapStateToProps, ConfirmationActions)(ConfirmationForm)