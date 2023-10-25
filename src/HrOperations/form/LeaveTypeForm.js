import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function LeaveCategoryForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Leave Type</h4>
                <hr />
                <div className="form-group formBoxLeaveType">
                    <Input placeholder={'Leave Name'} label={'Leave Name'} type="text" />
                    <Input placeholder={'Leave Type Abbrivation'} label={'Leave Type Abbrivation'} type="text" />
                    <Input placeholder={'Leave Category Code'} label={'Leave Category Code'} type="number" />
                    <Input placeholder={'Start Date'} label={'Start Date'} type="Date" />
                    <Input placeholder={'End Date'} label={'End Date'} type="Date" />
                    <Input placeholder={'Annual Credit'} label={'Annual Credit'} type="number" />
                    <Input placeholder={'Accumulation Limit'} label={'Accumulation Limit'} type="number" />
                    <Input placeholder={'Proportionate Flag'} label={'Proportionate Flag'} type="CheckBox" />
                    <Input placeholder={'Advance Days'} label={'Advance Days'} type="number" />
                    <Input placeholder={'Minimum Days Per Form'} label={'Minimum Days Per Form'} type="number" />
                    <Input placeholder={'Maximum Days Per Form'} label={'Maximum Days Per Form'} type="number" />
                    <Input placeholder={'Life Times'} label={'Life Times'} type="number" />
                    <Input placeholder={'Religion Code'} label={'Religion Code'} type="number" />
                    <Input placeholder={'Increase Leave Code'} label={'Increase Leave Code'} type="number" />
                    <Input placeholder={'Join Confirm Flag'} label={'Join Confirm Flag'} type="CheckBox" />
                    <Input placeholder={'Balance Check Flag'} label={'Balance Check Flag'} type="CheckBox" />
                    <Input placeholder={'Meal Flag'} label={'Meal Flag'} type="CheckBox" />
                </div>
                <hr />
                <div className="form-group formBoxLeaveType">
                    <Input placeholder={'Encashment Flag'} label={'Encashment Flag'} type="CheckBox" />
                    <Input placeholder={'Without Pay Flag'} label={'Without Pay Flag'} type="CheckBox" />
                    <Input placeholder={'Medical Certificate Flag'} label={'Medical Certificate Flag'} type="CheckBox" />
                    <Input placeholder={'Medical Certificate Days'} label={'Medical Certificate Days'} type="number" />
                    <Input placeholder={'Special Approval Flag'} label={'Special Approval Flag'} type="CheckBox" />
                    <Input placeholder={'Special Approval Days'} label={'Special Approval Days'} type="CheckBox" />
                    <Input placeholder={'Married Flag'} label={'Married Flag'} type="CheckBox" />
                    <Input placeholder={'Adjustment flag'} label={'Adjustment flag'} type="CheckBox" />
                    <Input placeholder={'Adjustment Leave Code'} label={'Adjustment Leave Code'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                    <Input placeholder={'On Confirm Flag'} label={'On Confirm Flag'} type="CheckBox" />
                    <Input placeholder={'Days Apply On'} label={'Days Apply On'} type="CheckBox" />
                    <Input placeholder={'Attachment Flag'} label={'Attachment Flag'} type="CheckBox" />
                    <Input placeholder={'Attachment Days'} label={'Attachment Days'} type="number" />
                    <Input placeholder={'HR Entry Stop Flag'} label={'HR Entry Stop Flag'} type="CheckBox" />
                    <Input placeholder={'Repayment Flag'} label={'Repayment Flag'} type="CheckBox" />
                    <Input placeholder={'Gender Flag'} label={'Gender Flag'} type="CheckBox" />
                    <Input placeholder={'Compensatory Flag'} label={'Compensatory Flag'} type="CheckBox" />


                </div>
                <div className='leaveTypeBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default LeaveCategoryForm
