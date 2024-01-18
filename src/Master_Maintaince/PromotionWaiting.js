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
// import PromotionWaiting from './PromotionWaiting'
import { message } from 'antd';
import baseUrl from '../../src/config.json'

const PromotionWaiting = ({
    Red_Promotion,
    cancel,
    mode,
    isCode,
    AllEmployeeData,
    WaitingPromotion,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode2, setMode2] = useState("read");
    var get_access_token = localStorage.getItem("access_token");
    const [isCode2, setCode2] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState("");

    const EditPage = (mode2, code2) => {
        setCode2(code2);
        setMode2(mode2);
    };

    const EditBack = () => {
        cancel("read");
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
        WaitingPromotion()
    }, [])

    // useEffect(() => {
    //     if (isSearchVal == "") {
    //         AllEmployeeData({
    //             pageSize: pageSize,
    //             pageNo: page,
    //             search: null,
    //         });
    //     } else {
    //         AllEmployeeData({
    //             pageSize: pageSize,
    //             pageNo: 1,
    //             search: isSearchVal,
    //         });
    //     }
    // }, [page, isSearchVal]);



    return (
        <>
            <div>
                {/* <Header /> */}
            </div>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass3">
                        {mode2 == "read" && (
                            <>
                                <div className="PromotionFlexBox">
                                    <h4 className="text-dark">Waiting</h4>
                                    <div className="PromotionsearchBox">
                                        {/* <Input
                                            placeholder={"Search Here..."}
                                            type="search"
                                            onChange={(e) => {
                                                setSearchVal(e.target.value);
                                            }}
                                        /> */}
                                        <Button title="Cancel" onClick={EditBack} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode2 == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_Promotion?.loading}
                                    dataSource={Red_Promotion?.dataWaitings?.[0]?.res?.data?.[0]}
                                // scroll={{ x: 10}}
                                // pagination={{
                                //     defaultCurrent: page,
                                //     total: Red_Promotion?.data?.[0]?.res?.data3,
                                //     onChange: (p) => {
                                //         setPage(p);
                                //     },
                                //     pageSize: pageSize,
                                // }}
                                />
                            )}
                            {/* {mode == "create" && <PromotionWaiting cancel={setMode} mode={mode} isCode={null} />} */}
                            {mode2 == "Edit" && <Transaction_PromotionForm cancel2={setMode2} mode2={mode2} isCode2={isCode2} />}
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

export default connect(mapStateToProps, Promotion_Action)(PromotionWaiting);
