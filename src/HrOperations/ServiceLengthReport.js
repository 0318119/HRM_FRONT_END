import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_ServiceLengthReport_Action from '../store/actions/HrOperations/ServiceLengthReport';
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import Header from "../components/Includes/Header";
import { PrimaryButton, SimpleButton } from '../components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LogoUrl from "../../src/Assets/Images/download.png";
import Item from 'antd/es/list/Item';

function ServiceLengthReport({
  Red_ServiceLengthReport,
  PostServiceLenghthPayload,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const empData = Red_ServiceLengthReport?.data?.[0]?.res?.data
  const [isServiceLengthReportData, setServiceLengthReportData] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];

  // ===== SCHEMA =================
  const ServiceLengthReportSchema = yup.object().shape({
    Servicefrom: yup.string().required('Please Select From Service'),
    Serviceto: yup.string().required('Please Select To Service'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      Servicefrom: currentDate,
      Serviceto: currentDate, // Set default value for "To date"
    },
    mode: 'onChange',
    resolver: yupResolver(ServiceLengthReportSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isValid = await ServiceLengthReportSchema.validate(data);
      if (isValid) {
        const result = await PostServiceLenghthPayload(data);
        if (result?.success) {
          message.success('PDF is created, Wait PDF is under downloading...');
          setFormSubmitted(true);
          setServiceLengthReportData(result?.data);
          // Now, you can generate the PDF
          await handleDownload();
        } else {
          message.error(result?.message || result?.messsage);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const PdfData = (
    <Document>
      <Page size="A4">
        <View>
          <View style={{ fontFamily: 'Helvetica', fontSize: 12, flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Image src={LogoUrl} style={{ width: "80px", height: '30px', backgroundColor: 'yellow' }} />
              <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', margin: "20px 0" }}>
                Service Length Report
              </Text>

              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                DATED: {currentDate}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Emp Code</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Emp Name</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Joining Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Service Length</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Service Length Years</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Service Length Months</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Service Length Days</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>From year</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>To year</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Designation</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Department</Text>
          </View>

          {isServiceLengthReportData?.flatMap((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_Code ? item?.Emp_Code : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_Name ? item?.Emp_Name : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.JoiningDate ? item?.JoiningDate : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Service_Length ? item?.Service_Length : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Service_Length_Years ? item?.Service_Length_Years : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Service_Length_Months ? item?.Service_Length_Months : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Service_Length_Days ? item?.Service_Length_Days : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.fromyuer ? item?.fromyuer : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.toyear ? item?.toyear : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Designation ? item?.Designation : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Department ? item?.Department : null}</Text>


              </View>
            );
          })}
        </View>

      </Page>
    </Document>
  );

  const handleDownload = async () => {
    try {
      if (isServiceLengthReportData.length == 0) {
        message.error('No data available for PDF.');
      } else {
        const pdfBlob = await pdf(PdfData).toBlob();
        saveAs(pdfBlob, 'generated.pdf');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  useEffect(() => {
    if (isFormSubmitted) {
      handleDownload();
      setFormSubmitted(false)
    }
  }, [isFormSubmitted]);

  return (
    <>
      <Header />
      <div className="container maringClass">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
              <h4 className="text-dark">SERVICE LENGTH REPORT</h4>
              <div className="">
                <FormInput
                  errors={errors}
                  control={control}
                  placeholder={'Service from'}
                  name={'Servicefrom'}
                  label={'Service from'}
                  type="date"
                />
                <FormInput
                  errors={errors}
                  control={control}
                  placeholder={'Service to'}
                  name={'Serviceto'}
                  label={'Service to'}
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

function mapStateToProps({ Red_ServiceLengthReport }) {
  return { Red_ServiceLengthReport };
}

export default connect(mapStateToProps, {
  PostServiceLenghthPayload: Red_ServiceLengthReport_Action.PostServiceLenghthPayload,
})(ServiceLengthReport);

