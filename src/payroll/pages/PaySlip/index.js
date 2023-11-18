import React, { useEffect, useState } from 'react'
import '../../assest/css/paySlip.css'
import Header from '../../../components/Includes/Header'
import { connect } from "react-redux";
import * as RED_PAY_SLIP_ACTION from '../../../store/actions/payroll/PaySlip/index'
import { FormInput, FormSelect } from "../../../components/basic/input/formInput";
import { PrimaryButton, CancelButton } from "../../../components/basic/button";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Table } from "antd";
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import * as yup from "yup";



function PaySlip({
    Red_Pay_Slip,
    GetAllEmp,
    PostPaySlip
}) {

    const [isLoading, setLoading] = useState(false)
    const empData = Red_Pay_Slip?.data?.[0]?.res?.data
    const [isPDfData, setPDfData] = useState([])

    // FOMR SHCEME =====================
    const PDFFROM = yup.object().shape({
        payslip_year: yup.string().required("Pay slip year is required"),
        payslip_month: yup.string().required("Pay slip month is required"),
        Emp_code: yup.string().required("Please Select the employee"),
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
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
                console.log("data", data)
                confirmPaySlip(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    // PAY SLIP FORM POST FUNCTION
    const confirmPaySlip = async (data) => {
        const isWaitFun = await PostPaySlip(data)
        if (isWaitFun?.success) {
            if(isWaitFun?.data?.length == 0){
                message.error("No Data Available")
                setLoading(false)
            }else{
                setLoading(false)
                console.log("isWaitFun?.data",isWaitFun?.data)
                message.success("Now, You can Download Pdf")
                setPDfData(isWaitFun?.data)
            }
        } else {
            message.error(isWaitFun?.message || isWaitFun?.messsage)
        }
    }

    // PSPDFKit.load({
    //     container: "#pspdfkit",
    //     document: "file:///C:/Users/HP/Downloads/document.pdf",
    //     licenseKey: "YOUR_LICENSE_KEY"
    //   }).then((instance) => {
    //     instance.exportPDF({
    //       permissions: {
    //         userPassword: "u$erp@ssw0rd",
    //         ownerPassword: "ownerp@ssw0rd",
    //         documentPermissions: []
    //       }
    //     });
    //   });

    // GET ALL EMPLOYEE DATA =====================
    useEffect(() => {
        GetAllEmp()
    }, [])

    const defaultOption = { value: "-1", label: "All Employees" }; 
    const options = [
      defaultOption,
      ...(empData || []).map((item) => ({
        value: item.Emp_code,
        label: item.Emp_name,
      })),
    ];



    return (
        <>
            <div>
                <Header />
            </div>
            {/* <div id="pspdfkit" style={{ width: '100%', height: '500px' }}></div> */}
            <div className="container maringClass">
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
                                        { value: 2022, label: '2022' },
                                        { value: 2023, label: '2023' },
                                    ]}
                                />
                            </div>
                            <div className='paySlipBtnBox'>
                                <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="mt-5 row justify-content-center">
                    {isPDfData?.length > 0 && (
                            // <Table
                            //     columns={columns}
                            //     loading={isLoading}
                            //     dataSource={isPDfData}
                            //     scroll={{ x: 10 }}
                            //     pagination={false}
                            // />
                            <PDFViewer  height="750">
                                <Document>
                                <Page size="A4">
                                    <View>
                                        <Text style={{ textAlign: 'center', marginBottom: '10', fontSize: '16', fontWeight: 'bold' }}>
                                            Pay Slip
                                        </Text>
                                        <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Employee Code</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Employee Name</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Days Worked</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Month</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12', fontWeight: 'bold' }}>Gross Salary</Text>
                                        </View>
                                        {isPDfData.map((item, index) => (
                                        <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_Code ? item?.Emp_Code : null}</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Emp_name ? item?.Emp_name : null}</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Days_Worked ? item?.Days_Worked : null}</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Payslip_Month_Name ? item?.Payslip_Month_Name : null}</Text>
                                            <Text style={{ width: '50%', textAlign: 'center', fontSize: '12' }}>{item?.Gross_Salary ? item?.Gross_Salary : null}</Text>
                                        </View>
                                        ))}
                                    </View>
                                </Page>
                                </Document>
                            </PDFViewer>
                    )}
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ Red_Pay_Slip }) {
    return { Red_Pay_Slip };
}
export default connect(mapStateToProps, RED_PAY_SLIP_ACTION)(PaySlip) 