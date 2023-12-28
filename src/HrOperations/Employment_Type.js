import React, { useEffect, useState } from 'react'
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



const Employment_Type = ({Red_Employee_type,GetEmployeeTypeData}) => {
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
      title: 'Code',
      dataIndex: 'Empt_Type_code',
      key: 'Empt_Type_code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'Empt_Type_name',
      key: 'Empt_Type_name',
    },
    {
      title: 'Abbreviation',
      dataIndex: 'Empt_Type_abbr',
      key: 'Empt_Type_abbr',
    },
    {
      title: 'Probation Months',
      dataIndex: 'ProbationMonths',
      key: 'ProbationMonths',
    },
    {
      title: 'Retirement Age',
      dataIndex: 'Retirement_Age',
      key: 'Retirement_Age',
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
          <button onClick={() => EditPage('Edit',data?.Empt_Type_code)} className="editBtn">
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Employee Type"
            description="Are you sure to delete the Employee Type?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Empt_Type_code)
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
      GetEmployeeTypeData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetEmployeeTypeData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

  // EMPLOYEE TYPE DATA DELETE API CALL ===========================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/employment_type_code/DeleteEmploymentType`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Empt_Type_code": id,
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
          GetEmployeeTypeData({
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
                <div className="EmployeeTypeFlexBox">
                  <h4 className="text-dark">Employee  Type</h4>
                  <div className="EmployeeTypesearchBox">
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
                    loading={Red_Employee_type?.loading}
                    dataSource={Red_Employee_type?.data?.[0]?.res?.data1}
                    scroll={{ x: 10 }}
                    pagination={{
                      defaultCurrent: page,
                      total: Red_Employee_type?.data?.[0]?.res?.data3,
                      onChange: (p) => {
                        setPage(p);
                      },
                      pageSize: pageSize,
                    }}
                />
              )}
              {mode == "create" && (
                <EmployeeTypeForm cancel={setMode} mode={mode} isCode={null} page={page}/>
              )}
              {mode == "Edit" && (
                <EmployeeTypeForm cancel={setMode} mode={mode} isCode={isCode} page={page}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Employee_type }) {
  return { Red_Employee_type };
}
export default connect(mapStateToProps, EMPLOYEE_TYPE_ACTIONS)(Employment_Type)