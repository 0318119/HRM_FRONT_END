import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from "../../components/basic/input";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { ReligionScheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Religion_ACTIONS from "../../store/actions/HrOperations/Religion/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";

import baseUrl from "../../../src/config.json";

function ReligionForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Religion,
  Get_Religion_Data_By_Id,
  GetReligionData,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
    try {
      const isValid = await ReligionScheme.validate(data);
      if (isValid) {
        POST_ReligionForm(data);
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
      Religion_code: Red_Religion?.dataSingle?.[0]?.res?.data?.[0]
        ?.Religion_code
        ? Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Religion_code
        : 0,

      Religion_name:
        Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Religion_name,
      Religion_abbr:
        Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Religion_abbr,
      Sort_key: Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
    },

    mode: "onChange",
    resolver: yupResolver(ReligionScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      Get_Religion_Data_By_Id(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Religion_code: 0,
        Religion_name: "",
        Religion_abbr: "",
        Sort_key: "",
      });
    } else {
      reset({
        Religion_code:
          Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Religion_code,
        Religion_name:
          Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Religion_name,
        Religion_abbr:
          Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Religion_abbr,
        Sort_key: Red_Religion?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      });
    }
  }, [Red_Religion?.dataSingle?.[0]?.res?.data?.[0]]);

  // Religion FORM DATA API CALL ===========================
  async function POST_ReligionForm(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/religion_code/AddReligion`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Religion_code: body?.Religion_code,
        Religion_name: body?.Religion_name,
        Religion_abbr: body?.Religion_abbr,
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
            GetReligionData({
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
        <h4 className="text-dark">Religion</h4>
        <hr />
        <div className="form-group formBoxReligion">
          <FormInput
            label={"Religion Code"}
            placeholder={"Religion Code"}
            id="Religion_code"
            name="Religion_code"
            type="number"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Religion Name"}
            label={"Religion Name"}
            id="Religion_name"
            name="Religion_name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Religion Abbrivation"}
            label={"Religion Abbrivation"}
            id="Religion_abbr"
            name="Religion_abbr"
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
        <div className="ReligionBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_Religion }) {
  return { Red_Religion };
}
export default connect(mapStateToProps, Religion_ACTIONS)(ReligionForm);
