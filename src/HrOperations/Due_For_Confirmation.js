import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_Due_For_Confirmation_Action from '../store/actions/HrOperations/Due_For_Confirmation'
import { FormInput } from '../components/basic/input/formInput';
import Header from "../components/Includes/Header";
import { PrimaryButton, SimpleButton } from '../components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LogoUrl from "../../src/Assets/Images/download.png"
import Item from 'antd/es/list/Item';

function Due_For_Confirmation({
  Red_Due_For_Confirmation,
  PostConfirmationPayload,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const empData = Red_Due_For_Confirmation?.data?.[0]?.res?.data
  const [isDueCOnfirmationData, setDueCOnfirmationData] = useState([])
  const currentDate = new Date().toISOString().split('T')[0]; 


  const Due_For_ConfirmationSchema = yup.object().shape({
    FromDate: yup.string().required('Please Select From Date'),
    ToDate: yup.string().required('Please Select To Date'),
  });


  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      FromDate: currentDate,
      ToDate: currentDate,
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
          message.success('PDF is created, Wait PDF is under downloading...');
          setFormSubmitted(true);
          setDueCOnfirmationData(result?.data); // Set the DueCOnfirmation data immediately
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
      setFormSubmitted(false)
    }
  }, [isFormSubmitted]);
  

  const PdfData =
    (<Document>
      <Page size="A4">
        <View>
          <View style={{ fontFamily: 'Helvetica', fontSize: 12, flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Image src={LogoUrl} style={{ width: "80px", height: '30px', backgroundColor: 'yellow' }} />
              <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', margin: "20px 0" }}>
                Due For Confirmation Report
              </Text>

              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                DATED: {currentDate}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Emp Code</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Emp Name</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Appointment Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Due Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Service length</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Emp Category</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Designation</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '11', fontWeight: 'bold' }}>Department</Text>
          </View>

          {isDueCOnfirmationData?.flatMap((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_id ? item?.Emp_id : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_name ? item?.Emp_name : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_appointment_date ? item?.Emp_appointment_date : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.DueDate ? item?.DueDate : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Service_Length ? item?.Service_Length : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_Category ? item?.Emp_Category : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Desig_name ? item?.Desig_name : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Dept_name ? item?.Dept_name : null}</Text>


              </View>
            );
          })}
        </View>
      </Page>
    </Document>)

  const handleDownload = async () => {
    try {
      // Ensure isDueCOnfirmationData is not empty before generating the PDF
      if (isDueCOnfirmationData.length === 0) {
        message.error('No data available for PDF.');
        return;
      }

      const pdfBlob = await pdf(PdfData).toBlob();
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
              <h4 className="text-dark">DUE FOR CONFIRMATION REPORT</h4>
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
                <SimpleButton type={'submit'} loading={isLoading} title="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ Red_Due_For_Confirmation }) {
  return { Red_Due_For_Confirmation };
}


export default connect(mapStateToProps, {
  PostConfirmationPayload: Red_Due_For_Confirmation_Action.PostConfirmationPayload,
})(Due_For_Confirmation);

