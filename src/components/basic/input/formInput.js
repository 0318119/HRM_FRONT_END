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
    ...rest
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            {showLabel && (
                <label htmlFor={name}>
                    {label}
                </label>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <input
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
    showLabel = true,
    ...rest
}) => {
    return (
         <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', }}>
         {showLabel && (
             <label>
                 {label}
             </label>
         )}
         <Controller
             control={control}
             name={name}
             render={({ field }) => {
                 return (
                    <Select
                        {...field}
                        {...rest}
                        name={name} id={name}
                        placeholder="Select users"
                        options={options}
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

export { FormInput, FormCheckBox,FormSelect };
