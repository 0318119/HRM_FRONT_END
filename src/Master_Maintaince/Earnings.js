import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import EarningsForm from "./form/EarningsForm";
import "./assets/css/Earnings.css";
import { connect } from "react-redux";
import * as BASE_CITY_ACTIONS from "../store/actions/HrOperations/Base_CIty/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const Earnings = ({ GetBaseCityData, Red_Base_City }) => {
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
            dataIndex: "City_code",
            key: "City_code",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Name",
            dataIndex: "City_name",
            key: "City_name",
        },
        {
            title: "Action",
            key: "action",
            render: (data) => (
                <Space size="middle">
                    <button
                        onClick={() => EditPage("Edit")}
                        className="editBtn"
                    >
                        <FaEdit />
                    </button>
                </Space>
            ),
        },
    ];

    //   useEffect(() => {
    //     GetBaseCityData()
    //   }, [])

    useEffect(() => {
        if (isSearchVal == "") {
            GetBaseCityData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            GetBaseCityData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal]);

    console.log("Red_Base_City table page", Red_Base_City?.data?.[0]?.res?.data1);

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
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>By Code</option>
                                        </select>
                                        <label className="Searchtext">Search Text</label>
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

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Base_City?.loading}
                                    dataSource={Red_Base_City?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Base_City?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "create" && <EarningsForm cancel={setMode} />}
                            {mode == "Edit" && <EarningsForm cancel={setMode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_Base_City }) {
    return { Red_Base_City };
}

export default connect(mapStateToProps, BASE_CITY_ACTIONS)(Earnings);
