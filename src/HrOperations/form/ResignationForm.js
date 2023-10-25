import React from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from '../../components/basic/input'



function ResignationForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }

    return (
        <>
            <div>
                <h4 className="text-dark">Resignation</h4>
                <hr />
                <div className="form-group formBoxResignation">
                    <Input label={'Resignation Reason'} placeholder={'Resignation Reason'} type="text" name="Resignation Reason" />
                    <Input label={'Resignation Abbrivation'} name="Resignation Abbrivation" placeholder={'Resignation Abbrivation'} type="number" />
                    <Input label={'Sort Key'} name="Sort Key" placeholder={'Sort Key'} type="CheckBox" />
                </div>
                <hr />
                {/* <div className="form-group formBoxResignation">
                    <Input placeholder={'Compensatory Flag'} name="Compensatory Flag" label={'Compensatory Flag'} type="CheckBox" />
                </div> */}
                <div className='ResignationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default ResignationForm
