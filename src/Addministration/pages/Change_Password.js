import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton, SimpleButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Header from "../../components/Includes/Header.js";
import '../assest/css/Change_password.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as CHNGPWD from "../../store/actions/Addministration/UserProfile/index.js";
import { FormInput } from "../../components/basic/input/formInput";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../config.json";

function Change_Password({ Red_ChangePassword, GetChangePassword }) {
    var get_access_token = localStorage.getItem("access_token");
    var GetEmpCode = localStorage.getItem('Emp_code');
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);

    const ChangePassWordScheme = yup.object().shape({
        Old_Password: yup.string().required("Old Password is required"),
        New_Password: yup.string().required("New Password is required"),
        confirmPass: yup.string().required("confirm Pass is required"),

    });


    const submitForm = async (data) => {
        try {
            const isValid = await ChangePassWordScheme.validate(data);

            if (isValid) {
                if (data.New_Password !== data.confirmPass) {
                    messageApi.open({
                        type: 'error',
                        content: "New password and confirm password do not match",
                    });
                } else {
                    ChangePassword(data);
                }
            }
        } catch (error) {
            console.error(error, "error message");
        }
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(ChangePassWordScheme),
    });

    const ChangePassword = async (data) => {
        try {
            const response = await GetChangePassword({
                Old_Password: data.Old_Password,
                New_Password: data.New_Password,
            });

            if (response && response.success) {
                messageApi.success("You have successfully changed your password");
                setTimeout(() => {
                    window.location.href = "/"
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to change password';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while changing password:", error);
            messageApi.error("An error occurred while changing password");
        }
    };


    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    return (
        <>
            <Header />
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)} className='passBox'>
                <h4 className="text-dark">Password</h4>
                <div className=''>
                    <FormInput
                        label={'Old Password'}
                        placeholder={'Old Password'}
                        id="Old_Password"
                        name="Old_Password"
                        type={showPassword ? "text" : "password"}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <button type="button" className="Showbtn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                    <FormInput
                        label={'New Password'}
                        placeholder={'New Password'}
                        id="New_Password"
                        name="New_Password"
                        type={showPassword2 ? "text" : "password"}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <button type="button" className="Showbtn" onClick={() => setShowPassword2(!showPassword2)}>
                        {showPassword2 ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                    <FormInput
                        label={'Confirm Password'}
                        placeholder={'Confirm Password'}
                        id="confirmPass"
                        name="confirmPass"
                        type={showPassword3 ? "text" : "password"}
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <button type="button" className="Showbtn" onClick={() => setShowPassword3(!showPassword3)}>
                        {showPassword3 ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                </div>
                <div className='passBoxBtnBox'>
                    <SimpleButton type={"submit"} loading={isLoading} title="Update" />
                </div>
            </form>
        </>
    );
}
function mapStateToProps({ Red_ChangePassword }) {
    return { Red_ChangePassword };
}
export default connect(mapStateToProps, CHNGPWD)(Change_Password);