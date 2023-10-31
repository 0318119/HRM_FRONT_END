import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import EmployeeTypeForm from './form/EmployeeTypeForm';
import './assets/css/EmployeeTypeList.css'
<<<<<<< HEAD
import * as EMPLOYEE_TYPE_ACTIONS from "../store/actions/HrOperations/EmployeeType/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const Employment_Type = ({ Red_Employee_type, GetEmployeeTypeData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCode, setCode] = useState(null)
=======



const Employment_Type = () => {
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a
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
      GetEmployeeTypeData({ 
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    }else{
      GetEmployeeTypeData({ 
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page,isSearchVal])


  // EDUCATION LEVEL DATA DELETE API CALL ===========================
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
                <div className="EmployeeTypeFlexBox">
                  <h4 className="text-dark">Employee  Type</h4>
                  <div className="EmployeeTypesearchBox">
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
<<<<<<< HEAD
                <Table columns={columns} 
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
=======
                <Table columns={columns} dataSource={data} scroll={{ x: 10 }} />
              )}
              {mode == "create" && (
                <EmployeeTypeForm cancel={setMode} />
              )}
              {mode == "Edit" && (
                <EmployeeTypeForm cancel={setMode} />
>>>>>>> 70b7a20aca351d1933179e5d28c7c83b1ed9087a
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Employment_Type