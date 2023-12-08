import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Header from "../../components/Includes/Header.js";
import '../assest/css/Change_password.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as CHNGPWD from "../../store/actions/Addministration/UserProfile/index.js";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../../src/config.json";

function Change_Password({ Red_ChangePassword, GetChangePassword }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);

    const ChangePassWordScheme = yup.object().shape({
        oldPassw: yup.string().required("oldPassw is required"),
        newPass: yup.string().required("newPass is required"),
    });
    



    const submitForm = async (data) => {
        try {
            const isValid = await ChangePassWordScheme.validate(data);
            if (isValid) {
                ChangePassword(data)
                console.log(data, "data");
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

    const ChangePassword = async (data, e) => {
        const CreateNewPassword = await GetChangePassword({
            Emp_code: data?.Emp_code,
            oldPassw: data?.oldPassw,
            newPass: data?.newPass,
        })
        if (CreateNewPassword.success) {
            messageApi.open({
                type: 'success',
                content: "You have successfully Change Password",
            });
        }
        else {
            messageApi.open({
                type: 'error',
                content: CreateNewPassword?.message || CreateNewPassword?.message,
            });
        }
    }


    return (
        <>
            <Header />
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)} className="MasterClass">
                <h4 className="text-dark">Change Password</h4>
                <hr />
                    <span>
                        <h6>User Name:</h6>
                    </span>
                <div className="form-group Change_PasswordBtnBox">
                    <FormInput
                        label={'Old Password'}
                        placeholder={'Old Password'}
                        id="oldPassw"
                        name="oldPassw"
                        type="numebr"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        label={'New Password'}
                        placeholder={'New Password'}
                        id="newPass"
                        name="newPass"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <div className="Change_PasswordBtnBox">
                    <PrimaryButton type={"Update"} loading={isLoading} title="Update" />
                </div>
            </form>
        </>
    );
}
function mapStateToProps({ Red_ChangePassword }) {
    return { Red_ChangePassword };
}
export default connect(mapStateToProps, CHNGPWD)(Change_Password);
