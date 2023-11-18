import React, { useEffect, useState } from 'react'
// import '../../assest/css/paySlip.css'
import { connect } from "react-redux";
import * as RED_ATTENDANCE_SHEET_ACTION from '../../store/actions/AttendanceSheet/index'
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { PrimaryButton, CancelButton } from "../../components/basic/button";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Table } from "antd";
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import * as yup from "yup";


function Get_Attendancelist({
  Red_Attendance_sheet,
  GetAllEmp,
  PostAttendancePayload
}) {
  const [isLoading, setLoading] = useState(false)
  const empData = Red_Attendance_sheet?.data?.[0]?.res?.data
  const [isAttendanceData, setAttendanceData] = useState([])
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to convert to 1-based index
  const currentYear = currentDate.getFullYear();
  console.log("Current Month:", currentMonth);
  console.log("Current Year:", currentYear);


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
      if(isWaitFun?.success){
        if(isWaitFun?.data[0].length == 0){
          message.error("No Data Available")
          setLoading(false)
        }else{
          setLoading(false)
          message.success("Now, You can Download Pdf")
          setAttendanceData(isWaitFun?.data[0])
        }
      }else{
        message.error(isWaitFun?.message || isWaitFun?.messsage)
      }
  }

  // const columns = [
  //   {
  //     title: 'Employee Code',
  //     dataIndex: 'Emp_code',
  //     key: 'Emp_code',
  //   },
  //   {
  //     title: 'Employee Name',
  //     dataIndex: 'Emp_name',
  //     key: 'Emp_name',
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'Day_Name',
  //     key: 'Day_Name',
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'Attendance_Date',
  //     key: 'Attendance_Date',
  //   },
  //   {
  //     title: 'Time In Hours',
  //     dataIndex: 'Emp_Time_In_HH',
  //     key: 'Emp_Time_In_HH',
  //   },
  //   {
  //     title: 'Time out ',
  //     dataIndex: 'Emp_Time_In_MM',
  //     key: 'Emp_Time_In_MM',
  //   },
  //   {
  //     title: 'Time out Hours',
  //     dataIndex: 'Emp_Time_In_HH',
  //     key: 'Emp_Time_In_HH',
  //   },
  //   {
  //     title: 'Time out Minutes',
  //     dataIndex: 'Emp_Time_Out_HH',
  //     key: 'Emp_Time_Out_MM',
  //   },
  //   {
  //     title: 'Shift Durration',
  //     dataIndex: 'Shift_Duration',
  //     key: 'Shift_Duration',
  //   },
  // ];

  const defaultOption = { value: "-1", label: "All Employees" }; 
  const options = [
    defaultOption,
    ...(empData || []).map((item) => ({
      value: item.Emp_code,
      label: item.Emp_name,
    })),
  ];

  useEffect(() => {
    const btnprint = document.getElementById('Print');
    const gotoPrint = () => {
      window.print()
    }
    btnprint.addEventListener('click', gotoPrint, false)
    return () => {
      btnprint.removeEventListener('click', gotoPrint, false)
    }
  }, [])


  return (
    <>
      {/* <div>
        <Header />
      </div> */}
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
                  defaultValue={currentMonth}
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
                  defaultValue={currentYear}
                  options={[
                    { value: 2022, label: '2022' },
                    { value: 2023, label: '2023' },
                  ]}
                />
              </div>
              <div className='paySlipBtnBox'>
                <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-end">
            <PrimaryButton className={isAttendanceData?.length > 0 ? "d-block" : "d-none"} id="Print" title="Download" />
          </div>
        </div>
        <div class="mt-5 row justify-content-center">
          {
            console.log("isAttendanceData",isAttendanceData)
          }
          {isAttendanceData?.length > 0 && (
            // <Table
            //     columns={columns}
            //     loading={isLoading}
            //     dataSource={isAttendanceData}
            //     scroll={{ x: 10 }}
            //     pagination={false}
            // />
            <PDFViewer height="750">
              <Document >
                <Page size="A4">
                    <View>
                        <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold',margin: "20px 0" }}>
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

                              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Time_Out_HH }</Text>
                              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Time_Out_MM }</Text>
                              <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Shift_Duration ? item?.Shift_Duration : null}</Text>
                          </View>
                        ))}
                    </View>
                </Page>
              </Document>
            </PDFViewer>
          )}
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Attendance_sheet }) {
  return { Red_Attendance_sheet };
}
export default connect(mapStateToProps, RED_ATTENDANCE_SHEET_ACTION)(Get_Attendancelist)


