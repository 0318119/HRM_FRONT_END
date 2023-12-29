import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Red_Experience_Report_Action from '../store/actions/HrOperations/Experience_Report/index'
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
            Emp_Code: ' ', // Set the default employee code here
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


    console.log(Red_Experience_Report, "Response")

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const isValid = await ExperienceSchema.validate(data);
            if (isValid) {
                const result = await PostExperiencePayload(data.Emp_Code);
                if (result?.success) {
                    message.success('PDF is created, Wait PDF is under downloading...');
                    setFormSubmitted(true);
                    isExperienceReportData(result?.data);
                    setSelectedEmployee(data.Emp_Code);
                    console.log("data.Emp_Code", data.Emp_Code)
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
                            EXPERIENCE REPORT
                        </Text>
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            DATED: {currentDate}
                        </Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        {isExperienceReportData?.map((item, index) => (
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
        if (isExperienceReportData.length > 0) {
            handleDownload();
        }
    }, [isExperienceReportData]);

    const handleDownload = async () => {
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
    return (
        <>
            <Header />
            <div className="container maringClass">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="paySlipBox">
                            <h4 className="text-dark"> EXPERIENCE REPORT</h4>
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
                                <SimpleButton type={'submit'} onClick={handleDownload} loading={isLoading} title="Download PDF" />
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
