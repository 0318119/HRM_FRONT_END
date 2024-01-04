import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import ManualAttendanceForm from "./Form/ManualAttendanceForm";
import "./ManualAttendance.css";
import { connect } from "react-redux";
import * as ManualAttend_Actions from "../store/actions/ManualAttendance/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import { message } from 'antd';
import baseUrl from '../../src/config.json'


const ManualAttendance = ({ Red_ManualAttendence, AllEmployees }) => {  
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

    const columns = [
        {
            title: "Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "City Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },
        {
            title: "Action",
            key: "action",
            render: (data) => (
                <Space size="middle">
                    <button
                        onClick={() => EditPage("Edit", data?.Emp_code)}
                        className="editBtn"
                    >
                        <FaEdit />
                    </button>

                </Space>
            ),
        },
    ];


    // console.log(Red_ManualAttendence, 'Red_ManualAttendence')


    useEffect(() => {
        if (isSearchVal == "") {
            AllEmployees({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            AllEmployees({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal]);
    useEffect(() =>{
        AllEmployees()
    }, [])


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
                                <div className="Base_CityFlexBox">
                                    <h4 className="text-dark">Employee List</h4>
                                    <div className="Base_CitysearchBox">
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
                                    loading={Red_ManualAttendence?.loading}
                                    dataSource={Red_ManualAttendence?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_ManualAttendence?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {/* {mode == "create" && <Base_CityForm cancel={setMode} mode={mode} isCode={null} />} */}
                            {mode == "Edit" && <ManualAttendanceForm cancel={setMode} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_ManualAttendence }) {
    return { Red_ManualAttendence };
}

export default connect(mapStateToProps, ManualAttend_Actions)(ManualAttendance);
