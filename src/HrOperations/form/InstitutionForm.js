import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Institution_Scheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as INSTITUTION_ACTIONS from "../../store/actions/HrOperations/Institution/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";
import baseUrl from "../../../src/config.json";

function InstitutionForm({
  cancel,
  mode,
  isCode,
  Red_Institution,
  Get_Institution_Data_By_Id,
  GetInstitutionData,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
    try {
      const isValid = await Institution_Scheme.validate(data);
      if (isValid) {
        console.log(data, "data");
        POST_Institution_FORM(data);
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
      Inst_code: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_code
        ? Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_code
        : 0,

      Inst_name: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_name,
      Inst_abbr: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_abbr,
      Inst_type: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_type,
      Inst_address_line1:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_address_line1,
      Inst_address_line2:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_address_line2,
      Inst_address_line3:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_address_line3,
      Inst_phone1:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_phone1,
      Inst_phone2:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_phone2,
      Inst_fax1: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_fax1,
      Inst_fax2: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_fax2,
      Inst_Web_Site:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_Web_Site,
      Inst_email: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_email,
      Sort_key: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      Verification_Fee:
        Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Verification_Fee,
    },

    mode: "onChange",
    resolver: yupResolver(Institution_Scheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      Get_Institution_Data_By_Id(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Inst_code: 0,
        Inst_name: "",
        Inst_type: "",
        Inst_address_line1: "",
        Inst_address_line2: "",
        Inst_address_line3: "",
        Inst_phone1: "",
        Inst_phone2: "",
        Inst_fax1: "",
        Inst_fax2: "",
        Inst_Web_Site: "",
        Inst_email: "",
        Sort_key: "",
        Verification_Fee: "",
      });
    } else {
      reset({
        Inst_code: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_code,
        Inst_name: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_name,
        Inst_type: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_type,
        Inst_address_line1:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_address_line1,
        Inst_address_line2:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_address_line2,
        Inst_address_line3:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_address_line3,
        Inst_phone1:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_phone1,
        Inst_phone2:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_phone2,
        Inst_fax1: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_fax1,
        Inst_fax2: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_fax2,
        Inst_Web_Site:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_Web_Site,
        Inst_email:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Inst_email,
        Sort_key: Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        Verification_Fee:
          Red_Institution?.dataSingle?.[0]?.res?.data?.[0]?.Verification_Fee,
      });
    }
  }, [Red_Institution?.dataSingle?.[0]?.res?.data?.[0]]);

  console.log("Red_Institution", Red_Institution);

  // BASE CITY FORM DATA API CALL ===========================
  async function POST_Institution_FORM(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/institutions/AddInstitution`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Inst_code: 0,
        Inst_name: body.Inst_name,
        Inst_abbr: body.Inst_abbr,
        Inst_type: body.Inst_type,
        Inst_address_line1: body.Inst_address_line1,
        Inst_address_line2: body.Inst_address_line2,
        Inst_address_line3: body.Inst_address_line3,
        Inst_phone1: body.Inst_phone1,
        Inst_phone2: body.Inst_phone2,
        Inst_fax1: body.Inst_fax1,
        Inst_fax2: body.Inst_fax2,
        Inst_email: body.Inst_email,
        Inst_Web_Site: body.Institution_Website,
        Sort_key: body.Sort_Key,
        Verification_Fee: body.Verification_Fee,
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
            GetInstitutionData({
              pageSize: 10,
              pageNo: 1,
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
      <div>
        <h4 className="text-dark">Institutions</h4>
        <hr />
        <div className="form-group formBoxInstitution">
          <FormInput
            label={"Inst_code Code"}
            placeholder={"Inst_code"}
            id="Inst_code"
            name="Inst_code"
            type="number"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Institution Name"}
            label={"Institution Name"}
            type="text"
          />
          <FormInput
            placeholder={"Institution Abbrivation"}
            label={"Institution Abbrivation"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Type"}
            label={"Institution Type"}
            type="text"
          />
          <FormInput
            placeholder={"Institution Address line1"}
            label={"Institution Address line1"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Address line2"}
            label={"Institution Address line2"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Address line3"}
            label={"Institution Address line3"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Type"}
            label={"Institution Type"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Sort Key"}
            label={"Sort Key"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>

        <hr />
        <div className="form-group formBoxInstitution">
          <FormInput
            placeholder={"Institution Phone1"}
            label={"Institution Phone1"}
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Phone2"}
            label={"Institution Phone2"}
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Fax1"}
            label={"Institution Fax1"}
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Fax2"}
            label={"Institution Fax2"}
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Email"}
            label={"Institution Email"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Institution Website"}
            label={"Institution Website"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Verification Fee"}
            label={"Verification Fee"}
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Sort Key"}
            label={"Sort Key"}
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <div className="InstitutionBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton title="Save" />
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ Red_Institution }) {
  return { Red_Institution };
}
export default connect(mapStateToProps, INSTITUTION_ACTIONS)(InstitutionForm);
