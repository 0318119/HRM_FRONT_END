import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";

function GradeForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Holidays</h4>
                <hr />
                <div className="form-group formBoxHolidays">
                    <Input placeholder={'Holidays Name'} label={'Holidays Name'} type="text" />
                    <Input placeholder={'Holidays Abbrivation'} label={'Holidays Abbrivation'} type="text" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group formBoxHolidays">
                    <Input placeholder={'Car Amount'} label={'Car Amount'} type="number" />
                </div> */}
                <div className='HolidayBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default GradeForm
