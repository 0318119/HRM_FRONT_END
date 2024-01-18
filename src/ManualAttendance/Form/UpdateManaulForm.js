import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Space, Table, Tag, Tooltip } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ManualAttend_Actions from "../../store/actions/ManualAttendance/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { FaEdit } from 'react-icons/fa';
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../../src/config.json";

function UpdateManaulForm({
    cancel,
    mode,
    isCode2,
    UpdateAttendance,
    Red_ManualAttendence,
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
    const currentDate = new Date().toISOString().split('T')[0];

    

    const EditBack = () => {
        cancel("read");
    };

    const UdpateAttend = yup.object().shape({
        Attendance_Date: yup.string().required("Attendance_Date is Required"),
        Emp_Time_in: yup.string().required("Emp_Time_in is Required"),
        Emp_Time_Out: yup.string().required("Emp_Time_Out is Required"),
        Remarks: yup.string().required("remarks is Required"),
    });



    const submitForm = async (data) => {
        try {
            const isValid = await UdpateAttend.validate(data);
            if (isValid) {
                UpdateAttend(data)
            }
        } catch (error) {
            console.error(error, "error message");
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
        // setLoading(true)
        try {
            const response = await UpdateAttendance({
                Emp_code: isCode2,
                Date: [
                    {
                        Attendance_Date: data?.Attendance_Date,
                        Emp_Time_in: data?.Emp_Time_in,
                        Emp_Time_Out: data?.Emp_Time_Out,
                        Remarks: data?.Remarks,
                    }
                ]

            });
            console.log(response, 'response')

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
            console.error("Error occurred while Get Attendance:", error);
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
                        // placeholder={currentDate}
                        id="Attendance_Date"
                        name="Attendance_Date"
                        // value={currentDate}
                        type="Date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    // onChange={HandleDate}
                    />
                    <FormInput
                        label={'Time In'}
                        placeholder={'Time In'}
                        id="Emp_Time_in"
                        name="Emp_Time_in"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    // onChange={HandleHours}
                    />
                    {/* <FormInput
                        label={'Time In MM'}
                        placeholder={'Time In MM'}
                        id="Emp_Time_In_MM"
                        name="Emp_Time_In_MM"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    /> */}
                    <FormInput
                        label={'Time Out'}
                        placeholder={'Time Out '}
                        id="Emp_Time_Out"
                        name="Emp_Time_Out"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    {/* <FormInput
                        label={'Time Out MM'}
                        placeholder={'Time Out MM'}
                        id="Emp_Time_Out_MM"
                        name="Emp_Time_Out_MM"
                        type="time"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    /> */}
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
function mapStateToProps({ Red_ManualAttendence }) {
    return { Red_ManualAttendence };
}
export default connect(mapStateToProps, ManualAttend_Actions)(UpdateManaulForm);
