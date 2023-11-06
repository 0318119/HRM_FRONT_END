import React, { useEffect, useState } from "react";
import * as PayrollUpload_Action_Action from "../../../store/actions/payroll/payrollUpload/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message, Radio } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({ currentUser, getEmployeeData, getAllowanceList, getDeductionList, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [allowanceList, setAllowanceList] = useState()
    const [deductionList, setDeductionList] = useState()
    const [loader, setLoader] = useState(false)
    const [isNext, setIsNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [allowanceDetail, setAllowanceDetail] = useState({
        Feild: "A-O",
        AllowanceCode: "",
        DeductionCode: "",
        ADEFlag: "",
        FOEFlag: "",
    })

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
        const employeeData = await getEmployeeData({ Emp_Code: currentUser })
        const allowanceList = await getAllowanceList()
        const DeducitonList = await getDeductionList()
        setAllowanceList(allowanceList)
        setDeductionList(DeducitonList)
        setEmployee(employeeData[0]);
        setLoader(false)
    }

    const saveAllowance = async () => {
        setLoading(true)
        if (allowanceDetail.Amount == "" || allowanceDetail.Amount == undefined) {
            message.error('Amount is required')
            setLoading(false)
        }
        else if (allowanceDetail?.Amount?.length > 6) {
            message.error('Enter valid amount')
            setLoading(false)
        }
        else if (allowanceDetail.Remarks == "" || allowanceDetail.Amount == undefined) {
            message.error('Remarks is required')
            setLoading(false)
        }
        else {
            const AllowanceSave = await saveAllowanceDetail({
                Emp_Code: allowanceDetail?.Emp_code,
                Allowance_code: allowanceDetail?.Allowance_Code,
                Deduction_code: '0',
                ADE_flag: "A",
                FOE_flag: "O",
                Amount: allowanceDetail?.Amount,
                Reverse_flag: "N",
                Remarks: allowanceDetail?.Remarks
            })
            if (AllowanceSave.success == "success") {
                message.success('Allowance Created');
                setLoading(false)
                reset()
            }
            setLoading(false)
        }
    }
    const DeleteAllowance = async () => {
        setDelLoading(true)
        const AllowanceSave = await DeleteAllowanceDetail({
            Emp_Code: allowanceDetail?.Emp_code,
            Allowance_code: allowanceDetail?.Allowance_Code,
            Deduction_code: 0,
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }


    const FeildChange = (e) => {
        if (e.target.value == "A-O" || e.target.value == "A-F") {
            setIsNext(false)
        }
        else {
            setIsNext(true)
        }
    }


    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            if (!isNext) {
                setAllowanceDetail({
                    AllowanceCode: "",
                    DeductionCode: "",
                    ADEFlag: "",
                    FOEFlag: "",
                })
            }
            else if (isNext) {
                setAllowanceDetail({
                    AllowanceCode: "",
                    DeductionCode: "",
                    ADEFlag: "",
                    FOEFlag: "",
                })
            }

            setIsNext(true)
        }
        else {
            setIsNext(false)
        }
    }
    const ImageUploader = (e) => {
        console.log()
        let formData = new FormData();
        formData.append('excelFile', e.target.files[0]);
        formData.append('Selected_Payroll_Category', localStorage.getItem('Payroll_Category'));
        // formData.append('Allowance_code', event.target.bottomstuff.value);
        // formData.append('Deduction_Code', event.target.bottomstuff.value);
        // formData.append('ADEFlag', event.target.bottomstuff.value);
        // formData.append('FOEFlag', event.target.bottomstuff.value);
    }
    console.log(deductionList, 'asda')
    return (
        <>
            {loader ? <Skeleton active /> :
                <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: '600' }}>Select any one of the following option</label>
                        <div style={{ display: "flex", alignItems: 'center', paddingBlock: '12px' }}>
                            <Radio.Group onChange={FeildChange} defaultValue={allowanceDetail?.Feild}>
                                <Radio value={'A-O'}>Allowance - One Time</Radio>
                                <Radio value={'A-F'}>Allowance - Fixed</Radio>
                                <Radio value={'D-O'}>Deduction - One Time</Radio>
                                <Radio value={'D-F'}>Deduction - Fixed</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {isNext ?
                                <Select handleChange={OnSelect} type={'allowance2'} label={'Select Deduction'} option={deductionList} />
                                :
                                <Select handleChange={OnSelect} type={'allowance'} label={'Select Allowance'} option={allowanceList} />
                            }
                            <input type="file" onChange={(e) => ImageUploader(e)} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CancelButton onClick={reset} title={'Cancel'} />
                                <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                                <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                            </div>
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