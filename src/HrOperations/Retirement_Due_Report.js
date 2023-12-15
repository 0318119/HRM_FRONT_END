import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_Retirement_Due_Report_Action from '../store/actions/HrOperations/Retirement_Due_Report/index'
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

function Retirement_Due_Report({
    Red_Retirement_Due_Report,
    PostDueRetirementPayload,
}) {
    const [isLoading, setLoading] = useState(false);
    const empData = Red_Retirement_Due_Report?.data?.[0]?.res?.data
    const [isRetirementDueData, setRetirementDueData] = useState([])

    const RetirementDueSchema = yup.object().shape({
        fromdate: yup.string().required('Please Select From Date'),
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            fromdate: '',
        },
        mode: 'onChange',
        resolver: yupResolver(RetirementDueSchema),
    });
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const isValid = await RetirementDueSchema.validate(data);
            if (isValid) {
                const result = await PostDueRetirementPayload(data);
                console.log(result, 'result');
                if (result?.success) {
                    setRetirementDueData(result?.data || []);
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
                            DATED
                        </Text>
                    </View>
                    <>
                        <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Emp Code</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Emp Name</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Designation</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Emp sex code</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Emp Birth Date</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Months</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Years</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Company Code</Text>
                        </View>
                        {isRetirementDueData?.map((item, index) =>
                            <View key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000000', alignItems: 'center', height: 24 }}>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Emp_code ? item?.Emp_code : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Emp_name ? item?.Emp_name : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Desig_name ? item?.Desig_name : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Emp_sex_code ? item?.Emp_sex_code : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Emp_birth_date ? item?.Emp_birth_date : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Months ? item?.Months : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Years ? item?.Years : null}</Text>
                                <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.company_code ? item?.company_code : null}</Text>
                            </View>
                        )}
                    </>
                    {/* ))} */}
                </View>
            </Page>
        </Document>

    const handleDownload = async () => {
        try {
            const pdfBlob = await pdf([checkPdf]).toBlob();
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
                            <h4 className="text-dark">Retirement Due Report</h4>
                            <div className="">
                                <FormInput
                                    errors={errors}
                                    control={control}
                                    placeholder={'From Date'}
                                    name={'fromdate'}
                                    label={'From Date'}
                                    type="date"
                                />
                            </div>
                            <div className="paySlipBtnBox">
                                <SimpleButton type={'submit'} loading={isLoading} title="Save" />
                            </div>
                        </form>
                    </div>
                </div>

                {/* {isFormSubmitted && (
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-end">
            onClick={PDFDATA}
              <PrimaryButton  title="Download" disabled={isLoading} />
            </div>
          </div>
        )}*/}


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
            </div>
        </>
    );
}

function mapStateToProps({ Red_Retirement_Due_Report }) {
    return { Red_Retirement_Due_Report };
}

export default connect(mapStateToProps, Red_Retirement_Due_Report_Action)(Retirement_Due_Report);

