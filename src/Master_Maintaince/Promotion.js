import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import Transaction_PromotionForm from "./form/Transaction_PromotionForm";
import "./assets/css/Transaction_Promotion.css";
import { connect } from "react-redux";
import * as Promotion_Action from "../store/actions/HrOperations/Master_Maintaince/Promotion/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import PromotionWaiting from "./PromotionWaiting";
import { message } from 'antd';
import baseUrl from '../config.json'

const Promotion = ({
    Red_Promotion,
    AllEmployeeData,
}) => {
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
            title: "Employee Code",
            dataIndex: "Emp_code",
            key: "Emp_code",
        },
        {
            title: "Employee Name",
            dataIndex: "Emp_name",
            key: "Emp_name",
        },

        {
            title: "Action",
            key: "action",
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage("Edit", data?.Emp_code)} className="editBtn" >
                        <FaEdit />
                    </button>
                </Space>
            ),
        },
    ];



    useEffect(() => {
        if (isSearchVal == "") {
            AllEmployeeData({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            AllEmployeeData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal,
            });
        }
    }, [page, isSearchVal]);

     useEffect(() =>{
         AllEmployeeData()
     },[])



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
                                <div className="PromotionFlexBox">
                                    <h4 className="text-dark">Promotion</h4>
                                    <div className="PromotionsearchBox">
                                        <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        />
                                        <Button title="Process..." onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Promotion?.loading}
                                    dataSource={Red_Promotion?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Promotion?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "create" && <PromotionWaiting cancel={setMode} mode={mode} isCode={null} />}
                            {mode == "Edit" && <Transaction_PromotionForm cancel={setMode} mode={mode} isCode={isCode} />} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function mapStateToProps({ Red_Promotion }) {
    return { Red_Promotion };
}

export default connect(mapStateToProps, Promotion_Action)(Promotion);
