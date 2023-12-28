import React, { useEffect, useState } from 'react'
import Input from '../../components/basic/input'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as COUNTRY_ACTIONS from "../../store/actions/HrOperations/Country/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { CountryScheme } from '../schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from '../../components/basic/input/formInput';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'





function CountryForm({ cancel, mode, isCode, page, Red_Country, Get_Country_Data_By_Id,GetDataCountry }) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading,setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10);


  const EditBack = () => {
    cancel('read')
  }



  const submitForm = async (data) => {
    try {
      const isValid = await CountryScheme.validate(data);
      if (isValid) {
        POST_COUNTRY_FORM(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      Country_Code: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Code ?
      Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Code : 0,
      Country_Name: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Name,
      Country_Abbr: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Abbr,
      SortKey: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.SortKey,
    },
    mode: "onChange",
    resolver: yupResolver(CountryScheme),
  });

  useEffect(() => {
    if (isCode !== null) {
      Get_Country_Data_By_Id(isCode)
    }
  }, [])


  useEffect(() => {
    if (mode == "create") {
      reset(
        {
          Country_Code: 0,
          Country_Name: "",
          Country_Abbr: "",
          SortKey: "",
        },
      )
    } else {
      reset(
        {
          Country_Code: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Code,
          Country_Name: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Name,
          Country_Abbr: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.Country_Abbr,
          SortKey: Red_Country?.dataSingle?.[0]?.res?.data?.[0]?.SortKey,
        },
      )
    }
  }, [Red_Country?.dataSingle?.[0]?.res?.data?.[0]])

  // COST COUNTRY FORM DATA API CALL =========================== 
  async function POST_COUNTRY_FORM(body) {
    setLoading(true)
    await fetch(
      `${baseUrl.baseUrl}/countries/AddCountry`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Country_Code": body.Country_Code,
        "Country_Name": body.Country_Name,
        "Country_Abbr": body.Country_Abbr,
        "SortKey": body.SortKey,
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if(response.success){
          messageApi.open({
              type: 'success',
              content: response?.message || response?.messsage,
          });
          setLoading(false)
          setTimeout(() => {
            cancel('read')
            GetDataCountry({ 
              pageSize: pageSize,
              pageNo: page,
              search: null
            })
          }, 3000);
      }
      else{
        setLoading(false)
          messageApi.open({
              type: 'error',
              content: response?.message || response?.messsage,
          });
      }
    }).catch((error) => {
        setLoading(false)
        messageApi.open({
          type: 'error',
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
            label={'Country Code'}
            placeholder={'Country Code'}
            id="Country_Code"
            name="Country_Code"
            type="text"
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={'Country Name'}
            placeholder={'Country Name'}
            id="Country_Name"
            name="Country_Name"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={'Country Abbr'}
            placeholder={'Country Abbr'}
            id="Country_Abbr"
            name="Country_Abbr"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={'Sort Key'}
            placeholder={'Sort Key'}
            id="SortKey"
            name="SortKey"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
        </div>
        <div className='CountryBtnBox'>
          <CancelButton onClick={EditBack} title={'Cancel'} />
          <PrimaryButton type={'submit'}  loading={isLoading} title="Save" />
        </div>
      </form>
    </>
  )
}

function mapStateToProps({ Red_Country }) {
  return { Red_Country };
}
export default connect(mapStateToProps, COUNTRY_ACTIONS)(CountryForm)
