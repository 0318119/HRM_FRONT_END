import React, { useEffect, useState } from 'react'
import './assets/css/LeaveUpload.css'
import Header from '../components/Includes/Header'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { connect } from "react-redux";
import { message } from 'antd';
import * as ACTIONS from "../store/actions/Leave/Leave_Balance_Upalod/index"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, FormInput } from '../components/basic/input/formInput';
import { PrimaryButton,Button } from "../components/basic/button";

const Leave_Balance_Upload = ({
    Red_Leave_Balanced_Upload,
    GET_YEAR,
    GET_FILE
}) => {
    var get_access_token = localStorage.getItem("access_token");
    const [isGetExcelData, setGetExcelData] = useState([])
    const YearsData = Red_Leave_Balanced_Upload?.Years?.[0]?.res
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [isYear, setYear] = useState(currentYear)
    const [isFile, setFile] = useState()
    const formData = new FormData();
    const [isLoading,setLoading] = useState(false)
    const [isDownload,setDownload] = useState(false)
    const [isFormat,setFormat] = useState([{
        Emp_code: 0,
        leave_type_code : "0",
        leave_name: "Example",
        leave_ent_days: "0",
        leave_year: "0",
        leave_avail_days: "Example",
        leave_balance_days: "0",
    }])

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {},
        mode: 'onChange',
        resolver: yupResolver(),
    });


    useEffect(() => {
        GET_YEAR()
    }, [])

    useEffect(() => {
        if (YearsData?.message == "failed" || YearsData?.messsage == "failed") {
            message.error(`In Year Api Call: ${YearsData?.message || YearsData?.messsage}`)
        }
    }, [YearsData])

    const GetFileFun = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (isYear == null) {
            message.error("Please select a year...")
            setLoading(false)
        } else {
            setLoading(true)
            const paylaod = JSON.stringify({ "leave_year": isYear })
            const isCheck = await GET_FILE(paylaod)
            if (isCheck?.success) {
                setGetExcelData(isCheck?.data?.[0])
                console.log(isCheck?.data?.[0])
                message.success("Downloading Excel file...")
                setLoading(false)
                setDownload(true)
            } else {
                message.error(isCheck?.message || isCheck?.messsage)
                setLoading(false)
                setDownload(false)
            }
        }
    }

    if (isFile !== '') {
        formData.append("excelFile", isFile);
    }
    const UplaodExcelFun = async (e) => {
        e.preventDefault();
        setLoading(true)
        await fetch(`https://hrm-api.logomish.com/uploadExcelData/SaveExcelFile`, {
            method: "POST",
            headers: { "Accept": "form-data", "accessToken": `Bareer ${get_access_token}` },
            body: formData,
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            if (response.success) {
                message.success(response?.message || response?.messsage)
                setLoading(false)
            } else {
                message.error(response?.message || response?.messsage)
                setLoading(false)
            }
        }).catch((errs) => {
            message.error(errs?.message)
            setLoading(false)
        })
    }

    useEffect(() => {
        if(isDownload){
            exportToExcel()
            setDownload(false)
        }
    },[isDownload])



    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(isGetExcelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Employee_leave_info" + fileExtension);
    }

    const downloadFormat = async () => {
        const ws = XLSX.utils.json_to_sheet(isFormat);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "format" + fileExtension);
    }

    const DownloadFormatFun = async (e) => {
        e.preventDefault()
        downloadFormat()
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container" style={{marginTop: "80px"}}>
                <div className="row justify-content-center">
                    <div className="col-lg-5 leaveBalanceUplaodBox">
                        <div className=''>
                            <h5>Download</h5>
                            <form onSubmit={GetFileFun}>
                                <FormSelect
                                    errors={errors}
                                    control={control}
                                    name={'leave_year'}
                                    placeholder={'Please select year'}
                                    label={'Year'}
                                    defaultValue={currentYear}
                                    onChange={(e) => { setYear(e) }}
                                    options={YearsData?.data.map((items) => ({
                                        value: items?.year,
                                        label: items?.year
                                    }))}
                                />
                                <div>
                                    <PrimaryButton type={'submit'} loading={isLoading} title="Download" />
                                </div>
                            </form>
                        </div>
                        <hr />
                        <div className=''>
                            <h5>Upload</h5>
                            <form onSubmit={UplaodExcelFun}>
                                <FormInput
                                    errors={errors}
                                    control={control}
                                    name={'excelFile'}
                                    placeholder={'Please select a Excel file'}
                                    label={'File'}
                                    type={"file"}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <div>
                                    <PrimaryButton type={'submit'} loading={isLoading} title="Upload" />
                                    <Button title="Download format" onClick={(e) => {DownloadFormatFun(e)}} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function mapStateToProps({ Red_Leave_Balanced_Upload }) {
    return { Red_Leave_Balanced_Upload };
}
export default connect(mapStateToProps, ACTIONS)(Leave_Balance_Upload) 