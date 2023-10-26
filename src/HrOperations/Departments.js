import React, { useEffect, useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import DepartmentForm from './form/DepartmentForm';
import * as DEPARTMENT_ACTIONS from "../store/actions/HrOperations/Departments/index"
import './assets/css/DepartmentList.css'
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { message } from 'antd';

const Departments = ({ Red_Department, GetDataDepartment }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }

    const columns = [
        {
            title: 'Code',
            dataIndex: 'Dept_code',
            key: 'Dept_code',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Deprt Name',
            dataIndex: 'Dept_name',
            key: 'Dept_name',
        },
        {
            title: 'Division Name',
            dataIndex: 'Div_code',
            key: 'Div_code',
        },
        {
            title: 'Department Head',
            dataIndex: 'Dept_Head',
            key: 'Dept_Head',
        },
        {
            title: 'Payment Budget',
            dataIndex: 'Permanent_Budget',
            key: 'Permanent_Budget',
        },
        {
            title: 'Temporary Budget',
            dataIndex: 'Temporary_Budget',
            key: 'Temporary_Budget',
        },
        {
            title: 'Sort key',
            dataIndex: 'Sort_key',
            key: 'Sort_key',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Dept_code)} className="editBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the Department"
                        description="Are you sure to delete the Department?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.Dept_code)
                        }}
                    >
                        <button className="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        GetDataDepartment()
    }, [])

    // DEPARTMENTS FORM DATA DELETE API CALL ===========================
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/department/DeleteDepartmentList`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Dept_code": id,
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
                    GetDataDepartment()
                }, 5000);
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
                content: error?.message || error?.message,
            });
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
                                <div className="DepartmentsFlexBox">
                                    <h4 className="text-dark">Departments List</h4>
                                    <div className="DepartmentssearchBox">
                                        <Input placeholder={'Search Here...'} type="search" />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}
                        <div>
                            {mode == "read" && (
                                <Table columns={columns} loading={Red_Department?.loading} dataSource={Red_Department?.data?.[0]?.res?.data?.[0]} scroll={{ x: 10 }} />
                            )}
                            {mode == "create" && (
                                <DepartmentForm cancel={setMode} mode={mode} isCode={null} />
                            )}
                            {mode == "Edit" && (
                                <DepartmentForm cancel={setMode} isCode={isCode} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ Red_Department }) {
    return { Red_Department };
}
export default connect(mapStateToProps, DEPARTMENT_ACTIONS)(Departments)