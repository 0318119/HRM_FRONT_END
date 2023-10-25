import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function EducationLevelForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Education Level List</h4>
                <hr />
                <div className="form-group formBoxEducationLevel">
                    <Input placeholder={'Education Level Name'} label={'Education Level Name'} type="text" />
                    <Input placeholder={'Education Level Abbrivation'} label={'Education Level Abbrivation'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxEducationLevel">
                    <Input placeholder={'Division Head'} label={'Division Head'} type="number" />
                    <Input placeholder={'Division Category Code'} label={'Division Category Code'} type="number" />
                </div> */}
                <div className='EducationLevelBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default EducationLevelForm
