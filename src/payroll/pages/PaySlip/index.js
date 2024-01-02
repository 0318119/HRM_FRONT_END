import React, { useEffect, useState } from 'react'
import '../../assest/css/paySlip.css'
import Header from '../../../components/Includes/Header'
import { connect } from "react-redux";
import * as RED_PAY_SLIP_ACTION from '../../../store/actions/payroll/PaySlip/index'
import { FormInput, FormSelect } from "../../../components/basic/input/formInput";
import { PrimaryButton, Button } from "../../../components/basic/button";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Table } from "antd";
import PSPDFKit from 'pspdfkit';
import { Document, Page, Text, View, PDFViewer, Image, StyleSheet, pdf } from '@react-pdf/renderer';
import logo from '../../../../src/Assets/Images/logoMish.png'
import * as yup from "yup";



function PaySlip({
    Red_Pay_Slip,
    GetAllEmp,
    PostPaySlip,
    GETEmpPasswordCall
}) {

    const { List } = PSPDFKit.Immutable;
    const { DrawingPoint, Rect } = PSPDFKit.Geometry;
    const { InkAnnotation } = PSPDFKit.Annotations;
    const [isLoading, setLoading] = useState(false)
    const empData = Red_Pay_Slip?.data?.[0]?.res?.data
    const [isPDfData, setPDfData] = useState([])
    const [blobStore, setBobStore] = useState()
    const [PdfLoader, setPdfLoader] = useState(false)
    const [isPasswords, setPasswords] = useState(null)
    const [isGrossSalary, setGrossSalary] = useState(0)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    let date = new Date().toDateString()

    const [isRevisedTotal, setRevisedTotal] = useState({
        // Allowances Total ===================
        Allowance_Standard_Amount_Total: 0,
        Allowance_Current_Amount_Total: 0,
        Allowance_YTD_Amount_Total: 0,
        // Deductions Total ===================
        Deduction_Standard_amount_total: 0,
        Deduction_Total_Current_amount_total: 0,
        Deduction_Total_YTD_amount_total: 0,
    })


    // FOMR SHCEME =====================
    const PDFFROM = yup.object().shape({
        payslip_year: yup.string().required("Pay slip year is required"),
        payslip_month: yup.string().required("Pay slip month is required"),
        Emp_code: yup.string().required("Please Select the employee"),
    });
    // SELECT CUSTIMZE DEFAULT OPTION ===========================
    const defaultOption = { value: "-1", label: "All Employees" };
    const options = [
        defaultOption,
        ...(empData || []).map((item) => ({
            value: item.Emp_code,
            label: item.Emp_name,
        })),
    ];

    // DATA COLUMNS =========================
    const columns = [
        {
            title: 'Employee Code',
            dataIndex: 'Emp_Code',
            key: 'Emp_Code',
        },
        {
            title: 'Employee Name',
            dataIndex: 'Emp_name',
            key: 'Emp_name',
        },
        {
            title: 'Days Worked',
            dataIndex: 'Days_Worked',
            key: 'Days_Worked',
        },
        {
            title: 'Month',
            dataIndex: 'Payslip_Month_Name',
            key: 'Payslip_Month_Name',
        },
        {
            title: 'Gross Salary',
            dataIndex: 'Gross_Salary',
            key: 'Gross_Salary',
        },
    ];

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            payslip_year: "",
            payslip_month: "",
            Emp_code: "",
        },
        mode: "onChange",
        resolver: yupResolver(PDFFROM),
    });


    // PAY SLIP FORM VALIDE FUNCTION ===================
    const submitForm = async (data) => {
        setLoading(true)
        try {
            const isValid = await PDFFROM.validate(data);
            if (isValid) {
                confirmPwd(data?.Emp_code)
                confirmPaySlip(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const confirmPwd = async (data) => {
        const pwdRes = await GETEmpPasswordCall(data)
        if (pwdRes?.success) {
            console.log("object", pwdRes?.data?.[0]?.Emp_nic_no)
            setPasswords(pwdRes?.data?.[0]?.Emp_nic_no)
        } else {
            message.error(pwdRes?.message || pwdRes?.messsage)
        }
    }
    // PAY SLIP FORM POST FUNCTION
    const confirmPaySlip = async (data) => {
        const isWaitFun = await PostPaySlip(data)
        if (isWaitFun?.success) {
            if (isWaitFun?.data?.length == 0) {
                message.error("No Data Available")
                setLoading(false)
            } else {
                setLoading(false)
                message.success("Now, You can Download Pdf")
                setPDfData(isWaitFun?.data)
            }
        } else {
            message.error(isWaitFun?.message || isWaitFun?.messsage)
        }
    }

    // SET BY DEFAULT VALUES =================
    useEffect(() => {
        const selectedEmployee = empData?.find(item => item?.Emp_code == localStorage.getItem("Emp_code"));
        setValue('Emp_code', selectedEmployee?.Emp_code);
        setValue('payslip_month', currentMonth);
        setValue('payslip_year', currentYear);
    }, [setValue, empData, currentMonth, currentYear]);

    // PDF STYLES =================================================
    const styles = StyleSheet.create({
        imageBox: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            height: "80px",
        },
        imageClass: {
            width: "100px",
            height: "50px",
            objectFit: "contain",
            backgroundColor: "black",
            padding: "5px",
            display: "block",
            borderRadius: "10px",
        },
        textConfi: {
            textTransform: "uppercase",
            fontSize: "15px",
            fontWeight: "bold",
        },
        image: {
            height: "200px",
            width: "50%",
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
        },
        CompanyName: {
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bold',
            textTransform: "uppercase",
            marginTop: "20px"
        },
        Head: {
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bold',
            margin: "10px 0",
            marginBottom: "5px"
        },
        yearAndName: {
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bold',
            marginBottom: "30px",
            paddingBottom: "10px",
            borderBottom: "1px solid black",
        },
        upperBox: {
            flexDirection: "row",
            width: "100%",
        },
        row: {
            flexDirection: "column",
            borderBottom: '1 solid #F7F5F5',
            padding: '5px',
            marginBottom: '10',
            width: '50%',
        },
        column: {
            flexDirection: "row",
            textAlign: 'left',
            fontSize: '10',
            fontWeight: 'bold',
            width: "100%",
            marginTop: "1px",
        },
        textBox: {
            padding: "2px",
        },
        row2: {
            flexDirection: "column",
            width: "100%",
        },
        tableHead: {
            textAlign: "center",
            fontSize: '15',
            padding: "5px 0",
            backgroundColor: "black",
            color: "white",
            textTransform: "uppercase",
            width: "48%",
            margin: "10 auto",
            borderRadius: "5px",
            fontWeight: "bold",
        },
        rowInner: {
            flexDirection: "row",
            width: "96.50%",
            justifyContent: "space-between",
            padding: "5px",
            verticalAlign: "middle",
            margin: "0px 5px",
            border: '1px dashed gray',
            textAlign: "left",
        },
        textInner: {
            fontSize: "9",
            width: "50%",
        },
        netPayBox: {
            flexDirection: "row",
            width: "98%",
            justifyContent: "flex-end",
            border: '1px solid black',
            margin: "10px auto",
        },
        innerNetPayBox: {
            width: "50%",
            flexDirection: "row",
            fontSize: "10",
            padding: "10 0",
            justifyContent: "flex-end"
        },
        Gross_Salary: {
            padding: "5",
            marginLeft: "5",
        },
        signatureBox: {
            border: '1px dashed gray',
            width: "98%",
            margin: "10px auto",
            fontSize: "10",
            height: "100",
        },
        HRText: {
            textAlign: "center",
            borderBottom: '1px dashed gray',
            padding: "5 0",
        },
        borderBot: {
            borderTop: '1px dashed gray',
            marginTop: "20px",
        },
        userIdAndPrintBox: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40",
            padding: "0 10px",
        },
        botFlexBox: {
            flexDirection: "row",
            fontSize: "10px",
        }
    });

    // GENERATE PDF FUNCTION ===========
    const MyDoc = (
        <Document>
            <Page size="A4">
                <View>
                    <View style={styles.imageBox}>
                        <Image style={styles.imageClass} src={logo} />
                        <Text style={styles.textConfi}>Confidential</Text>
                    </View>
                    <Text style={styles.CompanyName}>{isPDfData?.[0]?.Company_name ? isPDfData?.[0]?.Company_name : "Empty"}</Text>
                    <Text style={styles.Head}>PaySlip</Text>
                    {/* Payslip for the month of December 2023 */}
                    <Text style={styles.yearAndName}>Payslip for the month of {isPDfData?.[0]?.Payslip_Month_Name ? isPDfData?.[0]?.Payslip_Month_Name : "Empty"} {isPDfData?.[0]?.Payslip_Year ? isPDfData?.[0]?.Payslip_Year : "Empty"}</Text>
                    {/* EMPLOYEE INFORMATIONS ================== */}
                    <View style={styles.upperBox}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Name :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_name ? isPDfData?.[0]?.Emp_name : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Designation :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Desig_name ? isPDfData?.[0]?.Desig_name : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Department :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Dept_name ? isPDfData?.[0]?.Dept_name : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>CNIC #:</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_nic_no ? isPDfData?.[0]?.Emp_nic_no : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Bank :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.bank_name ? isPDfData?.[0]?.bank_name : "Empty"}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>ID :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_Code ? isPDfData?.[0]?.Emp_Code : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Location :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Loc_name ? isPDfData?.[0]?.Loc_name : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Date of joining :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_appointment_date ? isPDfData?.[0]?.Emp_appointment_date.slice(0, 10) : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Account #:</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Bank_Account_No1 ? isPDfData?.[0]?.Bank_Account_No1 : "Empty"}</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.textBox}>Days Paid :</Text>
                                <Text style={styles.textBox}>{isPDfData?.[0]?.Days_Worked ? isPDfData?.[0]?.Days_Worked : "Empty"}</Text>
                            </View>
                        </View>
                    </View>
                    {/* ============================================= */}
                    <View style={styles.upperBox} className="mt-5">
                        {/* Allownces ================= */}
                        <View style={styles.row2}>
                            <Text style={styles.tableHead}>Allowances</Text>
                            <View style={styles.rowInner}>
                                <Text style={styles.textInner}>Allownce</Text>
                                <Text style={styles.textInner}>Standard</Text>
                                <Text style={styles.textInner}>Current Month</Text>
                                <Text style={styles.textInner}>YTD Amount</Text>
                            </View>
                            {isPDfData.map((item, index) => (
                                <View key={index} style={styles.rowInner}>
                                    <Text style={styles.textInner}>{item?.allowance_name ? item?.allowance_name : "Empty"}</Text>
                                    <Text style={styles.textInner}>{item?.Allowance_Standard_Amount ? item?.Allowance_Standard_Amount : "Empty"}</Text>
                                    <Text style={styles.textInner}>{item?.Allowance_Current_Amount ? item?.Allowance_Current_Amount : "Empty"}</Text>
                                    <Text style={styles.textInner}>{item?.Allowance_YTD_Amount ? item?.Allowance_YTD_Amount : "Empty"}</Text>
                                </View>
                            ))}
                            <View style={styles.rowInner}>
                                <Text style={styles.textInner}>{"Total"}</Text>
                                <Text style={styles.textInner}>{isRevisedTotal?.Allowance_Standard_Amount_Total}</Text>
                                <Text style={styles.textInner}>{isRevisedTotal?.Allowance_Current_Amount_Total}</Text>
                                <Text style={styles.textInner}>{isRevisedTotal?.Allowance_YTD_Amount_Total}</Text>
                            </View>
                        </View>
                        {/* DEDUCTIONS ================= */}
                        <View style={styles.row2}>
                            <Text style={styles.tableHead}>Deductions</Text>
                            <View style={styles.rowInner}>
                                <Text style={styles.textInner}>Deductions</Text>
                                <Text style={styles.textInner}>Standard</Text>
                                <Text style={styles.textInner}>Current Month</Text>
                                <Text style={styles.textInner}>YTD Amount</Text>
                            </View>
                            {isPDfData.map((item, index) => (
                                <View key={index} style={styles.rowInner}>
                                    <Text style={styles.textInner}>{item?.Deduction_name ? item?.Deduction_name : "---"}</Text>
                                    <Text style={styles.textInner}>{item?.Deduction_Standard_amount ? item?.Deduction_Standard_amount : 0}</Text>
                                    <Text style={styles.textInner}>{item?.Deduction_Total_Current_amount ? item?.Deduction_Total_Current_amount : 0}</Text>
                                    <Text style={styles.textInner}>{item?.Deduction_Total_YTD_amount ? item?.Deduction_Total_YTD_amount : 0}</Text>
                                </View>
                            ))}
                            <View style={styles.rowInner}>
                                <Text style={styles.textInner}>{"Total"}</Text>
                                <Text style={styles.textInner}>{isRevisedTotal?.Deduction_Standard_amount_total}</Text>
                                <Text style={styles.textInner}>{isRevisedTotal?.Deduction_Total_Current_amount_total}</Text>
                                <Text style={styles.textInner}>{isRevisedTotal?.Deduction_Total_YTD_amount_total}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.netPayBox}>
                        <View style={styles.innerNetPayBox}>
                            <Text style={styles.Gross_Salary}>Net Pay :</Text>
                            <Text style={styles.Gross_Salary}>{isGrossSalary}</Text>
                        </View>
                    </View>
                    <View style={styles.signatureBox}>
                        <Text style={styles.HRText}>This is a system generated document therefore, no signature is required. HR departmant can be contacted for any verification.</Text>
                    </View>
                    <View style={styles.borderBot}></View>
                    <View style={styles.userIdAndPrintBox}>
                        <View style={styles.botFlexBox}>
                            <Text style={styles.Gross_Salary}>User ID :</Text>
                            <Text style={styles.Gross_Salary}>{isPDfData?.[0]?.Emp_Code ? isPDfData?.[0]?.Emp_Code : "Empty"}</Text>
                        </View>
                        <View style={styles.botFlexBox}>
                            <Text style={styles.Gross_Salary}>Print Date :</Text>
                            <Text style={styles.Gross_Salary}>{date}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );


    // PDF Encryption data Funtion ========
    const PDFRenderData = async () => {
        setPdfLoader(true)
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            const container = document.createElement('div');
            container.style.display = 'none';
            document.body.appendChild(container);
            PSPDFKit.load({
                container,
                document: dataUrl,
                baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            })
                .then((instance) => {
                    instance.exportPDF({
                        permissions: {
                            userPassword: isPasswords,
                            ownerPassword: isPasswords,
                            documentPermissions: []
                        }
                    }).then((buffer) => {
                        const blob = new Blob([buffer], { type: "application/pdf" });
                        const fileName = "document.pdf";
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        } else {
                            const objectUrl = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = objectUrl;
                            a.style = "display: none";
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            URL.revokeObjectURL(objectUrl);
                            document.body.removeChild(a);
                            setPdfLoader(false)
                            // reset({
                            //     payslip_year: "",
                            //     payslip_month: "",
                            //     Emp_code: "",
                            // })
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error loading PSPDFKit', error);
                    setPdfLoader(false)
                });
        };
        const pdfBlob = await pdf(MyDoc).toBlob();
        reader.readAsDataURL(pdfBlob);
        return () => {
            PSPDFKit.unload('#pdf-container');
        };
    };

    // GET ALL EMPLOYEE DATA =====================
    useEffect(() => {
        GetAllEmp()
    }, [])



    useEffect(() => {
        if (isPDfData.length > 0 && isPasswords) {
            PDFRenderData()
        }
    }, [isPDfData, isPasswords, isGrossSalary])


    // SUM FUNCTION OF ALLOWNCES AND DEDUCTIONS, GROSS SALARY =================
    useEffect(() => {
        var temp1 = 0
        var temp2 = 0
        var temp3 = 0
        var temp4 = 0
        var temp5 = 0
        var temp6 = 0
        for (var i of isPDfData) {
            temp1 = temp1 + parseInt(i?.Allowance_Standard_Amount == null ? 0 : i?.Allowance_Standard_Amount)
            temp2 = temp2 + parseInt(i?.Allowance_Current_Amount == null ? 0 : i?.Allowance_Current_Amount)
            temp3 = temp3 + parseInt(i?.Allowance_YTD_Amount == null ? 0 : i?.Allowance_YTD_Amount)
            temp4 = temp4 + parseInt(i?.Deduction_Standard_amount == null ? 0 : i?.Deduction_Standard_amount)
            temp5 = temp5 + parseInt(i?.Deduction_Total_Current_amount == null ? 0 : i?.Deduction_Total_Current_amount)
            temp6 = temp6 + parseInt(i?.Deduction_Total_YTD_amount == null ? 0 : i?.Deduction_Total_YTD_amount)
            setRevisedTotal({
                // Allowances Total ===================
                Allowance_Standard_Amount_Total: temp1,
                Allowance_Current_Amount_Total: temp2,
                Allowance_YTD_Amount_Total: temp3,
                // Deductions Total ===================
                Deduction_Standard_amount_total: temp4,
                Deduction_Total_Current_amount_total: temp5,
                Deduction_Total_YTD_amount_total: temp6,
            })
            setGrossSalary(temp2 - temp5)
        }
    }, [isPDfData, isGrossSalary])

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container maringClass">
                <div />
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit(submitForm)} className='paySlipBox'>
                            <h4 className="text-dark">Pay Slip</h4>
                            <div className=''>
                                <FormSelect
                                    errors={errors}
                                    control={control}
                                    placeholder={"Select Employee"}
                                    name={'Emp_code'}
                                    label={'Select Employee'}
                                    options={options}
                                />
                                <FormSelect
                                    errors={errors}
                                    control={control}
                                    placeholder={"Select Month"}
                                    name={'payslip_month'}
                                    label={'Month'}
                                    options={[
                                        { value: 1, label: 'January' },
                                        { value: 2, label: 'February' },
                                        { value: 3, label: 'March' },
                                        { value: 4, label: 'April' },
                                        { value: 5, label: 'May' },
                                        { value: 6, label: 'June' },
                                        { value: 7, label: 'July' },
                                        { value: 8, label: 'August' },
                                        { value: 9, label: 'September' },
                                        { value: 10, label: 'October' },
                                        { value: 11, label: 'November' },
                                        { value: 12, label: 'December' },
                                    ]}
                                />
                                <FormSelect
                                    errors={errors}
                                    control={control}
                                    name={'payslip_year'}
                                    placeholder={'Pay slip year'}
                                    label={'Pay slip year'}
                                    options={[
                                        { value: 2021, label: '2021' },
                                        { value: 2022, label: '2022' },
                                        { value: 2023, label: '2023' },
                                        { value: 2024, label: '2024' },
                                        { value: 2025, label: '2025' },
                                    ]}
                                />
                            </div>
                            <div className='paySlipBtnBox'>
                                <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                                {/* {isDownload &&
                                    <Button loading={PdfLoader} onClick={PDFRenderData} type={'submit'} title="Download PaySlip" />
                                } */}
                            </div>
                        </form>
                    </div>
                </div>
                <div class="mt-5 row justify-content-center">
                    {isPDfData?.length > 0 && (
                        <Table
                            columns={columns}
                            loading={isLoading}
                            dataSource={isPDfData}
                            scroll={{ x: 10 }}
                            pagination={false}
                        />
                    )}
                    {/* <PDFViewer width="100%" height="750px"> */}
                    {/* <Document> */}
                    {/* <Page size="A4"> */}
                    {/* <View> */}
                    {/* <View style={styles.imageBox}>
                                        <Image style={styles.imageClass} src={logo} />
                                        <Text style={styles.textConfi}>Confidential</Text>
                                    </View>
                                    <Text style={styles.CompanyName}>{isPDfData?.[0]?.Company_name ? isPDfData?.[0]?.Company_name : "Empty"}</Text>
                                    <Text style={styles.Head}>PaySlip</Text> */}
                    {/* Payslip for the month of December 2023 */}
                    {/* <Text style={styles.yearAndName}>Payslip for the month of {isPDfData?.[0]?.Payslip_Month_Name ? isPDfData?.[0]?.Payslip_Month_Name : "Empty"} {isPDfData?.[0]?.Payslip_Year ? isPDfData?.[0]?.Payslip_Year : "Empty"}</Text> */}
                    {/* EMPLOYEE INFORMATIONS ================== */}
                    {/* <View style={styles.upperBox}>
                                        <View style={styles.row}>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Name :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_name ? isPDfData?.[0]?.Emp_name : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Designation :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Desig_name ? isPDfData?.[0]?.Desig_name : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Department :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Dept_name ? isPDfData?.[0]?.Dept_name : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>CNIC #:</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_nic_no ? isPDfData?.[0]?.Emp_nic_no : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Bank :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.bank_name ? isPDfData?.[0]?.bank_name : "Empty"}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>ID :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_Code ? isPDfData?.[0]?.Emp_Code : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Location :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Loc_name ? isPDfData?.[0]?.Loc_name : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Date of joining :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Emp_appointment_date ? isPDfData?.[0]?.Emp_appointment_date.slice(0, 10) : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Account #:</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Bank_Account_No1 ? isPDfData?.[0]?.Bank_Account_No1 : "Empty"}</Text>
                                            </View>
                                            <View style={styles.column}>
                                                <Text style={styles.textBox}>Days Paid :</Text>
                                                <Text style={styles.textBox}>{isPDfData?.[0]?.Days_Worked ? isPDfData?.[0]?.Days_Worked : "Empty"}</Text>
                                            </View>
                                        </View>
                                    </View> */}
                    {/* ============================================= */}
                    {/* <View style={styles.upperBox} className="mt-5"> */}
                    {/* Allownces ================= */}
                    {/* <View style={styles.row2}>
                                            <Text style={styles.tableHead}>Allowances</Text>
                                            <View style={styles.rowInner}>
                                                <Text style={styles.textInner}>Allownce</Text>
                                                <Text style={styles.textInner}>Standard</Text>
                                                <Text style={styles.textInner}>Current Month</Text>
                                                <Text style={styles.textInner}>YTD Amount</Text>
                                            </View>
                                            {isPDfData.map((item, index) => (
                                                <View key={index} style={styles.rowInner}>
                                                    <Text style={styles.textInner}>{item?.allowance_name ? item?.allowance_name : "Empty"}</Text>
                                                    <Text style={styles.textInner}>{item?.Allowance_Standard_Amount ? item?.Allowance_Standard_Amount : "Empty"}</Text>
                                                    <Text style={styles.textInner}>{item?.Allowance_Current_Amount ? item?.Allowance_Current_Amount : "Empty"}</Text>
                                                    <Text style={styles.textInner}>{item?.Allowance_YTD_Amount ? item?.Allowance_YTD_Amount : "Empty"}</Text>
                                                </View>
                                            ))}
                                            <View style={styles.rowInner}>
                                                <Text style={styles.textInner}>{"Total"}</Text>
                                                <Text style={styles.textInner}>{isRevisedTotal?.Allowance_Standard_Amount_Total}</Text>
                                                <Text style={styles.textInner}>{isRevisedTotal?.Allowance_Current_Amount_Total}</Text>
                                                <Text style={styles.textInner}>{isRevisedTotal?.Allowance_YTD_Amount_Total}</Text>
                                            </View>
                                        </View> */}
                    {/* DEDUCTIONS ================= */}
                    {/* <View style={styles.row2}>
                                            <Text style={styles.tableHead}>Deductions</Text>
                                            <View style={styles.rowInner}>
                                                <Text style={styles.textInner}>Deductions</Text>
                                                <Text style={styles.textInner}>Standard</Text>
                                                <Text style={styles.textInner}>Current Month</Text>
                                                <Text style={styles.textInner}>YTD Amount</Text>
                                            </View>
                                            {isPDfData.map((item, index) => (
                                                <View key={index} style={styles.rowInner}>
                                                    <Text style={styles.textInner}>{item?.Deduction_name ? item?.Deduction_name : "---"}</Text>
                                                    <Text style={styles.textInner}>{item?.Deduction_Standard_amount ? item?.Deduction_Standard_amount : 0}</Text>
                                                    <Text style={styles.textInner}>{item?.Deduction_Total_Current_amount ? item?.Deduction_Total_Current_amount : 0}</Text>
                                                    <Text style={styles.textInner}>{item?.Deduction_Total_YTD_amount ? item?.Deduction_Total_YTD_amount : 0}</Text>
                                                </View>
                                            ))}
                                            <View style={styles.rowInner}>
                                                <Text style={styles.textInner}>{"Total"}</Text>
                                                <Text style={styles.textInner}>{isRevisedTotal?.Deduction_Standard_amount_total}</Text>
                                                <Text style={styles.textInner}>{isRevisedTotal?.Deduction_Total_Current_amount_total}</Text>
                                                <Text style={styles.textInner}>{isRevisedTotal?.Deduction_Total_YTD_amount_total}</Text>
                                            </View>
                                        </View> */}
                    {/* </View> */}
                    {/* <View style={styles.netPayBox}>
                                        <View style={styles.innerNetPayBox}>
                                            <Text style={styles.Gross_Salary}>Net Pay :</Text>
                                            <Text style={styles.Gross_Salary}>{isGrossSalary}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.signatureBox}>
                                        <Text style={styles.HRText}>This is a system generated document therefore, no signature is required. HR departmant can be contacted for any verification.</Text>
                                    </View>
                                    <View style={styles.borderBot}></View>
                                    <View style={styles.userIdAndPrintBox}>
                                        <View style={styles.botFlexBox}>
                                            <Text style={styles.Gross_Salary}>User ID :</Text>
                                            <Text style={styles.Gross_Salary}>{isPDfData?.[0]?.Emp_Code ? isPDfData?.[0]?.Emp_Code : "Empty"}</Text>
                                        </View>
                                        <View style={styles.botFlexBox}>
                                            <Text style={styles.Gross_Salary}>Print Date :</Text>
                                            <Text style={styles.Gross_Salary}>{date}</Text>
                                        </View>
                                    </View> */}
                    {/* </View> */}
                    {/* </Page> */}
                    {/* </Document> */}
                    {/* </PDFViewer> */}
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ Red_Pay_Slip }) {
    return { Red_Pay_Slip };
}
export default connect(mapStateToProps, RED_PAY_SLIP_ACTION)(PaySlip) 