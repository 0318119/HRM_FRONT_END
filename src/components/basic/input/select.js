import React from "react";
import style from './input.module.css'
import { Select } from 'antd'


export default function SelectAntd({ label, option, handleChange, type,defaultValue }) {
    const options = [];
    if (type == 'allowance') {
        option?.map((t) =>
            options.push({
                value: t?.Allowance_code,
                label: t?.Allowance_name,
            })
        )
    }
    else if(type == 'loan'){
        option?.map((t) =>
        options.push({
            value: t?.Loan_code,
            label: t?.Loan_name,
        })
    )
    }
    else if(type == 'month'){
        option?.map((t) =>
        options.push({
            value: t?.value,
            label: t?.label,
        })
    )
    }
    else{
        option?.map((t) =>
            options.push({
                value: t?.Deduction_code,
                label: t?.Deduction_name,
            })
        )
    }

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <>
            <div className={style.Label} id="inputBox">
                <label className="m-0 p-0">{label}</label>
                <Select defaultValue={defaultValue} labelInValue showSearch filterOption={filterOption} onChange={handleChange} placeholder={"Please select"} allowClear={true} style={{
                    width: 200,
                }} options={options} />
            </div>
        </>
    )
}



