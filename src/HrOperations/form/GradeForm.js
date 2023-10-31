import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function GradeForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Grade</h4>
                <hr />
                <div className="form-group formBoxGrade">
                    <Input placeholder={'Grade Name'} label={'Grade Name'} type="text" />
                    <Input placeholder={'Grade Abbrivation'} label={'Grade Abbrivation'} type="text" />
                    <Input placeholder={'Probation Months'} label={'Probation Months'} type="number" />
                    <Input placeholder={'Incentive Hour Rate'} label={'Incentive Hour Rate'} type="number" />
                    <Input placeholder={'Incentive Weekdays Limit Hour'} label={'Incentive Weekdays Limit Hour'} type="number" />
                    <Input placeholder={'Incentive Saturday Limit Hour'} label={'Incentive Saturday Limit Hour'} type="number" />
                    <Input placeholder={'Medical Insurance Amount'} label={'Medical Insurance Amount'} type="number" />
                    <Input placeholder={'Meal Deduction'} label={'Meal Deduction'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                <div className="form-group formBoxGrade">
                    <Input placeholder={'Litres For Petrol'} label={'Litres For Petrol'} type="number" />
                    <Input placeholder={'Insurance Category'} label={'Insurance Category'} type="text" />
                    <Input placeholder={'Life Insurance Category'} label={'Life Insurance Category'} type="text" />
                    <Input placeholder={'Long Name'} label={'Long Name'} type="text" />
                    <Input placeholder={'Job Description Flag'} label={'Job Description Flag'} type="CheckBox" />
                    <Input placeholder={'Next Promotion Grade'} label={'Next Promotion Grade'} type="number" />
                    <Input placeholder={'Assigning Critaria For Next Promotion'} label={'Assigning Critaria For Next Promotion'} type="number" />
                    <Input placeholder={'Overtime Flag'} label={'Overtime Flag'} type="CheckBox" />
                    <Input placeholder={'Mobile Amount'} label={'Mobile Amount'} type="number" />
                    <Input placeholder={'Car Amount'} label={'Car Amount'} type="number" />
                </div>
                <div className='GradeBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default GradeForm
