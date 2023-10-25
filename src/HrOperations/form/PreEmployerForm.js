import React from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from '../../components/basic/input'



function PreEmployerForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }

    return (
        <>
            <div>
                <h4 className="text-dark">Previous Employer</h4>
                <hr />
                <div className="form-group formBoxPreEmployer">
                    <Input label={'Employer Name'} placeholder={'Employer Name'} type="text" name="Employer Name" />
                    <Input label={'Employer Code'} name="Employer Code" placeholder={'Employer Code'} type="number" />
                    <Input label={'Industry Flag'} name="Industry Flag" placeholder={'Industry Flag'}  type="CheckBox" />
                    <Input label={'Contact Name'} name="Contact Name" placeholder={'Contact Name'} type="text" />
                    <Input label={'Contact Title'} name="Contact Title" placeholder={'Contact Title'}  type="text" />
                    <Input label={'Address Line 1'} name="Address Line 1" placeholder={'Address Line 1'} type="text" />
                    <Input label={'Address Line 2'} name="Address Line 2" placeholder={'Address Line 2'} type="text" />
                    <Input label={'Telephone Number'} name="Telephone Number" placeholder={'Telephone Number'} type="number" />
                    <Input label={'Fax Number'} name="Fax Number" placeholder={'Fax Number'} type="number" />
                </div>
                <hr />
                {/* <div className="form-group formBoxPreEmployer">
                    <Input placeholder={'Compensatory Flag'} name="Compensatory Flag" label={'Compensatory Flag'} type="CheckBox" />
                </div> */}
                <div className='PreEmployerBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default PreEmployerForm
