import React, { useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import {Button} from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import DesignationForm from "./form/DesignationForm";
import "./assets/css/DesignationsList.css";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const HR_Designations = () => {
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
            title: 'Department',
            dataIndex: 'Department',
            key: 'Department',
        },
        {
            title: 'Short Key',
            dataIndex: 'Short Key',
            key: 'Short Key',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Desig_code)} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Designation"
                        description="Are you sure to delete the Designation?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.Desig_code)
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
                                <div className="DesignationsFlexBox">
                                    <h4 className="text-dark">Designation List</h4>
                                    <div className="DesignationssearchBox">
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
                                <DesignationForm cancel={setMode} />
                            )}
                            {mode == "Edit" && (
                                <DesignationForm cancel={setMode} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default HR_Designations;
