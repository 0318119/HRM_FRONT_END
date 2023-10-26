import React from "react";
import style from './input.module.css'

export default function Input({type, placeholder, label,onChange}) {
    return (
        <>
            <div className={style.Label} id="inputBox">
                <label className="m-0 p-0">{label}</label>
                <input className={style.Input}  type={type} placeholder={placeholder}
                        onChange={(e) => onChange(e)}
                  />
            </div>
        </>
    )
}