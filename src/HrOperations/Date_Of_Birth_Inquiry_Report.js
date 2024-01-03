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
import * as Red_Date_Of_Birth_Inquiry_Report_Action from '../store/actions/HrOperations/Date_Of_Birth_Inquiry_Report';

function Date_Of_Birth_Inquiry_Report({
    Red_Date_Of_Birth_Inquiry_Report,
    PostDOBPayload,
}) {
    const [isLoading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const empData = Red_Date_Of_Birth_Inquiry_Report?.data?.[0]?.res?.data;
    const [isDOBReportData, setDOBReportData] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');


    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setCurrentDate(currentDate);
        setToDate(currentDate); // Set the initial "To date" value
    }, []);

    // ===== SCHEMA =================
    const DOBReportSchema = yup.object().shape({
        Emp_DOB: yup.string().required('Please Select the Birth Month'),
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {
            Emp_DOB: '', // Set the default employee code here
        },
        mode: 'onChange',
        resolver: yupResolver(DOBReportSchema),
    });



    // Set the default value for the Emp_DOB field
    useEffect(() => {
        if (empData && empData.length > 0) {
            setValue('Emp_DOB', empData[0].Emp_DOB);
        }
    }, [empData, setValue]);


    // console.log( Red_Date_Of_Birth_Inquiry_Report, "Response")

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const isValid = await DOBReportSchema.validate(data);
            if (isValid) {
                const result = await PostDOBPayload(data.Emp_DOB);
                if (result?.success) {
                    message.success('PDF is created, Wait PDF is under downloading...');
                    setFormSubmitted(true);
                    setDOBReportData(result?.data);
                    console.log(result?.data, 'ugsfosdj')

                    setSelectedEmployee(data.Emp_DOB);
                    // console.log("data.Emp_DOB", data.Emp_DOB)
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
        date: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 10,
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
        employeeName: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        employeeDesignation: {
            fontSize: 12,
            marginBottom: 10,
            color: '#555',
        },
        detailItem: {
            fontSize: 12,
            marginBottom: 5,
            color: '#333',
        },
        detailLabel: {
            fontWeight: 'bold',
            marginRight: 5,
        },
    };

    const PdfData =
        <Document >
            <Page size="A4">
                <View style={{ fontFamily: 'Helvetica', fontSize: 12, flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Image src={LogoUrl} style={{ width: "80px", height: '30px', backgroundColor: 'yellow' }} />
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', margin: "20px 0" }}>
                            DATE OF BIRTH INQUIRY REPORT
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                            DATED: {currentDate}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Employee Code</Text>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Employee Name</Text>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Designation</Text>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Department</Text>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Date Of Birth</Text>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Month</Text>
                        <Text style={{ width: '50%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', backgroundColor: '#EFEFEF' }}>Day</Text>

                    </View>
                    {isDOBReportData?.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000000', alignItems: 'center', height: 24 }}>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Emp_id ? item?.Emp_id : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.EmpName ? item?.EmpName : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Designation ? item?.Designation : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.Department ? item?.Department : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.DOB ? item?.DOB : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.MonthNumber ? item?.MonthNumber : null}</Text>
                            <Text style={{ width: '50%', textAlign: 'center', fontSize: 8, backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }}>{item?.DAY ? item?.DAY : null}</Text>
                        </View>
                    )

                    )}
                </View>
            </Page>
        </Document>


    useEffect(() => {
        if (isDOBReportData.length > 0) {
            handleDownload();
        }
    }, [isDOBReportData]);

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
                            <h4 className="text-dark">DATE OF BIRTH INQUIRY </h4>
                            <div className="">
                                <FormSelect

                                    label={'Select Month'}
                                    placeholder='Select Month'
                                    errors={errors}
                                    control={control}
                                    name={'Emp_DOB'}
                                    type="Month"
                                    options={[
                                        {
                                            value: 1,
                                            label: 'January'
                                        },
                                        {
                                            value: 2,
                                            label: 'Feburary'
                                        },
                                        {
                                            value: 3,
                                            label: 'March'
                                        },
                                        {
                                            value: 4,
                                            label: 'April'
                                        },
                                        {
                                            value: 5,
                                            label: 'May'
                                        },
                                        {
                                            value: 6,
                                            label: 'June'
                                        },
                                        {
                                            value: 7,
                                            label: 'July'
                                        },
                                        {
                                            value: 8,
                                            label: 'August'
                                        },
                                        {
                                            value: 9,
                                            label: 'September'
                                        },
                                        {
                                            value: 10,
                                            label: 'October'
                                        },
                                        {
                                            value: 11,
                                            label: 'November'
                                        },
                                        {
                                            value: 12,
                                            label: 'December'
                                        },
                                    ]}


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

function mapStateToProps({ Red_Date_Of_Birth_Inquiry_Report }) {
    return { Red_Date_Of_Birth_Inquiry_Report };
}

export default connect(mapStateToProps, {
    PostDOBPayload: Red_Date_Of_Birth_Inquiry_Report_Action.PostDOBPayload,
})(Date_Of_Birth_Inquiry_Report);
