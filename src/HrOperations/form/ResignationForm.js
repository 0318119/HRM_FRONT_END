import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from "../../components/basic/input";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { ResignationScheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Resignation_ACTIONS from "../../store/actions/HrOperations/Resignation/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";

import baseUrl from "../../../src/config.json";

function ResignationForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Resignation,
  Get_Resignation_Data_By_Id,
  GetResignationData,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
    try {
      const isValid = await ResignationScheme.validate(data);
      if (isValid) {
        POST_ResignationForm(data);
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
      Resign_code: Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_code
        ? Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_code
        : 0,

      Resign_reason:
        Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_reason,
      Resign_abbr:
        Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_abbr,
      Sort_key: Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
    },

    mode: "onChange",
    resolver: yupResolver(ResignationScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      Get_Resignation_Data_By_Id(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Resign_code: 0,
        Resign_reason: "",
        Resign_abbr: "",
        Sort_key: "",
      });
    } else {
      reset({
        Resign_code:
          Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_code,
        Resign_reason:
          Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_reason,
        Resign_abbr:
          Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Resign_abbr,
        Sort_key: Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      });
    }
  }, [Red_Resignation?.dataSingle?.[0]?.res?.data?.[0]]);

  // Resignation FORM DATA API CALL ===========================

  async function POST_ResignationForm(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/employee_resignation/AddResignation`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Resign_code: body?.Resign_code,
        Resign_reason: body?.Resign_reason,
        Resign_abbr: body?.Resign_abbr,
        Sort_key: body?.Sort_key,
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
            GetResignationData({
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
        <h4 className="text-dark">Resignation</h4>
        <hr />
        <div className="form-group formBoxResignation">
          <FormInput
            label={"Resign Code"}
            placeholder={"Resign Code"}
            id="Resign_code"
            name="Resign_code"
            type="number"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Resign Reason"}
            label={"Resign Reason"}
            id="Resign_reason"
            name="Resign_reason"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Abbrivation"}
            label={"Abbrivation"}
            id="Resign_abbr"
            name="Resign_abbr"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Sort Key"}
            label={"Sort Key"}
            name="Sort_key"
            id="Sort_key"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <hr />
        <div className="ResignationBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_Resignation }) {
  return { Red_Resignation };
}
export default connect(mapStateToProps, Resignation_ACTIONS)(ResignationForm);
