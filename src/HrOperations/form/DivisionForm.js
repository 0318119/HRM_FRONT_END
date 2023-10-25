import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function DivisionForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Division List</h4>
                <hr />
                <div className="form-group formBoxDivisions">
                    <Input placeholder={'Division Name'} label={'Division Name'} type="text" />
                    <Input placeholder={'Division Abbrivation'} label={'Division Abbrivation'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                <div className="form-group formBoxDivisions">
                    <Input placeholder={'Division Head'} label={'Division Head'} type="number" />
                    <Input placeholder={'Division Category Code'} label={'Division Category Code'} type="number" />
                </div>
                <div className='DivisionsBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default DivisionForm
