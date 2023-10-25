import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function EducationForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Education List</h4>
                <hr />
                <div className="form-group formBoxEducation">
                    <Input placeholder={'Education Name'} label={'Education Name'} type="text" />
                    <Input placeholder={'Education Abbrivation'} label={'Education Abbrivation'} type="text" />
                    <Input placeholder={'Education Level Code'} label={'Education Level Code'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxEducation">
                    <Input placeholder={'Division Head'} label={'Division Head'} type="number" />
                    <Input placeholder={'Division Category Code'} label={'Division Category Code'} type="number" />
                </div> */}
                <div className='EducationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default EducationForm
