import React, { useState, useEffect } from "react";
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { LeaveCatScheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Leave_Category_ACTIONS from "../../store/actions/HrOperations/Leave_Category/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";

import baseUrl from "../../../src/config.json";



function LeaveCategoryForm({
    cancel,
    mode,
    isCode,
    page,
    Red_Leave_Category,
    Get_LeaveCategory_Data_By_Id,
    GetLeaveCategoryData,
  }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const EditBack = () => {
      cancel("read");
    };
  
    const submitForm = async (data) => {
      try {
        const isValid = await LeaveCatScheme.validate(data);
        if (isValid) {
          POST_LeaveCategoryForm(data);
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
        Leave_Category_code: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_code
          ? Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_code
          : 0,
  
          Leave_Category_name: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_name,
          Leave_Category_abbr: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_abbr,
          Sort_key: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      },
  
      mode: "onChange",
      resolver: yupResolver(LeaveCatScheme),
    });
  
    useEffect(() => {
      if (isCode !== null) {
        Get_LeaveCategory_Data_By_Id(isCode)
      }
    }, []);
  
    useEffect(() => {
      if (mode == "create") {
        reset({
            Leave_Category_code: 0,
            Leave_Category_name: "",
            Leave_Category_abbr: "",
            Sort_key: "",
        });
      } else {
        reset({
            Leave_Category_code: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_code,
            Leave_Category_name: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_name,
            Leave_Category_abbr: Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Leave_Category_abbr,
            Sort_key:Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        
        });
      }
    }, [Red_Leave_Category?.dataSingle?.[0]?.res?.data?.[0]]);
  
  
  
    // Leave Category FORM DATA API CALL ===========================
    async function POST_LeaveCategoryForm(body) {
      setLoading(true);
      await fetch(`${baseUrl.baseUrl}/employment_leave_category/AddEmploymentLeaveCategory`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
            "Leave_Category_code": body?.Leave_Category_code,
            "Leave_Category_name": body?.Leave_Category_name,
            "Leave_Category_abbr": body?.Leave_Category_abbr,
            "Sort_key": body?.Sort_key
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
              GetLeaveCategoryData({
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
        <h4 className="text-dark">Leave Category</h4>
          <hr />
          <div className="form-group formBoxLeaveCategory">
            <FormInput
              label={"Leave Category Code"}
              placeholder={"Leave_Category_code"}
              id="Leave_Category_code"
              name="Leave_Category_code"
              type="number"
              readOnly
              showLabel={true}
              errors={errors}
              control={control}
            />
  
            <FormInput
              placeholder={"Leave Category Name"}
              label={"Leave Category Name"}
              id="Leave_Category_name"
              name="Leave_Category_name"
              type="text"
              showLabel={true}
              errors={errors}
              control={control}
            />
            <FormInput
              placeholder={"Leave Category Abbrivation"}
              label={"Leave Category Abbrivation"}
              id="Leave_Category_abbr"
              name="Leave_Category_abbr"
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
          <div className="leaveCategoryBtnBox">
            <CancelButton onClick={EditBack} title={"Cancel"} />
            <PrimaryButton title="Save" />
          </div>
        </form>
      </>
    );
  }

function mapStateToProps({ Red_Leave_Category }) {
    return { Red_Leave_Category };
  }
  export default connect(mapStateToProps, Leave_Category_ACTIONS)(LeaveCategoryForm);
