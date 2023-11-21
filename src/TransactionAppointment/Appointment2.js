import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
// import Base_CityForm from "./form/Base_CityForm";
import "./assets/css/Appointment.css";
import { connect } from "react-redux";
import * as Appointment_Actions from "../store/actions/Appointments/Appointment/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import { message } from 'antd';
import { BsFillPersonFill as Person_ico } from "react-icons/bs";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import DownloadingSharpIcon from '@mui/icons-material/DownloadingSharp';
import baseUrl from '../../src/config.json'


const Appointment2 = ({ GetAppointStatusCall, Red_Appointment }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState("read");
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");

    const EditPage = (mode, code) => {
        setCode(code);
        setMode(mode);
    };

    console.log(Red_Appointment, 'Red_Appointment')

    const columns = [
        {
            title: "Sequence No",
            dataIndex: "Sequence_no",
            key: "Sequence_no",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
        },
        {
            title: "Personal",
            render: (data) => (
                <Space size="middle">
                    <Link to={`/TAPersonalform?userId=${data.Sequence_no}`}>
                        <Person_ico className="List_ico" />{" "}
                    </Link>
                </Space>
            ),

        },
        {
            title: "Education",
            render: (data) => (
                <Space size="middle">
                    <Link
                        to={`/TAEducationForm?userId=${data.Sequence_no}`}
                    >
                        <LibraryBooksIcon className="List_ico" />{" "}
                    </Link>
                </Space>
            ),
        },
        {
            title: "Salary",
            render: (data) => (
                <Space size="middle">
                    <Link to={`/TASalaryForm?userId=${data.Sequence_no}`}>
                        <LocalAtmIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Exprience",
            render: (data) => (
                <Space size="middle">
                    <Link
                        to={`/TAExprienceForm?userId=${data.Sequence_no}`}
                    >
                        <BusinessCenterIcon className="List_ico" />{" "}
                    </Link>
                </Space>
            ),
        },
        {
            title: "Payroll",
            render: (data) => (
                <Space size="middle">
                    <Link to={`/TAppointmentMasterPayroll?userId=${data.Sequence_no}`}>
                        <WbSunnyIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "CheckList",
            render: (data) => (
                <Space size="middle">
                    <Link to={`/TACheckList?userId=${data.Sequence_no}`} >
                        <CheckBoxRoundedIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Family",
            render: (data) => (
                <Space size="middle">
                    <Link to={`/TAFamilyForm?userId=${data.Sequence_no}`}>
                        <Diversity3Icon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Process",
            render: (data) => (
                <Space size="middle">
                    <Link href=""
                        // onClick={(e) => AppointmentProcess(data.Sequence_no)}
                        >
                        <SettingsSuggestRoundedIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        {
            title: "Appointment Letter",
            render: (data) => (
                <Space size="middle">
                    <Link
                        // onClick={(e) => {
                        //     AppointLetter(data.Sequence_no)
                        // }
                        // }
                    >
                        <DownloadingSharpIcon className="List_ico" />
                    </Link>
                </Space>
            ),
        },
        
    ];

    

    useEffect(() => {
        GetAppointStatusCall()
    }, [])
    // useEffect(() => {
    //     if (isSearchVal == "") {
    //         GetBaseCityData({
    //             pageSize: pageSize,
    //             pageNo: page,
    //             search: null,
    //         });
    //     } else {
    //         GetBaseCityData({
    //             pageSize: pageSize,
    //             pageNo: 1,
    //             search: isSearchVal,
    //         });
    //     }
    // }, [page, isSearchVal]);

    console.log("Red_Appointment table page", Red_Appointment?.data?.[0]?.res?.data1);

    return (
        <>
            <div>
                <Header />
            </div>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        {mode == "read" && (
                            <>
                                <div className="AppointmentFlexBox">
                                    <h4 className="text-dark">Transaction - Appointment</h4>
                                    <div className="AppointmentsearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                        {/* <Button title="Create" onClick={() => setMode("create")} /> */}
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Appointment?.loading}
                                    dataSource={Red_Appointment?.data?.[0]?.res?.data?.[0]}
                                    scroll={{ x: 10 }}
                                // pagination={{
                                //     defaultCurrent: page,
                                //     total: Red_Appointment?.data?.[0]?.res?.data3,
                                //     onChange: (p) => {
                                //         setPage(p);
                                //     },
                                //     pageSize: pageSize,
                                // }}
                                />
                            )}
                            {/* {mode == "create" && <Base_CityForm cancel={setMode} mode={mode} isCode={null} />} */}
                            {/* {mode == "Edit" && <Base_CityForm cancel={setMode} mode={mode} isCode={isCode} />} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_Appointment }) {
    return { Red_Appointment };
}

export default connect(mapStateToProps, Appointment_Actions)(Appointment2);
