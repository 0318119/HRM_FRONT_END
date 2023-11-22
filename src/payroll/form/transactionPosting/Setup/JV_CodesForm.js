import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton } from "../../../../components/basic/button/index";
import * as JV_Code_ACTIONS from "../../../../store/actions/payroll/JV_Codes/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../../../../components/basic/input/formInput";
import { JvCodeScheme } from "../../../form/transactionPosting/Setup/schema";
import { message } from "antd";
import baseUrl from "../../../../../src/config.json";

function JV_CodesForm({
  cancel,
  mode,
  isCode,
  page,
  Red_JV_Codes,
  GetJvCodeData,
  GetJvCOdeById,
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
      const isValid = await JvCodeScheme.validate(data);
      if (isValid) {
        POST_JV_Code_FORM(data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  console.log(Red_JV_Codes ,'Red_JV_Codes22')

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {

        JV_Currency: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Currency,
        JV_Cost_Centre:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Cost_Centre,
        JV_MainAC:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_MainAC,
        JV_SubAC: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_SubAC,
        JV_Description: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Description,
        Sort_key:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,

    },
    mode: "onChange",
    resolver: yupResolver(JvCodeScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
        GetJvCOdeById(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        JV_Currency: "",
        JV_Cost_Centre: "",
        JV_MainAC: "",
        JV_SubAC: "",
        JV_Description: "",
        Sort_key: "",
       
      });
    } else {
      reset({
        JV_Currency: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Currency,
        JV_Cost_Centre:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Cost_Centre,
        JV_MainAC:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_MainAC,
        JV_SubAC: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_SubAC,
        JV_Description: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Description,
        Sort_key:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      });
    }
  }, [Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]]);

  console.log(Red_JV_Codes?.dataSingle, 'Red_JV_Codes?.dataSingle')

  //  JV FORM DATA API CALL ===========================
  async function POST_JV_Code_FORM(body) {
    setLoading(true);
    await fetch(
      `${baseUrl.baseUrl}/JVCodes/AddJvCode`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
            JV_Unit: mode == "create" ? 0 : isCode,
            JV_Currency: body?.JV_Currency,
            JV_Cost_Centre: body?.JV_Cost_Centre,
            JV_MainAC: body?.JV_MainAC,
            JV_SubAC: body?.JV_SubAC,
            JV_Description: body?.JV_Description,
            Sort_key: body?.Sort_key,
         
          
        }),
      }
    )
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
            GetJvCodeData({
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
        <h4 className="text-dark">JV Codes</h4>
        <hr />
        <div className="form-group formBoxJVCode">
          <FormInput
            label={"JV Currency"}
            placeholder={"JV Currency"}
            id="JV_Currency"
            name="JV_Currency"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"JV Cost Centre"}
            placeholder={"JV Cost Centre"}
            id="JV_Cost_Centre"
            name="JV_Cost_Centre"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"JV Main Account"}
            placeholder={"JV Main Account"}
            id="JV_MainAC"
            name="JV_MainAC"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"JV Sub Account"}
            label={"JV Sub Account"}
            id="JV_SubAC"
            name="JV_SubAC"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Description"}
            label={"Description"}
            id="JV_Description"
            name="JV_Description"
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
        <div className="JVCodeBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_JV_Codes }) {
  return { Red_JV_Codes };
}
export default connect(mapStateToProps, JV_Code_ACTIONS)(JV_CodesForm);
