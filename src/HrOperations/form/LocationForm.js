import React, { useState, useEffect } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as LOCATION_ACTIONS from "../../store/actions/HrOperations/Location/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { Locations_Scheme } from '../schema';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'


function LocationForm({ cancel, mode, isCode, page, Red_Location, getLocationData, Get_Location_By_ID }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }


    const submitForm = async (data) => {
        try {
            const isValid = await Locations_Scheme.validate(data);
            if (isValid) {
                POST_LOCATION_FORM(data)
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
            Loc_code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_code ?
                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_code : 0,

            Loc_name: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_name,
            Loc_abbr: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_abbr,
            Loc_address_line1: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_line1,
            Loc_address_line2: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_line2,
            Loc_address_contact: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_contact,
            Loc_address_phone: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_phone,
            Loc_address_fax: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_fax,
            City_code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.City_code,
            Level_1_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Level_1_Code,
            Bank_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Code,
            Sort_key: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
            eobi_city_code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.eobi_city_code,
            JV_CODE: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.JV_CODE,
            Branch_Flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Branch_Flag,
            BranchManager_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.BranchManager_Code,
            Branch_Operation_Manager_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Branch_Operation_Manager_Code,
            evening_banking_peron_limit: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.evening_banking_peron_limit,
            Evening_banking_flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_banking_flag,
            Saturday_banking_peron_limit: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_banking_peron_limit,
            Saturday_banking_flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_banking_flag,
            SatEveningFlag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.SatEveningFlag,
            Sunday_banking_peron_limit: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_banking_peron_limit,
            Sunday_banking_flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_banking_flag,
            Saturday_Affactive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_Affactive_Date,
            Saturday_InActive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_InActive_Date,
            Evening_Affactive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_Affactive_Date,
            Evening_InActive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_InActive_Date,
            Sunday_Affactive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_Affactive_Date,
            Sunday_InActive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_InActive_Date,
            Booth_Flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Booth_Flag,
        },
        mode: "onChange",
        resolver: yupResolver(Locations_Scheme),
    });


    useEffect(() => {
        if (isCode !== null) {
            Get_Location_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Loc_code: 0,
                    Loc_name: "",
                     Loc_abbr: "",
                     Loc_address_line1: "",
                    Loc_address_line2: "",
                    Loc_address_contact: "",
                    Loc_address_phone: "",
                    Loc_address_fax: "",
                    City_code: "",
                    Level_1_Code: "",
                    Bank_Code: "",
                    Sort_key: "",
                    eobi_city_code: "",
                    JV_CODE: "",
                    Branch_Flag: "",
                    BranchManager_Code: "",
                    Branch_Operation_Manager_Code: "",
                    evening_banking_peron_limit: "",
                    Evening_banking_flag: "",
                    Saturday_banking_peron_limit: "",
                    Saturday_banking_flag: "",
                    SatEveningFlag: "",
                    Sunday_banking_peron_limit: "",
                    Sunday_banking_flag: "",
                    Saturday_Affactive_Date: "",
                    Saturday_InActive_Date: "",
                    Evening_Affactive_Date: "",
                    Evening_InActive_Date: "",
                    Sunday_Affactive_Date: "",
                     Sunday_InActive_Date: "",
                    Booth_Flag: ""
                },
            )
        } else {
            reset(
                {
                    Loc_code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_code ?
                        Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_code : 0,

                    Loc_name: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_name,
                    Loc_abbr: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_abbr,
                    Loc_address_line1: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_line1,
                    Loc_address_line2: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_line2,
                    Loc_address_contact: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_contact,
                    Loc_address_phone: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_phone,
                    Loc_address_fax: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Loc_address_fax,
                    City_code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.City_code,
                    Level_1_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Level_1_Code,
                    Bank_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Bank_Code,
                    Sort_key: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
                    eobi_city_code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.eobi_city_code,
                    JV_CODE: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.JV_CODE,
                    Branch_Flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Branch_Flag,
                    BranchManager_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.BranchManager_Code,
                    Branch_Operation_Manager_Code: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Branch_Operation_Manager_Code,
                    evening_banking_peron_limit: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.evening_banking_peron_limit,
                    Evening_banking_flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_banking_flag,
                    Saturday_banking_peron_limit: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_banking_peron_limit,
                    Saturday_banking_flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_banking_flag,
                    SatEveningFlag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.SatEveningFlag,
                    Sunday_banking_peron_limit: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_banking_peron_limit,
                    Sunday_banking_flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_banking_flag,
                    Saturday_Affactive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_Affactive_Date,
                    Saturday_InActive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_InActive_Date,
                    Evening_Affactive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_Affactive_Date,
                    Evening_InActive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_InActive_Date,
                    Sunday_Affactive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_Affactive_Date,
                    Sunday_InActive_Date: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_InActive_Date,
                    Booth_Flag: Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Booth_Flag,
                },
            )
        }
    }, [Red_Location?.dataSingle?.[0]?.res?.data?.[0]])


    //  Location FORM DATA API CALL =========================== 
    async function POST_LOCATION_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/location_code/AddLocation`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Loc_code": body.Loc_code,
                "Loc_name": body.Loc_name,
                "Loc_abbr": body.Loc_abbr,
                "Loc_address_line1": body.Loc_address_line1,
                "Loc_address_line2": body.Loc_address_line2,
                "Loc_address_contact": body.Loc_address_contact,
                "Loc_address_phone": body.Loc_address_phone,
                "Loc_address_fax": body.Loc_address_fax,
                "City_code": body.City_code,
                "Level_1_Code": body.Level_1_Code,
                "Bank_Code": body.Bank_Code,
                "Sort_key": body.Sort_key,
                "eobi_city_code": body.eobi_city_code,
                "JV_CODE": body.JV_CODE,
                "Branch_Flag": body.Branch_Flag,
                "BranchManager_Code": body.BranchManager_Code,
                "Branch_Operation_Manager_Code": body.Branch_Operation_Manager_Code,
                "evening_banking_peron_limit": body.evening_banking_peron_limit,
                "Evening_banking_flag": body.Evening_banking_flag,
                "Saturday_banking_peron_limit": body.Saturday_banking_peron_limit,
                "Saturday_banking_flag": body.Saturday_banking_flag,
                "SatEveningFlag": body.SatEveningFlag,
                "Sunday_banking_peron_limit": body.Sunday_banking_peron_limit,
                "Sunday_banking_flag": body.Sunday_banking_flag,
                "Saturday_Affactive_Date": body.Saturday_Affactive_Date,
                "Saturday_InActive_Date": body.Saturday_InActive_Date,
                "Evening_Affactive_Date": body.Evening_Affactive_Date,
                "Evening_InActive_Date": body.Evening_InActive_Date,
                "Sunday_Affactive_Date": body.Sunday_Affactive_Date,
                "Sunday_InActive_Date": body.Sunday_InActive_Date,
                "Booth_Flag": body.Booth_Flag
            }),
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
                    getLocationData({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
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
                <h4 className="text-dark">Location</h4>
                <hr />
                <div className="form-group formBoxLocation">
                    <FormInput
                        label={'Location Code'}
                        placeholder={'Location Code'}
                        id="Loc_code"
                        name="Loc_code"
                        Readonly={true}
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Name'}
                        placeholder={'Location Name'}
                        id="Loc_name"
                        name="Loc_name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Abbrivation'}
                        placeholder={'Location Abbrivation'}
                        id="Loc_abbr"
                        name="Loc_abbr"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Address Line1'}
                        placeholder={'Location Address Line1'}
                        id="Loc_address_line1"
                        name="Loc_address_line1"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Address Line2'}
                        placeholder={'Location Address Line2'}
                        id="Loc_address_line2"
                        name="Loc_address_line2"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Address Contact'}
                        placeholder={'Location Address Contact'}
                        id="Loc_address_contact"
                        name="Loc_address_contact"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Address phone'}
                        placeholder={'Location Address phone'}
                        id="Loc_address_phone"
                        name="Loc_address_phone"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Location Address Fax'}
                        placeholder={'Location Address Fax'}
                        id="Loc_address_fax"
                        name="Loc_address_fax"
                        type="text"
                         showLabel={true}
                        errors={errors}
                        control={control}
                        />
                    <FormInput
                        label={'City Code'}
                        placeholder={'City Code'}
                        id="City_code"
                        name="City_code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Level 1 Code'}
                        placeholder={'Level 1 Code'}
                        id="Level_1_Code"
                        name="Level_1_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Bank Code'}
                        placeholder={'Bank Code'}
                        id="Bank_Code"
                        name="Bank_Code"
                        type="text"
                        showLabel={true}
                        errors={errors} 
                        control={control}
                    />
                    <FormInput
                        label={'Sort Key'}
                        placeholder={'Sort Key'}
                        id="Sort_key"
                        name="Sort_key"
                        type="text" 
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Eobi City Code'}
                        placeholder={'Eobi City Code'}
                        id="eobi_city_code"
                        name="eobi_city_code"
                        type="number"
                        showLabel={true}
                        errors={errors} 
                        control={control}
                    />
                    <FormInput
                        label={'JV Code'}
                        placeholder={'JV Code'}
                        id="JV_CODE"
                        name="JV_CODE"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    

                </div>
                <hr />
                <div className="form-group formBoxLocation">
                    <FormInput
                        label={'Branch Manager Code'}
                        placeholder={'Branch Manager Code'}
                        id="BranchManager_Code"
                        name="BranchManager_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Branch Operation Manager Code'}
                        placeholder={'Branch Operation Manager Code'}
                        id="Branch_Operation_Manager_Code"
                        name="Branch_Operation_Manager_Code"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Evening banking person limit'}
                        placeholder={'Evening banking person limit'}
                        id="evening_banking_peron_limit"
                        name="evening_banking_peron_limit"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    
                    <FormInput
                        label={'Saturday_banking_peron_limit'}
                        placeholder={'Saturday_banking_peron_limit'}
                        id="Saturday_banking_peron_limit"
                        name="Saturday_banking_peron_limit"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}

                    />
                    <FormInput
                        label={'Sunday_banking_peron_limit'}
                        placeholder={'Sunday_banking_peron_limit'}
                        id="Sunday_banking_peron_limit"
                        name="Sunday_banking_peron_limit"
                        type="number"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Saturday_Affactive_Date'}
                        placeholder={'Saturday_Affactive_Date'}
                        id="Saturday_Affactive_Date"
                        name="Saturday_Affactive_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Saturday_InActive_Date'}
                        placeholder={'Saturday_InActive_Date'}
                        id="Saturday_InActive_Date"
                        name="Saturday_InActive_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Evening_Affactive_Date'}
                        placeholder={'Evening_Affactive_Date'}
                        id="Evening_Affactive_Date"
                        name="Evening_Affactive_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Evening_InActive_Date'}
                        placeholder={'Evening_InActive_Date'}
                        id="Evening_InActive_Date"
                        name="Evening_InActive_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Sunday_Affactive_Date'}
                        placeholder={'Sunday_Affactive_Date'}
                        id="Sunday_Affactive_Date"
                        name="Sunday_Affactive_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Sunday_InActive_Date'}
                        placeholder={'Sunday_InActive_Date'}
                        id="Sunday_InActive_Date"
                        name="Sunday_InActive_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Evening_banking_flag"
                            name="Evening_banking_flag"
                            labelText={'Evening_banking_flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_banking_flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Evening_banking_flag"
                            name="Evening_banking_flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Evening_banking_flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Saturday_banking_flag"
                            name="Saturday_banking_flag"
                            labelText={'Saturday_banking_flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_banking_flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Saturday_banking_flag"
                            name="Saturday_banking_flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Saturday_banking_flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="SatEveningFlag"
                            name="SatEveningFlag"
                            labelText={'SatEveningFlag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.SatEveningFlag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="SatEveningFlag"
                            name="SatEveningFlag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.SatEveningFlag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Sunday_banking_flag"
                            name="Sunday_banking_flag"
                            labelText={'Sunday_banking_flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_banking_flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Sunday_banking_flag"
                            name="Sunday_banking_flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Sunday_banking_flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Booth_Flag"
                            name="Booth_Flag"
                            labelText={'Booth_Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Booth_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Booth_Flag"
                            name="Booth_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Booth_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Branch_Flag"
                            name="Branch_Flag"
                            labelText={'Branch Flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Branch_Flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Branch_Flag"
                            name="Branch_Flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Location?.dataSingle?.[0]?.res?.data?.[0]?.Branch_Flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    
                   

                </div>
                <div className='LocationBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>

        </>
    )
}

function mapStateToProps({ Red_Location }) {
    return { Red_Location };
}
export default connect(mapStateToProps, LOCATION_ACTIONS)(LocationForm)