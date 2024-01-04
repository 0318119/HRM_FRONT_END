import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import EarningsForm from "./form/EarningsForm";
import "./assets/css/Earnings.css";
import { connect } from "react-redux";
import * as MASTEREARNING_ACTIONS from "../store/actions/MasterMaintaince/MasterEarning/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const Earning_Master = ({ GetMasterEarningData, Red_MasterEarning }) => {
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
            GetMasterEarningData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            GetMasterEarningData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
        if (mode == "read") {
            GetMasterEarningData({
                pageSize: pageSize,
                pageNo: 1,
                search: null,
            });
        }
    }, [page, isSearchVal]);
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringgClass">
                        {mode == "read" && (
                            <>
                                <div className="EarningsFlexBox">
                                    <h4 className="text-dark">Master - Earnings</h4>
                                    <div className="EarningssearchBox">
                                        <label>Search </label>
                                        {/* <select class="form-select" aria-label="Default select example">
                                            <option selected>By Code</option>
                                        </select>
                                        <label className="Searchtext">Search Text</label> */}
                                        <Input
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
                        {mode == "read" && (
                            <Table
                                columns={columns}
                                loading={Red_MasterEarning?.loading}
                                dataSource={Red_MasterEarning?.data?.[0]?.res?.data1}
                                scroll={{ x: 10 }}
                                pagination={{
                                    defaultCurrent: page,
                                    total: Red_MasterEarning?.data?.[0]?.res?.data3,
                                    onChange: (p) => {
                                        setPage(p);
                                    },
                                    pageSize: pageSize,
                                }}
                            />
                        )}
                        {/* {mode == "create" && <EarningsForm cancel={setMode} />} */}
                        {mode == "Edit" && <EarningsForm cancel={setMode} mode={mode} isCode={isCode} page={page} />}
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_MasterEarning }) {
    return { Red_MasterEarning };
}

export default connect(mapStateToProps, MASTEREARNING_ACTIONS)(Earning_Master);
