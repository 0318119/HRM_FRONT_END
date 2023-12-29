
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormInput, FormSelect } from '../components/basic/input/formInput';
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
import Input from '../components/basic/input';
import { CheckBox } from '@mui/icons-material';

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
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setCurrentDate(currentDate);
    setToDate(currentDate); // Set the initial "To date" value
  }, []);

  useEffect(() => {
    // Set the current date and time when the component mounts
    updateDateTime();

    // Update the current date and time every second
    const intervalId = setInterval(() => {
      updateDateTime();
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const updateDateTime = () => {
    const currentDateTime = new Date();
    const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setCurrentTime(formattedTime);
  };

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
    defaultValues: {
      Emp_code: "", // Set the default employee code here
    },
    mode: 'onChange',
    resolver: yupResolver(TranEducationReportSchema),
  });

  // GET ALL EMPLOYEE DATA =====================
  useEffect(() => {
    GetTransAllEmp();
  }, [GetTransAllEmp]);

  // // Set the default value for the Emp_code field
  useEffect(() => {
    if (empData && empData.length > 0) {
      setValue('Emp_code', empData[0].Emp_Code);
    }
  }, [empData, setValue]);


  console.log(Red_TranEducationReport, "Response")

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isValid = await TranEducationReportSchema.validate(data);
      if (isValid) {
        const result = await PostTranEducationPayload(data.Emp_code);
        if (result?.success) {
          message.success('PDF is created, Wait PDF is under downloading...');
          setFormSubmitted(true);
          setTranEducationReportData(result?.data);
          setSelectedEmployee(data.Emp_code);
          console.log("data.Emp_code", data.Emp_code)
        } else {
          message.error(result?.message || result?.messsage);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };


  const styles = {
    document: {
      padding: 20,
      fontFamily: 'Helvetica',
      backgroundColor: '#f4f4f4',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: '80px',
      height: '30px',
      backgroundColor: 'yellow',
    },
    title: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    dateTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Adjusted to 'baseline' for vertical alignment
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    date: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    time: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    employeeSection: {
      marginBottom: 20,
    },
    employeeItem: {
      marginBottom: 15,
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 5,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    companyName: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    employeeName: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    employeeDesignation: {
      fontSize: 12,
      marginBottom: 10,
      color: '#555',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingBottom: 5,
      marginBottom: 5,
    },
    tableCell: {
      flex: 1,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };
  const PdfData = (
    <Document>
      <Page size="A4" style={styles.document}>
        <View>
          <View style={styles.header}>
            <Image src={LogoUrl} style={styles.logo} />
            <View style={styles.companyName}>
              <Text style={styles.title}>TRANSACTION EDUCATION REPORT</Text>
              <Text style={styles.title}>LOGOMISH</Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.date}>DATED: {currentDate}</Text>
              <Text style={styles.time}>{currentTime}</Text>
            </View>
          </View>
          <View style={styles.employeeSection}>
            {isTranEducationReportData?.map((item, index) => (
              <View key={index} style={styles.employeeItem}>
                <View style={{ padding: 5, flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.employeeName}>Employee Code: <Text style={styles.employeeDesignation}>{item?.Emp_code}</Text></Text>
                    <Text style={styles.employeeName}>Department: <Text style={styles.employeeDesignation}>{item?.Dept_name}</Text></Text>
                    <Text style={styles.employeeName}>Designation: <Text style={styles.employeeDesignation}>{item?.employeeDesig}</Text></Text>
                  </View>
                  <View>
                    <Text style={styles.employeeName}>Employee Name: <Text style={styles.employeeDesignation}>{item?.Emp_name}</Text></Text>
                    <Text style={styles.employeeName}>Location: <Text style={styles.employeeDesignation}>{item?.Location}</Text></Text>
                    <Text style={styles.employeeName}> <Text style={styles.employeeDesignation}></Text></Text>
                  </View>
                </View>
                <View style={{ marginTop: '50px' }}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Institution</Text>
                    <Text style={styles.tableCell}>Education</Text>
                    <Text style={styles.tableCell}>Year</Text>
                    <Text style={styles.tableCell}>Grade</Text>
                    <Text style={styles.tableCell}>Top flag</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item?.Institution_Name}</Text>
                    <Text style={styles.tableCell}>{item?.Edu_name}</Text>
                    <Text style={styles.tableCell}>{item?.Edu_year}</Text>
                    <Text style={styles.tableCell}>{item?.Edu_Grade}</Text>
                    <Text style={styles.tableCell}>{item?.Top_flag}</Text>
                  </View>
                </View>
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
      saveAs(pdfBlob, `Employee Code_${selectedEmployee}.pdf`);
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
