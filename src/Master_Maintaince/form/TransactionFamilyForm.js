import React, { useEffect, useState } from "react";
import { FormInput } from '../../components/basic/input/formInput';
import * as Transaction_Family_Actions from "../../store/actions/Transition/transition_family/index";
import { PrimaryButton, CancelButton } from '../../components/basic/button/index';
import { connect } from "react-redux";
import { Skeleton, message } from "antd";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FamilySchema } from '../schema'

function TransactionFamilyForm({ Transition_family, Transition_Family, cancel, Transition_Family_Update }) {
    useEffect(() => {
        reset({
            ControlNo: Transition_family?.dataSingle[0]?.ControlNo,
            ESS_Sr_No: Transition_family?.dataSingle[0]?.ESS_Sr_No,
            Emp_code: Transition_family?.dataSingle[0]?.Emp_code,
            Fam_member_DOB: Transition_family?.dataSingle[0]?.Fam_member_DOB,
            Fam_member_name: Transition_family?.dataSingle[0]?.Fam_member_name,
            Fam_member_type: Transition_family?.dataSingle[0]?.Fam_member_type,
            CNIC_No: Transition_family?.dataSingle[0]?.CNIC_No,
            FileName: Transition_family?.dataSingle[0]?.FileName,
        })
    }, [Transition_family?.dataSingle[0]])

    const EditBack = () => {
        cancel('read')
        Transition_Family()
    }

    const submitForm = async (data) => {
        try {
            const isValid = await FamilySchema.validate(data);
            if (isValid) {
                Transition_Family_Update(data)
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
            ControlNo: Transition_family?.dataSingle[0]?.ControlNo,
            ESS_Sr_No: Transition_family?.dataSingle[0]?.ESS_Sr_No,
            Emp_code: Transition_family?.dataSingle[0]?.Emp_code,
            Fam_member_DOB: Transition_family?.dataSingle[0]?.Fam_member_DOB,
            Fam_member_name: Transition_family?.dataSingle[0]?.Fam_member_name,
            Fam_member_type: Transition_family?.dataSingle[0]?.Fam_member_type,
            CNIC_No: Transition_family?.dataSingle[0]?.CNIC_No,
            FileName: Transition_family?.dataSingle[0]?.FileName,
        },
        mode: "onChange",
        resolver: yupResolver(FamilySchema),
    });
    return (
        <div>
            <h4 className='EmployeeHeading'>Employee Information</h4>
            <hr />
            {Transition_family.loading ? <Skeleton active />
                :
                <form onSubmit={handleSubmit(submitForm)}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FormInput label={'ESS_Sr_No'} placeholder={'ESS_Sr_No'}
                            id="ESS_Sr_No"
                            name="ESS_Sr_No"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput label={'Fam_member_DOB'} placeholder={'Fam_member_DOB'}
                            id="Fam_member_DOB"
                            type='date'
                            name="Fam_member_DOB"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput label={'Fam_member_name'} placeholder={'Fam_member_name'}
                            id="Fam_member_name"
                            name="Fam_member_name"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FormInput label={'FileName'} placeholder={'FileName'}
                            id="FileName"
                            name="FileName"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput label={'CNIC_No'} placeholder={'CNIC_No'}
                            id="CNIC_No"
                            name="CNIC_No"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput label={'Fam_member_type'} placeholder={'Fam_member_type'}
                            id="Fam_member_type"
                            name="Fam_member_type"
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CancelButton onClick={EditBack} title={'Cancel'} />
                            <PrimaryButton type='submit' title={'Save'} />
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}
function mapStateToProps({ Transition_family }) {
    return { Transition_family };
}
export default connect(mapStateToProps, Transaction_Family_Actions)(TransactionFamilyForm);


