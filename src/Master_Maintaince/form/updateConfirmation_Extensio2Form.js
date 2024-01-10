import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Space, Table, Tag, Tooltip } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Red_Confirmation_Extensio2_Actions from "../../store/actions/ManualAttendance/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { FaEdit } from 'react-icons/fa';
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../../src/config.json";

function updateConfirmation_Extensio2Form({
    cancel,
    mode,
    isCode2,
    UpdateAttendance,
    Red_Confirmation_Extensio2,
    GetEmployeeInfo,
    getAtttendanceHis,
    getAtttendanceHisss
}) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [isAttendHistory, setAttendHistory] = useState(false);
    // const [isCode2, setCode2] = useState(null);
    const [mode2, setMode2] = useState("read");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    const [isAttendDate, setAttendDate] = useState(formattedDate)

    const currentHours = currentDate.getHours();
    const [isHours, setHours] = useState(currentHours)
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    const HandleDate = (e) =>{
        setAttendDate(e.target.value)
    }
    const HandleHours = (e) =>{
        setHours(e.target.value)
    }    

    const EditBack = () => {
        cancel("read");
    };

    const UdpateAttend = yup.object().shape({
        Attendance_Date: yup.string().required("Attendance_Date is Required"),
        Emp_Time_in_HH: yup.string().required("Emp_Time_In_HH is Required"),
        Emp_Time_In_MM: yup.string().required("Emp_Time_In_MM is Required"),
        Emp_Time_Out_HH: yup.string().required("Emp_Time_Out_HH is Required"),
        Emp_Time_Out_MM: yup.string().required("Emp_Time_Out_MM is Required"),
        Remarks : yup.string().required("remarks is Required"),
    });



    const submitForm = async (data) => {
        try {
            const isValid = await UdpateAttend.validate(data);
            if (isValid) {
                UpdateAttend(data)
            }
        } catch (error) {
            // console.error(error, "error message");
        }
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(UdpateAttend),
    });



    const UpdateAttend = async (data) => {
        setLoading(true)
        try {
            const response = await UpdateAttendance({
                Emp_code: isCode2,
                Date : [
                    {
                     Attendance_Date : data?.Attendance_Date,
                     Emp_Time_in_HH  : data?.Emp_Time_in_HH,
                     Emp_Time_In_MM : data?.Emp_Time_In_MM,
                     Emp_Time_Out_HH : data?.Emp_Time_Out_HH,
                     Emp_Time_Out_MM : data?.Emp_Time_Out_MM,
                     Remarks : data?.Remarks,
                    }
                ]

            });

            if (response && response.success) {
                messageApi.success("Successfully created");
                setTimeout(() => {
                    window.location.href = '/ManualAttendance'
                    // cancel('read')
                }, 3000);
            } else {
                const errorMessage = response?.messsage || 'Failed to Get Attendance';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            // console.error("Error occurred while Get Attendance:", error);
            messageApi.error("An error occurred while Get Attendance");
        }
    };




    return (
        <>

            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
               
                <h4 className="text-dark">Update Attendance</h4>
                <hr />
                <div className="form-group formBoxCountry">


                    <FormInput
                        label={'Attendance Date'}
                        placeholder={'Attendance Date'}
                        id="Attendance_Date"
                        name="Attendance_Date"
                        // value={isAttendDate}
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        // onChange={HandleDate}
                    />
                    <FormInput
                        label={'Time In Hours'}
                        placeholder={isHours}
                        id="Emp_Time_in_HH"
                        name="Emp_Time_in_HH"
                        // value={isHours}
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        // onChange={HandleHours}
                    />
                    <FormInput
                        label={'Time In MM'}
                        placeholder={'Time In MM'}
                        id="Emp_Time_In_MM"
                        name="Emp_Time_In_MM"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Time Out HH'}
                        placeholder={'Time Out HH'}
                        id="Emp_Time_Out_HH"
                        name="Emp_Time_Out_HH"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Time Out MM'}
                        placeholder={'Time Out MM'}
                        id="Emp_Time_Out_MM"
                        name="Emp_Time_Out_MM"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Remarks'}
                        placeholder={'Remarks'}
                        id="Remarks"
                        name="Remarks"
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
function mapStateToProps({ Red_Confirmation_Extensio2 }) {
    return { Red_Confirmation_Extensio2 };
}
export default connect(mapStateToProps, Red_Confirmation_Extensio2_Actions)(updateConfirmation_Extensio2Form);
