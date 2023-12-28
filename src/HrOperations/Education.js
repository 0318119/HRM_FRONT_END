import React, { useState, useEffect } from 'react'
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



const Education = ({ Red_Education, GetEducationData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [isSearchVal, setSearchVal] = useState('')
  const EditPage = (mode, code) => {
    setCode(code)
    setMode(mode)
  }

  const columns = [
    {
      title: 'Education Code',
      dataIndex: 'Edu_code',
      key: 'Edu_code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Education Name',
      dataIndex: 'Edu_name',
      key: 'Edu_name',
    },
    {
      title: 'Education Abbreviation',
      dataIndex: 'Edu_abbr',
      key: 'Edu_abbr',
    },
    {
      title: 'Sort Key',
      dataIndex: 'Sort_key',
      key: 'Sort_key',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
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

  useEffect(() => {
    if (isSearchVal == '') {
      GetEducationData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetEducationData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

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
                <div className="EdcuationFlexBox">
                  <h4 className="text-dark">Education List</h4>
                  <div className="EducationsearchBox">
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
                <Table columns={columns}
                  loading={Red_Education?.loading}
                  dataSource={Red_Education?.data?.[0]?.res?.data1}
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
              )}
              {mode == "create" && (
                <EducationForm cancel={setMode} mode={mode} isCode={null} page={page}/>
              )}
              {mode == "Edit" && (
                <EducationForm cancel={setMode} mode={mode} isCode={isCode} page={page}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Education }) {
  return { Red_Education };
}
export default connect(mapStateToProps, EDUCATION_ACTIONS)(Education)