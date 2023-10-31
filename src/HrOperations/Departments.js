import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import {Button} from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import DepartmentForm from './form/DepartmentForm';
import './assets/css/DepartmentList.css'
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';

const Departments = () => {
    const [mode, setMode] = useState('read')
    const columns = [
        {
            title: 'Code',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Division Name',
            dataIndex: 'Division Name',
            key: 'Division Name',
        },
        {
            title: 'Department Head',
            dataIndex: 'Department Head',
            key: 'Department Head',
        },
        {
            title: 'Payment Budget',
            dataIndex: 'Payment Budget',
            key: 'Payment Budget',
        },
        {
            title: 'Temporary Budget',
            dataIndex: 'Temporary Budget',
            key: 'Department',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Dept_code)} className="editBtn">
                     <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Department"
                        description="Are you sure to delete the Department?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.Dept_code)
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

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            Abbreviation: 'New York No. 1 Lake Park',
        },
    ];
    return (
        <>
            <div>
                <Header />
            </div>
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
                                <Table columns={columns} dataSource={data} scroll={{ x: 10 }} />
                            )}
                            {mode == "create" && (
                                <DepartmentForm cancel={setMode} />
                            )}
                            {mode == "Edit" && (
                                <DepartmentForm cancel={setMode} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Departments