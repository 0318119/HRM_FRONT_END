import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input/index.js";
import { CancelButton, PrimaryButton, SimpleButton } from "../../components/basic/button/index.js";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import './ForgetPassword.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as ForgetPassword_Actions from "../../store/actions/LoginScreen/ForgetPassword/index";
// import { FormInput } from "../../components/basic/input/formInput.js";
import Select from "../../components/basic/select"
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../config.json";

function Forgetpassword({ Red_Forget_Password, SEND_PASSWORD_OTP, GET_Company_Code, Verify_OTP, UpdatePassword }) {
  var get_access_token = localStorage.getItem("access_token");
  var GetEmpCode = localStorage.getItem('Emp_code');
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [isSendOTP, setSendOTP] = useState(true)
  const [isVerify, setVerify] = useState(false)
  const [isUpdatePassword, setUpdatePassword] = useState(false)
  const [Emp_code, setEmpCode] = useState('')
  const [company_code, setCompany_code] = useState('')

  const SendOtpSchema = yup.object().shape({
    Emp_Code: yup.string().required("Emp_Code is required"),
    company_code: yup.string().required("company_code is required"),
  });
  // const VerifyOtpSchema = yup.object().shape({
  //   Emp_Code: yup.string().required("Emp_Code is required"),
  //   company_code: yup.string().required("company_code is required"),
  //   OTP: yup.string().required("OTP is required"),
  // });
  // const UpdatePasswordSchema = yup.object().shape({
  //   Emp_Code: yup.string().required("Emp_Code is required"),
  //   new_password: yup.string().required("new_password is required"),
  //   company_code: yup.string().required("company_code is required"),
  // });

  const submitForm = async (data) => {
    try {
      const isValid = await SendOtpSchema.validate(data);
      if (isValid) {
        SEND_OTP(data) 
      }
    } catch (error) {
      console.error(error, "error message");
    }
  };

  // const submitFormVerify = async (data) => {
  //   try {
  //     const isValid = await VerifyOtpSchema.validate(data);
  //     if (isValid) {
  //       Verify_OTPCode(data)
  //     }
  //   } catch (error) {
  //     console.error(error, "error message");
  //   }
  // };
  // const submitFormUpdate = async (data) => {
  //   try {
  //     const isValid = await UpdatePasswordSchema.validate(data);
  //     if (isValid) {
  //       UpdatePswd(data)
  //     }
  //   } catch (error) {
  //     console.error(error, "error message");
  //   }
  // };

  // const selectSchema = (arg) => {
  //   switch (arg) {
  //     case "sendOTP":
  //       return SendOtpSchema;
  //     case "verifyOTP":
  //       return VerifyOtpSchema;
  //     case "updatePassword":
  //       return UpdatePasswordSchema;
  //     default:
  //       return null;
  //   }
  // };
   

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {},
    mode: "onChange",
    resolver: yupResolver(SendOtpSchema), 
  });




  // const UpdatePswd = async (data) => {
  //   try {
  //     const response = await UpdatePassword({
  //       Emp_Code: data.Emp_Code,
  //       company_code: data.company_code,
  //       new_password: data.new_password
  //     });
  //     console.log(response, 'response')
  //     if (response && response.success) {
  //       messageApi.success("You have successfully Verified OTP");
  //       setVerify(false)
  //       setUpdatePassword(true)
  //     } else {
  //       const errorMessage = response?.message || 'Failed to Verified OTP';
  //       messageApi.error(errorMessage);
  //     }
  //   } catch (error) {
  //     messageApi.error("An error occurred while Verified OTP");
  //   }

  // } 



  // const Verify_OTPCode = async (data) => {
  //   try {
  //     const response = await Verify_OTP({
  //       Emp_Code: data.Emp_Code,
  //       company_code: data.company_code,
  //       OTP: data.OTP
  //     });
  //     console.log(response, 'response')
  //     if (response && response.success) {
  //       messageApi.success("You have successfully Verified OTP");
  //       setVerify(false)
  //       setUpdatePassword(true)
  //     } else {
  //       const errorMessage = response?.message || 'Failed to Verified OTP';
  //       messageApi.error(errorMessage);
  //     }
  //   } catch (error) {
  //     messageApi.error("An error occurred while Verified OTP");
  //   }

  // } 

  const SEND_OTP = async (data) => {
    try {
      const response = await SEND_PASSWORD_OTP({
        Emp_Code: data.Emp_Code,
        company_code: data.company_code,
      });

      if (response && response.success) {
        messageApi.success("You have successfully Send OTP");
        setTimeout(() => {
          window.location.href = "/VerifyOtp"
        }, 3000);
      } else {
        const errorMessage = response?.message || 'Failed to Sent OTP';
        messageApi.error(errorMessage);
      }
    } catch (error) {
      // console.error("Error occurred while changing password:", error);
      messageApi.error("An error occurred while send OTP");
    }
   
  }



  useEffect(() => {
    GET_Company_Code()
  },[])

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(submitForm)} className='passBox'>
        <h4 className="text-dark">SEND OTP</h4>
        <div className=''>
          
          <FormInput
            errors={errors}
            control={control}
            label={'Enter Employee Code'}
            placeholder={'Enter Employee Code'}
            id="Emp_Code"
            name="Emp_Code"
            type="number"
            showLabel={true}
          />

          <FormSelect
            errors={errors}
            control={control}
            name={'company_code'}
            placeholder={'Select Company'}
            label={'Select Company'}
            options={Red_Forget_Password.data?.[0]?.res?.data?.map(
              (item) => ({
                value: item.company_code,
                label: item.company_name,
              })
            )}
          />
        </div>
        <div className='passBoxBtnBox'>
          <SimpleButton type={"submit"} loading={isLoading} title="Send" />
        </div>
      </form>
          </>
  );
}
function mapStateToProps({ Red_Forget_Password }) {
  return { Red_Forget_Password };
}
export default connect(mapStateToProps, ForgetPassword_Actions)(Forgetpassword);
