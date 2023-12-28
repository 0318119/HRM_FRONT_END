import React, { useEffect, useState } from "react";
import * as advanceSalary_Action from "../../../store/actions/payroll/advanceSalary/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({ getDeductionEmployeeData, currentUser, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [employeeSallary, setEmployeeSallary] = useState()
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
    console.log(currentUser, 'asdas')
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
        const AllowanceDetail = await getAllowanceDetail({Emp_code: currentUser })
            setAllowanceDetail({
                Amount: AllowanceDetail[0]?.Amount == undefined ? '0' : AllowanceDetail[0]?.Amount,
                Remarks: AllowanceDetail[0]?.Remarks == undefined ? '' : AllowanceDetail[0]?.Remarks,
                Deduction_code: "28",
                Allowance_Code: 0,
                Emp_code: employee?.Sequence_no,
            })
        setEmployee(employeeData[0]);
        setLoader(false)
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
        console.log(allowanceDetail.Amount, 'asdas')
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
                Emp_Code: currentUser,
                Amount: allowanceDetail?.Amount,
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
    return (
        <>
            {loader ? <Skeleton active /> :
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                        <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                        <Input value={employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary == null ? "0.00" : employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary} readonly={true} label={'Last Month Net Salary'} name={'employeeName'} />
                    </div>
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
                                <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                            </div>
                        </div>
                    </>
                </>
            }
        </>
    )
}
function mapStateToProps({ FixedDeduction }) {
    return { FixedDeduction };
}
export default connect(mapStateToProps, advanceSalary_Action)(OneTimeAllowanceForm);