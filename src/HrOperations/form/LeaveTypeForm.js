import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as Leave_Type_ACTIONS from "../../store/actions/HrOperations/LeaveType/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { Leave_TypeScheme } from "../schema";
import { message } from "antd";

import baseUrl from "../../../src/config.json";

function LeaveCategoryForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Leave_Type,
  GetLeaveTypeData,
  GetLeaveTypeById,
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
      const isValid = await Leave_TypeScheme.validate(data);
      if (isValid) {
        POST_Leave_Type_FORM(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      // Leave_type_code: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
      //   ?.Leave_type_code
      //   ? Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_type_code
      //   : 0,

      Leave_name: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_name,
      Leave_type_abbr:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_type_abbr,
      Leave_Category_code:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_code,
      Start_date: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Start_date,
      End_date: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.End_date,
      Annual_Credit:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Annual_Credit,
      Accumulation_limit:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Accumulation_limit,
      Proportionate_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Proportionate_flag,
      Advance_days:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Advance_days,
      Minimum_days_per_form:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Minimum_days_per_form,
      Maximum_days_per_form:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Maximum_days_per_form,
      Life_times: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Life_times,
      Religion_code:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Religion_code,
      Increase_Leave_code:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Increase_Leave_code,
      Join_Confirm_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Join_Confirm_flag,
      Balance_Check_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Balance_Check_flag,
      Meal_flag: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Meal_flag,
      Encashment_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Encashment_flag,
      Without_pay_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Without_pay_flag,
      Medical_Certificate_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
          ?.Medical_Certificate_flag,
      Medical_Certificate_days:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
          ?.Medical_Certificate_days,
      Special_Approval_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Special_Approval_flag,
      Special_Approval_days:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Special_Approval_days,
      married_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.married_flag,
      Adjustment_flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Adjustment_flag,
      Adjustment_Leave_code:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Adjustment_Leave_code,
      Sort_key: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      On_Confirm_Flag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.On_Confirm_Flag,
      DaysApplyOn: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.DaysApplyOn,
      SandwichFlag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.SandwichFlag,
      AttachmentFlag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.AttachmentFlag,
      AttachmentDays:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.AttachmentDays,
      HREntryStopFlag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.HREntryStopFlag,
      RepaymentFlag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.RepaymentFlag,
      GenderFlag: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.GenderFlag,
      CompensatoryFlag:
        Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.CompensatoryFlag,
    },
    mode: "onChange",
    resolver: yupResolver(Leave_TypeScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      GetLeaveTypeById(isCode);
    }
  }, []);

  useEffect(() => {
    if (mode == "create") {
      reset({
        Leave_name: "",
        Leave_type_abbr: "",
        Leave_Category_code: "",
        Start_date: "",
        End_date: "",
        Annual_Credit: "",
        Accumulation_limit: "",
        Proportionate_flag: "",
        Advance_days: "",
        Minimum_days_per_form: "",
        Maximum_days_per_form: "",
        Life_times: "",
        Religion_code: "",
        Increase_Leave_code: "''",
        Join_Confirm_flag: "",
        Balance_Check_flag: "",
        Meal_flag: "",
        Encashment_flag: "",
        Without_pay_flag: "",
        Medical_Certificate_flag: "",
        Medical_Certificate_days: "",
        Special_Approval_flag: "",
        Special_Approval_days: "",
        married_flag: "",
        Adjustment_flag: "",
        Adjustment_Leave_code: "",
        Sort_key: "",
        On_Confirm_Flag: "",
        DaysApplyOn: "",
        SandwichFlag: "''",
        AttachmentFlag: "",
        AttachmentDays: "",
        HREntryStopFlag: "",
        RepaymentFlag: "",
        GenderFlag: "",
        CompensatoryFlag: "",
      });
    } else {
      reset({
        Leave_name: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_name,
        Leave_type_abbr:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_type_abbr,
        Leave_Category_code:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_code,
        Start_date: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Start_date,
        End_date: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.End_date,
        Annual_Credit:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Annual_Credit,
        Accumulation_limit:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Accumulation_limit,
        Proportionate_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Proportionate_flag,
        Advance_days:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Advance_days,
        Minimum_days_per_form:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Minimum_days_per_form,
        Maximum_days_per_form:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Maximum_days_per_form,
        Life_times: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Life_times,
        Religion_code:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Religion_code,
        Increase_Leave_code:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Increase_Leave_code,
        Join_Confirm_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Join_Confirm_flag,
        Balance_Check_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Balance_Check_flag,
        Meal_flag: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Meal_flag,
        Encashment_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Encashment_flag,
        Without_pay_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Without_pay_flag,
        Medical_Certificate_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Medical_Certificate_flag,
        Medical_Certificate_days:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Medical_Certificate_days,
        Special_Approval_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Special_Approval_flag,
        Special_Approval_days:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Special_Approval_days,
        married_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.married_flag,
        Adjustment_flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Adjustment_flag,
        Adjustment_Leave_code:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]
            ?.Adjustment_Leave_code,
        Sort_key: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        On_Confirm_Flag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.On_Confirm_Flag,
        DaysApplyOn:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.DaysApplyOn,
        SandwichFlag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.SandwichFlag,
        AttachmentFlag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.AttachmentFlag,
        AttachmentDays:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.AttachmentDays,
        HREntryStopFlag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.HREntryStopFlag,
        RepaymentFlag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.RepaymentFlag,
        GenderFlag: Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.GenderFlag,
        CompensatoryFlag:
          Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]?.CompensatoryFlag,
      });
    }
  }, [Red_Leave_Type?.dataSingle?.[0]?.res?.data?.[0]]);

  //  Leave Type FORM DATA API CALL ===========================
  async function POST_Leave_Type_FORM(body) {
    setLoading(true);
    await fetch(
      `${baseUrl.baseUrl}/employment_leave_type/AddEmploymentLeaveType`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          Leave_type_code: mode == "create" ? 0 : isCode,
          Leave_name: body?.Leave_name,
          Leave_type_abbr: body?.Leave_type_abbr,
          Leave_Category_code: body?.Leave_Category_code,
          Start_date: body?.Start_date,
          End_date: body?.End_date,
          Annual_Credit: body?.Annual_Credit,
          Accumulation_limit: body?.Accumulation_limit,
          Proportionate_flag: body?.Proportionate_flag,
          Advance_days: body?.Advance_days,
          Minimum_days_per_form: body?.Minimum_days_per_form,
          Maximum_days_per_form: body?.Maximum_days_per_form,
          Life_times: body?.Life_times,
          Religion_code: body?.Religion_code,
          Increase_Leave_code: body?.Increase_Leave_code,
          Join_Confirm_flag: body?.Join_Confirm_flag,
          Balance_Check_flag: body?.Balance_Check_flag,
          Meal_flag: body?.Meal_flag,
          Encashment_flag: body?.Encashment_flag,
          Without_pay_flag: body?.Without_pay_flag,
          Medical_Certificate_flag: body?.Medical_Certificate_flag,
          Medical_Certificate_days: body?.Medical_Certificate_days,
          Special_Approval_flag: body?.Special_Approval_flag,
          Special_Approval_days: body?.Special_Approval_days,
          married_flag: body?.married_flag,
          Adjustment_flag: body?.Adjustment_flag,
          Adjustment_Leave_code: body?.Adjustment_Leave_code,
          Sort_key: body?.Sort_key,
          On_Confirm_Flag: body?.On_Confirm_Flag,
          job_description_flag: body?.job_description_flag,
          DaysApplyOn: body?.DaysApplyOn,
          SandwichFlag: body?.SandwichFlag,
          AttachmentFlag: body?.AttachmentFlag,
          AttachmentDays: body?.AttachmentDays,
          HREntryStopFlag: body?.HREntryStopFlag,
          RepaymentFlag: body?.RepaymentFlag,
          GenderFlag: body?.GenderFlag,
          CompensatoryFlag: body?.CompensatoryFlag,
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
            GetLeaveTypeData({
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
        <h4 className="text-dark">Leave Type</h4>
        <hr />
        <div className="form-group formBoxLeaveType">
          <FormInput
            label={"Leave Name"}
            placeholder={"Leave Name"}
            id="Leave_name"
            name="Leave_name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Abbrevation"}
            placeholder={"Leave Name"}
            id="Leave_type_abbr"
            name="Leave_type_abbr"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Leave Category Code"}
            placeholder={"Leave Category Code"}
            id="Leave_Category_code"
            name="Leave_Category_code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Start Date"}
            label={"Start Date"}
            id="Start_date"
            name="Start_date"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"End Date"}
            label={"End Date"}
            id="End_date"
            name="End_date"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <FormInput
            placeholder={"Annual_Credit"}
            label={"Annual_Credit"}
            id="Annual_Credit"
            name="Annual_Credit"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Accumulation limit"}
            label={"Accumulation limit"}
            id="Accumulation_limit"
            name="Accumulation_limit"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Advance Days"}
            label={"Advance Days"}
            name="Advance_days"
            id="Advance_days"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Minimum Days per Form"}
            label={"Minimum Days per Form"}
            name="Minimum_days_per_form"
            id="Minimum_days_per_form"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Maximum days per form"}
            label={"Maximum days per form"}
            name="Maximum_days_per_form"
            id="Maximum_days_per_form"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Life times"}
            label={"Life times"}
            name="Life_times"
            id="Life_times"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Religion Code"}
            label={"Religion Code"}
            name="Religion_code"
            id="Religion_code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Increase Leave code"}
            label={"Increase Leave code"}
            name="Increase_Leave_code"
            id="Increase_Leave_code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Medical Certificate days"}
            label={"Medical Certificate days"}
            name="Medical_Certificate_days"
            id="Medical_Certificate_days"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Special Approval days"}
            label={"Special Approval days"}
            name="Special_Approval_days"
            id="Special_Approval_days"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Adjustment Leave code"}
            label={"Adjustment Leave code"}
            name="Adjustment_Leave_code"
            id="Adjustment_Leave_code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Sort key"}
            label={"Sort key"}
            name="Sort_key"
            id="Sort_key"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            maxLenght={1}
            placeholder={"Days Apply On"}
            label={"Days Apply On"}
            name="DaysApplyOn"
            id="DaysApplyOn"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            placeholder={"Attachment Days"}
            label={"Attachment Days"}
            name="AttachmentDays"
            id="AttachmentDays"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />

        </div>
        <hr />
        <div className="form-group formBoxLeaveType">
          <FormSelect
            label={"Proportionate Flag"}
            placeholder="Proportionate Flag"
            id="Proportionate_flag"
            name="Proportionate_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Join Confirm flag"}
            placeholder="Join Confirm flag"
            id="Join_Confirm_flag"
            name="Join_Confirm_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Balance Check flag"}
            placeholder="Balance Check flag"
            id="Balance_Check_flag"
            name="Balance_Check_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Meal flag"}
            placeholder="Meal flag"
            id="Meal_flag"
            name="Meal_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Encashment flag"}
            placeholder="Encashment flag"
            id="Encashment_flag"
            name="Encashment_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Without pay flag"}
            placeholder="Without pay flag"
            id="Without_pay_flag"
            name="Without_pay_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Medical Certificate flag"}
            placeholder="Medical Certificate flag"
            id="Medical_Certificate_flag"
            name="Medical_Certificate_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Special Approval flag"}
            placeholder="Special Approval flag"
            id="Special_Approval_flag"
            name="Special_Approval_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Married flag"}
            placeholder="Married flag"
            id="married_flag"
            name="married_flag"
            options={[
              {
                value: "M",
                label: "Married",
              },
              {
                value: "N",
                label: "UnMarried",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Adjustment flag"}
            placeholder="Adjustment flag"
            id="Adjustment_flag"
            name="Adjustment_flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"On Confirm Flag"}
            placeholder="On Confirm Flag"
            id="On_Confirm_Flag"
            name="On_Confirm_Flag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Sandwich Flag"}
            placeholder="Sandwich Flag"
            id="SandwichFlag"
            name="SandwichFlag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Attachment Flag"}
            placeholder="Attachment Flag"
            id="AttachmentFlag"
            name="AttachmentFlag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"HR Entry Stop Flag"}
            placeholder="HR Entry Stop Flag"
            id="HREntryStopFlag"
            name="HREntryStopFlag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Repayment Flag"}
            placeholder="Repayment Flag"
            id="RepaymentFlag"
            name="RepaymentFlag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Gender Flag"}
            placeholder="Gender Flag"
            id="GenderFlag"
            name="GenderFlag"
            options={[
              {
                value: "M",
                label: "Male",
              },
              {
                value: "F",
                label: "Female",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={"Compensatory Flag"}
            placeholder="Compensatory Flag"
            id="CompensatoryFlag"
            name="CompensatoryFlag"
            options={[
              {
                value: "Y",
                label: "Yes",
              },
              {
                value: "N",
                label: "No",
              },
            ]}
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <hr />
        <div className="leaveTypeBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_Leave_Type }) {
  return { Red_Leave_Type };
}
export default connect(mapStateToProps, Leave_Type_ACTIONS)(LeaveCategoryForm);
