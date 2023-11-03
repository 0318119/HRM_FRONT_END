import React, { useEffect, useState } from "react";
import * as FixedDeduction_Action from "../../../store/actions/payroll/FixedDeduction/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({getDeductionEmployeeData,getDeductionEmployeeSallaryData, getDeductionList,currentUser, getEmployeeData, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [employeeSallary, setEmployeeSallary] = useState()
    const [allowanceList, setAllowanceList] = useState()
    const [loader, setLoader] = useState(false)
    const [isNext, setIsNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [allowanceDetail, setAllowanceDetail] = useState({
        Amount: "",
        Remarks: "",
        Allowance_Code: "",
        Emp_code: "",
        Deduction_code: ""
    })
    console.log(currentUser,'asdas')
    const reset = () => {
        cancel('read')
        setAllowanceDetail({
            Amount: "",
            Remarks: "",
            Allowance_Code: "",
            Emp_code: "",
            Deduction_code: ""
        })
    }
    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        setLoader(true)
        const employeeData = await getDeductionEmployeeData({ Emp_code: currentUser })
        const allowanceList = await getDeductionList()
        const employeeDataSallary = await getDeductionEmployeeSallaryData({ Emp_code: currentUser })
        setEmployeeSallary(employeeDataSallary)
        setEmployee(employeeData[0]);
        setAllowanceList(allowanceList)
        setLoader(false)
    }
    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            const AllowanceDetail = await getAllowanceDetail({ DeductionCode: e?.value, Emp_code: employee?.Sequence_no })
            console.log(AllowanceDetail[0]?.Amount,'amounty')
            setAllowanceDetail({
                Amount: AllowanceDetail[0]?.Amount==undefined?'0':AllowanceDetail[0]?.Amount,
                Remarks:AllowanceDetail[0]?.Remarks==undefined?'':AllowanceDetail[0]?.Remarks,
                Deduction_code: e?.value,
                Allowance_Code: 0,
                Emp_code: employee?.Sequence_no,
            })
            setIsNext(true)
        }
        else {
            setIsNext(false)
        }
    }
    const RemarksChange = (e) => {
        setAllowanceDetail(
            {
                Amount: allowanceDetail.Amount,
                Remarks: e,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const AmountChange = (e) => {
        setAllowanceDetail(
            {
                Amount: e,
                Remarks: allowanceDetail.Remarks,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const saveAllowance = async () => {
        console.log(allowanceDetail.Amount,'asdas')
        setLoading(true)
        if (allowanceDetail.Amount == ""||allowanceDetail.Amount==undefined) {
            message.error('Amount is required')
            setLoading(false)
        }
        else if (allowanceDetail?.Amount?.length > 6) {
            message.error('Enter valid amount')
            setLoading(false)
        }
        else if (allowanceDetail.Remarks == ""||allowanceDetail.Amount==undefined) {
            message.error('Remarks is required')
            setLoading(false)
        }
        else {
            const AllowanceSave = await saveAllowanceDetail({
                Emp_Code: allowanceDetail?.Emp_code,
                Allowance_code: '0',
                Deduction_code:allowanceDetail?.Deduction_code,
                ADE_flag: "D",
                FOE_flag: "F",
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
            Allowance_code: 0,
            Deduction_code:  allowanceDetail?.Deduction_code,
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }
    return (
        <>
            {loader ? <Skeleton active /> :
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                        <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                        <Select  handleChange={OnSelect} label={'Select Allowance'} option={allowanceList} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input value={employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary==null?"0.00":employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary} readonly={true} label={'Last Month Net Salary'} name={'employeeName'} />
                        <Input value={employeeSallary?.LastMonthGrossSalary?.LastMonthGrossSalary} readonly={true} label={'Last Month Gross Salary'} name={'designation'} />
                    </div>
                    {isNext &&
                        <>
                            <div style={{ paddingTop: '20px' }}>
                                <h3 style={{ color: 'black' }}>Transaction Information</h3>
                                <hr />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input onChange={AmountChange} value={allowanceDetail.Amount} label={'Amount'} name={'Amount'} type={'number'} />
                                <Input onChange={RemarksChange} value={allowanceDetail.Remarks} label={'Remarks'} name={'Remarks'} max={'50'} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CancelButton onClick={reset} title={'Cancel'} />
                                    <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                                    <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
function mapStateToProps({ FixedDeduction }) {
    return { FixedDeduction };
}
export default connect(mapStateToProps, FixedDeduction_Action)(OneTimeAllowanceForm);