import React, { useEffect, useState } from "react";
import * as oneTimeDeduction_Action from "../../../store/actions/payroll/oneTimeDeduction/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const PayrollUploadData = ({ getDeductionEmployeeData, getDeductionEmployeeSallaryData, currentUser, getDeductionList, getEmployeeData, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [allowanceList, setAllowanceList] = useState()
    const [employeeSallary, setEmployeeSallary] = useState()
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
        const employeeData = await getDeductionEmployeeData({ Emp_code: currentUser })
        setEmployee(employeeData[0]);
        const allowanceList = await getDeductionList()
        setAllowanceList(allowanceList)
        const employeeDataSallary = await getDeductionEmployeeSallaryData({ Emp_code: currentUser })
        setEmployeeSallary(employeeDataSallary)
    }
    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            const AllowanceDetail = await getAllowanceDetail({ DeductionCode: e?.value, Emp_code: employee?.Sequence_no })
            if(AllowanceDetail?.success){
                setAllowanceDetail({
                    Amount: AllowanceDetail?.data[0]?.Amount == undefined ? '0' : AllowanceDetail?.data[0]?.Amount,
                    Remarks: AllowanceDetail?.data[0]?.Remarks == undefined ? '' : AllowanceDetail?.data[0]?.Remarks,
                    Deduction_code: e?.value,
                    Allowance_Code: 0,
                    Emp_code: employee?.Sequence_no,
                })
            }else{
                message.error(AllowanceDetail?.message || AllowanceDetail?.messsage)
            }
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
                Remarks: e.target.value,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const AmountChange = (e) => {
        setAllowanceDetail(
            {
                Amount: e?.value,
                Remarks: allowanceDetail.Remarks,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const saveAllowance = async () => {
        // setLoading(true)
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
                Deduction_code: allowanceDetail.Deduction_code,
                ADE_flag: "D",
                FOE_flag: "O",
                Amount: allowanceDetail?.Amount,
                Reverse_flag: "N",
                Remarks: allowanceDetail?.Remarks
            })
            if (AllowanceSave?.success == "success") {
                message.success('Allowance Created');
                setLoading(false)
                reset()
            }else{
                message.error(AllowanceSave?.message || AllowanceSave?.messsage);
            }
            setLoading(false)
        }
    }
    const DeleteAllowance = async () => {
        setDelLoading(true)
        const AllowanceSave = await DeleteAllowanceDetail({
            Emp_Code: allowanceDetail?.Emp_code,
            Allowance_code: 0,
            Deduction_code: allowanceDetail?.Deduction_code,
        })
        if (AllowanceSave?.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }else{
            message.success(AllowanceSave?.message || AllowanceSave?.messsage);
            setDelLoading(false)
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                    </div>
                    <div className="col-md-6 p-0">
                        <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                        <Select handleChange={OnSelect} label={'Select Allowance'} option={allowanceList} />
                    </div>
                    <div className="col-md-6 p-0">
                        <Input value={employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary == null ? "0.00" : employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary} readonly={true} label={'Last Month Net Salary'} name={'employeeName'} />
                    </div>
                    <div className="col-md-6 p-0">
                        <Input value={employeeSallary?.LastMonthGrossSalary?.LastMonthGrossSalary} readonly={true} label={'Last Month Gross Salary'} name={'designation'} />
                    </div>
                    {isNext &&
                        <>
                            <div className="col-12 mt-5">
                                <h3 style={{ color: 'black' }}><b>Transaction Information</b></h3>
                            </div>
                            <hr />
                            <div className="col-md-6 p-0">
                                <Input onChange={AmountChange} value={allowanceDetail.Amount} label={'Amount'} name={'Amount'} type={'number'} />
                            </div>
                            <div className="col-md-6 p-0">
                                <Input onChange={RemarksChange} value={allowanceDetail.Remarks} label={'Remarks'} name={'Remarks'} max={'50'} />
                            </div>
                            <div className="col-12 mt-5 p-0 d-flex justify-content-end align-items-center">
                                <CancelButton onClick={reset} title={'Cancel'} />
                                <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                                <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
function mapStateToProps({ oneTimeDeduction }) {
    return { oneTimeDeduction };
}
export default connect(mapStateToProps, oneTimeDeduction_Action)(PayrollUploadData);