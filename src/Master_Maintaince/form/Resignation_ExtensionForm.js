import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton, Button } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Transaction_Resignation/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from "antd";
import { Popconfirm, Space } from "antd";
import * as yup from "yup";

function Resignation_ExtensionForm({
    cancel,
    mode,
    isCode,
    status,
    Red_Transaction_Resignation,
    TranResignationByEmpCode,
    SaveResignationExInfo,
    SaveResignationExInFoProcess,
    Delete_Confirmation_Resignation
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [mode2, setMode2] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const currentDate = new Date().toISOString().split('T')[0]
    const empInfo = Red_Transaction_Resignation?.GetInfo?.[0]?.res
    const [isProcessbtn, setProcessbtn] = useState(false)
    const [isDeleteLeave, setDeleteLeave] = useState(false)

    const EditBack = () => {
        cancel("read");
    };


    const ResignationExtension = yup.object().shape({
        Resignation_Date: yup.string().required("Resignation Date is Required"),
        Remarks: yup.string().required("Remarks is Required"),
    });


    const submitForm = async (data) => {
        try {
            const isValid = await ResignationExtension.validate(data);
            if (isValid) {
                if (status == "Process") {
                    processConfirm(data)
                } else if (isProcessbtn == true) {
                    processConfirm(data)
                }
                else {
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
        resolver: yupResolver(ResignationExtension),
    });


    const saveConfirm = async (data) => {
        setLoading(true)
        const Savepayload = JSON.stringify({
            "Emp_Code": isCode,
            "Resig_code": 6,
            "Resignation_Submission_Date": data?.Resignation_Submission_Date,
            "Resignation_Acceptance_Date": data?.Resignation_Acceptance_Date,
            "Transaction_Date": data?.Transaction_Date,
            "Resignation_Date": data?.Resignation_Date,
            "Remarks": data?.Remarks,
        })
        const response = await SaveResignationExInfo(Savepayload);
        if (response.success) {
            messageApi.success("Save Resignation...");
            setProcessbtn(true)
            setLoading(false)
        } else {
            messageApi.error(response?.message || response?.messsage);
            setLoading(false)
        }
    }
    const processConfirm = async (data) => {
        setLoading(true)
        const Processpayload = JSON.stringify({
            "Emp_Code": isCode,
            "Resig_code": 6,
            "Resignation_Submission_Date": data?.Resignation_Submission_Date,
            "Resignation_Acceptance_Date": data?.Resignation_Acceptance_Date,
            "Transaction_Date": data?.Transaction_Date,
            "Resignation_Date": data?.Resignation_Date,
            "Remarks": data?.Remarks,
        })
        const isCheck = await SaveResignationExInFoProcess(Processpayload);
        if (isCheck?.success) {
            message.success("Process Resignation...")
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
        const isCheck = await Delete_Confirmation_Resignation(data)
        if (isCheck?.success) {
            message.success("Successfully Deleted")
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
            TranResignationByEmpCode(isCode)
        }
    }, [isCode])

    useEffect(() => {
        if (mode == "Edit") {
            reset({
                Emp_name: empInfo?.data?.[0]?.[0]?.Emp_name,
                Desig_name: empInfo?.data?.[0]?.[0]?.Desig_name,
                Dept_name: empInfo?.data?.[0]?.[0]?.Dept_name,

                Resignation_Submission_Date: empInfo?.data?.[0]?.[0]?.Resignation_Submission_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Resignation_Submission_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Resignation_Submission_Date,
                Resignation_Acceptance_Date: empInfo?.data?.[0]?.[0]?.Resignation_Acceptance_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Resignation_Acceptance_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Resignation_Acceptance_Date,
                Transaction_Date: empInfo?.data?.[0]?.[0]?.Transaction_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Transaction_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Transaction_Date,
                Resignation_Date: empInfo?.data?.[0]?.[0]?.Resignation_Date == "undefined" || empInfo?.data?.[0]?.[0]?.Resignation_Date == null ? currentDate : empInfo?.data?.[0]?.[0]?.Resignation_Date,
                Remarks: empInfo?.data?.[0]?.[0]?.Remarks == "undefined" || empInfo?.data?.[0]?.[0]?.Remarks == null ? "" : empInfo?.data?.[0]?.[0]?.Remarks,
            })
        }
    }, [empInfo])

    useEffect(() => {
        if (empInfo?.message == "failed" || empInfo?.messsage == "failed") {
            message.error(`In info Api call: ${empInfo?.message || empInfo?.messsage}`)
        }
    }, [empInfo])
    console.log("empInfo",empInfo)

    return (
        <>

            {contextHolder}

            <form onSubmit={handleSubmit(submitForm)}>
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
                        name="Dept_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <h4 className="text-dark mt-4">Resignation Information</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Resignation Submission Date'}
                        placeholder={'Resignation_Submission_Date'}
                        name={'Resignation_Submission_Date'}
                        type="date"
                        errors={errors}
                        control={control}
                        style={{ background: "#f5f4f4" }}
                        disabled
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Resignation Acceptance Date'}
                        name={'Resignation_Acceptance_Date'}
                        label={'Resignation Acceptance Date'}
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
                        type="date"
                        style={{ background: "#f5f4f4" }}
                        disabled
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Resignation_Date'}
                        label={'Resignation Date'}
                        name={'Resignation_Date'}
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
                            <PrimaryButton type={"submit"} loading={isLoading} title="Process" />
                            <Space size="middle">
                                <Popconfirm
                                    title="Delete the Transaction Resignation"
                                    description="Are you sure you want to delete Transaction Resignation?"
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
            </form>
        </>
    );
}
function mapStateToProps({ Red_Transaction_Resignation }) {
    return { Red_Transaction_Resignation };
}
export default connect(mapStateToProps, ACTIONS)(Resignation_ExtensionForm);
