import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import "./assets/css/Master_Personal.css";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as MASTER_PERSONAL from "../store/actions/MasterMaintaince/MasterPersonal/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import MasterPersonalForm from './form/MasterPersonalForm'
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
import baseUrl from '../config.json'

const Employee_Master = ({ GetMasterPersonalData, Red_Master_Personal }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState('')


  useEffect(() => {
    if (isSearchVal == '') {
      GetMasterPersonalData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetMasterPersonalData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

  const EditPage = (mode, code) => {
    setCode(code)
    setMode(mode)
  }


  const columns = [
    {
      title: 'Code',
      dataIndex: 'Emp_code',
      key: 'Emp_code',
    },
    {
      title: 'Name',
      dataIndex: 'Emp_name',
      key: 'Emp_name',
    },

    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <button onClick={() => EditPage('Edit', data?.Emp_code)} className="editBtn"><FaEdit /></button>
          {/* <Popconfirm
            title="Delete Employee"
            description="Are you sure to delete the Employee?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              // handleConfirmDelete(data?.Emp_code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

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
                <div className="MasterPersonalFlexBox">
                  <h4 className="text-dark">Master-Personal</h4>
                  <div className="MasterPersonalsearchBox">
                    <Input placeholder={'Search Here...'} type="search"
                      onChange={(e) => { setSearchVal(e.target.value) }}
                    />
                    {/* <Button title="Create" onClick={() => setMode("create")} /> */}
                  </div>
                </div>
                <hr />
              </>
            )}

            <div>
              {mode == "read" && (
                <>
                  <Table
                    columns={columns} loading={Red_Master_Personal?.loading}
                    dataSource={Red_Master_Personal?.data[0]?.res?.data1}
                    scroll={{ x: 10 }}
                    pagination={{
                      defaultCurrent: page,
                      total: Red_Master_Personal?.data?.[0]?.res?.data3,
                      onChange: (p) => {
                        setPage(p);
                      },
                      pageSize: pageSize,
                    }}
                  />
                </>
              )}
              {mode == "create" && (
                <MasterPersonalForm cancel={setMode} mode={mode} isCode={null} page={page} />
              )}
              {mode == "Edit" && (
                <MasterPersonalForm cancel={setMode} mode={mode} isCode={isCode} page={page} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
function mapStateToProps({ Red_Master_Personal }) {
  return { Red_Master_Personal };

}

export default connect(mapStateToProps, MASTER_PERSONAL)(Employee_Master);
