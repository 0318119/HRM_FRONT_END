import React, { useEffect, useState } from "react";
import * as fixedAllowance_Action from "../../../store/actions/payroll/salaryHold/";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message, Radio } from "antd";
import { Button, CancelButton } from '../../../components/basic/button/index';

const FixedAllowanceForm = ({ currentUser, getEmployeeData_Fixed, getAllowanceList_Fixed, saveAllowanceDetail_Fixed, cancel, DeleteAllowanceDetail_Fixed }) => {
    const [employee, setEmployee] = useState()
    const [allowanceList, setAllowanceList] = useState()
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)


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
        const employeeData = await getEmployeeData_Fixed({ Emp_Code: currentUser })
        const allowanceList = await getAllowanceList_Fixed({ Emp_code: currentUser })
        setAllowanceList(allowanceList[0])
        setEmployee(employeeData[0]);
        setLoader(false)
    }
    const [allowanceDetail, setAllowanceDetail] = useState({
        Amount: "",
        Remarks: "",
        Allowance_Code: "",
        Emp_code: "",
        Deduction_code: ""
    })
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
            const AllowanceSave = await saveAllowanceDetail_Fixed({
                Emp_Code: allowanceDetail?.Emp_code,
                Allowance_code: allowanceDetail?.Allowance_Code,
                Deduction_code: '0',
                ADE_flag: "A",
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
        const AllowanceSave = await DeleteAllowanceDetail_Fixed({
            Emp_Code: allowanceDetail?.Emp_code,
            Allowance_code: allowanceDetail?.Allowance_Code,
            Deduction_code: 2,
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }
    console.log(allowanceList,'asdas')
    return (
        <>
            {loader ? <Skeleton active /> :
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                        <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                    </div>
                    <>
                        <div style={{ paddingTop: '20px' }}>
                            <h3 style={{ color: 'black' }}>Transaction Information</h3>
                            <hr />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input value={allowanceList?.Salary_hold_description} label={'Description'} name={'Description'} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ fontWeight: '600' }}>Salary Hold Flag</label>
                                <div style={{ display: "flex", alignItems: 'center', paddingBlock: '12px' }}>
                                    <Radio.Group value={allowanceList?.salary_hold_flag}>
                                        <Radio value={'Y'}>Yes</Radio>
                                        <Radio value={'N'}>No</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
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
function mapStateToProps({ FixedAllowance }) {
    return { FixedAllowance };
}
export default connect(mapStateToProps, fixedAllowance_Action)(FixedAllowanceForm);