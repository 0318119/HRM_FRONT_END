import React, { useEffect } from 'react'
import './assets/css/LeaveReport.css'
import Header from '../components/Includes/Header'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { connect } from "react-redux";
import { message } from 'antd';
import * as LEAVE_REPORTS from "../store/actions/Leave/Leave_Reports/index"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, FormInput } from '../components/basic/input/formInput';
import { PrimaryButton } from "../components/basic/button";
import * as yup from "yup";
import moment from 'moment';

const Leave_Report_Detail = ({
  Red_Leave_Reports,
  GET_ALL_EMP_DATA,
  GET_LEAVE_CAT,
  GET_LEAVE_TYPES,
  DOWNLOAD_LEAVE_DETAILS_EXCEL_FILE
}) => {
  const EmpData = Red_Leave_Reports?.EMP_DATA?.[0]?.res
  const leaveCatData = Red_Leave_Reports?.LEAVE_CAT?.[0]?.res
  const leaveTypeData = Red_Leave_Reports?.LEAVE_TYPES?.[0]?.res
  const currentDates = new Date().toISOString().split('T')[0];

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
    Emp_Code: yup.string().required("Please Select the employee"),
    leaveCatCode: yup.string().required("Please Select the leave category"),
    leaveTypeCode: yup.string().required("Please Select the leave type"),
    fromDate: yup.string().required("Please Select the from date"),
    toDate: yup.string().required('Please Select the To date')
      .test('is-later', 'To date must be greater than or equal to From date', function (value) {
        const fromDate = this.parent.fromDate;
        return moment(value).isSameOrAfter(fromDate, 'day'); // 'day' ensures we compare dates only, ignoring time
      }),
  });

  const defaultOption = { value: "-1", label: "All Employees" };
  const options = [
    defaultOption,
    ...(EmpData?.data || []).map((items) => ({
      value: items.Emp_code,
      label: items?.Emp_code.toString() + " - " + items?.Emp_name,
    })),
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      Emp_Code: "-1",
      leaveCatCode: 23,
      leaveTypeCode: 21,
      fromDate: currentDates,
      toDate: currentDates,
    },
    mode: "onChange",
    resolver: yupResolver(Sheme),
  });

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const confirm = async (data) => {
    const paylaod = JSON.stringify({
      "Emp_Code": data?.Emp_Code,
      "leaveCatCode": data?.leaveCatCode,
      "leaveTypeCode": data?.leaveTypeCode,
      "fromDate": data?.fromDate,
      "toDate": data?.toDate,
    })
    const isCheckResponse = await DOWNLOAD_LEAVE_DETAILS_EXCEL_FILE(paylaod)
    if (isCheckResponse?.success) {
      DownloadExcel(isCheckResponse?.data?.[0])
    } else {
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
    if (EmpData?.message == "failed" || EmpData?.messsage == "failed") {
      message.error(`In Emp Api Call: ${EmpData?.message || EmpData?.messsage}`)
    } else if (leaveCatData?.message == "failed" || leaveCatData?.messsage == "failed") {
      message.error(`In Leave category Api Call: ${leaveCatData?.message || leaveCatData?.messsage}`)
    } else if (leaveTypeData?.message == "failed" || leaveTypeData?.messsage == "failed") {
      message.error(`In Emp leave type Api Call: ${leaveTypeData?.message || leaveTypeData?.messsage}`)
    }
  }, [EmpData, leaveCatData, leaveTypeData])

  useEffect(() => {
    GET_ALL_EMP_DATA()
    GET_LEAVE_CAT()
    GET_LEAVE_TYPES()
  }, [])



  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className='leaveReportDetailBox'>
              <h5><b>Leave Report Details</b></h5>
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
                  name={'leaveCatCode'}
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
                  name={'leaveTypeCode'}
                  placeholder={'Please select leave type'}
                  label={'Please select leave type'}
                  options={leaveTypeData?.data.map((items) => ({
                    value: items?.Leave_type_code,
                    label: items?.Leave_name
                  }))}
                />
                <FormInput
                  errors={errors}
                  control={control}
                  name={'fromDate'}
                  placeholder={'Please select the from date'}
                  label={'From Date'}
                  type={"date"}
                />
                <FormInput
                  errors={errors}
                  control={control}
                  name={'toDate'}
                  placeholder={'Please select the to date'}
                  label={'To Date'}
                  type={"date"}
                />
                <div>
                  <PrimaryButton type={'submit'} title="Save" />
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
export default connect(mapStateToProps, LEAVE_REPORTS)(Leave_Report_Detail) 