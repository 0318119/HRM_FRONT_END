import React, { useEffect, useState } from "react";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { Button } from "../../components/basic/button";
import "../assets/css/TransactionConfirmation.css";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as Conform_Action from "../../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
import Confirmationform from "../form/Confirmationform";


const ConfirmatioWaiting = ({ Red_Confirmation, Get_Conformation_Data_Waiting, cancel, Get_Conformation_Data }) => {
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')
    const [isCheckStatus, setCheckStatus] = useState("Process")

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }

    const columns = [
        {
            title: 'Emp Code',
            dataIndex: 'Emp_code',
            key: 'Emp_code',
        },
        {
            title: 'Emp Name',
            dataIndex: 'Emp_name',
            key: 'Emp_name',
        },

        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Emp_code)} className="editBtn"><FaEdit /></button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (isSearchVal == '') {
            Get_Conformation_Data_Waiting({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            Get_Conformation_Data_Waiting({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal
            })
        }
    }, [page, isSearchVal,mode])


    return (
        <>
        <div>
            <Header />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12" style={{marginTop: "100px"}}>

                    {/* {mode == "read" && ( */}
                        <>
                            <div className="ConfirmationFlexBox">
                                <h4 className="text-dark">Confirmation Waiting</h4>
                                <div className="ConfirmationsearchBox">
                                    <Input placeholder={'Search Here...'} type="search"
                                        onChange={(e) => { setSearchVal(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <hr />
                        </>
                    {/* )} */}

                    <div>
                        {mode == "read" && (
                            <>
                                <Table
                                    columns={columns}
                                    loading={Red_Confirmation?.loading}
                                    dataSource={Red_Confirmation?.WaitingData?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Confirmation?.WaitingData?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            </>
                        )}
                        {mode == "Edit" && (
                            <Confirmationform cancel={setMode} status={isCheckStatus} mode={mode} isCode={isCode} page={page} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

function mapStateToProps({ Red_Confirmation }) {
    return { Red_Confirmation };
}
export default connect(mapStateToProps, Conform_Action)(ConfirmatioWaiting);