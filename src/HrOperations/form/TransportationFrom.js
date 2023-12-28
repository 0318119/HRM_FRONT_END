import React from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from '../../components/basic/input'



function TransportationFrom({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }

    return (
        <>
            <div>
                <h4 className="text-dark">Transportation</h4>
                <hr />
                <div className="form-group TransportationformBox">
                    <Input label={'Transport Name'} placeholder={'Transport Name'} type="text" name="Transport Name" />
                    <Input label={'Transport Abbrivation'} name="Transport Abbrivation" placeholder={'Transport Abbrivation'} type="text  " />
                    <Input label={'Area Code'} name="Area Code" placeholder={'Area Code'} type="number" />
                    <Input label={'Region Code'} name="Region Code" placeholder={'Region Code'} type="number" />
                    <Input label={'Location Code'} name="Location Code" placeholder={'Location Code'} type="number" />
                    <Input label={'Leave Head Office Treatment Flag'} name="Leave Head Office Treatment Flag" placeholder={'Leave Head Office Treatment Flag'} type="CheckBox" />
                    <Input label={'Sort Key'} name="Sort Key" placeholder={'Sort Key'} type="text" />
                </div>
                <hr />
                {/* <div className="form-group TransportationformBox">
                    <Input placeholder={'Compensatory Flag'} name="Compensatory Flag" label={'Compensatory Flag'} type="CheckBox" />
                </div> */}
                <div className='TransportationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default TransportationFrom
