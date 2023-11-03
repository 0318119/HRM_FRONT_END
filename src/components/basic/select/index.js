import React from "react";
import style from './select.module.css'
import { Select } from "antd";

export default function SelectCom({options, label,onChange}) {
    // console.log(options)
    return (
        <>
            <div style={{ padding: '10px',display:'flex',flexDirection:'column' }}>
                <label className={style.label}>{label}</label>
                <Select
                    style={{
                        width: 250,
                    }}
                    options={options}
                    onChange={(e) => onChange(e)}

                />
            </div>
        </>
    )
}