import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton , Button } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Promotion_Action from "../../store/actions/HrOperations/Master_Maintaince/Promotion/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import * as yup from "yup";
import { message } from "antd";
import baseUrl from "../../../src/config.json";

function Transaction_PromotionForm({



    cancel,
    cancel2,
    mode,
    isCode,
    isCode2,
    mode2,
    Red_Promotion,
    GetInfoById,
    Get_Category,
    Get_Grade,
    Get_Designation,
    Get_SuperVisor,
    Get_CostCenter,
    SavePromotion,
    Get_ProcesById,
    DeletePromotion

}) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const [process , setProcess] = useState(false)
    // console.log(currentDate, 'currentDate')
    const Category = Red_Promotion?.dataCategory?.[0]?.res?.data
    const Grade = Red_Promotion?.dataGrade?.[0]?.res?.data
    const designation = Red_Promotion?.dataDesignation?.[0]?.res?.data
    const SuperVisor = Red_Promotion?.dataSupervisor?.[0]?.res?.data
    const CostCenter = Red_Promotion?.dataCostCenter?.[0]?.res?.data


    const EditBack = () => {
        cancel("read");
    };
    const EditBack2 = () => {
        cancel2("read");
    };

    const PromotionSchema = yup.object().shape({
        Date_of_promotion: yup.string().required("Date_of_promotion is required"),
        // Transaction_Date: yup.string().required("Transaction_Date is required"),
        Position_Code_to: yup.string().required("Position_Code_to is required"),
        Desig_code_to: yup.string().required("Desig_code_to is required"),
        Grade_code_to: yup.string().required("Grade_code_to is required"),
        Supr_code_to: yup.string().required("Supr_code_to is required"),
        Cost_Centre_Code_To: yup.string().required("Cost_Centre_Code_To is required"),

    });

    const submitForm = async (data) => {
        try {
            const isValid = await PromotionSchema.validate(data);
            if (isValid) {
                if (process || isCode2){
                    Process(data) 
                    console.log(data ,'data')

                }else{
                    SaveForm(data)    
                }

                 

            }
        } catch (error) {
            console.error(error, "error message");
        }
    };


    console.log(process , "proce")

    

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(PromotionSchema),
    });

    useEffect(() => {
        if(isCode2){
            GetInfoById(isCode2)
        }else{
            GetInfoById(isCode)
        }
        // GetInfoById(isCode)
        Get_Category()
        Get_Grade()
        Get_Designation()
        Get_SuperVisor()
        Get_CostCenter()
        Get_ProcesById(isCode2)
    }, [])


    // console.log(isCode2, 'isCode2')
    
    useEffect(() => {
        if(isCode2){
            reset(
                {
                    Date_of_promotion: Red_Promotion?.dataById?.[0]?.res?.data?.[0]?.Date_of_promotion,
                    // Transaction_Date: Red_Promotion?.dataById?.[0]?.res?.data?.[0]?.Transaction_Date,
                    Position_Code_to: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Position_Code_to,
                    Desig_code_to: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Desig_code_to,
                    Grade_code_to: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Grade_code_to,
                    Supr_code_to: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Supr_code_to,
                    Cost_Centre_Code_To: Red_Promotion?.dataInfo?.[0]?.res?.data?.[0]?.[0]?.Cost_Centre_Code_To,
                },
            ) 
        }
    }, [Red_Promotion?.dataById?.[0]?.res?.data?.[0]])
    


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




    const SaveForm = async (data) => {
        // setLoading(true)
        try {
            const response = await SavePromotion({
                Emp_code: isCode,
                Date_of_promotion: data?.Date_of_promotion,
                Transaction_Date: currentDate,
                Position_Code_to: data?.Position_Code_to,
                Desig_code_to: data?.Desig_code_to,
                Grade_code_to: data?.Grade_code_to,
                Supr_code_to: data?.Supr_code_to,
                Cost_Centre_Code_To: data?.Cost_Centre_Code_To,
            });

            if (response && response.success) {
                console.log(response , 'response')
                messageApi.success("Save Promotion");
                setTimeout(() => {
                    setProcess(true)
                }, 2000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Promotion';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Promotion:", error);
            messageApi.error("An error occurred while Save Promotion");
        }
    };






const Process = async (data) => {
        setLoading(true)
        try {
            const response = await SavePromotion({
                Emp_code: isCode2 ? isCode2 : isCode,
                Date_of_promotion: data?.Date_of_promotion,
                Transaction_Date: currentDate,
                Position_Code_to: data?.Position_Code_to,
                Desig_code_to: data?.Desig_code_to,
                Grade_code_to: data?.Grade_code_to,
                Supr_code_to: data?.Supr_code_to,
                Cost_Centre_Code_To: data?.Cost_Centre_Code_To,
            });

            if (response && response.success) {
                messageApi.success("Successfully Processed");
                setLoading(false)
                setTimeout(() => {
                    window.location.reload('/Promotion2');
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Promotion';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Promotion:", error);
            messageApi.error("An error occurred while Save Promotion");
        }
    };

    const DelectPromotion = async (data) => {
        setLoading(true)
        try {
            const response = await DeletePromotion({
                Emp_code: isCode2 ? isCode2 : isCode,
            });

            if (response && response.success) {
                messageApi.success("Successfully Deleted");
                setTimeout(() => {
                    setLoading(false)
                    window.location.reload('/Promotion2');
                }, 2000);
            } else {
                const errorMessage = response?.message || 'Failed to Deleted';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Deleted:", error);
            messageApi.error("An error occurred while Deleted");
        }
    };







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
                        placeholder={"Increment Date"}
                        id="Date_of_promotion"
                        name="Date_of_promotion"
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={"Transaction Date"}
                        placeholder={"Transaction Date"}
                        id="Transaction_Date"
                        value={currentDate}
                        name="Transaction_Date"
                        type="Date"
                        readOnly
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
                            placeholder={"Category"}
                            id="Position_Code_to"
                            name="Position_Code_to"
                            options={Category?.map((item) => ({
                                value: item.Emp_Category_code,
                                label: item.Emp_Category_name,
                            })
                            )}
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Designation"}
                            placeholder={"Designation"}
                            id="Desig_code_to"
                            name="Desig_code_to"
                            options={designation?.map((item) => ({
                                value: item.Desig_code,
                                label: item.Desig_name,
                            })
                            )}
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Grade"}
                            placeholder={"Grade"}
                            id="Grade_code_to"
                            name="Grade_code_to"
                            options={Grade?.map((item) => ({
                                value: item.Grade_code,
                                label: item.Grade_name,
                            })
                            )}
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Supervisor"}
                            placeholder={"Supervisor"}
                            id="Supr_code_to"
                            name="Supr_code_to"
                            options={SuperVisor?.map((item) => ({
                                value: item.Emp_code,
                                label: item.Emp_name,
                            })
                            )}
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormSelect
                            label={"Cost Center"}
                            placeholder={"Cost Center"}
                            id="Cost_Centre_Code_To"
                            name="Cost_Centre_Code_To"
                            options={CostCenter?.map((item) => ({
                                value: item.Cost_Centre_code,
                                label: item.Cost_Centre_name,
                            })
                            )}
                            readOnly
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                </div>

                <div className="BaseCItyBtnBox">
                    {
                    process || isCode2 ?
                    <>
                                <CancelButton onClick={process ? EditBack : EditBack2  } title={"Cancel"} />
                     <Button  title={"Delete"} onClick={DelectPromotion} />
                     <PrimaryButton  type={"submit"} loading={isLoading} title="Process" />
                     </>
                     :  
                     <>
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    <PrimaryButton type={"submit"} loading={isLoading} title="Save"  />
                    </>
                     }

                </div>
            </form>
  

        </>
    );
}
function mapStateToProps({ Red_Promotion }) {
    return { Red_Promotion };
}
export default connect(mapStateToProps, Promotion_Action)(Transaction_PromotionForm);
