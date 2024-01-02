import React, { useEffect, useState } from "react";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input";
import { Button } from "../../components/basic/button";
import "../assets/css/TransactionConfirmation.css";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import { CancelButton } from "../../components/basic/button/index";
import * as Conform_Action from "../../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
import baseUrl from '../../config.json'
import { Cancel } from "@mui/icons-material";


const ConfirmatioWaiting = ({ Red_Confirmation, Get_Conformation_Data_Waiting, cancel, Get_Conformation_Data }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')


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
    }, [page, isSearchVal])





    



    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }
    const EditBack = () => {
        cancel('read')
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
                    <Popconfirm
                        title="Delete the Cost Centre"
                        description="Are you sure to delete the Cost Centre?"
                        okText="Yes"
                        cancelText="No"
                    onConfirm={() => {
                        handleConfirmDelete(data?.Emp_code)
                    }}
                    >
                        <button className="deleteBtn">
                            <MdDeleteOutline />
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


async function handleConfirmDelete(id) {

        await fetch(
            `${baseUrl.baseUrl}/tranConfirmation/TranConfirmations_delete`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Emp_code": id,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: "You have successfully deleted",
                });
                setTimeout(() => {
                    messageApi.destroy()
                    cancel('read')
                    Get_Conformation_Data({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }

    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass2">

                        {mode == "read" && (
                            <>
                                <div className="ConfirmationFlexBox">
                                    <h4 className="text-dark">Confirmation Waiting</h4>
                                    <div className="ConfirmationsearchBox">
                                        <Input placeholder={'Search Here...'} type="search"
                                            onChange={(e) => { setSearchVal(e.target.value) }}
                                        />
                                        <CancelButton onClick={EditBack} title={'Cancel'} />

                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

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