import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as MASTER_PERSONAL from "../../store/actions/MasterMaintaince/MasterPersonal/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { MasterPersonal } from '../schema';
import Select from '../../components/basic/select/index'
import { message } from 'antd';
import baseUrl from '../../config.json'

function MasterPersonalForm({ cancel, isCode, page, GetMasterPersonalData, Red_Master_Personal, mode }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);

    // FORM CANCEL FUNCTION =================================================================
    const EditBack = () => {
        cancel('read')
    }
    const submitForm = async (data) => {
        try {
            const isValid = await MasterPersonal.validate(data);
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
            Cost_Centre_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code ?
                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code : 0,

            Cost_Centre_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
            Cost_Centre_abbr: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
            Train_Cost_Budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
            Train_Cost_Actual: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
            JV_Code1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
            JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
            JVCode: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
            Temporary_JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
            emp_category_1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
            emp_category_2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
            emp_category_3: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
            Functional_Category_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
            Major_Code_Mgmt: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
            Major_Code_Union: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
            Sort_Key: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            total_cost_budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
            Azad_Kashmir_Tax_Flag: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
            Pay_Grade_Areas_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
            Business_Sector_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
            org_unit_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
        },
        mode: "onChange",
        resolver: yupResolver(MasterPersonal),
    });



    useEffect(() => {
        if (isCode !== null) {
            // Get_Cost_Centre_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
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
        } else {
            reset(
                {
                    Cost_Centre_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_code,
                    Cost_Centre_name: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_name,
                    Cost_Centre_abbr: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Cost_Centre_abbr,
                    Train_Cost_Budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Budget,
                    Train_Cost_Actual: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Train_Cost_Actual,
                    JV_Code1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code1,
                    JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JV_Code,
                    JVCode: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.JVCode,
                    Temporary_JV_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Temporary_JV_Code,
                    emp_category_1: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_1,
                    emp_category_2: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_2,
                    emp_category_3: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.emp_category_3,
                    Functional_Category_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Functional_Category_code,
                    Major_Code_Mgmt: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Mgmt,
                    Major_Code_Union: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Major_Code_Union,
                    Sort_Key: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    total_cost_budget: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.total_cost_budget,
                    Azad_Kashmir_Tax_Flag: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Azad_Kashmir_Tax_Flag,
                    Pay_Grade_Areas_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Pay_Grade_Areas_code,
                    Business_Sector_Code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Business_Sector_Code,
                    org_unit_code: Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.org_unit_code,
                },
            )
        }
    }, [Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]])

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
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
                setTimeout(() => {
                    cancel('read')
                    GetMasterPersonalData({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
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

const [getEmpTypeCode, setgetEmpTypeCode] = useState([])
async function getEmpTypeCodeData() {
        await fetch(`${baseUrl.baseUrl}/employment_type_code/GetEmploymentTypeCodeWOP`, {
            method: "GET",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                setgetEmpTypeCode(response.data,'response.data')
                console.log(response.data,'response.data')
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }  

useEffect(() => {
    getEmpTypeCodeData()
},[])

    
    return (
        <>
            {contextHolder}
            <form >
                <h4 className="text-dark">Master Personal</h4>
                <hr />
                <div className="form-group formBoxCountry">
                   
                    <div className="d-flex">
                        
                        <FormCheckBox
                            type='radio'
                            id="Emp_marital_status"
                            name="Emp_marital_status"
                            labelText={'Marital Status'}
                            label={"Single"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Emp_marital_status"
                            name="Emp_marital_status"
                            label={'Married'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_marital_status == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Confirmation_Flag"
                            name="Confirmation_Flag"
                            labelText={'Confirmation Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Confirmation_Flag"
                            name="Confirmation_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                   
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Emp_sex_code"
                            name="Emp_sex_code"
                            labelText={'Genders'}
                            label={"Male"}
                            value={'Y'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_sex_code == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Emp_sex_code"
                            name="Emp_sex_code"
                            label={'Female'}
                            value={'N'}
                            defaultChecked={
                                Red_Master_Personal?.dataSingle?.[0]?.res?.data?.[0]?.Emp_sex_code == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <FormInput
                        label={'Employee Code'}
                        placeholder={'Employee Code'}
                        id="Emp_code"
                        name="Emp_code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
                        id="Emp_name"
                        name="Emp_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Father Name'}
                        placeholder={'Employee Father Name'}
                        id="Emp_Father_name"
                        name="Emp_Father_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    
                    <FormInput
                        label={'Date Of Birth'}
                        placeholder={'Date Of Birth'}
                        id="Emp_birth_date"
                        name="Emp_birth_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Appointment Date'}
                        placeholder={'Appointment Date'}
                        id="Emp_appointment_date"
                        name="Emp_appointment_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Confirm Date'}
                        placeholder={'Confirm Date'}
                        id="Emp_Confirm_date"
                        name="Emp_Confirm_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    
                  
                    <FormInput
                        label={'Employee address line1'}
                        placeholder={'Employee address line1'}
                        id="Emp_address_line1"
                        name="Emp_address_line1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee address line2'}
                        placeholder={'Employee address line2'}
                        id="Emp_address_line2"
                        name="Emp_address_line2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Home telephone1'}
                        placeholder={'Employee Home telephone1'}
                        id="Emp_home_tel1"
                        name="Emp_home_tel1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Home telephone2'}
                        placeholder={'Employee Home telephone2'}
                        id="Emp_home_tel2"
                        name="Emp_home_tel2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Office Telephone1'}
                        placeholder={'Employee Office Telephone1'}
                        id="Emp_office_tel1"
                        name="Emp_office_tel1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Office Telephone2'}
                        placeholder={'Employee Office Telephone2'}
                        id="Emp_office_tel2"
                        name="Emp_office_tel2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Mobile Number'}
                        placeholder={'Employee Mobile Number'}
                        id="Emp_mobile_No"
                        name="Emp_mobile_No"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee CNIC Number'}
                        placeholder={'Employee CNIC Number'}
                        id="Emp_nic_no"
                        name="Emp_nic_no"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee CNIC Issue Date'}
                        placeholder={'Employee CNIC Issue Date'}
                        id="Emp_NIC_Issue_date"
                        name="Emp_NIC_Issue_date"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee CNIC Expiry Date'}
                        placeholder={'Employee CNIC Expiry Date'}
                        id="Emp_NIC_Expiry_date"
                        name="Emp_NIC_Expiry_date"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Retirement Age'}
                        placeholder={'Employee Retirement Age'}
                        id="Emp_Retirement_age"
                        name="Emp_Retirement_age"
                        type="Number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee NTN No'}
                        placeholder={'Employee NTN No'}
                        id="Emp_ntn_no"
                        name="Emp_ntn_no"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Employee Email'}
                        placeholder={'Employee Email'}
                        id="Emp_email"
                        name="Emp_email"
                        type="Email"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <Select 
                      label={'Select Type'}
                      placeholder={'Select Employee Type'}
                    //    onChange={(e) => setState(e)}
                      options={getEmpTypeCode.map(
                            (item) => ({
                                value: item.Empt_Type_code,
                                label: item.Empt_Type_name,
                            })
                        )}
                        
                     />
                    
           
                  
                    
           
                </div>
                <div className='CountryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} /> 
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>
        </>
    )
}
function mapStateToProps({ Red_Master_Personal }) {
    return { Red_Master_Personal };
}

export default connect(mapStateToProps, MASTER_PERSONAL)(MasterPersonalForm); 