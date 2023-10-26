import React from "react";
import style from './select.module.css'
import { Select } from "antd";

export default function SelectCom({options, label,placeholder}) {
    return (
        <>
            <div style={{ padding: '10px',display:'flex',flexDirection:'column' }}>
                <label className={style.label}>{label}</label>
                    {console.log(options)}
                <Select
                    style={{
                        width: 300,
                    }}
                    placeholder={placeholder}
                    options={options}
                />
            </div>
        </>
    )
}