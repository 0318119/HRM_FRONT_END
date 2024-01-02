import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import * as RED_ATTENDANCE_SHEET_ACTION from '../../store/actions/AttendanceSheet/index'
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { PrimaryButton, CancelButton } from "../../components/basic/button";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveAs } from 'file-saver';
import { Table } from "antd";
import { Document, Page, Text, View, PDFViewer, pdf } from '@react-pdf/renderer';
import * as yup from "yup";


function Get_Attendancelist({
  Red_Attendance_sheet,
  GetAllEmp,
  PostAttendancePayload
}) {
  const [isLoading, setLoading] = useState(false)
  const empData = Red_Attendance_sheet?.data?.[0]?.res?.data?.[0]
  const [isAttendanceData, setAttendanceData] = useState([])
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const [isbtnDownalod, setBtnDownalod] = useState(false)


  // ATTENDANCE FOMR SHCEME =====================
  const AttendanceSheme = yup.object().shape({
    Employee_Id: yup.string().required("Please Select the employee"),
    Year: yup.string().required("Please Select the Year"),
    Month: yup.string().required("Please Select the Month"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      Employee_Id: "",
      Month: "",
      Year: "",
    },
    mode: "onChange",
    resolver: yupResolver(AttendanceSheme),
  });



  // ATTENDANCE FORM VALIDE FUNCTION ===================
  const submitForm = async (data) => {
    setLoading(true)
    try {
      const isValid = await AttendanceSheme.validate(data);
      if (isValid) {
        confirm(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  // GET ALL EMPLOYEE DATA =====================
  useEffect(() => {
    GetAllEmp()
  }, [])

  // ATTENDANCE FORM POST FUNCTION
  const confirm = async (data) => {
    const isWaitFun = await PostAttendancePayload(data)
    if (isWaitFun?.success) {
      if (isWaitFun?.data[0].length == 0) {
        message.error("No Data Available")
        setLoading(false)
        setBtnDownalod(false)
      } else {
        setLoading(false)
        setBtnDownalod(true)
        message.success("Now, You can Download Pdf")
        setAttendanceData(isWaitFun?.data[0])
      }
    } else {
      message.error(isWaitFun?.message || isWaitFun?.messsage)
      setLoading(false)
      setBtnDownalod(false)
    }
  }

  const defaultOption = { value: "-1", label: "All Employees" };
  const options = [
    // defaultOption,
    ...(empData || []).map((item) => ({
      value: item.Emp_code,
      label: item.Emp_name
    })),
  ];

  useEffect(() => {
    const selectedEmployee = empData?.find(item => item?.Emp_code == localStorage.getItem("Emp_code"));
    setValue('Employee_Id', selectedEmployee?.Emp_code);
    setValue('Month', currentMonth);
    setValue('Year', currentYear);
  }, [setValue, empData, currentMonth, currentYear]);


  useEffect(() => {
    if (isbtnDownalod) {
      handleDownload();
    }
  }, [isbtnDownalod]);

  const PdfData = (
    <Document >
      <Page size="A4">
        <View>
          <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold', margin: "20px 0" }}>
            Employee Attendance PDF
          </Text>
          <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Employee Code</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Employee Name</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Day</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Time In Hours</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Time In Minutes</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Time out Hours</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Time out Minutes</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Shift Durration</Text>
          </View>
          {isAttendanceData.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_code ? item?.Emp_code : null}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_name ? item?.Emp_name : null}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Day_Name ? item?.Day_Name : null}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Attendance_Date ? item?.Attendance_Date : null}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Time_In_HH}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Time_In_MM}</Text>

              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Time_Out_HH}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Time_Out_MM}</Text>
              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Shift_Duration ? item?.Shift_Duration : null}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )

  const handleDownload = async () => {
    const pdfBlob = await pdf(PdfData).toBlob();
    saveAs(pdfBlob, 'Attendance_sheet.pdf');
    setBtnDownalod(false)
  };


  return (
    <>
      <div className="container maringClass">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit(submitForm)} className='paySlipBox'>
              <h4 className="text-dark">Attendance</h4>
              <div className=''>
                <FormSelect
                  errors={errors}
                  control={control}
                  placeholder={"Select Employee"}
                  name={'Employee_Id'}
                  label={'Select Employee'}
                  options={options}
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
              </div>
              <div className='paySlipBtnBox'>
                <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Attendance_sheet }) {
  return { Red_Attendance_sheet };
}
export default connect(mapStateToProps, RED_ATTENDANCE_SHEET_ACTION)(Get_Attendancelist)


