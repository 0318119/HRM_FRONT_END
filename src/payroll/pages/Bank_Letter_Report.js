import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormInput, FormSelect } from '../../../src/components/basic/input/formInput';
import Header from '../../../src/components/Includes/Header';
import { SimpleButton } from '../../../src/components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, pdf, Image } from '@react-pdf/renderer';
import * as Bank_Report_Action from '../../store/actions/payroll/Bank_Letter_Report/index'
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


function Bank_Letter_Report({
    Red_Bank_Letter_Report,
    GetPayroll,
    GetBank,
    GetRegion,
    ExportExcel

}) {
    const [isLoading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const BankLetterSchema = yup.object().shape({
        payslip_year: yup.string().required('Please Select Year'),
        payslip_month: yup.string().required('Please Select Month'),
        payroll_category_code: yup.string().required('Please Select payroll'),
        Bank_code: yup.string().required('Please Select BanK'),
        Region: yup.string().required('Please Select Region'),
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {},
        mode: 'onChange',
        resolver: yupResolver(BankLetterSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const isValid = await BankLetterSchema.validate(data);
            if (isValid) {
                Download(data);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };



    const Download = async (data) => {
        setLoading(true)
        try {
            const response = await ExportExcel({
                payslip_year: data?.payslip_year,
                payslip_month: data?.payslip_month,
                payroll_category_code: data?.payroll_category_code,
                Bank_code: data?.Bank_code,
                Region: data?.Region,
            });
            if (response && response.success) {
                messageApi.success("Waiting For Excel File Successfully Download");
                setTimeout(() => {
                    DownloadExcel(response?.data)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Download Excel';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Download Excel:", error);
            messageApi.error("An error occurred while Download Excel");
        }
    };



    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';

    const DownloadExcel = async (hjh) => {
        const ws = XLSX.utils.json_to_sheet(hjh);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "data" + fileExtension);
    }


    useEffect(() => {
        GetPayroll()
        GetBank()
        GetRegion()
    }, [])

    const payroll = Red_Bank_Letter_Report?.getPayroll?.data
    const Bank = Red_Bank_Letter_Report?.getBank?.data
    const Region = Red_Bank_Letter_Report?.getRegion?.data

    return (
        <>
            <Header />
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass2">
                        <div>
                            <h2 className="text-dark mb-4"> Report Bank Letter </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h4 className="text-dark"> Report Bank Letter </h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        label={'Year'}
                                        placeholder='Select Year'
                                        id="payslip_year"
                                        name="payslip_year"
                                        options={[
                                            {
                                                value: 2021,
                                                label: '2021'
                                            },
                                            {
                                                value: 2022,
                                                label: '2022'
                                            },
                                            {
                                                value: 2023,
                                                label: '2023'
                                            },
                                            {
                                                value: 2024,
                                                label: '2024'
                                            },
                                        ]}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect

                                        label={'Select Month'}
                                        placeholder='Select Month'
                                        errors={errors}
                                        control={control}
                                        id="payslip_month"
                                        name="payslip_month"
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
                                    <FormSelect
                                        label={'Payroll Category'}
                                        placeholder='Select Payroll Category'
                                        id="payroll_category_code"
                                        name="payroll_category_code"
                                        options={payroll?.map((item) => ({
                                            value: item?.Payroll_Category_code,
                                            label: item.Payroll_Category_name

                                        }))}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />


                                    <FormSelect
                                        label={'Region'}
                                        placeholder='Select Region'
                                        id="Region"
                                        name="Region"
                                        options={[
                                            {value : -1, label:'All'},
                                            ...(Region ? Region.map((item) => ({
                                                value: item.Loc_code,
                                                label: item.Loc_name
                                            })) : [])
                                        ]}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Bank'}
                                        placeholder='Select Bank'
                                        id="Bank_code"
                                        name="Bank_code"
                                        options={[
                                            { value: -1, label: 'All' },
                                            ...(Bank ? Bank.map((item) => ({
                                                value: item.Bank_code,
                                                label: item.Bank_name
                                            })) : [])
                                        ]}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <div className="paySlipBtnBox">
                                    <SimpleButton type={'submit'} loading={isLoading} title="Download Excel" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

function mapStateToProps({ Red_Bank_Letter_Report }) {
    return { Red_Bank_Letter_Report };
}

export default connect(mapStateToProps, Bank_Report_Action)(Bank_Letter_Report);

