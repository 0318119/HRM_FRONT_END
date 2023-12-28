import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_New_Appointment_Report_Action from '../store/actions/HrOperations/New_Appointment_Report/index'
import { FormInput } from '../components/basic/input/formInput';
import Header from "../components/Includes/Header";
import { PrimaryButton, SimpleButton } from '../components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, PDFViewer, Image, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LogoUrl from "../../src/Assets/Images/download.png"
import Item from 'antd/es/list/Item';

function New_Appointment_Report({
  Red_New_Appointment_Report,
  PostAppointmentPayload,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const empData = Red_New_Appointment_Report?.data?.[0]?.res?.data
  const [isAppointmentData, setAppointmentData] = useState([])
  const [currentDate, setCurrentDate] = useState('')

<<<<<<< HEAD
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setCurrentDate(currentDate);
  }, [])

=======
  useEffect(() =>{
    const currentDate = new Date().toISOString().split('T')[0];
    setCurrentDate(currentDate);
  },[])
 
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23

  const AppointmentSchema = yup.object().shape({
    FromDate: yup.string().required('Please Select From Date'),
    ToDate: yup.string().required('Please Select To Date'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      FromDate: '',
      ToDate: '',
    },
    mode: 'onChange',
    resolver: yupResolver(AppointmentSchema),
  });

<<<<<<< HEAD
=======
  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const isValid = await AppointmentSchema.validate(data);
  //     if (isValid) {
  //       const result = await PostAppointmentPayload(data);
  //       console.log(result, 'result');
  //       if (result?.success) {
  //         setAppointmentData(result?.data || []);
  //         setFormSubmitted(true);
  //         message.success('PDF is created, Wait PDf is under downloading...');
  //         setTimeout(() => {
  //           handleDownload()
  //         }, 2000);
  //       } else {
  //         message.error(result?.message || result?.messsage);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isValid = await AppointmentSchema.validate(data);
      if (isValid) {
        const result = await PostAppointmentPayload(data);
        if (result?.success) {
          message.success('PDF is created, Wait PDF is under downloading...');
          setFormSubmitted(true);
          setAppointmentData(result?.data); // Set the appointment data immediately
        } else {
          message.error(result?.message || result?.messsage);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      handleDownload();
    }
  }, [isFormSubmitted]);

  const checkPdf =
    <Document >
      <Page size="A4">
        <View style={{ fontFamily: 'Helvetica', fontSize: 12, flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Image src={LogoUrl} style={{ width: "80px", height: '30px', backgroundColor: 'yellow' }} />
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', margin: "20px 0" }}>
              NEW APPOINTEES REPORT
            </Text>

            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              DATED: {currentDate}
            </Text>
          </View>

          {isAppointmentData?.map((item, index) => (
            <>
              <Text key={index} style={{ textAlign: 'left', marginBottom: '10', fontSize: '10', fontWeight: 'bold', margin: "20px 0" }}>
                Department :   {item.department}
              </Text>

              <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Emp Code</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Emp Name</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Designation</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>GG</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Date Of Appointment</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Supervisor</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>CC</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Location</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Base City</Text>
              </View>
              {item?.employees?.map((item, index) =>
                <View key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000000', alignItems: 'center', height: 24 }}>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.EmpCode ? item?.EmpCode : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.EmpName ? item?.EmpName : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Designation ? item?.Designation : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.GG ? item?.GG : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.DateOfAppointment ? item?.DateOfAppointment : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Supervisor ? item?.Supervisor : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.CC ? item?.CC : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Location ? item?.Location : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.BaseCity ? item?.BaseCity : null}</Text>
                </View>
              )}
            </>
          ))}
        </View>
      </Page>
    </Document>

  const handleDownload = async () => {
    try {
      const pdfBlob = await pdf(checkPdf).toBlob();
      saveAs(pdfBlob, 'generated.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  return (
    <>
      <Header />
      <div className="container maringClass">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
              <h4 className="text-dark">Appointment</h4>
              <div className="">
                <FormInput
                  errors={errors}
                  control={control}
                  placeholder={'From Date'}
                  name={'FromDate'}
                  label={'From Date'}
                  type="date"
                />
                <FormInput
                  errors={errors}
                  control={control}
                  placeholder={'To Date'}
                  name={'ToDate'}
                  label={'To Date'}
                  type="date"
                />
              </div>
              <div className="paySlipBtnBox">
                <SimpleButton type={'submit'} loading={isLoading} title="Download PDF" />
              </div>
            </form>
          </div>
        </div>
<<<<<<< HEAD
=======



        {/* DON'T REMOVE THIS PDF BELOW CODE FROM HERE..... */}
        {/* {isFormSubmitted && (
          <div className="mt-5 row justify-content-center">
            <PDFViewer height="750">
              <Document >
                <Page size="A4">
                  <View>
                    <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold', margin: "20px 0" }}>
                      Employee Attendance PDF
                    </Text>
                    <View style={{ position: 'absolute', left: '10', top: '10' }}>
                      <Image src={logoUrl} style={{ width: 50, height: 50 }} />
                    </View>
                    {isAppointmentData?.map((item, index) => (
                      <>
                        <Text key={index} style={{ textAlign: 'left', marginBottom: '10', fontSize: '12', fontWeight: 'bold', margin: "20px 0" }}>
                          Department :   {item.department}
                        </Text>

                        <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Code</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Name</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Designation</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>GG</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Date Of Appointment</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Supervisor</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>CC</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Location</Text>
                          <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Base City</Text>
                        </View>
                        {item.employees.map((item) =>
                          <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.EmpCode ? item?.EmpCode : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.EmpName ? item?.EmpName : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Designation ? item?.Designation : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.GG ? item?.GG : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.DateOfAppointment ? item?.DateOfAppointment : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Supervisor ? item?.Supervisor : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.CC ? item?.CC : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Location ? item?.Location : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.BaseCity ? item?.BaseCity : null}</Text>
                          </View>
                        )}
                      </>
                    ))}
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        )} */}
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
      </div>
    </>
  );
}

function mapStateToProps({ Red_New_Appointment_Report }) {
  return { Red_New_Appointment_Report };
}

export default connect(mapStateToProps, {
  PostAppointmentPayload: Red_New_Appointment_Report_Action.PostAppointmentPayload,
})(New_Appointment_Report);

