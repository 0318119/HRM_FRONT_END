import React from "react";
import style from './input.module.css'
import { Controller } from 'react-hook-form';
import { Select } from 'antd';



const FormInput = ({
    control,
    name,
    label,
    errors,
    showLabel = true,
    type,
    maxLenght,
    className,
    labelClass,
    ...rest
}) => {
    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            {showLabel && (
                <label style={{ fontWeight: '600' }} htmlFor={name} className={labelClass}>
                    {label}
                </label>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <input
                        maxLength={maxLenght}
                            type={type}
                            className={style.Input}
                            {...field}
                            {...rest}
                        />
                    )
                }}
            />
            {errors[name] && (
                <p
                    style={{
                        margin: "5px 0px",
                        fontSize: "12px",
                        color: 'red'
                    }}
                >
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};
const FormCheckBox = ({
    control,
    name,
    label,
    errors,
    IsPassword,
    type,
    options,
    isShowError,
    showLabel = true,
    labelText,
    ...rest
}) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <>
                        {showLabel && (
                            <label htmlFor="continue-no" className="">{labelText}</label>
                        )}
                        <div className="">
                            <input
                                {...field}
                                {...rest}
                                id={name} type={type} name={name} className="" />
                            {showLabel && (
                                <label htmlFor="continue-no" className="">{label}</label>
                            )}
                        </div>
                    </>
                )}
            />
            {errors[name] && (
                isShowError == true ?
                    <p
                        style={{
                            margin: "5px 0px",
                            fontSize: "12px",
                            color: 'red'
                        }}
                    >
                        {errors[name]?.message}
                    </p>
                    : null
            )}
        </div>
    );
};
const FormSelect = ({
    control,
    name,
    label,
    errors,
    options,
    isShowError,
    placeholder,
    deduction,
    showLabel = true,
    defaultValue,
    disabled,
    labelClass,
    ...rest
}) => {
    const options2 = [];
    if (deduction == 'deduction') {
        
    }
    else if (deduction == 'deductionFlag') {
        options?.map((t) =>
            options2.push({
                value: t?.value,
                label: t?.label,
            })
        )
    } else {
        options?.map((t) =>
            options2.push({
                value: t?.value,
                label: t?.label,
            })
        )
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', }}>
            {showLabel && (
                <label style={{ fontWeight: '600' }} className={labelClass}>
                    {label}
                </label>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <Select
                            style={{width: "100% !important" }}
                            {...field}
                            {...rest}
                            disabled={disabled}
                            name={name} id={name}
                            placeholder={placeholder}
                            defaultValue={defaultValue}
                            options={options2}
                        />
                    )
                }}
            />
            {errors[name] && (
                <p
                    style={{
                        margin: "5px 0px",
                        fontSize: "12px",
                        color: 'red'
                    }}
                >
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};
const Input = ({ type, placeholder, label, readonly, value, onChange, max, onEnterPress, name }) => {
    return (
        <>
            <div className={style.Label} id="inputBox">
                <label className="m-0 p-0">{label}</label>
                <input onKeyDown={onEnterPress} name={name} maxLength={max} onChange={(e) => onChange(e)} defaultValue={value} readOnly={readonly} className={style.Input} type={type} placeholder={placeholder} />
            </div>
        </>
    )
}

export { FormInput, FormCheckBox, FormSelect, Input };