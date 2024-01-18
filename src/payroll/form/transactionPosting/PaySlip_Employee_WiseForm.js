import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton, Button } from "../../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ACTIONS from "../../../store/actions/MasterMaintaince/Confirmation_Extension/index";
import Header from "../../../components/Includes/Header";
import { FormInput, FormSelect } from "../../../components/basic/input/formInput";

import { message } from "antd";
import { Popconfirm, Space } from "antd";
import * as yup from "yup";

function PaySlip_Employee_WiseForm({
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
      <Header />
      {contextHolder}
      <form onSubmit={handleSubmit()}>
        <h4 className="text-dark mt-5">Employee Information</h4>
        <hr />
        <div className="form-group formBoxCountry">
          <FormSelect
            errors={errors}
            control={control}
            name={'Year'}
            placeholder={'Please select a year'}
            label={'Please select a year'}
            options={[
              { value: 2021, label: '2021' },
              { value: 2022, label: '2022' },
              { value: 2023, label: '2023' },
              { value: 2024, label: '2024' },
              { value: 2025, label: '2025' },
            ]}
          />
          <FormSelect
            errors={errors}
            control={control}
            placeholder={"Please select a month"}
            name={'Month'}
            label={'Month'}
            options={[
              { value: 1, label: 'January' },
              { value: 2, label: 'February' },
              { value: 3, label: 'March' },
              { value: 4, label: 'April' },
              { value: 5, label: 'May' },
              { value: 6, label: 'June' },
              { value: 7, label: 'July' },
              { value: 8, label: 'August' },
              { value: 9, label: 'September' },
              { value: 10, label: 'October' },
              { value: 11, label: 'November' },
              { value: 12, label: 'December' },
            ]}
          />
          <FormSelect
            showSearch
            errors={errors}
            control={control}
            name={'Emp_Code'}
            placeholder={'Please select Employee'}
            label={'Please select Employee'}
            optionFilterProp="children"
          />
          <FormSelect
            label={'Payroll Category'}
            placeholder='Select Payroll Category'
            id="payroll_category_code"
            name="payroll_category_code"
            // options={payroll?.map((item) => ({
            //   value: item?.Payroll_Category_code,
            //   label: item.Payroll_Category_name

            // }))}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            showSearch
            errors={errors}
            control={control}
            name={'Emp_Code'}
            placeholder={'Please select Employee'}
            label={'Please select Employee'}
            optionFilterProp="children"
          />
        </div>
        <div className='EmployeeTypeBtnBox'>
          <PrimaryButton onClick={EditBack} title={'Generate Employee Payslips'} />
          <CancelButton type={'submit'} loading={isLoading} title="Load Grid" />
          <PrimaryButton onClick={EditBack} title={'Email Salary Slip By Grid'} />
        </div>
      </form>


    </>
  );
}
function mapStateToProps({ Red_Confirmation_Extension }) {
  return { Red_Confirmation_Extension };
}
export default connect(mapStateToProps, ACTIONS)(PaySlip_Employee_WiseForm);
