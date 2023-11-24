import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Base_City_Scheme } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as CITY_ACTIONS from "../../store/actions/HrOperations/Base_CIty/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";
import baseUrl from "../../../src/config.json";

function Base_CityForm({ cancel, mode, isCode, Red_Base_City ,Get_Base_City_Data_By_Id,GetBaseCityData}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);

  const EditBack = () => {
    cancel("read");
  };

  const submitForm = async (data) => {
      try {
      const isValid = await Base_City_Scheme.validate(data);
      if (isValid) {
          console.log(data, "data");
        POST_BASE_CITY_FORM(data)
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
      City_code: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_code
        ? Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_code
        : 0,

      City_name: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_name,
      City_abbr: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_abbr,
      Province_Code: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.Province_Code,
      Region_Code: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.Region_Code,
      Sort_key: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
    },
    mode: "onChange",
    resolver: yupResolver(Base_City_Scheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      Get_Base_City_Data_By_Id(isCode)
    }
  }, [])
    

  useEffect(() => {
      if(mode == "create"){
          reset(
              {
                City_code: 0,
                City_name: "",
                City_abbr: "",
                Province_Code: "",
                Region_Code: "",
                Sort_key: "",
              },
          )
      }else{
          reset(
              {
                City_code: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_code,
                City_name: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_name,
                City_abbr: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.City_abbr,
                Province_Code: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.Province_Code,
                Region_Code: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.Region_Code,
                Sort_key: Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
             
              },
              )
      }
  }, [Red_Base_City?.dataSingle?.[0]?.res?.data?.[0]])

   console.log("Red_Base_City",Red_Base_City)

  // BASE CITY FORM DATA API CALL ===========================
  async function POST_BASE_CITY_FORM(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/cities/AddCity`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "City_code": mode == "create" ? 0 :isCode,
        "City_abbr": body.City_abbr,
        "City_name": body.City_name,
        "Province_Code": body.Province_Code,
        "Region_Code": body.Region_Code,
        "Sort_key": body.Sort_key, 
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
            GetBaseCityData({
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

        {contextHolder}
      <form onSubmit={handleSubmit(submitForm)}>
        <h4 className="text-dark">Country List</h4>
        <hr />
        <div className="form-group formBoxCountry">
          <FormInput
            label={"City Code"}
            placeholder={"City Code"}
            id="City_code"
            name="City_code"
            type="number"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"City Name"}
            placeholder={"City Name"}
            id="City_name"
            name="City_name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"City Abbrivation"}
            placeholder={"City Abbrivation"}
            id="City_abbr"
            name="City_abbr"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Region"}
            placeholder={"Region"}
            id="Region_Code"
            name="Region_Code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Province"}
            placeholder={"Province"}
            id="Province_Code"
            name="Province_Code"
            type="number"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Sort Key"}
            placeholder={"Sort Key"}
            id="Sort_key"
            name="Sort_key"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <div className="BaseCItyBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton type={"submit"} loading={isLoading} title="Save" />
        </div>
      </form>
    </>
  );
}
function mapStateToProps({ Red_Base_City }) {
  return { Red_Base_City };
}
export default connect(mapStateToProps, CITY_ACTIONS)(Base_CityForm);
