import React, { useEffect, useState } from "react";
import * as PayrollUpload_Action_Action from "../../../store/actions/payroll/payrollUpload/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message, Radio } from "antd";
import * as FileSaver from 'file-saver'
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';
import XLSX from 'sheetjs-style'







const OneTimeAllowanceForm = ({ currentUser, getEmployeeData, getAllowanceList, getDeductionList, DownloadFileFunction, saveAllowanceDetail, cancel }) => {
    const [allowanceList, setAllowanceList] = useState()
    const [deductionList, setDeductionList] = useState()
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feildSwitch, setFeildSwitch] = useState(true)
    const [allowanceDetail, setAllowanceDetail] = useState({
        Feild: 1,
        AllowanceCode: "",
        DeductionCode: "",
        ADEFlag: "",
        FOEFlag: "",
    })
    const [currentImage, setCurrentImage] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    let formData = new FormData();
    const reset = () => {
        cancel('read')
        setAllowanceDetail({
            Feild: "",
            AllowanceCode: "",
            DeductionCode: "",
            ADEFlag: "",
            FOEFlag: "",
        })
    }
    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        setLoader(true)
        const allowanceList = await getAllowanceList()
        const DeducitonList = await getDeductionList()
        setAllowanceList(allowanceList)
        setDeductionList(DeducitonList)
        setLoader(false)
    }

    const FeildChange = (e) => {
        setAllowanceDetail({ Feild: e.target.value })
        if (e.target.value === 1 || e.target.value === 2) {
            setFeildSwitch(true)
        }
        else {
            setFeildSwitch(false)
        }

    }


    const OnSelect = (e) => {
        console.log(allowanceDetail.Feild)
        if (allowanceDetail.Feild == 1) {
            setAllowanceDetail({
                AllowanceCode: e?.value,
                DeductionCode: "0",
                ADEFlag: "A",
                FOEFlag: "O",
            })
        }
        else if (allowanceDetail.Feild == 2) {
            setAllowanceDetail({
                AllowanceCode: e?.value,
                DeductionCode: "0",
                ADEFlag: "A",
                FOEFlag: "F",
            })
        }
        else if (allowanceDetail.Feild == 3) {
            setAllowanceDetail({
                AllowanceCode: "0",
                DeductionCode: e?.value,
                ADEFlag: "D",
                FOEFlag: "O",
            })
        }
        else if (allowanceDetail.Feild == 4) {
            setAllowanceDetail({
                AllowanceCode: "0",
                DeductionCode: e?.value,
                ADEFlag: "D",
                FOEFlag: "F",
            })
        }
    }
    const ImageUploader = (e) => {
        setCurrentImage(e.target.files[0])
    }

    const saveAllowance = async () => {
        setLoading(true)
        if (currentImage == "" || currentImage == undefined) {
            message.error('Please choose file')
            setLoading(false)
        }
        else if (allowanceDetail.AllowanceCode == "" || allowanceDetail.AllowanceCode == undefined) {
            message.error('Allowance is required')
            setLoading(false)
        }
        else if (allowanceDetail.DeductionCode == "" || allowanceDetail.DeductionCode == undefined) {
            message.error('Allowance is required')
            setLoading(false)
        }
        else {
            formData.append('excelFile', currentImage);
            formData.append('Selected_Payroll_Category', localStorage.getItem('Payroll_Category'));
            formData.append('Allowance_code', allowanceDetail?.AllowanceCode);
            formData.append('Deduction_code', allowanceDetail?.DeductionCode);
            formData.append('ADEFlag', allowanceDetail.ADEFlag);
            formData.append('FOEFlag', allowanceDetail.FOEFlag);
            const AllowanceSave = await saveAllowanceDetail(formData)
            if (AllowanceSave.success == "success") {
                message.success('Payroll Uploaded');
                setLoading(false)
                reset()
            }
        }
    }




    const DownloadFileBtn = async () => {
        setLoading(true)
        if (startDate == "" || startDate == undefined) {
            message.error('From date is required')
            setLoading(false)
        }
        else if (endDate == "" || endDate == undefined) {
            message.error('To date is required')
            setLoading(false)
        }
        else {
            const AllowanceSave = await DownloadFileFunction({
                Emp_Code: currentUser,
                From_Date: startDate,
                To_Date: endDate,
            })
            if (AllowanceSave.success == "success") {
                exportToExcel(AllowanceSave?.data)
                setLoading(false)
                reset()
            }
        }
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = async (dataFile) => {
        const ws = XLSX.utils.json_to_sheet(dataFile);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Employee_leave_info" + fileExtension);
    }
    return (
        <>
            {loader ? <Skeleton active /> :
                <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: '600' }}>Select any one of the following option</label>
                        <div style={{ display: "flex", alignItems: 'center', paddingBlock: '12px' }}>
                            <Radio.Group onChange={FeildChange} defaultValue={allowanceDetail?.Feild}>
                                <Radio value={1}>Allowance - One Time</Radio>
                                <Radio value={2}>Allowance - Fixed</Radio>
                                <Radio value={3}>Deduction - One Time</Radio>
                                <Radio value={4}>Deduction - Fixed</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {feildSwitch ?
                                <Select handleChange={OnSelect} type={'allowance'} label={'Select Allowance'} option={allowanceList} />
                                :
                                <Select handleChange={OnSelect} type={'allowance2'} label={'Select Deduction'} option={deductionList} />
                            }
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ fontWeight: '600' }}>Select File</label>
                                <input type="file" onChange={(e) => ImageUploader(e)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CancelButton onClick={reset} title={'Cancel'} />
                                <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                            </div>
                        </div>
                        <h2 style={{color:'black',fontWeight:'600'}}>Upload Overtime</h2>
                        <div style={{ display: 'flex', alignItems: 'end',paddingTop:'20px' }}>
                            <Input onChange={(e) => { setStartDate(e.target.value) }} type={'date'} label={'From Date'} />
                            <Input onChange={(e) => { setEndDate(e.target.value) }} type={'date'} label={'To Date'} />
                            <Button onClick={DownloadFileBtn} title={'Download'} />
                        </div>
                    </>
                </>
            }
        </>
    )
}
function mapStateToProps({ PayRollUpload }) {
    return { PayRollUpload };
}
export default connect(mapStateToProps, PayrollUpload_Action_Action)(OneTimeAllowanceForm);