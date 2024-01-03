import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Space, Table, Tag, Tooltip } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ManualAttend_Actions from "../../store/actions/ManualAttendance/index";
import UpdateManaulForm from '../Form/UpdateManaulForm'
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { FaEdit } from 'react-icons/fa';
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../../src/config.json";

function ManualAttendanceForm({ cancel,
    mode,
    isCode,
    Red_ManualAttendence,
    GetEmployeeInfo,
    getAtttendanceHis,
    getAtttendanceHisss
}) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [isAttendHistory , setAttendHistory] = useState(false);
    const [isCode2, setCode2] = useState(null);
    const [mode2, setMode2] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");
    // const [page, setPage] = useState(1);
    const EditPage = ( mode2,code2) => {
        setCode2(code2);
        setMode2(mode2);
    };

    const EditBack = () => {
        cancel("read");
    };

    const ManualAttend = yup.object().shape({
        Year: yup.string().required("Year is Required"),
        Month: yup.string().required("Month is Required"),
    });



    const submitForm = async (data) => {
        try {
            const isValid = await ManualAttend.validate(data);
            if (isValid) {
                getAttendH(data)  
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
        resolver: yupResolver(ManualAttend),
    });

    useEffect(() => {
        if (isCode !== null) {
            GetEmployeeInfo(isCode)
        }
    }, [])


    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Emp_name: Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]?.Dept_name,

                },
            )
        } else {
            reset(
                {
                    Emp_name: Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]?.Dept_name,


                },
            )
        }
    }, [Red_ManualAttendence?.GetInfo?.[0]?.res?.data?.[0]])




 const getAttendH = async (data) => {
        try {
            const response = await getAtttendanceHisss({
                Emp_code: isCode,
                Year: data?.Year,
                Month: data?.Month,
            });

            if (response && response.success) {
                messageApi.success("Successfully created");
                setTimeout(() => {
                    setMode2("read")
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


    const columns = [
        {
            title: "Attendance_Date",
            dataIndex: "Attendance_Date",
            key: "Attendance_Date",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Emp_Time_In_HH",
            dataIndex: "Emp_Time_In_HH",
            key: "Emp_Time_In_HH",
        },
        {
            title: "Emp_Time_In_MM",
            dataIndex: "Emp_Time_In_MM",
            key: "Emp_Time_In_MM",
        },
        {
            title: "Emp_Time_Out_HH",
            dataIndex: "Emp_Time_Out_HH",
            key: "Emp_Time_Out_HH",
        },
        {
            title: "Emp_Time_Out_MM",
            dataIndex: "Emp_Time_Out_MM",
            key: "Emp_Time_Out_MM",
        },
        {
            title: "remarks",
            dataIndex: "remarks",
            key: "remarks",
        },
        {
            title: "Action",
            key: "action",
            render: (data) => (
                <Space size="middle">
                    <button
                        onClick={() => EditPage("EditAttendanceUpdate", data?.Emp_Code)}
                        className="editBtn"
                    >
                        <FaEdit />
                    </button>

                </Space>
            ),
        },
    ];


    // useEffect(() => {
    //   if(mode2 == 'read'){
    //       getAtttendanceHisss()
    //   }
 
    // }, [mode2])
    



    return (
        <>

            {contextHolder}
            {mode2 == false ? <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Manual Attendance</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
                        id="Emp_name"
                        name="Emp_name"
                        type="text"
                        readonly
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
                        readonly
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Department'}
                        placeholder={'Department'}
                        id="Dept_name"
                        name="Dept_name"
                        type="text"
                        readonly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <h4 className="text-dark">Attendance History</h4>
                <hr />
                <div className="form-group formBoxCountry">


                    <FormSelect
                        errors={errors}
                        control={control}
                        name={'Year'}
                        placeholder={'Please select a year'}
                        label={'Please select a year'}
                        options={[
                            { value: 2021, label: '2021' },
                            { value: 2022, label: '2022' },
                            { value: 2023, label: '2023' },
                            { value: 2024, label: '2024' },
                            { value: 2025, label: '2025' },
                        ]}
                    />

                    <FormSelect
                        label={'Month'}
                        placeholder='select Month'
                        name="Month"
                        options={[
                            { value: 1, label: "January" },
                            { value: 2, label: "Feburary" },
                            { value: 3, label: "March" },
                            { value: 4, label: "April" },
                            { value: 5, label: "May" },
                            { value: 6, label: "June" },
                            { value: 7, label: "july" },
                            { value: 8, label: "August" },
                            { value: 9, label: "September" },
                            { value: 10, label: "October" },
                            { value: 11, label: "November" },
                            { value: 12, label: "December" },
                        ]}
                        errors={errors}
                        control={control}
                    />


                </div>
                <div className="BaseCItyBtnBox">
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    <PrimaryButton type={"submit"} loading={isLoading} title="Save" />
                </div>
            </form>:"" }
            
            {mode2 == "read" && (

                <Table
                    columns={columns}
                    loading={Red_ManualAttendence?.loading}
                    dataSource={Red_ManualAttendence?.dataSingle?.[0]?.res?.data}
                    scroll={{ x: 10 }}
                    pagination={{
                        defaultCurrent: page,
                        total: Red_ManualAttendence?.dataSingle?.[0]?.res?.data,
                        onChange: (p) => {
                            setPage(p);
                        },
                        pageSize: pageSize,
                    }}
                /> 
            ) }
            {mode2 == "EditAttendanceUpdate" && <UpdateManaulForm cancel={setMode2} mode2={mode2} isCode2={isCode2} />}
        </>
    );
}
function mapStateToProps({ Red_ManualAttendence }) {
    return { Red_ManualAttendence };
}
export default connect(mapStateToProps, ManualAttend_Actions)(ManualAttendanceForm);
