import React, { useEffect, useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import DivisionForm from './form/DivisionForm';
import * as DIVISION_ACTIONS from "../store/actions/HrOperations/Divisions/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
import './assets/css/DivisionList.css'



const Divisions = ({ Red_Division, GetDivisionData }) => {
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
      title: 'Division Code',
      dataIndex: 'Div_code',
      key: 'Div_code',
    },
    {
      title: 'Division Name',
      dataIndex: 'Div_name',
      key: 'Div_name',
    },
    {
      title: 'Division Head',
      dataIndex: 'Div_Head',
      key: 'Div_Head',
    },
    {
      title: 'Short Key',
      dataIndex: 'Sort_key',
      key: 'Sort_key',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <button onClick={() => EditPage('Edit', data?.Div_code)} className="editBtn">
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Division"
            description="Are you sure to delete the Division?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Div_code)
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

  // DIVISION FORM DATA DELETE API CALL ===========================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/division/DeleteDivision`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Div_code": id,
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
          GetDivisionData({
            pageSize: pageSize,
            pageNo: page,
            search: null
          })
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
        content: error?.message || error?.messsage,
      });
    });
  }

  useEffect(() => {
    if(isSearchVal == ''){
      GetDivisionData({ 
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    }else{
      GetDivisionData({ 
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page,isSearchVal])

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
                <div className="DivisionsFlexBox">
                  <h4 className="text-dark">Division List</h4>
                  <div className="DivisionssearchBox">
                    <Input placeholder={'Search Here...'} type="search" 
                      onChange={(e) => {setSearchVal(e.target.value)}}
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
                  loading={Red_Division?.loading}
                  dataSource={Red_Division?.data?.[0]?.res?.data1} 
                  scroll={{ x: 10 }} 
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Division?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <DivisionForm cancel={setMode} mode={mode} isCode={null} page={page}/>
              )}
              {mode == "Edit" && (
                <DivisionForm cancel={setMode} mode={mode} isCode={isCode} page={page}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Division }) {
  return { Red_Division };
}
export default connect(mapStateToProps, DIVISION_ACTIONS)(Divisions)