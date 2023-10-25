import React from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from '../../components/basic/input'



function SectionForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }

    return (
        <>
            <div>
                <h4 className="text-dark">Section</h4>
                <hr />
                <div className="form-group formBoxSection">
                    <Input label={'Section Name'} placeholder={'Section Name'} type="text" name="Section Name" />
                    <Input label={'Section Abbrivation'} name="Section Abbrivation" placeholder={'Section Abbrivation'} type="text  " />
                    <Input label={'Section Head'} name="Section Head" placeholder={'Section Head'} type="number" />
                    <Input label={'Department Code'} name="Department Code" placeholder={'Department Code'} type="number" />
                    <Input label={'Sort Key'} name="Sort Key" placeholder={'Sort Key'} type="CheckBox" />
                </div>
                <hr />
                {/* <div className="form-group formBoxSection">
                    <Input placeholder={'Compensatory Flag'} name="Compensatory Flag" label={'Compensatory Flag'} type="CheckBox" />
                </div> */}
                <div className='SectionBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default SectionForm
