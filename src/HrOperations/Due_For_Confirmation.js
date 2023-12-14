import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_Due_For_Confirmation_Action from '../store/actions/HrOperations/Due_For_Confirmation'
import { FormInput } from '../components/basic/input/formInput';
import Header from "../components/Includes/Header";
import { PrimaryButton, SimpleButton } from '../components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, PDFViewer, Image, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logoUrl from "../../src/Assets/Images/logo-mesh-final-logo-01-1-1024x303.webp"
import Item from 'antd/es/list/Item';

function Due_For_Confirmation({
    Red_Due_For_Confirmation,
//   GetAllAppoint,
  PostConfirmationPayload,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const empData = Red_Due_For_Confirmation?.data?.[0]?.res?.data
  const [isAppointmentData, setAppointmentData] = useState([])

  const Due_For_ConfirmationSchema = yup.object().shape({
    Servicefrom: yup.string().required('Please Select From Date'),
    Serviceto: yup.string().required('Please Select To Date'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      Servicefrom: '',
      Serviceto: '',
    },
    mode: 'onChange',
    resolver: yupResolver(Due_For_ConfirmationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isValid = await Due_For_ConfirmationSchema.validate(data);
      if (isValid) {
        const result = await PostConfirmationPayload(data);
        if (result?.success) {
          setAppointmentData(result?.data);
          setFormSubmitted(true)
          message.success('PDF is created, Wait PDf is under downloading...');
          setTimeout(() => {
            handleDownload()
          }, 2000);
        } else {
          message.error(result?.message || result?.messsage);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  
      

  const PdfData = 
      <Document >
        <Page size="A4">
          <View>
            <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold', margin: "20px 0" }}>
              Due For Confirmation Report
            </Text>
              <>
                <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Code</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Name</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Appointment Date</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Due Date</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Service length</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Category</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Designation</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Department</Text>
                </View>
                {isAppointmentData?.map((item , index) =>{
                    <View  key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Emp_Code ? item?.Emp_Code : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Emp_Name ? item?.Emp_Name : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.JoiningDate ? item?.JoiningDate : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{`${item?.fromyuer + item?.toyear}` ? `${item?.fromyuer+ item?.toyear}` : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Service_Length ? item?.Service_Length : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Department ? item?.Department : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Designation ? item?.Designation : null}</Text>
                  </View>})}
              </>
          </View>
        </Page>
      </Document>


  const handleDownload = async () => {
    try {
      const pdfBlob = await pdf(PdfData).toBlob();
      saveAs(pdfBlob, 'generated.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


 

    useEffect(() => {
    //   GetAllAppoint();
    }, []);




    return (
      <>
        <Header />
        <div className="container maringClass">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
                <h4 className="text-dark">DUE FOR CONFIRMATION REPORT</h4>
                <div className="">
                  <FormInput
                    errors={errors}
                    control={control}
                    placeholder={'From Date'}
                    name={'Servicefrom'}
                    label={'Service From'}
                    type="date"
                  />
                  <FormInput
                    errors={errors}
                    control={control}
                    placeholder={'To Date'}
                    name={'Serviceto'}
                    label={'Service To'}
                    type="date"
                  />
                </div>
                <div className="paySlipBtnBox">
                  <SimpleButton type={'submit'} loading={isLoading} title="Save" />
                </div>
              </form>
            </div>
          </div>
{/* 
          {isFormSubmitted && (
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-end">
                <PrimaryButton onClick={PDFDATA} title="Download" disabled={isLoading} />
              </div>
            </div>
          )} */}

          {/* {isFormSubmitted &&
           (
            <div className="mt-5 row justify-content-center">
              <PDFViewer height="750">
                 <Document >
        <Page size="A4">
          <View>
            <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold', margin: "20px 0" }}>
              Due For Confirmation Report
            </Text>
              <>
                <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Code</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Name</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Appointment Date</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Due Date</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Service length</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Emp Category</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Designation</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Department</Text>
                </View>
                {isAppointmentData?.map((item , index) =>{
                    <View  key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Emp_Code ? item?.Emp_Code : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Emp_Name ? item?.Emp_Name : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.JoiningDate ? item?.JoiningDate : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{`${item?.fromyuer + item?.toyear}` ? `${item?.fromyuer+ item?.toyear}` : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Service_Length ? item?.Service_Length : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Department ? item?.Department : null}</Text>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Designation ? item?.Designation : null}</Text>
                  </View>})}
              </>
          </View>
        </Page>
      </Document>
              </PDFViewer>
            </div>
          )} */}
        </div>
      </>
    );
  }

  function mapStateToProps({ Red_Due_For_Confirmation }) {
    return { Red_Due_For_Confirmation };
  }

  export default connect(mapStateToProps, Red_Due_For_Confirmation_Action)(Due_For_Confirmation);

