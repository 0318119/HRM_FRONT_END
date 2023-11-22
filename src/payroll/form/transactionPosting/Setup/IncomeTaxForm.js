import React, { useState, useEffect } from "react";
import {
  CancelButton,
  PrimaryButton,
} from "../../../../components/basic/button/index";
import * as IncomeTax_Column_ACTIONS from "../../../../store/actions/payroll/IncomeTax_Column/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormInput,
  FormSelect,
} from "../../../../components/basic/input/formInput";
import { IncomeTax_ColumnScheme } from "../../../form/transactionPosting/Setup/schema";
import { message } from "antd";
import baseUrl from "../../../../../src/config.json";

function IncomeTaxForm({
  cancel,
  mode,
  isCode,
  page,
  Red_IncomeTax_Column,
  GetIncomeTaxData,
  GetIncomeTax_ColumnById,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
    try {
      const isValid = await IncomeTax_ColumnScheme.validate(data);
      if (isValid) {
        Post_IncomeTax_Column_FORM(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(Red_IncomeTax_Column, "Red_IncomeTax_Column");

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      Column_name:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Column_name,
      Head_Line_01:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_01,
      Head_Line_02:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_02,
      Head_Line_03:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_03,
      Head_Line_04:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_04,
      Head_Line_05:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_05,
      Head_Line_06:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_06,
      Head_Line_07:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_07,
      Head_Line_08:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_08,
      Sort_key: Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      Colunm_Type:
        Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Colunm_Type,
    },
    mode: "onChange",
    resolver: yupResolver(IncomeTax_ColumnScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      GetIncomeTax_ColumnById(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Column_name: "",
        Head_Line_01: "",
        Head_Line_02: "",
        Head_Line_03: "",
        Head_Line_04: "",
        Head_Line_05: "",
        Head_Line_06: "",
        Head_Line_07: "",
        Head_Line_08: "",
        Sort_key: "",
        Colunm_Type: "",
      });
    } else {
      reset({
        Column_name:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Column_name,
        Head_Line_01:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_01,
        Head_Line_02:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_02,
        Head_Line_03:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_03,
        Head_Line_04:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_04,
        Head_Line_05:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_05,
        Head_Line_06:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_06,
        Head_Line_07:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_07,
        Head_Line_08:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Head_Line_08,
        Sort_key:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        Colunm_Type:
          Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]?.Colunm_Type,
      });
    }
  }, [Red_IncomeTax_Column?.dataSingle?.[0]?.res?.data?.[0]]);

  console.log(
    Red_IncomeTax_Column?.dataSingle,
    "Red_IncomeTax_Column?.dataSingle"
  );

  //  Income tax FORM DATA API CALL ===========================
  async function Post_IncomeTax_Column_FORM(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/incomeTaxColumn/AddIncomeTaxColumn`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Column_No: mode == "create" ? 0 : isCode,
        Column_name: body?.Column_name,
        Head_Line_01: body?.Head_Line_01,
        Head_Line_02: body?.Head_Line_02,
        Head_Line_03: body?.Head_Line_03,
        Head_Line_04: body?.Head_Line_04,
        Head_Line_05: body?.Head_Line_05,
        Head_Line_06: body?.Head_Line_06,
        Head_Line_07: body?.Head_Line_07,
        Head_Line_08: body?.Head_Line_08,
        Sort_key: body?.Sort_key,
        Colunm_Type: body?.Colunm_Type,
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
            GetIncomeTaxData({
              pageSize: pageSize,
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
        <h4 className="text-dark">Income Tax Columns</h4>
        <hr />
        <div className="form-group formBoxIncomeTax_Column">
          <FormInput
            label={"Column Name"}
            placeholder={"Column Name"}
            id="Column_name"
            name="Column_name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Head Line 01"}
            placeholder={"Head Line 01"}
            id="Head_Line_01"
            name="Head_Line_01"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Head Line 02"}
            placeholder={"Head Line 02"}
            id="Head_Line_02"
            name="Head_Line_02"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Head Line 03"}
            placeholder={"Head Line 03"}
            id="Head_Line_03"
            name="Head_Line_03"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Head Line 04"}
            placeholder={"Head Line 04"}
            id="Head_Line_04"
            name="Head_Line_04"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Head Line 05"}
            placeholder={"Head Line 05"}
            id="Head_Line_05"
            name="Head_Line_05"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Head Line 06"}
            placeholder={"Head Line 06"}
            id="Head_Line_06"
            name="Head_Line_06"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Head Line 07"}
            label={"Head Line 07"}
            id="Head_Line_07"
            name="Head_Line_07"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Head Line 08"}
            label={"Head Line 08"}
            id="Head_Line_08"
            name="Head_Line_08"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Colunm Type"}
            label={"Colunm Type"}
            id="Colunm_Type"
            name="Colunm_Type"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Sort key"}
            label={"Sort key"}
            id="Sort_key"
            name="Sort_key"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <hr />
        <div className="IncomeTax_ColumnBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton type={"submit"} loading={isLoading} title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_IncomeTax_Column }) {
  return { Red_IncomeTax_Column };
}
export default connect(
  mapStateToProps,
  IncomeTax_Column_ACTIONS
)(IncomeTaxForm);
