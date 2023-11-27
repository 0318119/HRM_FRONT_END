import React, { useEffect, useRef, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import PSPDFKit from 'pspdfkit';
import * as sTaxReport_Action from "../../../../store/actions/payroll/taxReport/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, PrimaryButton } from '../../../../components/basic/button';
import { FormSelect } from '../../../../components/basic/input/formInput';
import SecondaryHeader from '../../../component/secondaryHeader';
import Header from '../../../../components/Includes/Header';
import Style from './taxReport.module.css'
import { DateTime } from "luxon";

const TaxPayslip = ({ TaxPdfData, GetAllEmp, GetAllEmpPass, GetCompanyLogo }) => {
    const [loading, setLoading] = useState(false)
    const [blobStore, setBobStore] = useState()
    const [selectOption, setSelectOPtion] = useState()
    const [companyLogo, setComapnyLogo] = useState()
    const [isDownload, setIsdownload] = useState(false)
    const [PdfLoader, setPdfLoader] = useState(false)
    const [pdfPassowrd, setPdfPassowrd] = useState()

    const borderColor = 'black'

    useEffect(() => {
        DataLoader()
    }, [])

    const DataLoader = async () => {
        const data = await GetAllEmp()
        const LogoCompany = await GetCompanyLogo()
        setComapnyLogo(LogoCompany?.data[0]?.Logo_Url)
        setSelectOPtion(data?.data)
    }

    const options = [
        ...(selectOption || []).map((item) => ({
            value: item.Emp_code,
            label: item.Emp_name,
        })),
    ];

    const [monthList, setmonthList] = useState([
        {
            "value": 1,
            "label": "January"
        },
        {
            "value": 2,
            "label": "February"
        },
        {
            "value": 3,
            "label": "March"
        },
        {
            "value": 4,
            "label": "April"
        },
        {
            "value": 5,
            "label": "May"
        },
        {
            "value": 6,
            "label": "June"
        },
        {
            "value": 7,
            "label": "July"
        },
        {
            "value": 8,
            "label": "August"
        },
        {
            "value": 9,
            "label": "September"
        },
        {
            "value": 10,
            "label": "October"
        },
        {
            "value": 11,
            "label": "November"
        },
        {
            "value": 12,
            "label": "December"
        }
    ])
    const [monthSalary, setMonthSalary] = useState([
        {
            "value": 2021,
            "label": "2021"
        },
        {
            "value": 2022,
            "label": "2022"
        },
        {
            "value": 2023,
            "label": "2023"
        }
    ])
    const styles = StyleSheet.create({
        tableContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            fontSize: 10,
            marginTop: 24,
            borderWidth: 1,
            borderColor: 'black',
            marginHorizontal: 10
        },
        row: {
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignItems: 'center',
            fontSize: 10,
            height: 24,
            fontStyle: 'bold',
        },
        container: {
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignItems: 'center',
            fontSize: 10,
            height: 24,
            fontStyle: 'bold',
        },
        container_Second: {
            flexDirection: 'row',
            width:"100%",
            fontSize: 10,
        },
        cellone_Space: {
            width: '35%',
            textAlign: 'left',
            borderColor: borderColor,
            borderWidth: 1,
            paddingVertical: 10,
            fontSize: 10,
            paddingLeft: 8,
            marginLeft: 10
        },
        cellone_Space_2: {
            width: '30%',
            textAlign: 'left',
            borderColor: borderColor,
            borderWidth: 1,
            paddingVertical: 10,
            fontSize: 10,
            paddingLeft: 8,
            marginLeft: 20
        },
        cellone: {
            width: '20%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderBottomColorColor: borderColor,
            borderRightWidth: 1,
            fontSize: 10,
            paddingLeft: 8,
        },
        celltwo: {
            width: '20%',
            textAlign: 'center',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            fontSize: 10,
            paddingLeft: 8,
        },
        cellthree: {
            width: '20%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
            fontSize: 10,
        },
        cellfour: {
            width: '20%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
            fontSize: 10,
        },
        cellfive: {
            width: '20%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
            fontSize: 10,
        },
        cellsix: {
            width: '20%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
            fontSize: 10,
        },
        cellseven: {
            width: '20%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
            fontSize: 10,
        },



        TopHeader: {
            flexDirection: 'row',
            paddingHorizontal: 10
        },


        TableHeaderContainer: {
            width: '60%',
            paddingVertical: '20px',
            textAlign: 'center',
        },
        LogoLeft: {
            width: '20%',
            paddingVertical: '20px',
        },
        HeaderDate: {
            width: '20%',
            textAlign: 'center',
            paddingVertical: '20px',
        },
        LogoImage: {
            width: 100
        },

        HeadingTop: {
            fontSize: 23,
            color: "black",
            fontWeight: 900,
        },
        TableEmployeeDetail: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 20,
        },
        cellone_Space_1: {
            width: '20%',
            textAlign: 'left',
            borderColor: borderColor,
            borderWidth: 1,
            paddingVertical: 10,
            fontSize: 10,
            paddingLeft: 8,
        },
        cellone_Space_2: {
            width: '40%',
            textAlign: 'left',
            borderColor: borderColor,
            borderWidth: 1,
            paddingVertical: 10,
            fontSize: 10,
            paddingLeft: 8,
            marginLeft: 20

        },
        cellone_Space_3: {
            width: '40%',
            textAlign: 'left',
            borderColor: borderColor,
            borderWidth: 1,
            paddingVertical: 10,
            fontSize: 10,
            paddingLeft: 8,
            marginLeft: 20
        },
        DatePrint: {
            fontSize: 10,
            marginTop: 5
        },
        containerAppand:{
            padding:10,
            width:'50%',
            paddingRight:10
        },
        cellone_second:{
            width:'50%',
            textAlign:'center',
            paddingVertical:5,
            borderRightColor:borderColor,
            borderWidth:1
        },
        ThirdColumn:{
            flexDirection:'row'
        },
        cellone_Third_one:{
            textAlign:'center',
            borderRightColor:borderColor,
            borderWidth:1,
            width:'40%',
            paddingVertical:5
        },
        cellone_Third_second:{
            textAlign:'center',
            borderRightColor:borderColor,
            borderWidth:1,
            width:'30%',
            paddingVertical:5

        },
        cellone_Third_third:{
            textAlign:'center',
            borderRightColor:borderColor,
            borderWidth:1,
            width:'30%',
            paddingVertical:5

        },
        cellone_second1:{
            width:'80%',
            textAlign:'center',
            paddingVertical:5,
            borderRightColor:borderColor,
            borderWidth:1
        },
    });

    const submitForm = async (data) => {
        setLoading(true)
        const DataFromApi = await TaxPdfData({
            payrollYear: data?.Year,
            payroll_month: data?.Month,
            Emp_Code: data?.Employee_Id
        })
        const PasswordData = await GetAllEmpPass(data?.Employee_Id)
        setPdfPassowrd(PasswordData.data[0]?.Emp_nic_no)
        const MyDoc = (
            <Document>
                <Page>

                    <View style={styles.TopHeader}>
                        <View style={styles.LogoLeft}>
                            <Image style={styles.LogoImage} src={`https://hrm-api.logomish.com/${companyLogo}`} />
                        </View>
                        <View style={styles.TableHeaderContainer}>
                            <Text style={styles.HeadingTop}>Monthly Tax Liability Report</Text>
                        </View>
                        <View style={styles.HeaderDate}>
                            <Text style={styles.DatePrint}>Print Date: {DateTime.now().toLocaleString()}</Text>
                        </View>
                    </View>

                    <View style={styles.TableEmployeeDetail}>
                        <Text style={styles.cellone_Space_1}>Employee Code: {DataFromApi[0]?.Emp_code}</Text>
                        <Text style={styles.cellone_Space_2}>Employee Name: {DataFromApi[0]?.Emp_name}</Text>
                        <Text style={styles.cellone_Space_3}>Branch/Location: {DataFromApi[0]?.loc_name}</Text>
                    </View>
                    <View style={styles.tableContainer}>
                        <View style={styles.container}>
                            <Text style={styles.cellone}>Allowance Name</Text>
                            <Text style={styles.celltwo}>Actual Income</Text>
                            <Text style={styles.cellthree}>Projected Income</Text>
                            <Text style={styles.cellfour}>Total Income</Text>
                            <Text style={styles.cellfive}>Tax Exempt Percentage</Text>
                            <Text style={styles.cellsix}>Exempt Income</Text>
                            <Text style={styles.cellseven}>Taxable Income</Text>
                        </View>
                        {DataFromApi.map(data =>
                            <View style={styles.row} key={1}>
                                <Text style={styles.cellone}>{data?.Allowance_name}</Text>
                                <Text style={styles.celltwo}>{data?.Actual_Income}</Text>
                                <Text style={styles.cellthree}>{data?.Projected_Income}</Text>
                                <Text style={styles.cellfour}>{data?.Total_Income}</Text>
                                <Text style={styles.cellfive}>{data?.Tax_Exempt_Percentage}</Text>
                                <Text style={styles.cellsix}>{data?.Exempt_Income}</Text>
                                <Text style={styles.cellseven}>{data?.Taxable_Income}</Text>
                            </View>
                        )}
                    </View>



                    <View style={styles.ThirdColumn}>
                        <View style={styles.containerAppand}>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second}>Total Actual Salary</Text>
                                <Text style={styles.cellone_second}>{DataFromApi[0]?.total_actual_income}</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second}>Total Projected Salary</Text>
                                <Text style={styles.cellone_second}>{DataFromApi[0]?.total_projected_income}</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second}>Total Salary</Text>
                                <Text style={styles.cellone_second}>{DataFromApi[0]?.total_total_income}</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second}>Exemptions</Text>
                                <Text style={styles.cellone_second}>{DataFromApi[0]?.Exempt_Income}</Text>
                            </View>
                            {/* <View style={styles.container_Second}>
                                <Text style={styles.cellone_second}>Zakat Exemptions</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second}>Net Taxable Salary</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View> */}
                        </View>


                        <View style={styles.containerAppand}>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Claim/Tax Adjustment</Text>
                                <Text style={styles.cellone_Third_second}>Claim Amount</Text>
                                <Text style={styles.cellone_Third_third}>Cradit Amount</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Investment</Text>
                                <Text style={styles.cellone_Third_second}>$234.3</Text>
                                <Text style={styles.cellone_Third_third}>$54.2</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Markup on Loan</Text>
                                <Text style={styles.cellone_Third_second}>$54.21</Text>
                                <Text style={styles.cellone_Third_third}>$11.43</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Donation</Text>
                                <Text style={styles.cellone_Third_second}>$123.13</Text>
                                <Text style={styles.cellone_Third_third}>$3.45</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Tax Annuity</Text>
                                <Text style={styles.cellone_Third_second}>$433.53</Text>
                                <Text style={styles.cellone_Third_third}>$43.6</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Advance Tax</Text>
                                <Text style={styles.cellone_Third_second}>$344.3</Text>
                                <Text style={styles.cellone_Third_third}>$44.34</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.tableContainer}>
                        <View style={styles.container}>
                            <Text style={styles.cellone}>Exceeding</Text>
                            <Text style={styles.celltwo}>Not Exceeding</Text>
                            <Text style={styles.cellthree}>Rate Tax Excess</Text>
                            <Text style={styles.cellfour}>Fix Tax Amount</Text>
                            <Text style={styles.cellfive}>Regular Amount</Text>
                            <Text style={styles.cellsix}>Avg Tax Rate</Text>
                        </View>
                        {DataFromApi.map(data =>
                            <View style={styles.row} key={1}>
                                <Text style={styles.cellone}>{data?.Allowance_name}</Text>
                                <Text style={styles.celltwo}>{data?.Actual_Income}</Text>
                                <Text style={styles.cellthree}>{data?.Projected_Income}</Text>
                                <Text style={styles.cellfour}>{data?.Total_Income}</Text>
                                <Text style={styles.cellfive}>{data?.Tax_Exempt_Percentage}</Text>
                                <Text style={styles.cellsix}>{data?.Exempt_Income}</Text>
                                <Text style={styles.cellseven}>{data?.Taxable_Income}</Text>
                            </View>
                        )}
                    </View>
                    
                    <View style={styles.ThirdColumn}>
                        <View style={styles.containerAppand}>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second1}>Gross Tax</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second1}>Total Tax Cradit</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second1}>Total Tax Liability</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second1}>Less: Tax Deduction Upto Previous month</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second1}>Payable in Remaining month</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_second1}>Balance Tax Amount</Text>
                                <Text style={styles.cellone_second}>1,000</Text>
                            </View>
                        </View>


                        <View style={styles.containerAppand}>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Claim/Tax Adjustment</Text>
                                <Text style={styles.cellone_Third_second}>Claim Amount</Text>
                                <Text style={styles.cellone_Third_third}>Cradit Amount</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Investment</Text>
                                <Text style={styles.cellone_Third_second}>$234.3</Text>
                                <Text style={styles.cellone_Third_third}>$54.2</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Markup on Loan</Text>
                                <Text style={styles.cellone_Third_second}>$54.21</Text>
                                <Text style={styles.cellone_Third_third}>$11.43</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Donation</Text>
                                <Text style={styles.cellone_Third_second}>$123.13</Text>
                                <Text style={styles.cellone_Third_third}>$3.45</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Tax Annuity</Text>
                                <Text style={styles.cellone_Third_second}>$433.53</Text>
                                <Text style={styles.cellone_Third_third}>$43.6</Text>
                            </View>
                            <View style={styles.container_Second}>
                                <Text style={styles.cellone_Third_one}>Advance Tax</Text>
                                <Text style={styles.cellone_Third_second}>$344.3</Text>
                                <Text style={styles.cellone_Third_third}>$44.34</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>

        );
        const blobData = await pdf(MyDoc).toBlob();
        setBobStore(blobData)
        setTimeout(() => {
            setIsdownload(true)
            setLoading(false)
        }, 2000)
    }


    const dataRender = () => {
        setPdfLoader(true)
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            // const container = document.createElement('div');
            // container.style.display = 'none';
            // document.body.appendChild(container);
            PSPDFKit.load({
                container: '#pdf-container',
                document: dataUrl,
                baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            })
                .then((instance) => {
                    // instance.exportPDF({
                    //     permissions: {
                    //         userPassword: '12345678',
                    //         ownerPassword: '12345678',
                    //         documentPermissions: []
                    //     }
                    // }).then((buffer) => {
                    //     const blob = new Blob([buffer], { type: "application/pdf" });
                    //     const fileName = "document.pdf";
                    //     if (window.navigator.msSaveOrOpenBlob) {
                    //         window.navigator.msSaveOrOpenBlob(blob, fileName);
                    //     } else {
                    //         const objectUrl = URL.createObjectURL(blob);
                    //         const a = document.createElement("a");
                    //         a.href = objectUrl;
                    //         a.style = "display: none";
                    //         a.download = fileName;
                    //         document.body.appendChild(a);
                    //         a.click();
                    //         URL.revokeObjectURL(objectUrl);
                    //         document.body.removeChild(a);
                    //     }
                    //     setPdfLoader(false)
                    //     reset({
                    //         Employee_Id: "",
                    //         Month: "",
                    //         Year: "",
                    //     })
                    //     setIsdownload(false)
                    // });
                })
                .catch((error) => {
                    console.error('Error loading PSPDFKit', error);
                    setPdfLoader(false)
                });
        };

        reader.readAsDataURL(blobStore);
        return () => {
            PSPDFKit.unload('#pdf-container');
        };
    };


    const AddLoans = yup.object().shape({
        Employee_Id: yup.string().required("Please Select Employee"),
        Month: yup.string().required("Month is required"),
        Year: yup.string().required("Year is required"),
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Employee_Id: "",
            Month: "",
            Year: "",
        },
        mode: "onChange",
        resolver: yupResolver(AddLoans),
    });



    return (
        <>
            <div id="pdf-container" style={{ width: '100%', height: '800px' }}></div>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isSearch={false} title={'Transaction - Tax Payslip'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                <form onSubmit={handleSubmit(submitForm)} className='paySlipBox'>
                    <div className=''>
                        <FormSelect
                            errors={errors}
                            control={control}
                            placeholder={"Select Employee"}
                            name={'Employee_Id'}
                            label={'Select Employee'}
                            options={options}
                        />
                        <FormSelect
                            errors={errors}
                            control={control}
                            placeholder={"Please select a month"}
                            name={'Month'}
                            label={'Month'}
                            options={monthList}
                        />
                        <FormSelect
                            errors={errors}
                            control={control}
                            name={'Year'}
                            placeholder={'Please select a year'}
                            label={'Please select a year'}
                            options={monthSalary}
                        />
                    </div>
                    <div className={Style.SubmitSection}>
                        <PrimaryButton type={'submit'} loading={loading} title="Save" />
                        {isDownload &&
                            <Button loading={PdfLoader} onClick={dataRender} type={'submit'} title="Download Pdf" />
                        }
                    </div>
                </form>
            </div>
        </>
    );
};

function mapStateToProps({ TaxReport }) {
    return { TaxReport };
}
export default connect(mapStateToProps, sTaxReport_Action)(TaxPayslip);
