import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import EducationForm from './form/EducationForm';
import './assets/css/EducationList.css'
<<<<<<< HEAD
import * as EDUCATION_ACTIONS from "../store/actions/HrOperations/Education/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
=======
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a



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
<<<<<<< HEAD
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
      GetEducationData({ 
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    }else{
      GetEducationData({ 
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page,isSearchVal])

  // EDUCATION DATA DELETE API CALL ===========================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/eduation_code/DeleteEducation`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Edu_code": id,
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
          GetEducationData({ 
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
<<<<<<< HEAD
                <Table columns={columns}
                  dataSource={Red_Education?.data?.[0]?.res?.data1}
                  loading={Red_Education?.loading}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Education?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
=======
                <Table columns={columns} dataSource={data} scroll={{ x: 10 }} />
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a
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