import React, { useState, useEffect } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import EmployeeCategoryForm from './form/EmployeeCategoryForm';
import './assets/css/EmployeeCategory.css'
import * as EMPLOYEE_CAT_ACTIONS from "../store/actions/HrOperations/EmployeeCat/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';


const Employee_Category = ({ Red_Employee_Cat, GetEmployeeCatData }) => {
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
      title: 'Emp Cat code',
      dataIndex: 'Emp_Category_code',
      key: 'Emp_Category_code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Emp Cat Name',
      dataIndex: 'Emp_Category_name',
      key: 'Emp_Category_name',
    },
    {
      title: 'Emp Cat Abbr',
      dataIndex: 'Emp_Category_abbr',
      key: 'Emp_Category_abbr',
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
          <button onClick={() => EditPage('Edit', data?.Emp_Category_code)} className="editBtn">
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Employee Category"
            description="Are you sure to delete the Employee Category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Emp_Category_code)
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
      GetEmployeeCatData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetEmployeeCatData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

  // COST CENTRE FORM DATA DELETE API CALL =========================== 
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/employment_category/DeleteEmploymentCategory`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Emp_Category_code": id,
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
          GetEmployeeCatData({
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
        setTimeout(() => {
          messageApi.destroy()
        }, 5000);
      }
    }).catch((error) => {
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
      setTimeout(() => {
        messageApi.destroy()
      }, 5000);
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
                <div className="EmployeeCategoryFlexBox">
                  <h4 className="text-dark">Employee Category</h4>
                  <div className="EmployeeCategorysearchBox">
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
                <Table 
                  columns={columns}
                  loading={Red_Employee_Cat?.loading}
                  dataSource={Red_Employee_Cat?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Employee_Cat?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <EmployeeCategoryForm cancel={setMode} mode={mode} isCode={null} page={page} />
              )}
              {mode == "Edit" && (
                <EmployeeCategoryForm cancel={setMode} mode={mode} isCode={isCode} page={page} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Employee_Cat }) {
  return { Red_Employee_Cat };
}
export default connect(mapStateToProps, EMPLOYEE_CAT_ACTIONS)(Employee_Category)