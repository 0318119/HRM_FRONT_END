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
    const [allowanceDetail, setAllowanceDetail] = useState({
        Description: "",
        Flag: "",
    })

    const reset = () => {
        cancel('read')
        setAllowanceDetail({
            Description: "",
            Flag: "",
        })
    }
    useEffect(() => {
        DataLoader()
    }, [])
    const DescriptionChange = (e) => {
        setAllowanceDetail(
            {
                Description:e,
                Flag:allowanceDetail.Flag,
            }
        )
    }
    const FlagChange = (e) => {
        setAllowanceDetail(
            {
                Description:allowanceDetail.Description,
                Flag:e.target.value,
            }
        )
    }
    const DataLoader = async () => {
        setLoader(true)
        const employeeData = await getEmployeeData_Fixed({ Emp_Code: currentUser })
        const allowanceList = await getAllowanceList_Fixed({ Emp_code: currentUser })
        setAllowanceDetail({
            Description: allowanceList[0]?.Salary_hold_description == undefined ? '0' : allowanceList[0]?.Salary_hold_description,
            Flag: allowanceList[0]?.salary_hold_flag == undefined ? '' : allowanceList[0]?.salary_hold_flag,
        })
        setEmployee(employeeData[0]);
        setLoader(false)
    }
   
    const saveAllowance = async () => {
        setLoading(true)
        if (allowanceDetail.Description == "" || allowanceDetail.Description == undefined) {
            message.error('Description is required')
            setLoading(false)
        }
        else if (allowanceDetail.Flag == "" || allowanceDetail.Flag == undefined) {
            message.error('Salary Hold Flag is required')
            setLoading(false)
        }
        else {
            const AllowanceSave = await saveAllowanceDetail_Fixed({
                Emp_code: currentUser,
                Salary_Hold_Flag: allowanceDetail?.Flag,
                Description: allowanceDetail.Description,
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
                    </div>
                    <>
                        <div style={{ paddingTop: '20px' }}>
                            <h3 style={{ color: 'black' }}>Transaction Information</h3>
                            <hr />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input onChange={(e)=>DescriptionChange(e.target.value)} value={allowanceDetail?.Description} label={'Description'} name={'Description'} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ fontWeight: '600' }}>Salary Hold Flag</label>
                                <div style={{ display: "flex", alignItems: 'center', paddingBlock: '12px' }}>
                                    <Radio.Group onChange={FlagChange} defaultValue={allowanceDetail?.Flag}>
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