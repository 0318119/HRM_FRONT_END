import React, { useEffect, useState } from "react";
import Header from '../../../../components/Includes/Header';
import Input from "../../../../components/basic/input";
import { Button } from "../../../../components/basic/button";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import OutstandingRecoveriesFormnkform from "../../../../payroll/form/transactionPosting/Setup/OutstandingRecoveriesForm";
import * as OutstandingRecoveriesActions from "../../../../store/actions/payroll/outstandingRecoveries";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../../../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';

const OutstandingRecoveries = ({ Red_outstandingRecoveries, GetOutstandingRecoveries }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')



    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }




    const columns = [
        {
            title: 'Outstanding Recovery Code',
            dataIndex: 'Outstanding_Recovery_code',
            key: 'Outstanding_Recovery_code',
        },
        {
            title: 'Outstanding Recovery Name',
            dataIndex: 'Outstanding_Recovery_name',
            key: 'Outstanding_Recovery_name',
        },
        {
            title: 'Final Settlement Report Mandatory Flag',
            dataIndex: 'Final_Settlement_Report_Mandatory_Flag',
            key: 'Final_Settlement_Report_Mandatory_Flag',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <>
                    <Space size="middle">
                        <button onClick={() => EditPage("Edit", data?.Outstanding_Recovery_code)} className="editBtn"><FaEdit /></button>
                        <Popconfirm
                            title="Delete the Outstanding Recoveries"
                            description="Are you sure to delete the Outstanding Recoveries?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                handleConfirmDelete(data?.Outstanding_Recovery_code)
                            }}
                        >
                            <button className="deleteBtn"><MdDeleteOutline /></button>
                        </Popconfirm>
                    </Space>
                </>
            ),
        },
    ];

    // Payroll Outstanding Recoveries FORM DATA DELETE API CALL =========================== 
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/outstandingRecoveries/DeleteOutstandingrecoveries`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Outstanding_Recovery_code": id,
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
                    GetOutstandingRecoveries({
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
                setTimeout(() => {
                    messageApi.destroy()
                }, 3000);
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
            setTimeout(() => {
                messageApi.destroy()
            }, 3000);
        });
    }




    useEffect(() => {
        if (isSearchVal == '') {
            GetOutstandingRecoveries({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            GetOutstandingRecoveries({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal
            })
        }
    }, [page, isSearchVal])

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
                                <div className="coslistFlexBox">
                                    <h4 className="text-dark">Outstanding Recoveries</h4>
                                    <div className="costCentersearchBox">
                                        <Input placeholder={'Search Here...'} type="search"
                                            onChange={(e) => { setSearchVal(e.target.value) }}
                                        />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <>
                                    <Table
                                        columns={columns} loading={Red_outstandingRecoveries?.loading}
                                        dataSource={Red_outstandingRecoveries?.data?.[0]?.res?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: Red_outstandingRecoveries?.data?.[0]?.res?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    />
                                </>
                            )}
                            {mode == "create" && (
                                <OutstandingRecoveriesFormnkform cancel={setMode} mode={mode} isCode={null} page={page} />
                            )}
                            {mode == "Edit" && (
                                <OutstandingRecoveriesFormnkform cancel={setMode} mode={mode} isCode={isCode} page={page} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_outstandingRecoveries }) {
    return { Red_outstandingRecoveries };
}
export default connect(mapStateToProps, OutstandingRecoveriesActions)(OutstandingRecoveries) 