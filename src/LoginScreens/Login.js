import React, { useEffect, useState } from "react";
import '../LoginScreens/Login.css';
import * as ACTIONS from "../store/actions/Login/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import { PrimaryButton } from "../components/basic/button";
import * as yup from "yup";
import { message } from "antd";
import logo from '../Assets/Images/hrm-logo.png'


function Login({
  Red_Login,
  GET_ALL_COMPANY_DATA,
  Login
}) {
  const companies = Red_Login?.COMPANIES?.[0]?.res
  const [isLoading, setLoading] = useState(false)
  const scheme = yup.object().shape({
    Emp_code: yup.string().required("Emp_code is required"),
    Emp_password: yup.string().required("Password is required"),
    company_code: yup.string().required("Company is required"),
  });

  const submitForm = async (data) => {
    try {
      const isValid = await scheme.validate(data);
      if (isValid) {
        confirm(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      company_code: 1
    },
    mode: "onChange",
    resolver: yupResolver(scheme),
  });



  const confirm = async (data) => {
    setLoading(true)
    const payload = JSON.stringify({
      Emp_code: data?.Emp_code,
      Emp_password: data?.Emp_password,
      company_code: data?.company_code
    })
    const isCheck = await Login(payload)
    if (isCheck?.success) {
      message.success("Login")
      localStorage.setItem("refresh", isCheck.refresh_token);
      localStorage.setItem("access_token", isCheck.access_token);
      localStorage.setItem("Emp_code", isCheck.data[0].Emp_code);
      localStorage.setItem("company_code", isCheck.data[0].company_code);
      localStorage.setItem("Payroll_Category", isCheck.data[0].Payroll_Category);
      localStorage.setItem("Parent_Code",isCheck?.data?.[0]?.Parent_Code);
      localStorage.setItem("Emp_Name",isCheck?.data?.[0]?.Emp_name)
      // FOR USER BLOW =======================
      localStorage.setItem("User_Type",isCheck?.data?.[0]?.Role_Code);
      window.location.href = "/TAShortsCut"
      setLoading(false)
    } else {
      message.success(isCheck?.message || isCheck?.messsage)
      setLoading(false)
    }
  }


  useEffect(() => {
    GET_ALL_COMPANY_DATA()
  }, [])

  useEffect(() => {
    if (companies?.message == "failed" || companies?.messsage == "failed") {
      message.error(companies?.message || companies?.messsage)
    }
  }, [companies])

  return (
    <>
      <section className="loginSection">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="loginForm">
                <img src={logo} alt="" />
                <form onSubmit={handleSubmit(submitForm)}>
                  <FormInput
                    label={'Emp_code'}
                    placeholder={'Emp_code'}
                    id="Emp_code"
                    name="Emp_code"
                    type="text"
                    labelClass={"loginLabel"}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormInput
                    label={'Enter Your Password'}
                    placeholder={'Enter Your Password'}
                    id="Emp_password"
                    name="Emp_password"
                    type="password"
                    labelClass={"loginLabel"}
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                  <FormSelect
                    errors={errors}
                    labelClass={"loginLabel"}
                    control={control}
                    name={'company_code'}
                    placeholder={'Select Your Company'}
                    label={'Select Your Company'}
                    options={companies?.data.map((items) => ({
                      value: items?.company_code,
                      label: items?.company_name
                    }))}
                  />
                  <PrimaryButton type={'submit'} loading={isLoading} title="Submit" btnClass={"loginBtnBg"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

function mapStateToProps({ Red_Login }) {
  return { Red_Login };
}
export default connect(mapStateToProps, ACTIONS)(Login)

