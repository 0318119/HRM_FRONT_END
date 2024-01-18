import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton,Button } from "../../components/basic/button";
import * as ConfirmationActions from "../../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox, FormSelect } from '../../components/basic/input/formInput';
import { message } from 'antd';
import * as yup from "yup";
import { Popconfirm, Space } from "antd";

const config = require('../../config.json')

function ConfirmationForm({
    cancel,
    isCode,
    page,
    mode,
    status,
    Red_Confirmation,
    Get_confirmation_By_ID,
    SAVE_CONFIRMATION,
    PROCESS_CONFIRMATION,
    DELETE_CONFIRMATION
}) {
    const empinfo = Red_Confirmation?.dataSingle?.[0]?.res
    const currentDate = new Date().toISOString().split('T')[0]
    const [isLoading, setLoading] = useState(false);
    const [isProcessbtn, setProcessbtn] = useState(false)
    const [isDelete, setDelete] = useState(false)

    const EditBack = () => {
        cancel('read')
    }
    const ConfirmationSchema = yup.object().shape({
        ConfirmationDate: yup.string().required("Confirmation Date is required"),
    });
    const submitForm = async (data) => {
        try {
            const isValid = await ConfirmationSchema.validate(data);
            if (isValid) {
                if (status == "Process") {
                    processConfirm(data)
                }
                else if (isProcessbtn == true) {
                    processConfirm(data)
                }
                else {
                    saveConfirm(data)
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const saveConfirm = async (data) => {
        setLoading(true)
        const payload = JSON.stringify({
            "Emp_code": isCode,
            "TransactionDate": data?.Transaction_Date,
            "ConfirmationDate": data?.Emp_Confirm_date,
            "Confirmation_DueDate": data?.ConfirmationDate
        })
        const isCheck = await SAVE_CONFIRMATION(payload)
        if (isCheck?.success) {
            setLoading(false)
            setProcessbtn(true)
            message.success("save confirmation...")
        } else {
            setLoading(false)
            message.error(isCheck?.message || isCheck?.messsage)
        }
    }
    const processConfirm = async (data) => {
        setLoading(true)
        const payload = JSON.stringify({
            "Emp_code": isCode,
            "TransactionDate": data?.Transaction_Date,
            "ConfirmationDate": data?.Emp_Confirm_date,
            "Confirmation_DueDate": data?.ConfirmationDate
        })
        const isCheck = await PROCESS_CONFIRMATION(payload)
        if (isCheck?.success) {
            setLoading(false)
            setTimeout(() => {
                cancel("read")
                if(status == "Process"){
                    window.location.href = "/confirmation"
                }
            }, [2000])
            message.success("process confirmation...")
        } else {
            setLoading(false)
            message.error(isCheck?.message || isCheck?.messsage)
        }
    }
    const DeleteConfrim = async (data) => {
        setDelete(true)
        const isCheck = await DELETE_CONFIRMATION(data)
        if (isCheck?.success) {
            setDelete(false)
            setTimeout(() => {
                cancel("read")
            }, [2000])
            message.success("confirmation deleted...")
        } else {
            setDelete(false)
            message.error(isCheck?.message || isCheck?.messsage)
        }
    }

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
        if (isCode !== null) {
            Get_confirmation_By_ID(isCode)
        }
    }, [isCode])

    useEffect(() => {
        reset(
            {
                Emp_name: empinfo?.data?.[0]?.Emp_name,
                Desig_name: empinfo?.data?.[0]?.Desig_name,
                Dept_name: empinfo?.data?.[0]?.Dept_name,
                PF_Nomination_Flag: empinfo?.data?.[0]?.PF_Nomination_Flag,
                Tentative_Joining_date: empinfo?.data?.[0]?.Tentative_Joining_date == "undefined" || empinfo?.data?.[0]?.Tentative_Joining_date == null ? currentDate : empinfo?.data?.[0]?.Tentative_Joining_date,
                Transaction_Date: empinfo?.data?.[0]?.Transaction_Date == "undefined" || empinfo?.data?.[0]?.Transaction_Date == null ? currentDate : empinfo?.data?.[0]?.Transaction_Date,
                Emp_Confirm_date: empinfo?.data?.[0]?.Confirmation_Date == "undefined" || empinfo?.data?.[0]?.Confirmation_Date == null ? currentDate : empinfo?.data?.[0]?.Confirmation_Date,
                ConfirmationDate: empinfo?.data?.[0]?.Confirmation_Due_Date == "undefined" || empinfo?.data?.[0]?.Confirmation_Due_Date == null ? currentDate : empinfo?.data?.[0]?.Confirmation_Due_Date,
            },
        )
    }, [Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]])

    useEffect(() => {
        if (empinfo?.message == "failed" || empinfo?.messsage == "failed") {
            message.error(empinfo?.message || empinfo?.messsage)
        }
    }, [empinfo])
    console.log("first",empinfo)


    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Confirmation</h4>
                <hr />
                <h5 className="text-dark mt-4">Employee Information</h5>
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
                        id="Emp_name"
                        name="Emp_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
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
                        style={{ background: "#f5f4f4" }}
                        disabled
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
                        style={{ background: "#f5f4f4" }}
                        disabled
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
                <h5 className="text-dark mt-5">Confirmation Information</h5>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Joining Date'}
                        placeholder={'Joining Date'}
                        id="Tentative_Joining_date"
                        name="Tentative_Joining_date"
                        type="date"
                        style={{ background: "#f5f4f4" }}
                        disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
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
                        style={{ background: "#f5f4f4" }}
                        disabled
                    />
                    <FormInput
                        label={'Confirmation Date'}
                        placeholder={'Confirmation Date'}
                        id="Emp_Confirm_date"
                        name="Emp_Confirm_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        style={{ background: "#f5f4f4" }}
                        disabled
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
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    {status == "Process" || isProcessbtn == true ? "" : <PrimaryButton type={'submit'} loading={isLoading} title="Save" />}
                    {
                        status == "Process" || isProcessbtn == true ?
                            <>
                                <PrimaryButton loading={isLoading} title="Process" type={'submit'} />
                                <Space size="middle">
                                    <Popconfirm
                                        title="Delete the Confirmation"
                                        description="Are you sure you want to delete this Confirmation?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => {
                                            DeleteConfrim(isCode)
                                        }}
                                    >
                                        <PrimaryButton loading={isDelete} title="Delete" type={'button'} onClick={(e) => e.preventDefault(e)}/>
                                    </Popconfirm>
                                </Space>
                            </>: ""
                    }
                </div>
            </form>
        </>
    )
}

function mapStateToProps({ Red_Confirmation }) {
    return { Red_Confirmation };
}
export default connect(mapStateToProps, ConfirmationActions)(ConfirmationForm)