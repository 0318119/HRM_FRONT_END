import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton, Button } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Confirmation_Extension/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from "antd";
import { Popconfirm, Space } from "antd";
import * as yup from "yup";

function Confirmation_ExtensionForm({
    cancel,
    mode,
    isCode,
    status,
    Red_Confirmation_Extension,
    getAtttendanceHisss,
    SaveConfirmationExInfo,
    SaveConfirmationExInFoProcess,
    Delete_Confirmation
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [mode2, setMode2] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const currentDate = new Date().toISOString().split('T')[0]
    const empInfo = Red_Confirmation_Extension?.GetInfo?.[0]?.res
    const [isProcessbtn, setProcessbtn] = useState(false)
    const [isDeleteLeave, setDeleteLeave] = useState(false)

    const EditBack = () => {
        cancel("read");
    };
    const ConfirmationExtension = yup.object().shape({
        Transaction_Date: yup.string().required("Transaction Date is Required"),
        Confirmation_Date: yup.string().required("Confirmation Date is Required"),
        Remarks: yup.string().required("Remarks is Required"),
    });
    const submitForm = async (data) => {
        try {
            const isValid = await ConfirmationExtension.validate(data);
            if (isValid) {
                if(status == "Process"){
                    processConfirm(data)
                }else if(isProcessbtn == true){
                    processConfirm(data)
                }
                else{
                    saveConfirm(data)
                }
            }
        } catch (error) {
            console.error(error, "error message");
        }
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(ConfirmationExtension),
    });


    const saveConfirm = async (data) => {
        setLoading(true)
        const Savepayload = JSON.stringify({
            "Emp_code": isCode,
            "Transaction_Date": data?.Transaction_Date,
            "Confirmation_Date": data?.Confirmation_Date,
            "Remarks": data?.Remarks
        })
        const response = await SaveConfirmationExInfo(Savepayload);
        if (response.success) {
            messageApi.success(response?.message || response?.messssage);
            setProcessbtn(true)
            setLoading(false)
        } else {
            messageApi.error(response?.message || response?.messssage);
            setLoading(false)
        }
    }
    const processConfirm = async (data) => {
        setLoading(true)
        const Processpayload = JSON.stringify({
            "Emp_code": isCode,
            "Transaction_Date": data?.Transaction_Date,
            "Confirmation_Date": data?.Confirmation_Date,
            "Remarks": data?.Remarks,
            "PF": "N"
        })
        const isCheck = await SaveConfirmationExInFoProcess(Processpayload);
        if (isCheck?.success) {
            message.success(isCheck?.message || isCheck?.messsage)
            setLoading(false)
            setTimeout(() => {
                cancel("read")
            }, 1000);
        } else {
            message.success(isCheck?.message || isCheck?.messsage)
            setLoading(false)
        }
    }
    const DeleteConfrim = async (data) => {
        setDeleteLeave(true)
        message.loading("Please wait...")
        const isCheck = await Delete_Confirmation(data)
        if (isCheck?.success) {
            message.success(isCheck?.message || isCheck?.messsage)
            setDeleteLeave(false)
            setTimeout(() => {
                cancel("read")
            }, 1000);
        } else {
            message.success(isCheck?.message || isCheck?.messsage)
            message.destroy()
            setDeleteLeave(false)
        }
    }
    useEffect(() => {
        if (isCode !== null) {
            getAtttendanceHisss(isCode)
        }
    }, [isCode])
    useEffect(() => {
        if (mode == "Edit") {
            reset({
                Emp_name: empInfo?.data?.[0]?.[0]?.Emp_name,
                Desig_name: empInfo?.data?.[0]?.[0]?.Desig_name,
                Section_name: empInfo?.data?.[0]?.[0]?.Section_name,
                Joining_Date: empInfo?.data?.[0]?.[0]?.emp_appointment_date,
                emp_confirm_date: empInfo?.data?.[0]?.[0]?.emp_confirm_date,
                Transaction_Date: empInfo?.data?.[0]?.[0]?.Transaction_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Transaction_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Transaction_Date,
                Confirmation_Date: empInfo?.data?.[0]?.[0]?.Confirmation_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Confirmation_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Confirmation_Date,
                Remarks: empInfo?.data?.[0]?.[0]?.remarks == "undefined" || empInfo?.data?.[0]?.[0]?.remarks == null ? "" : empInfo?.data?.[0]?.[0]?.remarks,
            })
        }
    }, [empInfo])
    useEffect(() => {
        if (empInfo?.message == "failed" || empInfo?.messsage == "failed") {
            message.error(`In info Api call: ${empInfo?.message || empInfo?.messsage}`)
        }
    }, [empInfo])

    return (
        <>

            {contextHolder}
            {mode2 == false ? <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Employee Information</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
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
                        name="Section_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <h4 className="text-dark mt-4">Confirmation Extension Information</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Joining Date'}
                        placeholder={'Joining Date'}
                        name={'Joining_Date'}
                        type="date"
                        errors={errors}
                        control={control}
                        style={{ background: "#f5f4f4" }}
                        disabled
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Confirmation Due'}
                        name={'emp_confirm_date'}
                        label={'Confirmation Due'}
                        type="date"
                        style={{ background: "#f5f4f4" }}
                        disabled
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Transaction Date'}
                        name={'Transaction_Date'}
                        label={'Transaction Date'}
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Confirmation Date'}
                        label={'Confirmation Date'}
                        name={'Confirmation_Date'}
                        type="date"
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Remarks'}
                        name={'Remarks'}
                        label={'Remarks'}
                        type="text"
                    />
                </div>
                <div className="BaseCItyBtnBox">
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    {status == "Process" || isProcessbtn == true ? "" : <PrimaryButton type={"submit"} loading={isLoading} title="Save" />}
                    {isProcessbtn == true || status == "Process" ?
                        <>
                            {/* <Button title="Process" loading={isLoading} onClick={(e) => processFun(e)} /> */}
                            <PrimaryButton type={"submit"} loading={isLoading} title="Process" />
                            <Space size="middle">
                                <Popconfirm
                                    title="Delete the Confirmation Extension"
                                    description="Are you sure you want to delete this Confirmation Extension?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => {
                                        DeleteConfrim(isCode)
                                    }}
                                >
                                    <Button title="Delete" loading={isDeleteLeave} onClick={(e) => e.preventDefault(e)} />
                                </Popconfirm>
                            </Space>
                        </> : ""
                    }
                </div>
            </form> : ""}


        </>
    );
}
function mapStateToProps({ Red_Confirmation_Extension }) {
    return { Red_Confirmation_Extension };
}
export default connect(mapStateToProps, ACTIONS)(Confirmation_ExtensionForm);
