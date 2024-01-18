import React, { useEffect } from "react";
import style from './button.module.css'
import { message } from 'antd';

function Button({ title, onClick, loading, type }) {
    return (
        <>
            <div className={style.PrimaryButton}>
                <button type={type} disabled={loading} style={{ cursor: loading ? 'no-drop' : 'pointer' }} onClick={(e) => { onClick(e) }}>
                    {loading ? 'Loading..' : title}
                </button>
            </div>
        </>
    )
}



function SimpleButton({ title, loading, type }) {
    return (
        <>
            <div className={style.PrimaryButton}>
                <button type={type} disabled={loading} style={{ cursor: loading ? 'no-drop' : 'pointer' }}>{loading ? 'Loading..' : title}</button>
            </div>
        </>
    )
}

function PrimaryButton({ title, loading, type, id, className,btnClass}) {
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (loading) {
            messageApi.open({
                type: 'loading',
                content: 'Please Wait..',
                duration: 0,
            });
        }
        else {
            messageApi.destroy()
        }
    }, [loading])

    return (
        <>
            {contextHolder}
            <div className={style.PrimaryButton + " " + className}>
                <button id={id} className={btnClass} style={{ cursor: loading ? "not-allowed" : "pointer" }} type={type} disabled={loading}>{title}</button>
            </div>
        </>
    )
}

function CancelButton({ title, onClick }) {
    return (
        <>
            <div className={style.cancelButton}>
                <button onClick={() => onClick()}>{title}</button>
            </div>
        </>
    )
}

function DeleteButton({ title, onClick, loading }) {
    return (
        <>
            <div className={style.deleteBtn}>
                <button disabled={loading} style={{ cursor: loading ? 'no-drop' : 'pointer' }} onClick={() => { onClick() }}>{loading ? 'Loading..' : title}</button>
            </div>
        </>
    )
}

export { PrimaryButton, CancelButton, Button, DeleteButton, SimpleButton }