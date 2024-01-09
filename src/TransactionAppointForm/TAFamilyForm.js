import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import * as AppointFamily_Actions from '../store/actions/Appointments/AppointFamily/index';
import { CancelButton } from '../components/basic/button/index'
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import * as yup from "yup";
import { message, Table } from 'antd';
import { Link } from "react-router-dom";

function TAFamilyForm({
    SaveChildrenForm,
    SaveMarriageForm,
    Red_AppointFamily,
    GetEmployer,
    cancel,
    mode2,
    isCode2,
    page,
    update,
    updateChlid,
    UpdateChildrenForm,
    UpdateMarriageForm
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [isLoading2, setLoading2] = useState(false)
    const currentDate = new Date();
    const EditBack = () => {
        cancel('read')
    }
    const AppointFamilySchema = yup.object().shape({
        MarriageDate: yup.string().required("MarriageDate required"),
        Spausename: yup.string().required("Spausename is required"),
        SpauseDOB: yup.string().required("SpauseDOB is required"),
    });

    const AppoinTChildrenSchema = yup.object().shape({
        FamMemberName: yup.string().required("FamMemberName required"),
        FamMemberType: yup.string().required("FamMemberType is required"),
        FamMemberDOB: yup.string().required("FamMemberDOB is required"),
    });


    const submitForm = async (data) => {
        try {
            const isValid = await AppointFamilySchema.validate(data);
            if (isValid) {
                if (update) {
                    UpdateMarriage(data)
                } else {
                    SaveForm(data)
                    console.log(data, 'dadad')
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const submitFormChild = async (data) => {
        try {
            const isValid = await AppoinTChildrenSchema.validate(data);
            if (isValid) {
                if (updateChlid) {
                    UpdateChildren(data)
                    console.log(data, "data")
                } else {
                    SaveChildren(data)
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        GetEmployer(isCode2)
    }, [])

    useEffect(() => {
        if (mode2 == "create") {
            reset({
                Emp_name: Red_AppointFamily?.data?.[0]?.res?.data?.[0]?.Emp_name,
                Desig_name: Red_AppointFamily?.data?.[0]?.res?.data?.[0]?.Desig_name,
                Dept_name: Red_AppointFamily?.data?.[0]?.res?.data?.[0]?.Dept_name,
            });
        } else {
            reset(
                {
                    Emp_name: Red_AppointFamily?.data?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_AppointFamily?.data?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_AppointFamily?.data?.[0]?.res?.data?.[0]?.Dept_name,
                },
            )
        }

    }, [Red_AppointFamily?.data?.[0]?.res?.data?.[0]])

    useEffect(() => {
        if (update) {
            reset({
                SpauseDOB: Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]?.Spause_DOB,
                MarriageDate: Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]?.Marriage_Date,
                Spausename: Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]?.Spause_name,
            });
        }


    }, [Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]])

    useEffect(() => {
        if (updateChlid) {
            reset({
                FamMemberName: Red_AppointFamily?.getChlidren?.[0]?.res?.data?.[0]?.[0]?.Fam_Member_Name,
                FamMemberType: Red_AppointFamily?.getChlidren?.[0]?.res?.data?.[0]?.[0]?.Fam_Member_Type,
                FamMemberDOB: Red_AppointFamily?.getChlidren?.[0]?.res?.data?.[0]?.[0]?.Fam_Member_DOB,
            });
        }


    }, [Red_AppointFamily?.getChlidren?.[0]?.res?.data?.[0]?.[0]])

    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            SpauseDOB: Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]?.Spause_DOB,
            MarriageDate: Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]?.Marriage_Date,
            Spausename: Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]?.[0]?.Spause_name
        },
        mode2: "onChange",
        resolver: yupResolver(AppointFamilySchema),
    });

    const SaveForm = async (data) => {
        setLoading(true)
        try {
            const response = await SaveMarriageForm({
                Sequenceno: isCode2,
                MarriageDate: data?.MarriageDate,
                Spausename: data?.Spausename,
                SpauseDOB: data?.SpauseDOB,
            });

            if (response && response.success) {
                messageApi.success("Save Marriage");
                setTimeout(() => {
                    cancel('read')
                    // setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Marriage';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while changing Marriage:", error);
            messageApi.error("An error occurred while Save Marriage");
        }
    };

    const SaveChildren = async (data) => {
        setLoading2(true)
        try {
            const response = await SaveChildrenForm({
                Sequenceno: isCode2,
                FamMemberType: data?.FamMemberType,
                FamMemberName: data?.FamMemberName,
                FamMemberDOB: data?.FamMemberDOB,
            });
            if (response && response.success) {
                messageApi.success("Save Child");
                setTimeout(() => {
                    cancel('read')
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Child';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Save Child:", error);
            messageApi.error("An error occurred while Save Child");
        }
    };

    const UpdateChildren = async (data) => {
        setLoading2(true)
        try {
            const response = await UpdateChildrenForm({
                Sno: updateChlid?.S_no,
                Sequenceno: updateChlid?.Sequence_no,
                FamMemberType: data?.FamMemberType,
                FamMemberName: data?.FamMemberName,
                FamMemberDOB: data?.FamMemberDOB,
            });

            if (response && response.success) {
                messageApi.success("Update Child");
                setTimeout(() => {
                    cancel('read')
                    // setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Update Child';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Update Child:", error);
            messageApi.error("An error occurred while Update Child");
        }
    };

    const UpdateMarriage = async (data) => {
        setLoading(true)
        try {
            const response = await UpdateMarriageForm({
                Sequenceno: update,
                MarriageDate: data?.MarriageDate,
                SpauseDOB: data?.SpauseDOB,
                Spausename: data?.Spausename,
            });

            if (response && response.success) {
                messageApi.success("Update Marriage");
                setTimeout(() => {
                    cancel('read')
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Update Marriage';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Update Marriage:", error);
            messageApi.error("An error occurred while Update Marriage");
        }
    };

    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass2">
                        <div>
                            <h2 className="text-dark"> Transaction - Family</h2>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <h4 className="text-dark">Employee Information</h4>
                                <Link to="/Appointment" className="backLink text-dark">Back</Link>
                                <hr />
                                <div className="form-group formBoxCountry">
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
                                        label={'Designation'}
                                        placeholder={'Designation'}
                                        id="Desig_name"
                                        name="Desig_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Department'}
                                        placeholder={'Department'}
                                        id="Dept_name"
                                        name="Dept_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <h4 className="text-dark">Marriage Information</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormInput
                                        label={'Spouse Name'}
                                        placeholder={'Spouse Name'}
                                        id="Spausename"
                                        name="Spausename"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Spouse D.O.B'}
                                        placeholder={'Spouse D.O.B'}
                                        id="SpauseDOB"
                                        name="SpauseDOB"
                                        type="date"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Marriage Date'}
                                        placeholder={'Marriage Date'}
                                        id="MarriageDate"
                                        name="MarriageDate"
                                        type="date"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    {update ?
                                        <SimpleButton type={'submit'} loading={isLoading} title="Update" />
                                        : <SimpleButton type={'submit'} loading={isLoading} title="Save" />}
                                </div>
                            </form>
                            <form onSubmit={handleSubmit(submitFormChild)}>
                                <h4 className="text-dark">Children History</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormInput
                                        label={'Child Name'}
                                        placeholder={'Child Name'}
                                        id="FamMemberName"
                                        name="FamMemberName"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Gender'}
                                        placeholder='Gender'
                                        id="FamMemberType"
                                        name="FamMemberType"
                                        options={[
                                            {
                                                value: 'M',
                                                label: 'Male',
                                            },
                                            {
                                                value: "F",
                                                label: 'Female',
                                            },
                                        ]}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'D.O.B'}
                                        placeholder={'D.O.B'}
                                        id="FamMemberDOB"
                                        name="FamMemberDOB"
                                        type="date"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'Cancel'} />
                                    {updateChlid ?
                                        <SimpleButton type={'submit'} loading={isLoading2} title="Update" /> :
                                        <SimpleButton type={'submit'} loading={isLoading2} title="Save" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function mapStateToProps({ Red_AppointFamily }) {
    return { Red_AppointFamily };
}
export default connect(mapStateToProps, AppointFamily_Actions)(TAFamilyForm)
