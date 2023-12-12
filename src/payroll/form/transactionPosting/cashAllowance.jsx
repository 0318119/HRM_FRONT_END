import React, { useEffect, useState } from "react";
import * as CashAllowance_Action from "../../../store/actions/payroll/cashAllowance/index";
import { connect } from "react-redux";
import { Input } from '../../../components/basic/input/formInput'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const CashAllowanceForm = ({ currentUser, getEmployeeData, getAllowanceList, getEmployeeCashData, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [allowanceDetail, setAllowanceDetail] = useState({
        Cash_Award_Amount: "",
        Deposit_Amount: "",
        Letter_date: "",
        remarks: "",
    })

    const reset = () => {
        cancel('read')
        setAllowanceDetail({
            Cash_Award_Amount: "",
            Deposit_Amount: "",
            Letter_date: "",
            remarks: "",
        })
    }
    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        const employeeData = await getEmployeeData({ Emp_Code: currentUser })
        const allowanceCashList = await getEmployeeCashData({ Emp_Code: currentUser })
        setAllowanceDetail({
            Cash_Award_Amount: allowanceCashList[0]?.Cash_Award_Amount,
            Deposit_Amount: allowanceCashList[0]?.Deposit_Amount,
            Letter_date: allowanceCashList[0]?.Letter_date,
            remarks: allowanceCashList[0]?.remarks,
        })
        setEmployee(employeeData[0]);
    }
    const saveAllowance = async () => {
        setLoading(true)
        const AllowanceSave = await saveAllowanceDetail({
            Emp_Code: currentUser,
            DepositAmount: allowanceDetail?.Deposit_Amount,
            CashAwardAmount: allowanceDetail?.Cash_Award_Amount,
            Remarks: allowanceDetail?.remarks,
            LetterDate: allowanceDetail?.Letter_date,
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Created');
            setLoading(false)
            reset()
        }
        else {
            setLoading(false)
        }
    }
    const DeleteAllowance = async () => {
        setDelLoading(true)
        const AllowanceSave = await DeleteAllowanceDetail({
            Emp_Code: currentUser,
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAllowanceDetail({
            ...allowanceDetail,
            [name]: value
        });
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
                        <Input readonly={true} value={allowanceDetail?.Letter_date} label={'Letter Date'} name={'Letter_date'} />
                    </div>
                    <hr className="mt-5"/>
                    <div className="col-md-4 p-0">
                        <Input type={'number'} onChange={handleChange} value={allowanceDetail?.Deposit_Amount} label={'Deposit Amount'} name={'Deposit_Amount'} />
                    </div>
                    <div className="col-md-4 p-0">
                        <Input type={'number'} onChange={handleChange} value={allowanceDetail?.Cash_Award_Amount} label={'Cash Award Amount'} name={'Cash_Award_Amount'} />
                    </div>
                    <div className="col-md-4 p-0">
                        <Input onChange={handleChange} value={allowanceDetail?.remarks} label={'Remarks'} name={'remarks'} />
                    </div>
                    <div className="col-12 mt-5 d-flex justify-content-end align-items-center p-0">
                        <CancelButton onClick={reset} title={'Cancel'} />
                        <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                        <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                    </div>
                </div>
            </div>
        </>
    )
}
function mapStateToProps({ cashAllowance }) {
    return { cashAllowance };
}
export default connect(mapStateToProps, CashAllowance_Action)(CashAllowanceForm);