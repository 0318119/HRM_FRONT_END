
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormSelect } from '../components/basic/input/formInput';
import Header from '../components/Includes/Header';
import { SimpleButton } from '../components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LogoUrl from '../../src/Assets/Images/download.png';
import { GET_TranEducationReport_DATA } from '../store/actions/types';
import * as Red_TranEducationReport_Action from '../store/actions/HrOperations/TranEducationReport';

function TranEducationReport({
  GetTransAllEmp,
  Red_TranEducationReport,
  PostTranEducationPayload,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const empData = Red_TranEducationReport?.data?.[0]?.res?.data;
  const [isTranEducationReportData, setTranEducationReportData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');


  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setCurrentDate(currentDate);
    setToDate(currentDate); // Set the initial "To date" value
  }, []);

  // ===== SCHEMA =================
  const TranEducationReportSchema = yup.object().shape({
    Emp_code: yup.string().required('Please Select the employee'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(TranEducationReportSchema),
  });

  // GET ALL EMPLOYEE DATA =====================
  useEffect(() => {
    GetTransAllEmp();
  }, [GetTransAllEmp]);


  console.log(Red_TranEducationReport, "Response")

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isValid = await TranEducationReportSchema.validate(data);
      if (isValid) {
        setSelectedEmployee(data.Emp_code);
        const result = await PostTranEducationPayload(data.Emp_code);
        if (result?.success) {
          message.success('PDF is created, Wait PDF is under downloading...');
          setFormSubmitted(true);
          setTranEducationReportData(result?.data);
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
        <View style={{ padding: 20, fontFamily: 'Helvetica' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image src={LogoUrl} style={{ width: '80px', height: '30px', backgroundColor: 'yellow' }} />
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', margin: '20px 0' }}>
              TRANSACTION EDUCATION REPORT
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
              DATED: {currentDate}
            </Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            {isTranEducationReportData?.map((item, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{item?.Emp_name}</Text>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>{item?.employeeDesig}</Text>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Department:</Text> {item?.Dept_name}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Education:</Text> {item?.Edu_name}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Institution:</Text> {item?.Institution_Name}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Year:</Text> {item?.Edu_year}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Grade:</Text> {item?.Edu_Grade}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Top flag:</Text> {item?.Top_flag}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Grade Name:</Text> {item?.GradeName}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Location:</Text> {item?.Location}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>

  );

  useEffect(() => {
    if (isTranEducationReportData.length > 0) {
      handleDownload();
    }
  }, [isTranEducationReportData]);

  const handleDownload = async () => {
    try {
      if (!selectedEmployee) {
        message.error('Please select an employee.');
        return;
      }

      // Generate PDF for the selected employee
      const pdfBlob = await pdf(PdfData).toBlob();

      // Save the PDF
      saveAs(pdfBlob, `generated_${selectedEmployee.Edu_name}.pdf`);
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
              <h4 className="text-dark">TRANSACTION EDUCATION REPORT</h4>
              <div className="">
                <FormSelect
                  errors={errors}
                  control={control}
                  id='Emp_code'
                  placeholder={'Select Employee'}
                  label={'Select Employee'}
                  name='Emp_code'
                  options={empData?.map(
                    (item) => ({
                      value: item.Emp_Code,
                      label: item.emp_name,
                    })
                  )}
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

function mapStateToProps({ Red_TranEducationReport }) {
  return { Red_TranEducationReport };
}

export default connect(mapStateToProps, {
  PostTranEducationPayload: Red_TranEducationReport_Action.PostTranEducationPayload,
  GetTransAllEmp: Red_TranEducationReport_Action.GetTransAllEmp,
})(TranEducationReport);
