import React from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";


function LocationForm({ cancel }) {
    const EditBack = () => {
        cancel('read')
    }


    return (
        <>
            <div>
                <h4 className="text-dark">Leave Type</h4>
                <hr />
                <div className="form-group formBoxLocation">
                    <Input
                        label={'Location Name'}
                        placeholder={'Location Name'}
                        // id="Location Name"
                        // name="Location Name"
                        type="text"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Location Abbrivation'}
                        placeholder={'Location Abbrivation'}
                        // id="Location Abbrivation"
                        // name="Location Abbrivation"
                        type="text"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Location Address Line1'}
                        placeholder={'Location Address Line1'}
                        // id="Location Address Line1"
                        // name="Location Address Line1"
                        type="text"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Location Address Line2'}
                        placeholder={'Location Address Line2'}
                        // id="Location Address Line2"
                        // name="Location Address Line2"
                        type="text"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Location Address Contact'}
                        placeholder={'Location Address Contact'}
                        // id="Location Address Contact"
                        // name="Location Address Contact"
                        type="text"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Location Address phone'}
                        placeholder={'Location Address phone'}
                        // id="Location Address phone"
                        // name="Location Address phone"
                        type="number"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Location Address Fax'}
                        placeholder={'Location Address Fax'}
                        // id="Location Address Fax"
                        // name="Location Address Fax"
                        type="number"
                        //  showLabel={true}
                        //errors={errors}//
                        //control={control}/ 
                        />
                    <Input
                        label={'City Code'}
                        placeholder={'City Code'}
                        // id="City Code"
                        // name="City Code"
                        type="number"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Level 1 Code'}
                        placeholder={'Level 1 Code'}
                        // id="Level 1 Code"
                        // name="Level 1 Code"
                        type="number"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Bank Code'}
                        placeholder={'Bank Code'}
                        // id="Bank Code"
                        // name="Bank Code"
                        type="number"
                        // showLabel={true}
                        //errors={errors}// 
                        //control={control}/
                    />
                    <Input
                        label={'Sort Key'}
                        placeholder={'Sort Key'}
                        // id="Sort Key"
                        // name="Sort Key"
                        type="text" 
                        // showLabel={true}
                        // errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Eobi City Code'}
                        placeholder={'Eobi City Code'}
                        // id="Eobi City Code"
                        // name="Eobi City Code"
                        type="text"
                        // showLabel={true}
                        //errors={errors}// 
                        //control={control}/
                    />
                    <Input
                        label={'JV Code'}
                        placeholder={'JV Code'}
                        // id="JV Code"
                        // name="JV Code"
                        type="text"
                        // showLabel={true}
                        //errors={errors}//
                        //control={control}/
                    />
                    <Input
                        label={'Branch Flag'}
                        placeholder={'Branch Flag'}
                        // id="Branch Flag"
                        // name="Branch Flag"
                        type="CheckBox"
                        // showLabel={true}
                        //errors={errors}// 
                        //control={control}/ 
                        />

                </div>
                <hr />
                <div className="form-group formBoxLocation">
                    <Input placeholder={'Encashment Flag'} label={'Encashment Flag'} type="CheckBox" />
                    <Input placeholder={'Without Pay Flag'} label={'Without Pay Flag'} type="CheckBox" />
                    <Input placeholder={'Medical Certificate Flag'} label={'Medical Certificate Flag'} type="CheckBox" />
                    <Input placeholder={'Medical Certificate Days'} label={'Medical Certificate Days'} type="number" />
                    <Input placeholder={'Special Approval Flag'} label={'Special Approval Flag'} type="CheckBox" />
                    <Input placeholder={'Special Approval Days'} label={'Special Approval Days'} type="CheckBox" />
                    <Input placeholder={'Married Flag'} label={'Married Flag'} type="CheckBox" />
                    <Input placeholder={'Adjustment flag'} label={'Adjustment flag'} type="CheckBox" />
                    <Input placeholder={'Adjustment Leave Code'} label={'Adjustment Leave Code'} type="number" />
                    <Input placeholder={'Sort Key'} label={'Sort Key'} type="text" />
                    <Input placeholder={'On Confirm Flag'} label={'On Confirm Flag'} type="CheckBox" />
                    <Input placeholder={'Days Apply On'} label={'Days Apply On'} type="CheckBox" />
                    <Input placeholder={'Attachment Flag'} label={'Attachment Flag'} type="CheckBox" />
                    <Input placeholder={'Attachment Days'} label={'Attachment Days'} type="number" />
                    <Input placeholder={'HR Entry Stop Flag'} label={'HR Entry Stop Flag'} type="CheckBox" />
                    <Input placeholder={'Repayment Flag'} label={'Repayment Flag'} type="CheckBox" />
                    <Input placeholder={'Gender Flag'} label={'Gender Flag'} type="CheckBox" />
                    <Input placeholder={'Compensatory Flag'} label={'Compensatory Flag'} type="CheckBox" />


                </div>
                <div className='LocationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton title="Save" />
                </div>
            </div>

        </>
    )
}

export default LocationForm
