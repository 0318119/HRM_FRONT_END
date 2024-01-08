import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { PrimaryButton } from "../../components/basic/button";
import { Table, Space } from "antd";
import { connect } from "react-redux";
import { FaEdit } from 'react-icons/fa';
import Confirmation_Extensio2Form from "../form/Confirmation_Extensio2Form";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Confirmation_Extensio2/index";

const ConfirmExtensionFormProcessing = ({ Red_Confirmation_Extension, getConfirmationExProcessData }) => {
    const [isGetConfirmationData, setGetConfirmationData] = useState([]);
    const [isGetConfirmationDataErr, setGetConfirmationDataErr] = useState("");
    const [isCode, setCode] = useState(null);
    const [mode, setMode] = useState("read");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);


    // Search data function
    const searchConfirmationData = () => {
        // Implement search functionality
    }

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode);
    };

    const columns = [
        {
            title: "Emp Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
        },
        {
            title: "Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },
        {
            title: "Transaction Date",
            dataIndex: "Transaction_Date",
            key: "Transaction_Date",
            render: (text) => text ? text.slice(0, 10) : "Not Found",
        },
        {
            title: "Confirmation Date",
            dataIndex: "Confirmation_Date",
            key: "Confirmation_Date",
            render: (text) => text ? text.slice(0, 10) : "Not Found",
        },
        {
            title: "Posting Date",
            dataIndex: "Posting_date",
            key: "Posting_date",
            render: (text) => text ? text.slice(0, 10) : "Not Found",
        },
        {
            title: "Process",
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
        getConfirmationExProcessData()
    }, [])

    useEffect(() => {
        if (isSearchVal == "") {
            getConfirmationExProcessData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            getConfirmationExProcessData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal, mode]);


    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        <>
                            <div className="Base_CityFlexBox">
                                <h4 className="text-dark">Form Processing</h4>
                                <div className="Base_CitysearchBox">
                                    <Input

                                        placeholder={"Search Here..."}
                                        type="search"
                                        onChange={(e) => {
                                            setSearchVal(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <hr />
                        </>

                        <div>
                            <Table
                                columns={columns}
                                loading={Red_Confirmation_Extension?.loading}
                                dataSource={Red_Confirmation_Extension?.data?.[0]?.res?.data1}
                                scroll={{ x: 10 }}
                                pagination={{
                                    defaultCurrent: page,
                                    total: Red_Confirmation_Extension?.data?.[0]?.res?.data3,
                                    onChange: (p) => {
                                        setPage(p);
                                    },
                                    pageSize: pageSize,
                                }}
                            />
                            {mode == "Edit" && <Confirmation_Extensio2Form cancel={setMode} mode={mode} isCode={isCode} />}
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

export default connect(mapStateToProps, ACTIONS)(ConfirmExtensionFormProcessing);

