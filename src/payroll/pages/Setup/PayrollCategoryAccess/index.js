import React, { useEffect, useState } from "react";
import Header from '../../../../components/Includes/Header';
import Input from "../../../../components/basic/input";
import { Button } from "../../../../components/basic/button";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import PayrollCategoryAccessForm from "../../../../payroll/form/transactionPosting/Setup/PayrollCategoryAccessForm";
import * as PayrollCategoryAccessActions from "../../../../store/actions/payroll/PayrollCategoryAccess";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../../../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const PayrollCategoryAccess = ({ Red_PayrollCategoryAccess, GetPayrollCateryAccess }) => {
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
            title: 'Payroll Category Code',
            dataIndex: 'Payroll_Category_code',
            key: 'Payroll_Category_code',
        },
        {
            title: 'Payroll Category Name',
            dataIndex: 'Payroll_Category_name',
            key: 'Payroll_Category_name',
        },
        {
            title: 'Payroll Category Abbreviation',
            dataIndex: 'Payroll_Category_abbr',
            key: 'Payroll_Category_abbr',
        },
        {
            title: 'Payroll Month',
            dataIndex: 'Payroll_Month',
            key: 'Payroll_Month',
        },
        {
            title: 'Payroll Year',
            dataIndex: 'Payroll_Year',
            key: 'Payroll_Year',
        },
        {
            title: 'Payroll Last Month',
            dataIndex: 'Payroll_Last_Month',
            key: 'Payroll_Last_Month',
        },
        {
            title: 'Payroll Last Year',
            dataIndex: 'Payroll_Last_Year',
            key: 'Payroll_Last_Year',
        },
        {
            title: 'Payroll Undo Flag',
            dataIndex: 'Payroll_Undo_Flag',
            key: 'Payroll_Undo_Flag',
        },
        {
            title: 'Loan Completion Flag',
            dataIndex: 'Loan_Completion_Flag',
            key: 'Loan_Completion_Flag',
        },
        {
            title: 'Sort key',
            dataIndex: 'Sort_key',
            key: 'Sort_key',
        },
        {
            title: 'PF Percentage',
            dataIndex: 'pf_percentage',
            key: 'pf_percentage',
        },
        {
            title: 'Active flag',
            dataIndex: 'active_flag',
            key: 'active_flag',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <>
                    <Space size="middle">
                        <button onClick={() => EditPage("Edit", data?.Payroll_Category_code)} className="editBtn"><FaEdit /></button>
                        <Popconfirm
                            title="Delete the Payroll Category Access"
                            description="Are you sure to delete the Payroll Category Access?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                handleConfirmDelete(data?.Payroll_Category_code)
                            }}
                        >
                            <button className="deleteBtn"><MdDeleteOutline /></button>
                        </Popconfirm>
                    </Space>
                </>
            ),
        },
    ];

    // Payroll Payroll category access FORM DATA DELETE API CALL =========================== 
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/payrollCategories/DeletePayrollCategories`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Payroll_Category_code": id,
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
                    GetPayrollCateryAccess({
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
            GetPayrollCateryAccess({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            GetPayrollCateryAccess({
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
                                    <h4 className="text-dark">Payroll Category Access</h4>
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
                                        columns={columns} loading={Red_PayrollCategoryAccess?.loading}
                                        dataSource={Red_PayrollCategoryAccess?.data?.[0]?.res?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: Red_PayrollCategoryAccess?.data?.[0]?.res?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
                                    />
                                </>
                            )}
                            {mode == "create" && (
                                <PayrollCategoryAccessForm cancel={setMode} mode={mode} isCode={null} page={page} />
                            )}
                            {mode == "Edit" && (
                                <PayrollCategoryAccessForm cancel={setMode} mode={mode} isCode={isCode} page={page} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_PayrollCategoryAccess }) {
    return { Red_PayrollCategoryAccess };
}
export default connect(mapStateToProps, PayrollCategoryAccessActions)(PayrollCategoryAccess) 