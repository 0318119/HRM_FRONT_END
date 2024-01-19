import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { PrimaryButton } from "../../components/basic/button";
import { Table, Space, message } from "antd";
import { connect } from "react-redux";
import { CancelButton } from "../../components/basic/button";
import { FaEdit } from 'react-icons/fa';
import Resignation_ExtensionForm from "./Resignation_ExtensionForm";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Transaction_Resignation/index";

const Transation_Resignation_Process = ({ Red_Transaction_Resignation, getResignationExProcessData, cancel }) => {

    const [isCode, setCode] = useState(null);
    const [mode, setMode] = useState("read");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const waiting = Red_Transaction_Resignation?.Waiting?.[0]?.res
    const [isCheckStatus, setCheckStatus] = useState("Process")

    const EditBack = () => {
        cancel("read");
    };


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
            getResignationExProcessData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            getResignationExProcessData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal, mode]);

    useEffect(() => {
        if (waiting?.message == "failed" || waiting?.messsage == "failed") {
            message.error(waiting?.message || waiting?.messsage)
        }
    }, [waiting])

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">
                        {mode == "read" && (
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
                        )}
                        <div>
                            {console.log("waiting", waiting)}
                            {
                                mode == "read" ?
                                    <Table
                                        columns={columns}
                                        loading={Red_Transaction_Resignation?.loading}
                                        dataSource={waiting?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: waiting?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    /> : ""
                            }
                            {mode == "Edit" && <Resignation_ExtensionForm cancel={setMode} status={isCheckStatus} mode={mode} isCode={isCode} />}
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

export default connect(mapStateToProps, ACTIONS)(Transation_Resignation_Process);

