import React, { useEffect, useState } from 'react'
import {CancelButton,PrimaryButton } from "../../components/basic/button";
import * as ConfirmationActions from "../../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {FormInput,FormCheckBox, FormSelect} from '../../components/basic/input/formInput';
// import { Cost_CentreSchema } from '../schema';
import { message } from 'antd';
import * as yup from "yup";

import baseUrl from '../../../src/config.json'

function ConfirmationForm({cancel, isCode,page, Getconfirmation, Get_confirmation_By_ID, Red_Confirmation, mode}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading,setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10);


  

// FORM CANCEL FUNCTION =================================================================
const EditBack=()=>{
    cancel('read')

   
}
const submitForm = async (data) => {
    try {
        const isValid = await ConfirmationSchema.validate(data);
        if (isValid) {
        POST_COST_CENTRE_FORM(data)
        }
    } catch (error) {
        console.error(error);
    }
};

const ConfirmationSchema = yup.object().shape({
    Emp_name: yup.string().required("Emp_name is required"),
    Desig_Name: yup.string().required("Desig_Name is required"),
    Dept_name: yup.string().required("Dept_name is required"),
    PF_Nomination_Flag: yup.number().required("PF_Nomination_Flag is required"),
    PF_Nomination_Flag: yup.number().required("PF_Nomination_Flag is required"),
    Joining_Date: yup.string().required("Joining_Date is required"),
    JV_Code: yup.string().required("JV_Code is required"),
    Emp_Confirm_date: yup.string().required("Emp_Confirm_date is required"),
    Confirmation_Date: yup.string().required("Confirmation_Date is required"),
  });


const {
    control,
    formState: { errors },
    handleSubmit,
    reset
} = useForm({
    defaultValues: {
        Emp_name: yup.string().required("Emp_name is required"),
        Desig_Name: yup.string().required("Desig_Name is required"),
        Dept_name: yup.string().required("Dept_name is required"),
        PF_Nomination_Flag: yup.number().required("PF_Nomination_Flag is required"),
        PF_Nomination_Flag: yup.number().required("PF_Nomination_Flag is required"),
        Joining_Date: yup.string().required("Joining_Date is required"),
        JV_Code: yup.string().required("JV_Code is required"),
        Emp_Confirm_date: yup.string().required("Emp_Confirm_date is required"),
        Confirmation_Date: yup.string().required("Confirmation_Date is required"),
    },
    mode: "onChange",
    resolver: yupResolver(ConfirmationSchema),
});



useEffect(() => {
    if(isCode !==null){
        Get_confirmation_By_ID(isCode)
    }
}, [])

useEffect(() => {
    if(mode == "create"){
        reset(
            {
                Emp_name: "",
                Desig_Name: "",
                Dept_name: "",
                PF_Nomination_Flag: "",
                PF_Nomination_Flag: "",
                Joining_Date: "",
                JV_Code: "",
                Emp_Confirm_date: "",
                Confirmation_Date: "",
            },
        )
    }else{
        reset(
            {
                Emp_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_name,
                Desig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name,
                Dept_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Dept_name,
                PF_Nomination_Flag: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.PF_Nomination_Flag,
                PF_Nomination_Flag: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.PF_Nomination_Flag,
                Joining_Date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Joining_Date,
                Emp_Confirm_date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Confirm_date,
                Confirmation_Date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Date,
            },
            )
    }
}, [Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]])

// COST CENTRE FORM DATA API CALL =========================== 
async function POST_COST_CENTRE_FORM(body) {
    setLoading(true)
    await fetch(
        `${baseUrl.baseUrl}/employment_cost_center/AddCostCenter`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
            "Emp_name": body.Desig_Name,
            "Desig_Name": body.Desig_Name,
            "Dept_name": body.Dept_name,
            "PF_Nomination_Flag": body.PF_Nomination_Flag,
            "PF_Nomination_Flag": body.PF_Nomination_Flag,
            "Joining_Date": body.Joining_Date,
            "JV_Code1": body.JV_Code1,
            "Emp_Confirm_date": body.Emp_Confirm_date,
            "Confirmation_Date": body.Confirmation_Date,
        })
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
                Getconfirmation({
                    pageSize: pageSize,
                    pageNo: page,
                    search: null
                  })
            }, 3000);
        }
        else{
            messageApi.open({
                type: 'error',
                content: response?.message || response?.messsage,
            });
            setLoading(false)
        }
    }).catch((error) => {
        messageApi.open({
            type: 'error',
            content: error?.message || error?.messsage,
        });
        setLoading(false)
    });
}

  return (
    <>
        {contextHolder}
        <form onSubmit={handleSubmit(submitForm)}>
          <h4 className="text-dark">Confirmation</h4>
          {/* <hr />
          <div className="form-group formBoxCountry">
              <FormInput 
                  label={'Cost_Centre_code'} 
                  placeholder={'Cost_Centre_code'}
                  id="Cost_Centre_code"
                  name="Cost_Centre_code"
                  type="text"
                  showLabel={true}
                  readOnly
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Cost Centre Name'} 
                  placeholder={'Cost Centre name'}
                  id="Cost_Centre_name"
                  name="Cost_Centre_name"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Cost Centre Abbr'} 
                  placeholder={'Cost Centre Abbr'}
                  id="Cost_Centre_abbr"
                  name="Cost_Centre_abbr"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Major Code Mgmt'} 
                  placeholder={'Major Code Mgmt'}
                  id="Major_Code_Mgmt"
                  name="Major_Code_Mgmt"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'Major Code Union'} 
                  placeholder={'Major Code Union'}
                  id="Major_Code_Union"
                  name="Major_Code_Union"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'JV Code1'} 
                  placeholder={'JV Code1'}
                  id="JV_Code1"
                  name="JV_Code1"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'JV Code'} 
                  placeholder={'JV Code'}
                  id="JV_Code"
                  name="JV_Code"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'JVCode'} 
                  placeholder={'JVCode'}
                  id="JVCode"
                  name="JVCode"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              
              <FormInput 
                  label={'Temporary JV Code'} 
                  placeholder={'Temporary JV Code'}
                  id="Temporary_JV_Code"
                  name="Temporary_JV_Code"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />

              <FormInput 
                  label={'Sort Key'} 
                  placeholder={'Sort Key'}
                  id="Sort_Key"
                  name="Sort_Key"
                  type="text"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <div className="d-flex">
                <FormCheckBox
                    type='radio'
                    id="Azad_Kashmir_Tax_Flag"
                    name="Azad_Kashmir_Tax_Flag"
                    labelText={'Azad_Kashmir_Tax_Flag'}
                    label={"Yes"}
                    value={'Y'}
                    defaultChecked={
                      Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
                    }
                    showLabel={true}
                    errors={errors}
                    control={control}
                />
                <FormCheckBox
                    type='radio'
                    id="Azad_Kashmir_Tax_Flag"
                    name="Azad_Kashmir_Tax_Flag"
                    label={'No'}
                    value={'N'}
                    defaultChecked={
                        Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                    }
                    showLabel={true}
                    errors={errors}
                    control={control}
                />  
              </div>
          </div>
          <hr /> */}
          <div className="form-group formBoxCountry">
          <FormInput 
                  label={'Employee Name'} 
                  placeholder={'Employee Name'}
                  id="Emp_name"
                  name="Emp_name"
                  type="string"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Designation'} 
                  placeholder={'Designation'}
                  id="Desig_Name"
                  name="Desig_Name"
                  type="string"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput
                  label={'Department'} 
                  placeholder={'Department'}
                  id="Dept_name"
                  name="Dept_name"
                  type="string"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormSelect 
                  label={'PF Nomination Flag'} 
                  placeholder={'PF Nomination Flag'}
                  id="PF_Nomination_Flag"
                  name="PF_Nomination_Flag"
                  type="Radio"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormSelect 
                  label={'PF Nomination Flag'} 
                  placeholder={'PF Nomination Flag'}
                  id="PF_Nomination_Flag"
                  name="PF_Nomination_Flag"
                  type="Radio"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput
                  label={'Joining Date'} 
                  placeholder={'Joining Date'}
                  id="Joining_Date"
                  name="Joining_Date"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput
                  label={'Transaction Date'} 
                  placeholder={'Transaction Date'}
                  id="Business_Sector_Code"
                  name="Business_Sector_Code"
                  type="date"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'Confirmation Due'} 
                  placeholder={'Confirmation Due'}
                  id="Emp_Confirm_date"
                  name="Emp_Confirm_date"
                  type="date"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput
                  label={'Confirmation Date'} 
                  placeholder={'Confirmation Date'}
                  id="Confirmation_Date"
                  name="Confirmation_Date"
                  type="date"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
          </div>
          <div className='CountryBtnBox'>
              <CancelButton onClick={EditBack} title={'Cancel'}/> :
              <PrimaryButton type={'submit'} loading={isLoading} title="Save"/>
          </div>
        </form>
    </>
  )
}

function mapStateToProps({ Red_Confirmation }) {
  return { Red_Confirmation };
}
export default connect(mapStateToProps, ConfirmationActions)(ConfirmationForm)