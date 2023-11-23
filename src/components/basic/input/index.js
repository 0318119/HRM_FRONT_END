import React from "react";
import style from './input.module.css'

export default function Input({type, placeholder, label,readonly,value,onChange,max,name,className}) {
    return (
        <>
            <div className={style.Label} id={`inputBox`}>
                <label className="m-0 p-0">{label}</label>
                <input name={name} maxLength={max} onChange={(e)=>onChange(e)} defaultValue={value} readOnly={readonly} className={style.Input}  type={type} placeholder={placeholder}/>
            </div>
        </>
    )
}



