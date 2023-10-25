import React from "react";
import style from '../assets/css/Transaction_Education.module.css'
import Input from "../../components/basic/input";
import Select from '../../components/basic/select/';
import {PrimaryButton,CancelButton} from '../../components/basic/button/index';

const Transaction_Form = ({cancel}) => {
    const EditBack=()=>{
        cancel('read')
    }
    return (
        <>
            <div>
                <h4 className={style.EmployeeHeading}>Employee Information</h4>
                <hr />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input label={'Employee Name'} placeholder={'Name'}/>
                    <Input label={'Designation'} placeholder={'Your designation'} />
                    <Input label={'Department'} placeholder={'Your department'} />
                </div>
            </div>
            <div style={{ paddingTop: "30px" }}>
                <h4 className={style.EmployeeHeading}>Education History</h4>
                <hr />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Select
                        label={"Education"}
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
                    <Select
                        label={"Institute"}
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
                    <Input label={'Top flag'} placeholder={'flag'} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input label={'Year'} placeholder={'Search here'} />
                    <Select
                        label={"Grade"}
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
                <div style={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <CancelButton onClick={EditBack} title={'Cancel'}/>
                        <PrimaryButton title={'Save'}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transaction_Form;