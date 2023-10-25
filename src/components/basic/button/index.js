import React, { useEffect } from "react";
import style from './button.module.css'
import { message } from 'antd';

function Button({ title,onClick }) {
    return (
        <>
            <div className={style.PrimaryButton}>
                <button onClick={()=>{onClick()}}>{title}</button>
            </div>
        </>
    )
}


function PrimaryButton({ title, loading, type}) {
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if(loading){
            messageApi.open({
                type: 'loading',
                content: 'Please Wait..',
                duration: 0,
            });
        }
        else{
            messageApi.destroy()
        }
    }, [loading])

    return (
        <>
            {contextHolder}
            <div className={style.PrimaryButton}>
                <button style={{ cursor: loading ? "not-allowed" : "pointer" }} type={type} disabled={loading}>{title}</button>
            </div>
        </>
    )
}

function CancelButton({ title,onClick }) {
    return (
        <>
            <div className={style.cancelButton}>
                <button onClick={()=>onClick()}>{title}</button>
            </div>
        </>
    )
}

export {PrimaryButton,CancelButton,Button}