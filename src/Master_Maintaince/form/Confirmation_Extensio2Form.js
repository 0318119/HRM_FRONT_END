import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Space, Table, Tag, Tooltip } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Red_Confirmation_Extensio2_Actions from "../../store/actions/MasterMaintaince/Confirmation_Extensio2/index";
// import UpdateManaulForm from '../Form/UpdateManaulForm'
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { FaEdit } from 'react-icons/fa';
import { message } from "antd";
import * as yup from "yup";
import baseUrl from "../../../src/config.json";

function Confirmation_Extensio2Form({
    cancel,
    mode,
    isCode,
    Red_Confirmation_Extensio2,
    GetEmployeeInfo,
    SaveConfirmationExInfo
}) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [isAttendHistory, setAttendHistory] = useState(false);
    const [isCode2, setCode2] = useState(null);
    const [mode2, setMode2] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");
    // const [page, setPage] = useState(1);
    const EditPage = (mode2, code2) => {
        setCode2(code2);
        setMode2(mode2);
    };

    const EditBack = () => {
        cancel("read");
    };

//   console.log(Red_Confirmation_Extensio2 , 'Red_Confirmation_Extensio2')
    const ConfirmationExtension = yup.object().shape({
        Confirmation_Date: yup.string().required("Confirmation Date is Required"),
        Remarks: yup.string().required("Remarks is Required"),
    });



    const submitForm = async (data) => {
        try {
            const isValid = await ConfirmationExtension.validate(data);
            if (isValid) {
                SaveConfirmation(data)
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
        resolver: yupResolver(ConfirmationExtension),
    });

    useEffect(() => {
        GetEmployeeInfo(isCode)
        // if (isCode !== null) {
        // }
    }, [])


    useEffect(() => {
        if (mode == "create") {
            reset(
                {
                    Emp_name: Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]?.Dept_name,

                },
            )
        } else {
            reset(
                {
                    Emp_name: Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]?.Emp_name,
                    Desig_name: Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]?.Desig_name,
                    Dept_name: Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]?.Dept_name,


                },
            )
        }
    }, [Red_Confirmation_Extensio2?.GetInfo?.[0]?.res?.data?.[0]])






    const SaveConfirmation = async (data) => {
        try {
            const response = await SaveConfirmationExInfo({
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
            // console.error("Error occurred while Get Attendance:", error);
            messageApi.error("An error occurred while Get Attendance");
        }
    };


    const columns = [
        {
            title: "Attendance_Date",
            dataIndex: "Attendance_Date",
            key: "Attendance_Date",
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
                <h4 className="text-dark">Employee Information</h4>
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
                <h4 className="text-dark mt-4">Confirmation Extension Information</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Joining Date'}
                        name={'FromDate'}
                        label={'Joining Date'}
                        type="date"
                        readOnly
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Transaction Date'}
                        name={'Transaction_Date'}
                        label={'Transaction Date'}
                        type="date"
                        readOnly
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Confirmation Due'}
                        name={'FromDate'}
                        label={'Confirmation Due'}
                        type="date"
                        readOnly
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Confirmation Date'}
                        name={'Confirmation_Date'}
                        // value={Transaction_Date !== null ? Transaction_Date :"" }
                        label={'Confirmation Date'}
                        type="date"
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Remarks'}
                        name={'FromDate'}
                        label={'Remarks'}
                        type="text"
                    />
                </div>
                <div className="BaseCItyBtnBox">
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    <PrimaryButton type={"submit"} loading={isLoading} title="Save" />
                </div>
            </form> : ""}

            {mode2 == "read" && (

                <Table
                    columns={columns}
                    loading={Red_Confirmation_Extensio2?.loading}
                    dataSource={Red_Confirmation_Extensio2?.dataSingle?.[0]?.res?.data}
                    scroll={{ x: 10 }}
                    pagination={{
                        defaultCurrent: page,
                        total: Red_Confirmation_Extensio2?.dataSingle?.[0]?.res?.data,
                        onChange: (p) => {
                            setPage(p);
                        },
                        pageSize: pageSize,
                    }}
                />
            )}
            {/* {mode2 == "EditAttendanceUpdate" && <UpdateManaulForm cancel={setMode2} mode2={mode2} isCode2={isCode2} />} */}
        </>
    );
}
function mapStateToProps({ Red_Confirmation_Extensio2 }) {
    return { Red_Confirmation_Extensio2 };
}
export default connect(mapStateToProps, Red_Confirmation_Extensio2_Actions)(Confirmation_Extensio2Form);
