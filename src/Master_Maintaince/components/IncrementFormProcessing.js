import React, { useState, useEffect } from "react";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { Table, Space } from "antd";
import { connect } from "react-redux";
import Incrementform from "../form/Incrementform";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Increment/index";
import { FaEdit } from 'react-icons/fa';


const IncrementFormProcessing = ({ Red_Increment, GetIncrementProcess }) => {
    const [mode, setMode] = useState("read");
    const [isCode, setCode] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [isSearchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(true);
    const [isCheckStatus, setCheckStatus] = useState("Process")

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
            title: "Process",
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
        GetIncrementProcess()
    }, [])
    console.log("red", Red_Increment?.data?.[0]?.res?.data?.[0])

    useEffect(() => {
        if (isSearchVal == "") {
            GetIncrementProcess({
                pageSize: pageSize,
                pageNo: page,
                search: null,
            });
        } else {
            GetIncrementProcess({
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
                        {
                            mode == "read" ? <>
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
                            </> : ""
                        }

                        <div>
                            {
                                mode == "read" ?
                                    <Table
                                        columns={columns}
                                        loading={Red_Increment?.loading}
                                        dataSource={Red_Increment?.data?.[0]?.res?.data?.[0]}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: Red_Increment?.data?.[0]?.res?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    /> : ""
                            }
                               {mode == "Edit" && <Incrementform cancel={setMode} status={isCheckStatus} mode={mode} isCode={isCode} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_Increment }) {
    return { Red_Increment };
}

export default connect(mapStateToProps, ACTIONS)(IncrementFormProcessing);