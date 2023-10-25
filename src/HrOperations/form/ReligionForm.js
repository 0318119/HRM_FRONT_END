import React from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from '../../components/basic/input'



function ReligionForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }

    return (
        <>
            <div>
                <h4 className="text-dark">Religion</h4>
                <hr />
                <div className="form-group formBoxReligion">
                    <Input label={'Religion Name'} placeholder={'Religion Name'} type="text" name="Religion Name" />
                    <Input label={'Religion Abbrivation'} name="Religion Abbrivation" placeholder={'Religion Abbrivation'} type="number" />
                    <Input label={'Sort Key'} name="Sort Key" placeholder={'Sort Key'} type="CheckBox" />
                </div>
                <hr />
                {/* <div className="form-group formBoxReligion">
                    <Input placeholder={'Compensatory Flag'} name="Compensatory Flag" label={'Compensatory Flag'} type="CheckBox" />
                </div> */}
                <div className='ReligionBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default ReligionForm
