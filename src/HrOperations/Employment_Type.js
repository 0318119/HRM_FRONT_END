import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import EmployeeTypeForm from './form/EmployeeTypeForm';
import './assets/css/EmployeeTypeList.css'
import * as EMPLOYEE_TYPE_ACTIONS from "../store/actions/HrOperations/EmployeeType/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const Employment_Type = () => {
  const [mode, setMode] = useState('read')

  const columns = [
    {
      title: 'Division Code',
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
      title: 'Division Head',
      dataIndex: 'Division Head',
      key: 'Division Head',
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
          <button onClick={() => EditPage('Edit',data?.Empt_Type_code)} className="editBtn">
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Employee Type"
            description="Are you sure to delete the Employee Type?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              // handleConfirmDelete(data?.Empt_Type_code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
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
                <div className="EmployeeTypeFlexBox">
                  <h4 className="text-dark">Employee  Type</h4>
                  <div className="EmployeeTypesearchBox">
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
                <EmployeeTypeForm cancel={setMode} />
              )}
              {mode == "Edit" && (
                <EmployeeTypeForm cancel={setMode} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Employment_Type