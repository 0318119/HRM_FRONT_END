import React, { useEffect, useState } from 'react'
import {CancelButton,PrimaryButton } from "../../components/basic/button";
import * as COST_CENTRE_ACTIONS from "../../store/actions/HrOperations/Cost_Centre/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {FormInput,FormCheckBox} from '../../components/basic/input/formInput';
import { Cost_CentreSchema } from '../schema';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function CostCenterForm({cancel, isCode,page, GetCostCentreData, Get_Cost_Centre_By_ID, Red_Cost_centre, mode}) {
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
        const isValid = await Cost_CentreSchema.validate(data);
        if (isValid) {
        POST_COST_CENTRE_FORM(data)
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
        Cost_Centre_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code ? 
        Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code : 0,

        Cost_Centre_name: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
        Cost_Centre_abbr: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
        Train_Cost_Budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
        Train_Cost_Actual: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
        JV_Code1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
        JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
        JVCode: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
        Temporary_JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
        emp_category_1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
        emp_category_2: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
        emp_category_3: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
        Functional_Category_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
        Major_Code_Mgmt: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
        Major_Code_Union: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
        Sort_Key: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
        total_cost_budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
        Azad_Kashmir_Tax_Flag: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
        Pay_Grade_Areas_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
        Business_Sector_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
        org_unit_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
    },
    mode: "onChange",
    resolver: yupResolver(Cost_CentreSchema),
});



useEffect(() => {
    if(isCode !==null){
        Get_Cost_Centre_By_ID(isCode)
    }
}, [])

useEffect(() => {
    if(mode == "create"){
        reset(
            {
                Cost_Centre_code: 0,
                Cost_Centre_name: "",
                Cost_Centre_abbr: "",
                Train_Cost_Budget: "",
                Train_Cost_Actual: "",
                JV_Code1: "",
                JV_Code: "",
                JVCode: "",
                Temporary_JV_Code: "",
                emp_category_1: "",
                emp_category_2: "",
                emp_category_3: "",
                Functional_Category_code: "",
                Major_Code_Mgmt: "",
                Major_Code_Union: "",
                Sort_Key: "",
                total_cost_budget: "",
                Azad_Kashmir_Tax_Flag: "",
                Pay_Grade_Areas_code: "",
                Business_Sector_Code: "",
                org_unit_code: "",
            },
        )
    }else{
        reset(
            {
                Cost_Centre_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code,
                Cost_Centre_name: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
                Cost_Centre_abbr: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
                Train_Cost_Budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
                Train_Cost_Actual: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
                JV_Code1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
                JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
                JVCode: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
                Temporary_JV_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
                emp_category_1: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
                emp_category_2: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
                emp_category_3: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
                Functional_Category_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
                Major_Code_Mgmt: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
                Major_Code_Union: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
                Sort_Key: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                total_cost_budget: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
                Azad_Kashmir_Tax_Flag: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
                Pay_Grade_Areas_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
                Business_Sector_Code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
                org_unit_code: Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
            },
            )
    }
}, [Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]])

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
            "Cost_Centre_code": body.Cost_Centre_code,
            "Cost_Centre_name": body.Cost_Centre_name,
            "Cost_Centre_abbr": body.Cost_Centre_abbr,
            "Train_Cost_Budget": body.Train_Cost_Budget,
            "Train_Cost_Actual": body.Train_Cost_Actual,
            "Train_Cost_Actual": body.Train_Cost_Actual,
            "JV_Code1": body.JV_Code1,
            "JV_Code": body.JV_Code,
            "JVCode": body.JVCode,
            "Temporary_JV_Code": body.Temporary_JV_Code,
            "emp_category_1": body.emp_category_1,
            "emp_category_2": body.emp_category_2,
            "emp_category_3": body.emp_category_3,
            "Functional_Category_code": body.Functional_Category_code,
            "Major_Code_Mgmt": body.Major_Code_Mgmt,
            "Major_Code_Union": body.Major_Code_Union,
            "Sort_Key": body.Sort_Key,
            "total_cost_budget": body.total_cost_budget,
            "Azad_Kashmir_Tax_Flag": body.Azad_Kashmir_Tax_Flag,
            "Pay_Grade_Areas_code": body.Pay_Grade_Areas_code,
            "Business_Sector_Code": body.Business_Sector_Code,
            "org_unit_code": body.org_unit_code,
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
                GetCostCentreData({
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
          <h4 className="text-dark">Cost Centers List</h4>
          <hr />
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
                      Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "Y" ? true : false
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
                        Red_Cost_centre?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag == "N" ? true : false
                    }
                    showLabel={true}
                    errors={errors}
                    control={control}
                />  
              </div>
          </div>
          <hr />
          <div className="form-group formBoxCountry">
          <FormInput 
                  label={'Employe category 1'} 
                  placeholder={'Employe category 1'}
                  id="emp_category_1"
                  name="emp_category_1"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Employe category 2'} 
                  placeholder={'Employe category 2'}
                  id="emp_category_2"
                  name="emp_category_2"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
                  
              />
              <FormInput 
                  label={'Employe category 3'} 
                  placeholder={'Employe category 3'}
                  id="emp_category_3"
                  name="emp_category_3"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Functional Cat Code'} 
                  placeholder={'Functional Cat Code'}
                  id="Functional_Category_code"
                  name="Functional_Category_code"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
              <FormInput 
                  label={'Train Cost Bugdet'} 
                  placeholder={'Train Cost Bugdet'}
                  id="Train_Cost_Budget"
                  name="Train_Cost_Budget"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'Train Cost Actual'} 
                  placeholder={'Train Cost Actual'}
                  id="Train_Cost_Actual"
                  name="Train_Cost_Actual"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'Business Sector Code'} 
                  placeholder={'Business Sector Code'}
                  id="Business_Sector_Code"
                  name="Business_Sector_Code"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'org unit code'} 
                  placeholder={'org unit code'}
                  id="org_unit_code"
                  name="org_unit_code"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'Total Bugdet Cost'} 
                  placeholder={'Total Bugdet Cost'}
                  id="total_cost_budget"
                  name="total_cost_budget"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
               <FormInput 
                  label={'Pay Grade Areas code'} 
                  placeholder={'Pay Grade Areas code'}
                  id="Pay_Grade_Areas_code"
                  name="Pay_Grade_Areas_code"
                  type="number"
                  showLabel={true}
                  errors={errors}
                  control={control}
              />
          </div>
          <div className='CountryBtnBox'>
              <CancelButton onClick={EditBack} title={'Cancel'}/> 
              <PrimaryButton type={'submit'} loading={isLoading} title="Save"/>
          </div>
        </form>
    </>
  )
}

function mapStateToProps({ Red_Cost_centre }) {
  return { Red_Cost_centre };
}
export default connect(mapStateToProps, COST_CENTRE_ACTIONS)(CostCenterForm)