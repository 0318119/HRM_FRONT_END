import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { PrimaryButton, Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import Resignation_ExtensionForm from "./form/Resignation_ExtensionForm";
import Transaction_ResignationForm from "./form/Transation_Resignation_Process";
import { connect } from "react-redux";
import * as ACTIONS from "../../src/store/actions/MasterMaintaince/Transaction_Resignation/index";
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const Transaction_Resignation = ({ Red_Transaction_Resignation, AllResignationEmployees }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState("read");
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");
    const navigate = useNavigate()

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode);
    };

    const columns = [
        {
            title: "Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
        },
        {
            title: "Name",
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

    useEffect(() => {
        if (isSearchVal == "") {
            AllResignationEmployees({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            AllResignationEmployees({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal, mode]);

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
                                    <h4 className="text-dark">Transaction Resignation</h4>
                                    <div className="Base_CitysearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                        <Link to="/Transation_Resignation_Process"><PrimaryButton type={"button"} title="Form Processing" /></Link>
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Transaction_Resignation?.loading}
                                    dataSource={Red_Transaction_Resignation?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Transaction_Resignation?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}

                                />
                            )}
                            {/* {mode == "Create" && <Transaction_ResignationForm cancel={setMode} mode={mode} isCode={isCode} />} */}
                            {/* {console.log(mode , 'mode')} */}
                            {mode == "Edit" && <Resignation_ExtensionForm cancel={setMode} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_Transaction_Resignation }) {
    return { Red_Transaction_Resignation };
}

export default connect(mapStateToProps, ACTIONS)(Transaction_Resignation);
