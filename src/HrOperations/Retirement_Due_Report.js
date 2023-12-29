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
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const empData = Red_Retirement_Due_Report?.data?.[0]?.res?.data
    const [isRetirementDueData, setRetirementDueData] = useState([])
    const [currentDate, setCurrentDate] = useState('');
    const [toDate, setToDate] = useState('');


    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setCurrentDate(currentDate);
        setToDate(currentDate); // Set the initial "To date" value
      }, []);

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
            if (result?.success) {
              message.success('PDF is created, Wait PDF is under downloading...');
              setFormSubmitted(true);
              setRetirementDueData(result?.data); // Set the appointment data immediately
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
                            RETIREMENT DUE REPORT
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                            DATED:{currentDate}
                        </Text>
                    </View>
                    <>
                        <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Code</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Name</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Designation</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>sex code</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Birth Date</Text>
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

            </div>
        </>
    );
}

function mapStateToProps({ Red_Retirement_Due_Report }) {
    return { Red_Retirement_Due_Report };
}

export default connect(mapStateToProps, Red_Retirement_Due_Report_Action)(Retirement_Due_Report);



