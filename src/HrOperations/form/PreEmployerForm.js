import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from "../../components/basic/input";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Previous_EmpScheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Previous_Employers_ACTIONS from "../../store/actions/HrOperations/Previous_Emp/index";
import {
  FormInput,
  FormCheckBox,
} from "../../components/basic/input/formInput";
import { message } from "antd";

import baseUrl from "../../../src/config.json";

function PreEmployerForm({
  cancel,
  mode,
  isCode,
  page,
  Red_previous_Employee,
  Get_Previous_Emp_Data_By_Id,
  GetPreviousEmpData,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
    try {
      const isValid = await Previous_EmpScheme.validate(data);
      if (isValid) {
        POST_Previous_EmpForm(data);
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
    defaultValues: {
      Employer_Code: Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
        ?.Employer_Code
        ? Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Employer_Code
        : 0,
      Employer_Name:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Employer_Name,
      Industry_Flag:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Industry_Flag,
      Contact_Name:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Contact_Name,
      Contact_Title:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Contact_Title,
      Address_Line_1:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Address_Line_1,
      Address_Line_2:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Address_Line_2,
      Telephone_number:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
          ?.Telephone_number,
      Fax_number:
        Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Fax_number,
    },

    mode: "onChange",
    resolver: yupResolver(Previous_EmpScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      Get_Previous_Emp_Data_By_Id(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Employer_Code: 0,
        Employer_Name: "",
        Industry_Flag: "",
        Contact_Name: "",
        Contact_Title: "",
        Address_Line_1: "",
        Address_Line_2: "",
        Telephone_number: "",
        Fax_number: "",
      });
    } else {
      reset({
        Employer_Code:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Employer_Code,
        Employer_Name:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Employer_Name,
        Industry_Flag:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Industry_Flag,
        Contact_Name:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Contact_Name,
        Contact_Title:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Contact_Title,
        Address_Line_1:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
            ?.Address_Line_1,
        Address_Line_2:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
            ?.Address_Line_2,
        Telephone_number:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
            ?.Telephone_number,
        Fax_number:
          Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]?.Fax_number,
      });
    }
  }, [Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]]);

  // Previous Emp FORM DATA API CALL ===========================

  async function POST_Previous_EmpForm(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/allemployer/AddEmployer`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },

      body: JSON.stringify({
        Employer_Code: body?.Employer_Code,
        Employer_Name: body?.Employer_Name,
        Industry_Flag: body?.Industry_Flag,
        Contact_Name: body?.Contact_Name,
        Contact_Title: body?.Contact_Title,
        Address_Line_1: body?.Address_Line_1,
        Address_Line_2: body?.Address_Line_2,
        Telephone_number: body?.Telephone_number,
        Fax_number: body?.Fax_number,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.success) {
          messageApi.open({
            type: "success",
            content: response?.message || response?.messsage,
          });
          setLoading(false);
          setTimeout(() => {
            cancel("read");
            GetPreviousEmpData({
              pageSize: 10,
              pageNo: page,
              search: null,
            });
          }, 3000);
        } else {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: response?.message || response?.messsage,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: error?.message || error?.messsage,
        });
      });
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(submitForm)}>
        <h4 className="text-dark">Previous Employer</h4>
        <hr />
        <div className="form-group formBoxPreEmployer">
          <FormInput
            label={"Employer Code"}
            placeholder={"Employer Code"}
            id="Employer_Code"
            name="Employer_Code"
            type="number"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Employer Name"}
            placeholder={"Employer Name"}
            id="Employer_Name"
            name="Employer_Name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <div className="d-flex">
            <FormCheckBox
              type="radio"
              labelText={"Industry Flag"}
              id="Industry_Flag"
              name="Industry_Flag"
              label={"Yes"}
              value={"Y"}
              defaultChecked={
                Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
                  ?.Industry_Flag == "Y"
                  ? true
                  : false
              }
              showLabel={true}
              errors={errors}
              control={control}
            />
            <FormCheckBox
              type="radio"
              id="Industry_Flag"
              name="Industry_Flag"
              label={"No"}
              value={"N"}
              defaultChecked={
                Red_previous_Employee?.dataSingle?.[0]?.res?.data?.[0]
                  ?.Industry_Flag == "N"
                  ? true
                  : false
              }
              showLabel={true}
              errors={errors}
              control={control}
            />
          </div>

          <FormInput
            placeholder={"Contact Name"}
            label={"Contact Name"}
            id="Contact_Name"
            name="Contact_Name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Contact Title"}
            label={"Contact Title"}
            id="Contact_Title"
            name="Contact_Title"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Address Line 1"}
            label={"Address Line 1"}
            name="Address_Line_1"
            id="Address_Line_1"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Address Line 2"}
            label={"Address Line 2"}
            name="Address_Line_2"
            id="Address_Line_2"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Telephone Number"}
            label={"Telephone Number"}
            name="Telephone_number"
            id="Telephone_number"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Fax Number"}
            label={"Fax Number"}
            name="Fax_number"
            id="Fax_number"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <hr />
        <div className="PreEmployerBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_previous_Employee }) {
  return { Red_previous_Employee };
}
export default connect(
  mapStateToProps,
  Previous_Employers_ACTIONS
)(PreEmployerForm);
