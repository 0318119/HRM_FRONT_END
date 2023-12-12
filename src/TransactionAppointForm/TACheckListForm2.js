import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Space, Table, Pagination, Tag, Tooltip,  Radio  } from 'antd';
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const TACheckListForm2 = ({ Red_Cost_centre }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    //   useEffect(() => {
    //     if (isSearchVal == '') {
    //       GetCostCentreData({
    //         pageSize: pageSize,
    //         pageNo: page,
    //         search: null
    //       })
    //     } else {
    //       GetCostCentreData({
    //         pageSize: pageSize,
    //         pageNo: 1,
    //         search: isSearchVal
    //       })
    //     }
    //   }, [page, isSearchVal])

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const columns = [
        {
            title: 'Check',
            dataIndex: 'Cost_Centre_code',
            key: 'Cost_Centre_code',
            render: (text, record) => (
                <Radio
                    onChange={() => onSelectChange([record.key])}
                    checked={selectedRowKeys.includes(record.key)}
                />
            ),
        },
        {
            title: 'Serial NO',
            dataIndex: 'Cost_Centre_name',
            key: 'Cost_Centre_name',
        },
        {
            title: 'Name',
            dataIndex: 'Cost_Centre_abbr',
            key: 'Cost_Centre_abbr',
        },
    ];

    // COST CENTRE FORM DATA DELETE API CALL =========================== 
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/employment_cost_center/DeleteCostCenter`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Cost_Centre_code": id,
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
                    //   GetCostCentreData({
                    //     pageSize: pageSize,
                    //     pageNo: page,
                    //     search: null
                    //   })
                }, 5000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
                setTimeout(() => {
                    messageApi.destroy()
                }, 5000);
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
            setTimeout(() => {
                messageApi.destroy()
            }, 5000);
        });
    }

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
                                    <h4 className="text-dark">Transaction - Check List</h4>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <>
                                    <Table
                                        columns={columns} loading={Red_Cost_centre?.loading}
                                        dataSource={Red_Cost_centre?.data?.[0]?.res?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: Red_Cost_centre?.data?.[0]?.res?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    />
                                </>
                            )}
                        </div>
                        <div className='CountryBtnBox'>
                            <SimpleButton type={'submit'} title="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TACheckListForm2;