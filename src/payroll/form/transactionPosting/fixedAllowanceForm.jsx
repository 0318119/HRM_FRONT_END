import React, { useEffect, useState } from "react";
import * as fixedAllowance_Action from "../../../store/actions/payroll/fixedAllowance/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const FixedAllowanceForm = ({ currentUser, getEmployeeData_Fixed, getAllowanceList_Fixed, getAllowanceDetail_Fixed, saveAllowanceDetail_Fixed, cancel, DeleteAllowanceDetail_Fixed }) => {
    const [employee, setEmployee] = useState()
    const [allowanceList, setAllowanceList] = useState()
    const [isNext, setIsNext] = useState(false)
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
        const employeeData = await getEmployeeData_Fixed({ Emp_Code: currentUser })
        const allowanceList = await getAllowanceList_Fixed()
        setAllowanceList(allowanceList)
        setEmployee(employeeData[0]);
    }
    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            const AllowanceDetail = await getAllowanceDetail_Fixed({ Allowance_Code: e?.value, Emp_code: employee?.Sequence_no })
            setAllowanceDetail({
                Amount: AllowanceDetail[0]?.Amount == undefined ? '0' : AllowanceDetail[0]?.Amount,
                Remarks: AllowanceDetail[0]?.Remarks == undefined ? '' : AllowanceDetail[0]?.Remarks,
                Deduction_code: '0',
                Allowance_Code: e?.value,
                Emp_code: employee?.Sequence_no,
            })
            setIsNext(true)
        }
        else {
            setIsNext(false)
        }
    }
    const [allowanceDetail, setAllowanceDetail] = useState({
        Amount: "",
        Remarks: "",
        Allowance_Code: "",
        Emp_code: "",
        Deduction_code: ""
    })
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
    return (
        <>
            <div className="container p-0">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                    </div>
                    <div className="col-md-6 p-0">
                        <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                        <Select type={'allowance'} handleChange={OnSelect} label={'Select Allowance'} option={allowanceList} />
                    </div>
                </div>
                <div className="row">
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
function mapStateToProps({ FixedAllowance }) {
    return { FixedAllowance };
}
export default connect(mapStateToProps, fixedAllowance_Action)(FixedAllowanceForm);