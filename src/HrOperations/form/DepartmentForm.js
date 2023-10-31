import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";


function DepartmentForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }
    return (
        <>
            <div>
                <h4 className="text-dark">Departments List</h4>
                <hr />
                <div className="form-group formBoxDepartments">
                    <Input placeholder={'Department Name'} label={'Department Name'} type="text" />
                    <Input placeholder={'Department Abbrivation'} label={'Department Abbrivation'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                <div className="form-group formBoxDepartments">
                    <Input placeholder={'Division Code'} label={'Division Code'} type="number" />
                    <Input placeholder={'Department Head'} label={'Department Head'} type="number" />
                    <Input placeholder={'Permanent Budget'} label={'Permanent Budget'} type="number" />
                    <Input placeholder={'Temporary Budget'} label={'Temporary Budget'} type="number" />
                </div>
                <div className='DepartmentsBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>
        </>
    )
}

export default DepartmentForm
