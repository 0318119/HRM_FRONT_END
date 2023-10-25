import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function InstitutionForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Institutions</h4>
                <hr />
                <div className="form-group formBoxInstitution">
                    <Input placeholder={'Institution Name'} label={'Institution Name'} type="text" />
                    <Input placeholder={'Institution Abbrivation'} label={'Institution Abbrivation'} type="text" />
                    <Input placeholder={'Institution Type'} label={'Institution Type'} type="text" />
                    <Input placeholder={'Institution Address line1'} label={'Institution Address line1'} type="text" />
                    <Input placeholder={'Institution Address line2'} label={'Institution Address line2'} type="text" />
                    <Input placeholder={'Institution Address line3'} label={'Institution Address line3'} type="text" />
                    <Input placeholder={'Institution Type'} label={'Institution Type'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                <div className="form-group formBoxInstitution">
                    <Input placeholder={'Institution Phone1'} label={'Institution Phone1'} type="number" />
                    <Input placeholder={'Institution Phone2'} label={'Institution Phone2'} type="number" />
                    <Input placeholder={'Institution Fax1'} label={'Institution Fax1'} type="number" />
                    <Input placeholder={'Institution Fax2'} label={'Institution Fax2'} type="number" />
                    <Input placeholder={'Institution Email'} label={'Institution Email'} type="text" />
                    <Input placeholder={'Institution Website'} label={'Institution Website'} type="text" />
                    <Input placeholder={'Verification Fee'} label={'Verification Fee'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <div className='InstitutionBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default InstitutionForm
