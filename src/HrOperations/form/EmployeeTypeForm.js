import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Select from '../../components/basic/select'
import { Radio } from 'antd';

function EmployeeTypeForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Employee Type</h4>
                <hr />
                <div className="form-group formBoxEmployeeType">
                    <Input placeholder={'Employee Type"'} label={'Employee Type"'} type="text" />
                    <Input placeholder={'Employee Type Abbrivation'} label={'Employee Type Abbrivation'} type="text" />
                    <Input placeholder={'Company Code'} label={'Company Code'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                </div>
                <hr />
                <div className="form-group formBoxEmployeeType">
                    <Input placeholder={'Retirement Age'} label={'Retirement Age'} type="number" />
                    <Input placeholder={'Probation Month'} label={'Probation Month'} type="Date" />
                </div>
                <hr />
                <div className="form-group formBoxEmployeeType"> 
                       <Input placeholder={'Permanant Flag'} label={'Permanant Flag'} type="CheckBox" />
                       <Input placeholder={'Company Employee Flag'} label={'Company Employee Flag'} type="CheckBox" /> 
                    <Select
                        label={"Change Probation Month"}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },

                        ]}
                    />
                </div>
                <div className='EmployeeTypeBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default EmployeeTypeForm
