import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function EmployeeCategoryForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Employee Category</h4>
                <hr />
                <div className="form-group formBoxDivisions">
                    <Input placeholder={'Employee Category Name'} label={'Employee Category Name'} type="text" />
                    <Input placeholder={'Employee Category Abbrivation'} label={'Employee Category Abbrivation'} type="text" />
                    <Input placeholder={'Graduity Fund Percentage'} label={'Graduity Fund Percentage'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxDivisions">
                    <Input placeholder={'Division Head'} label={'Division Head'} type="number" />
                    <Input placeholder={'Division Category Code'} label={'Division Category Code'} type="number" />
                </div> */}
                <div className='EmployeCategoryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default EmployeeCategoryForm
