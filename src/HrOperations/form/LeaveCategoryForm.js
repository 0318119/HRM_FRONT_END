import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function LeaveCategoryForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Institutions</h4>
                <hr />
                <div className="form-group formBoxLeaveCategory">
                    <Input placeholder={'Leave Category Name'} label={'Leave Category Name'} type="text" />
                    <Input placeholder={'Leave Category Abbrivation'} label={'Leave Category Abbrivation'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxLeaveCategory">
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div> */}
                <div className='leaveCategoryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default LeaveCategoryForm
