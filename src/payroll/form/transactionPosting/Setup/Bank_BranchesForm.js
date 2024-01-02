import React, { useState, useEffect } from "react";
import {
  CancelButton,
  PrimaryButton,
} from "../../../../components/basic/button/index";
import * as BankBranch_ACTIONS from "../../../../store/actions/payroll/Bank_Branches/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormInput,
  FormSelect,
} from "../../../../components/basic/input/formInput";
import { Bank_BranchesScheme } from "./schema";
import { message } from "antd";
import baseUrl from "../../../../config.json";

function BankBranchForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Bank_Branches,
  GetBankBranchesData,
  GetBankBranchById,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const EditBack = () => {
    cancel("read");
  };


console.log(isCode , "isCode")

  const submitForm = async (data) => {
    try {
      const isValid = await Bank_BranchesScheme.validate(data);
      if (isValid) {
        Post_Bank_Branches_FORM(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(Red_Bank_Branches, "Red_Bank_Branches");

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      Branch_name:
        Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_name,
      Branch_abbr:Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_abbr,
      Branch_address_line1:Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_address_line1,
      Branch_address_line2: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_address_line2,
      Contact: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Contact,
      Bank_Branch_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Branch_Code,
      Bank_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Code,
      City_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.City_Code,
      Sort_key: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      Country_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.countrycode,
        Zone_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.zonecode,
      
    },
    mode: "onChange",
    resolver: yupResolver(Bank_BranchesScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      GetBankBranchById(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Branch_name: "",
        Branch_abbr: "",
        Branch_address_line1: "",
        Branch_address_line2: "",
        Contact: "",
        Bank_Branch_Code: "",
        Bank_Code: "",
        City_Code: "",
        Sort_key: "",
        Country_Code: "",
        Zone_Code: "",
      });
    } else {
      reset({
        
        Branch_name: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_name,
        Branch_abbr: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_abbr,
        Branch_address_line1: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_address_line1,
        Branch_address_line2:Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Branch_address_line2,
        Contact: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Contact,
        Bank_Branch_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Branch_Code,
        Bank_Code:Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Code,
        City_Code:Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.City_Code,
        Sort_key: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        Country_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.countrycode,
          Zone_Code: Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]?.zonecode,
      });
    }
  }, [Red_Bank_Branches?.dataSingle?.[0]?.res?.data?.[0]]);

  console.log(Red_Bank_Branches?.dataSingle, "Red_Bank_Branches?.dataSingle");

  //  Bank_Branches_FORM DATA API CALL ===========================
  async function Post_Bank_Branches_FORM(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/addbranch/AddBankBranch`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Branch_code": mode == "create" ? 0 : isCode,
        "Branch_name": body?.Branch_name,
        "Branch_abbr": body?.Branch_abbr,
        "Branch_address_line1": body?.Branch_address_line1,
        "Branch_address_line2": body?.Branch_address_line2,
        "Contact": body?.Contact,
        "Bank_Branch_Code": body?.Bank_Branch_Code,
        "Bank_Code": body?.Bank_Code,
        "City_Code": body?.City_Code,
        "Sort_key": body?.Sort_key,
        "Country_Code": body?.Country_Code,
        "Zone_Code": body?.Zone_Code,
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
            GetBankBranchesData({
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
        <h4 className="text-dark">Bank Branches</h4>
        <hr />
        <div className="form-group formBoxIncomeTax_Column">
          <FormInput
            label={"Branch Name"}
            placeholder={"Branch Name"}
            id="Branch_name"
            name="Branch_name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
          maxLenght={6}
            label={"Abbreviation"}
            placeholder={"Abbreviation"}
            id="Branch_abbr"
            name="Branch_abbr"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Branch address line1"}
            placeholder={"Branch address line1"}
            id="Branch_address_line1"
            name="Branch_address_line1"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Branch address line2"}
            placeholder={"Branch address line2"}
            id="Branch_address_line2"
            name="Branch_address_line2"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Contact"}
            placeholder={"Contact"}
            id="Contact"
            name="Contact"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
          maxLenght={15}
            label={"Bank Branch Code"}
            placeholder={"Bank Branch Code"}
            id="Bank_Branch_Code"
            name="Bank_Branch_Code"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Bank Code"}
            placeholder={"Bank Code"}
            id="Bank_Code"
            name="Bank_Code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"City Code"}
            label={"City Code"}
            id="City_Code"
            name="City_Code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
           maxLenght={2}
            placeholder={"Sort key"}
            label={"Sort key"}
            id="Sort_key"
            name="Sort_key"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Country Code"}
            label={"Country Code"}
            id="Country_Code"
            name="Country_Code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Zone Code"}
            label={"Zone Code"}
            id="Zone_Code"
            name="Zone_Code"
            type="number"
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

function mapStateToProps({ Red_Bank_Branches }) {
  return { Red_Bank_Branches };
}
export default connect(mapStateToProps, BankBranch_ACTIONS)(BankBranchForm);
