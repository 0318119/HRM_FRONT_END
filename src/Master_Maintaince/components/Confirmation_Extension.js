import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { PrimaryButton } from "../../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import Confirmation_ExtensionForm from "../form/Confirmation_ExtensionForm";
import { connect } from "react-redux";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Confirmation_Extension/index";
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const Confirmation_Extension = ({ Red_Confirmation_Extension, AllEmployees }) => {
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
                        onClick={() => EditPage("Edit",data?.Emp_code)}
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
                                    <h4 className="text-dark">Confirmation Extension</h4>
                                    <div className="Base_CitysearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                        <Link to="/ConfirmExtensionFormProcessing"><PrimaryButton type={"button"} title="Form Processing" /></Link>
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Confirmation_Extension?.loading}
                                    dataSource={Red_Confirmation_Extension?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    tion={{
                                        defaultCurrent: page,
                                        total: Red_Confirmation_Extension?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "Edit" && <Confirmation_ExtensionForm cancel={setMode} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_Confirmation_Extension }) {
    return { Red_Confirmation_Extension };
}

export default connect(mapStateToProps, ACTIONS)(Confirmation_Extension);
