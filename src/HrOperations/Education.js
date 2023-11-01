import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import EducationForm from './form/EducationForm';
import './assets/css/EducationList.css'
import * as EDUCATION_ACTIONS from "../store/actions/HrOperations/Education/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';



const Education = () => {
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
          <button onClick={() => EditPage('Edit', data?.Edu_code)} className="editBtn">
             <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Education"
            description="Are you sure to delete the Education?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Edu_code)
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
                <div className="EdcuationFlexBox">
                  <h4 className="text-dark">Education List</h4>
                  <div className="EducationsearchBox">
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
                <EducationForm cancel={setMode} />
              )}
              {mode == "Edit" && (
                <EducationForm cancel={setMode} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Education