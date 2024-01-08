import React, { useState, useEffect } from 'react'
import './assets/css/LeaveReportBalance.css'
import Header from '../components/Includes/Header'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { connect } from "react-redux";
import { message } from 'antd';
import * as LEAVE_REPORTS from "../store/actions/Leave/Leave_Reports/index"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect } from '../components/basic/input/formInput';
import { PrimaryButton } from "../components/basic/button";
import * as yup from "yup";

const Leave_Report_Balance = ({
  Red_Leave_Reports,
  GET_ALL_EMP_DATA,
  GET_LEAVE_CAT,
  GET_LEAVE_TYPES,
  GET_LEAVE_YEARS,
  DOWNLOAD_LEAVE_BALANCED_EXCEL_FILE
}) => {

  const EmpData = Red_Leave_Reports?.EMP_DATA?.[0]?.res
  const leaveCatData = Red_Leave_Reports?.LEAVE_CAT?.[0]?.res
  const leaveTypeData  = Red_Leave_Reports?.LEAVE_TYPES?.[0]?.res
  const yearData = Red_Leave_Reports?.YEAR_DATA?.[0]?.res
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();


  const submitForm = async (data) => {
    try {
        const isValid = await Sheme.validate(data);
        if (isValid) {
          confirm(data)
        }
    } catch (error) {
        console.error(error);
    }
  };
  const Sheme = yup.object().shape({
    YearNo: yup.string().required("Please Select the Year"),
    Leave_category_code: yup.string().required("Please Select the leave category"),
    Leave_type_code: yup.string().required("Please Select the leave type"),
    Emp_Code: yup.string().required("Please Select the employee"),
  });

  const defaultOption = { value: "-1", label: "All Employees" };
  const options = [
    defaultOption,
    ...(EmpData?.data || []).map((items) => ({
      value: items.Emp_code,
      label:  items?.Emp_code.toString() +" - "+ items?.Emp_name,
    })),
  ];


  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      Emp_Code: "-1",
      Leave_category_code: 23,
      Leave_type_code: 21,
      YearNo: currentYear,
    },
    mode: "onChange",
    resolver: yupResolver(Sheme),
  });

  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const confirm = async(data) => {
    const paylaod = JSON.stringify({
      "YearNo": data?.YearNo,
      "Leave_category_code": data?.Leave_category_code,
      "Leave_type_code": data?.Leave_type_code,
      "Emp_Code": data?.Emp_Code
    })
    const isCheckResponse = await DOWNLOAD_LEAVE_BALANCED_EXCEL_FILE(paylaod)
    if(isCheckResponse?.success){
      DownloadExcel(isCheckResponse?.data?.[0])
    }else{
      message.error(isCheckResponse?.message || isCheckResponse?.messsage)
    }
  }

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  const fileExtension = '.xlsx';
  const DownloadExcel = async (hjh) => {
    const ws = XLSX.utils.json_to_sheet(hjh);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "data" + fileExtension);
  }

  useEffect(() => {
    if(EmpData?.message == "failed" || EmpData?.messsage == "failed"){
      message.error(`In Emp Api Call: ${EmpData?.message || EmpData?.messsage}`)
    }else if(leaveCatData?.message == "failed" || leaveCatData?.messsage == "failed"){
      message.error(`In Leave category Api Call: ${leaveCatData?.message || leaveCatData?.messsage}`)
    }else if(leaveTypeData?.message == "failed" || leaveTypeData?.messsage == "failed"){
      message.error(`In Emp leave type Api Call: ${leaveTypeData?.message || leaveTypeData?.messsage}`)
    }else if(yearData?.message == "failed" || yearData?.messsage == "failed"){
      message.error(`In Emp leave year Api Call: ${yearData?.message || yearData?.messsage}`)
    }
  },[EmpData,leaveCatData,leaveTypeData,yearData])

  useEffect(() => {
    GET_ALL_EMP_DATA()
    GET_LEAVE_CAT()
    GET_LEAVE_TYPES()
    GET_LEAVE_YEARS()
  }, [])


  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className='leaveReportBalanceBox'>
              <h5><b>Leave Report Balance</b></h5>
              <form onSubmit={handleSubmit(submitForm)}>
                <FormSelect
                  showSearch
                  errors={errors}
                  control={control}
                  name={'Emp_Code'}
                  placeholder={'Please select Employee'}
                  label={'Please select Employee'}
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={options}
                />
                <FormSelect
                  errors={errors}
                  control={control}
                  name={'Leave_category_code'}
                  placeholder={'Please select leave category'}
                  label={'Please select leave category'}
                  options={leaveCatData?.data.map((items) => ({
                    value: items?.Leave_Category_code,
                    label: items?.Leave_Category_name
                  }))}
                />
                <FormSelect
                  errors={errors}
                  control={control}
                  name={'Leave_type_code'}
                  placeholder={'Please select leave type'}
                  label={'Please select leave type'}
                  options={leaveTypeData?.data.map((items) => ({
                    value: items?.Leave_type_code,
                    label: items?.Leave_name
                  }))}
                />
                <FormSelect
                  errors={errors}
                  control={control}
                  name={'YearNo'}
                  placeholder={'Please select year'}
                  label={'Please select leave year'}
                  options={yearData?.data.map((items) => ({
                    value: items?.year,
                    label: items?.year
                  }))}
                />
                <div>
                  <PrimaryButton type={'submit'}  title="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Leave_Reports }) {
  return { Red_Leave_Reports };
}
export default connect(mapStateToProps, LEAVE_REPORTS)(Leave_Report_Balance) 