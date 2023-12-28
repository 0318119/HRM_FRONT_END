import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import Input from "../../components/basic/input";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { SectionScheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Section_ACTIONS from "../../store/actions/HrOperations/Section/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";

import baseUrl from "../../../src/config.json";

function SectionForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Section,
  Get_Section_Data_By_Id,
  GetSectionData,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
    try {
      const isValid = await SectionScheme.validate(data);
      if (isValid) {
        POST_SectionForm(data);
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
        Section_code: Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_code
        ? Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_code
        : 0,
        Section_name:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_name,
        Section_abbr:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Resign_abbr,
        Dept_code:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code,
        Section_Head:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_Head,
        Sort_key: Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
    },

    mode: "onChange",
    resolver: yupResolver(SectionScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
        Get_Section_Data_By_Id(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Section_code: 0,
        Section_name: "",
        Section_abbr: "",
        Dept_code:"",
        Section_Head:"",   
        Sort_key: "",
      });
    } else {
      reset({
        Section_code:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_code,
        Section_name:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_name,
        Section_abbr:Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_abbr,
        Dept_code: Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Dept_code,
        Section_Head: Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Section_Head,
        Sort_key: Red_Section?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      });
    }
  }, [Red_Section?.dataSingle?.[0]?.res?.data?.[0]]);

  // Section FORM DATA API CALL ===========================

  async function POST_SectionForm(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/employment_section_code/AddEmploymentSectionCode`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Section_code: body?.Section_code,
        Section_name: body?.Section_name,
        Section_abbr: body?.Section_abbr,
        Dept_code: body?.Dept_code,
        Section_Head: body?.Section_Head,
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
            GetSectionData({
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
        <h4 className="text-dark">Section</h4>
        <hr />
        <div className="form-group formBoxSection">
          <FormInput
            label={"Section Code"}
            placeholder={"Section Code"}
            id="Section_code"
            name="Section_code"
            type="number"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Section Name"}
            placeholder={"Section Name"}
            id="Section_name"
            name="Section_name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Section Abbr"}
            placeholder={"Section Abbr"}
            id="Section_abbr"
            name="Section_abbr"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Dept Code"}
            label={"Dept Code"}
            id="Dept_code"
            name="Dept_code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Section Head"}
            label={"Section Head"}
            id="Section_Head"
            name="Section_Head"
            type="number"
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
        <div className="SectionBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_Section }) {
  return { Red_Section };
}
export default connect(mapStateToProps, Section_ACTIONS)(SectionForm);
