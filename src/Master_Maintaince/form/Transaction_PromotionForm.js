import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Promotion_Action from "../../store/actions/HrOperations/Master_Maintaince/Promotion/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from "antd";
import baseUrl from "../../../src/config.json";

function Transaction_PromotionForm({
    cancel,
    mode,
    isCode,
    Red_Promotion,
    GetInfoById
}) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);

    const EditBack = () => {
        cancel("read");
    };

    const submitForm = async (data) => {
        // try {
        //     const isValid = await Base_City_Scheme.validate(data);
        //     if (isValid) {
        //         // console.log(data, "data");
        //         // POST_BASE_CITY_FORM(data)
        //     }
        // } catch (error) {
        //     console.error(error, "error message");
        // }
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(),
    });

    useEffect(() => {
        GetInfoById(isCode)
    }, [])

    console.log(Red_Promotion, 'Red_Promotion')
    


    useEffect(() => {
   
            reset(
                {
                    Employee_Name: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Employee_Name,
                    Desig_name: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Desig_name,
                    Department: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Department,
                    Employee_Category: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Employee_Category,
                    Supervisor: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Supervisor,
                    Cost_Center_name: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Cost_Center_name,
                    Grade_name: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Grade_name,

                },
            )
        
    }, [Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]])




    

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Promotion</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={"Employee Name"}
                        placeholder={"Employee Name"}
                        id="Employee_Name"
                        name="Employee_Name"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={"Designation"}
                        placeholder={"Designation"}
                        name="Desig_name"
                        type="text"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={"Department"}
                        placeholder={"Department"}
                        id="Department"
                        name="Department"
                        type="text"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={"Increment Date"}
                        placeholder={"City Code"}
                        id="City_code"
                        name="City_code"
                        type="Date"
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={"Transaction Date"}
                        placeholder={"City Name"}
                        id="City_name"
                        name="City_name"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />

                </div>
                <hr />
                <div className="row d-flex">
                    <div className="col-6">
                        <h6 className="bg-light p-2">Existing</h6>
                        <FormInput
                            label={"Category"}
                            placeholder={"Category"}
                            id="Employee_Category"
                            name="Employee_Category"
                            type="text"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={"Designation"}
                            placeholder={"Designation"}
                            id="Desig_name"
                            name="Desig_name"
                            type="text"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={"Grade"}
                            placeholder={"Grade"}
                            id="Grade_name"
                            name="Grade_name"
                            type="text"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={"Supervisor"}
                            placeholder={"Supervisor"}
                            id="Supervisor"
                            name="Supervisor"
                            type="text"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label={"Cost Center"}
                            placeholder={"City Code"}
                            id="Cost_Center_name"
                            name="Cost_Center_name"
                            type="text"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="col-6">
                        <h6 className="bg-light p-2">Proposed</h6>
                        <FormSelect
                            label={"Category"}
                            placeholder={"City Code"}
                            id="City_code"
                            name="City_code"
                            type="text"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Designation"}
                            placeholder={"City Code"}
                            id="City_code"
                            name="City_code"
                            type="Date"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Grade"}
                            placeholder={"City Code"}
                            id="City_code"
                            name="City_code"
                            type="Date"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Supervisor"}
                            placeholder={"City Code"}
                            id="City_code"
                            name="City_code"
                            type="Date"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Cost Center"}
                            placeholder={"City Code"}
                            id="City_code"
                            name="City_code"
                            type="Date"
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                </div>

                <div className="BaseCItyBtnBox">
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    <PrimaryButton type={"submit"} loading={isLoading} title="Save" />
                </div>
            </form>
        </>
    );
}
function mapStateToProps({ Red_Promotion }) {
    return { Red_Promotion };
}
export default connect(mapStateToProps, Promotion_Action)(Transaction_PromotionForm);
