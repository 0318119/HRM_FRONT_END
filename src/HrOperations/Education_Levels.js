import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import EducationLevelForm from './form/EducationLevelForm';
import './assets/css/EducationLevelList.css'
<<<<<<< HEAD
import * as EDUCATION_LEVEL_ACTIONS from "../store/actions/HrOperations/Education_level/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
import { useEffect } from 'react';
=======
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a



const Education_Levels = () => {
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
<<<<<<< HEAD
          <button onClick={() => EditPage('Edit',data?.Edu_level_code)} className="editBtn">
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Education Level"
            description="Are you sure to delete the Education Level?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Edu_level_code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm>
=======
          <button onClick={() => setMode('Edit')} className="editBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button className="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a
        </Space>
      ),
    },
  ];

<<<<<<< HEAD
  useEffect(() => {
    if(isSearchVal == ''){
      GetEducationLevelData({ 
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    }else{
      GetEducationLevelData({ 
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page,isSearchVal])

  // EDUCATION LEVEL DATA DELETE API CALL ===========================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/educationlevel/DeleteEducationLevel`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Edu_level_code": id,
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
          GetEducationLevelData({
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


=======
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      Abbreviation: 'New York No. 1 Lake Park',
    },
  ];
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a
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
                <div className="EducationLevelListFlexBox">
                  <h4 className="text-dark">Education Level List</h4>
                  <div className="EducationLevelListsearchBox"EducationLevelListsearchBox>
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
                <EducationLevelForm cancel={setMode} />
              )}
              {mode == "Edit" && (
                <EducationLevelForm cancel={setMode} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Education_Levels