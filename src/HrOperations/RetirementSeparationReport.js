import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_RetirementSeparationReport_Action from '../store/actions/HrOperations/RetirementSeparationReport';
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

function RetirementSeparationReport({
  Red_RetirementSeparationReport,
  PostRetirementSeparationReportPayload,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const empData = Red_RetirementSeparationReport?.data?.[0]?.res?.data
  const [isRetirementSeparationReportData, setRetirementSeparationReportData] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0]; 
  // ===== SCHEMA =================
  const RetirementSeparationReportSchema = yup.object().shape({
    From_Date: yup.string().required('Please Select From Service'),
    To_Date: yup.string().required('Please Select To Service'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      From_Date: currentDate,
      To_Date: currentDate, // Set default value for "To date"
    },
    mode: 'onChange',
    resolver: yupResolver(RetirementSeparationReportSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isValid = await RetirementSeparationReportSchema.validate(data);
      if (isValid) {
        const result = await PostRetirementSeparationReportPayload(data);
        if (result?.success) {
          message.success('PDF is created, Wait PDF is under downloading...');
          setFormSubmitted(true);
          setRetirementSeparationReportData(result?.data);

          // Now, you can generate the PDF
          await generatePdf();
        } else {
          message.error(result?.message || result?.messsage);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const generatePdf = async () => {
    try {
      // Ensure isRetirementSeparationReportData is not empty before generating the PDF
      if (isRetirementSeparationReportData.length === 0) {
        message.error('No data available for PDF.');
        return;
      }

      const pdfBlob = await pdf(PdfData).toBlob();
      saveAs(pdfBlob, 'generated.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  useEffect(() => {
    if (isFormSubmitted) {
      handleDownload();
      setFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const PdfData = (
    <Document>
      <Page size="A4">
        <View>
          <View style={{ fontFamily: 'Helvetica', fontSize: 12, flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Image src={LogoUrl} style={{ width: "80px", height: '30px', backgroundColor: 'yellow' }} />
              <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', margin: "20px 0" }}>
                RETIREMENT SEPARATION REPORT
              </Text>

              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                DATED: {currentDate}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Emp Code</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Emp Name</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Designation</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Department</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Emp Cnic No.</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Date Of Joining</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Resignation Submission Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Resignation Acceptance Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Exit Date</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Resign Reason</Text>
            <Text style={{ width: '50%', textAlign: 'center', fontSize: '9', fontWeight: 'bold' }}>Type</Text>
          </View>

          {isRetirementSeparationReportData?.flatMap((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_Code ? item?.Emp_Code : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_Name ? item?.Emp_Name : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Designation ? item?.Designation : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Department ? item?.Department : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Emp_nic_no ? item?.Emp_nic_no : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.DateOfJoining ? item?.DateOfJoining : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Resignation_Submission_Date ? item?.Resignation_Submission_Date : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Resignation_Acceptance_Date ? item?.Resignation_Acceptance_Date : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.ExitDate ? item?.ExitDate : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Resign_reason ? item?.Resign_reason : null}</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '7' }}>{item?.Type ? item?.Type : null}</Text>


              </View>
            );
          })}
        </View>

      </Page>
    </Document>
  );

  const handleDownload = async () => {
    try {
      if (isRetirementSeparationReportData.length === 0) {
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
              <h4 className="text-dark">RETIREMENT SEPARATION REPORT</h4>
              <div className="">
                <FormInput
                  errors={errors}
                  control={control}
                  placeholder={'Date from'}
                  name={'From_Date'}
                  label={'Date from'}
                  type="date"
                />
                <FormInput
                  errors={errors}
                  control={control}
                  placeholder={'Date to'}
                  name={'To_Date'}
                  label={'Date to'}
                  type="date"
                />
              </div>
              <div className="paySlipBtnBox">
                <SimpleButton type={'submit'} loading={isLoading} title="Download PDF" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ Red_RetirementSeparationReport }) {
  return { Red_RetirementSeparationReport };
}

export default connect(mapStateToProps, {
  PostRetirementSeparationReportPayload: Red_RetirementSeparationReport_Action.PostRetirementSeparationReportPayload,
})(RetirementSeparationReport);

