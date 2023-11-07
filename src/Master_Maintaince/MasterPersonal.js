import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import "./assets/css/Master_Personal.css";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import * as MasterPersonal_ACTIONS from "../store/actions/HrOperations/Institution/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';

import baseUrl from '../../src/config.json'


const MasterPersonal = ({ Red_Master_Personel, GetMasterPersonelData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState('')

  useEffect(() => {
    if (isSearchVal == '') {
      GetMasterPersonelData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetMasterPersonelData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })

     
    }
  }, [page, isSearchVal])

  console.log("Red_Master_Personel table page", Red_Master_Personel?.data?.[0]?.res?.data1);

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
          <button className="editBtn"><FaEdit /></button>
          {/* <Popconfirm
            title="Delete the Cost Centre"
            description="Are you sure to delete the Cost Centre?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Cost_Centre_code)
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
                    <Button title="Search" onClick={() => setMode("create")} />
                  </div>
                </div>
                <hr />
              </>
            )}

            <div>
              {mode == "read" && (
                <>
                  <Table 
                    columns={columns} loading={Red_Master_Personel?.loading}
                    dataSource={Red_Master_Personel?.data?.[0]?.res?.data1}
                    // dataSource={columns}
                    scroll={{ x: 10 }}
                    pagination={{
                      defaultCurrent: page,
                      total: Red_Master_Personel?.data?.[0]?.res?.data3,
                      onChange: (p) => {
                        setPage(p);
                      },
                      pageSize: pageSize,
                    }}
                  />
                </>
              )}
              {mode == "create" && (
                {/* <CostCenterForm cancel={setMode} mode={mode} isCode={null} page={page}/> */}
              )}
              {mode == "Edit" && (
                {/* <CostCenterForm cancel={setMode} isCode={isCode} page={page}/>  */}
              )}
            </div>
          </div>
        </div>
      </div>
        </>
    );
};
function mapStateToProps({ Red_Master_Personel }) {
  return { Red_Master_Personel };
}


export default connect(mapStateToProps, MasterPersonal_ACTIONS)(MasterPersonal);