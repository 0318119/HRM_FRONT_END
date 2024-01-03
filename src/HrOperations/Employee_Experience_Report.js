import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_Experience_Report_Action from '../store/actions/HrOperations/Employee_Experience_Report/index'
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import Header from "../components/Includes/Header";
import { PrimaryButton, SimpleButton } from '../components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, PDFViewer, Image, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LogoUrl from "../../src/Assets/Images/download.png"
import { Column } from '@ant-design/plots';


function Experience_Report({
    GetExperienceAllEmp,
    Red_Experience_Report,
    PostExperiencePayload,
}) {
    const [isLoading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const empData = Red_Experience_Report?.data?.data;
    const [isExperienceReportData, setExperienceReportData] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');


    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setCurrentDate(currentDate);
        setToDate(currentDate); // Set the initial "To date" value
    }, []);

    // ===== SCHEMA =================
    const ExperienceSchema = yup.object().shape({
        Emp_Code: yup.string().required('Please Select the employee'),
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {
            Emp_Code: 'defaultEmployeeCode', // Set the default employee code here
        },
        mode: 'onChange',
        resolver: yupResolver(ExperienceSchema),
    });

    // GET ALL EMPLOYEE DATA =====================
    useEffect(() => {
        GetExperienceAllEmp();
    }, [GetExperienceAllEmp]);


    // Set the default value for the Emp_code field
    useEffect(() => {
        if (empData && empData.length > 0) {
            setValue('Emp_Code', empData[0].Emp_Code);
        }
    }, [empData, setValue]);


    // console.log(Red_Experience_Report, "Response")

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const isValid = await ExperienceSchema.validate(data);

            if (isValid) {
                const result = await PostExperiencePayload(data?.Emp_Code);
                if (result?.success) {
                    message.success('PDF is created, Wait PDF is under downloading...');
                    setExperienceReportData(result?.data);
                    setFormSubmitted(true);
                    setSelectedEmployee(data?.Emp_Code);
                    // console.log("data.Emp_Code", result?.data)
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Image src={LogoUrl} style={{ width: "80px", height: '30px', backgroundColor: 'yellow' }} />
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold', margin: "20px 0" }}>
                                EMPLOYEE EXPERIENCE REPORT
                            </Text>
                            {isExperienceReportData?.length > 0 && (
                                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>
                                    As of Date: {isExperienceReportData[0]?.As_of_Date}
                                </Text>
                            )}
                        </View>

                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                            DATED: {currentDate}
                        </Text>
                    </View>
                    <View style={styles.employeeSection}>
                        {isExperienceReportData?.map((item, index) => (
                            <View key={index} style={styles.employeeItem}>
                                <View style={{ padding: 5, flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={styles.employeeName}>Employee Code: <Text style={styles.employeeDesignation}>{item?.Emp_Code}</Text></Text>
                                        <Text style={styles.employeeName}>Department: <Text style={styles.employeeDesignation}>{item?.Dept_name}</Text></Text>
                                    </View>
                                    <View>
                                        <Text style={styles.employeeName}>Employee Name: <Text style={styles.employeeDesignation}>{item?.Emp_name}</Text></Text>
                                        <Text style={styles.employeeName}>Designation: <Text style={styles.employeeDesignation}>{item?.Designation}</Text></Text>
                                        <Text style={styles.employeeName}>Company Name: <Text style={styles.employeeDesignation}>{item?.Company_Name}</Text></Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: '50px' }}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>Start Date</Text>
                                        <Text style={styles.tableCell}>End Date</Text>
                                        <Text style={styles.tableCell}>Industry Flag</Text>
                                        <Text style={styles.tableCell}>Total Experience</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{item?.Start_date}</Text>
                                        <Text style={styles.tableCell}>{item?.End_date}</Text>
                                        <Text style={styles.tableCell}>{item?.Industry_Flag}</Text>
                                        <Text style={styles.tableCell}>{item?.TotalExperience}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );

    const handleDownload = async () => {
        console.log(selectedEmployee, 'selectedEmployee')
        try {
            if (!selectedEmployee) {
                message.error('Please select an employee.');
                return;
            }

            // Generate PDF for the selected employee
            const pdfBlob = await pdf(PdfData).toBlob();

            // Save the PDF
            saveAs(pdfBlob, `Employee_Report_${selectedEmployee}.pdf`);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    useEffect(() => {
        if (isExperienceReportData?.length > 0) {
            handleDownload();
        }
    }, [isExperienceReportData]);

    return (
        <>
            <Header />
            <div className="container maringClass">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
                            <h4 className="text-dark"> EMPLOYEE EXPERIENCE </h4>
                            <div className="">
                                <FormSelect
                                    errors={errors}
                                    control={control}
                                    id='Emp_Code'
                                    placeholder={'Select Employee'}
                                    label={'Select Employee'}
                                    name='Emp_Code'
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

function mapStateToProps({ Red_Experience_Report }) {
    return { Red_Experience_Report };
}

export default connect(mapStateToProps, {
    PostExperiencePayload: Red_Experience_Report_Action.PostExperiencePayload,
    GetExperienceAllEmp: Red_Experience_Report_Action.GetExperienceAllEmp,
})(Experience_Report);




