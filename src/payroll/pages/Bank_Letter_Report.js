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
    
}) {
    const [isLoading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    // const empData = Red_Bank_Letter_Report?.data?.[0]?.res?.data;
    const [currentDate, setCurrentDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');


    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setCurrentDate(currentDate);
        setToDate(currentDate); 
    }, []);

    // ===== SCHEMA =================
    const BankLetterSchema = yup.object().shape({
        Emp_DOB: yup.string().required('Please Select the Birth Month'),
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
        // try {
        //     const isValid = await DOBReportSchema.validate(data);
        //     if (isValid) {
        //         const result = await PostExperiencePayload(data.Emp_DOB);
        //         if (result?.success) {
        //             message.success('PDF is created, Wait PDF is under downloading...');
        //             setFormSubmitted(true);
        //             setDOBReportData(result?.data);
        //             console.log(result?.data, 'ugsfosdj')

        //             setSelectedEmployee(data.Emp_DOB);
        //             // console.log("data.Emp_DOB", data.Emp_DOB)
        //         } else {
        //             message.error(result?.message || result?.messsage);
        //         }
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
        // setLoading(false);
    };

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
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
    },[])
    
    const payroll = Red_Bank_Letter_Report?.getPayroll?.data
    const Bank = Red_Bank_Letter_Report?.getBank?.data
    const Region = Red_Bank_Letter_Report?.getRegion?.data

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass2">
                        <div>
                            <h2 className="text-dark mb-4"> Report Bank Letter </h2>
                            <form onSubmit={handleSubmit}>
                                <h4 className="text-dark"> Report Bank Letter </h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        label={'Year'}
                                        placeholder='Select Year'
                                        id="year"
                                        name="year"
                                        options={[
                                            {
                                                value: 1,
                                                label: '2021'
                                            },
                                            {
                                                value: 2,
                                                label: '2022'
                                            },
                                            {
                                                value: 3,
                                                label: '2023'
                                            },
                                            {
                                                value: 4,
                                                label: '2024'
                                            },
                                            {
                                                value: 5,
                                                label: '2025'
                                            },
                                            {
                                                value: 6,
                                                label: '2026'
                                            },
                                            {
                                                value: 7,
                                                label: '2027'
                                            },
                                            {
                                                value: 8,
                                                label: '2028'
                                            },
                                            {
                                                value: 9,
                                                label: '2029'
                                            },
                                            {
                                                value: 10,
                                                label: '2030'
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
                                    <FormSelect
                                        label={'Payroll Category'}
                                        placeholder='Select Payroll Category'
                                        id="payrollCategory"
                                        name="payrollCategory"
                                        options={payroll?.map((item) => ({
                                            value: item?.Payroll_Category_code,
                                            label: item.Payroll_Category_name

                                        }) )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                               

                                    <FormSelect
                                        label={'Region'}
                                        placeholder='Select Region'
                                        id="region"
                                        name="region"
                                        options={Region?.map((item) =>({
                                            value: item.Loc_code,
                                            label: item.Loc_name
                                        }))}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Bank'}
                                        placeholder='Select Bank'
                                        id="bank"
                                        name="bank"
                                        options={Bank?.map((item) => ({
                                            value: item.Bank_code,
                                            label: item.Bank_name

                                        }))}
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

