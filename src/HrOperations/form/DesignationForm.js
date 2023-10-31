import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function DesignationForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Designation List</h4>
                <hr />
                <div className="form-group formBoxDesignations">
                    <Input placeholder={'Designation Name'} label={'Designation Name'} type="text" />
                    <Input placeholder={'Designation Abbr'} label={'Designation Abbr'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                <div className="form-group formBoxDesignations">
                    <Input placeholder={'Department Code'} label={'Department Code'} type="number" />
                    <Input placeholder={'Sat Allowance'} label={'Sat Allowance'} type="number" />
                    <Input placeholder={'Eve Allowance'} label={'JD Designation Code'} type="number" />
                    <Input placeholder={'JD Designation Code'} label={'JD Designation Code'} type="number" />
                    <Input placeholder={'Job Evaluation Flag'} label={'Job Evaluation Flag'} type="checkbox"/>
                </div>
                <div className='DesignationsBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>
        </>
    )
}

export default DesignationForm
