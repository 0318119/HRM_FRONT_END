import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import "./assets/css/CostList.css";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import CostCenterForm from "./form/CostCenterForm";
import * as COST_CENTRE_ACTIONS from "../store/actions/HrOperations/Cost_Centre/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const CostCentersList = ({ Red_Cost_centre, GetCostCentreData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState('')

  useEffect(() => {
    if (isSearchVal == '') {
      GetCostCentreData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetCostCentreData({
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
      dataIndex: 'Cost_Centre_code',
      key: 'Cost_Centre_code',
    },
    {
      title: 'Name',
      dataIndex: 'Cost_Centre_name',
      key: 'Cost_Centre_name',
    },
    {
      title: 'Abbreviation',
      dataIndex: 'Cost_Centre_abbr',
      key: 'Cost_Centre_abbr',
    },
    {
      title: 'Training Cost Budget',
      dataIndex: 'Train_Cost_Budget',
      key: 'Train_Cost_Budget',
    },
    {
      title: 'Training Actual Cost',
      dataIndex: 'Train_Cost_Actual',
      key: 'Train_Cost_Actual',
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
          <button onClick={() => EditPage('Edit', data?.Cost_Centre_code)} className="editBtn"><FaEdit /></button>
          <Popconfirm
            title="Delete the Cost Centre"
            description="Are you sure to delete the Cost Centre?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Cost_Centre_code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // COST CENTRE FORM DATA DELETE API CALL =========================== 
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/employment_cost_center/DeleteCostCenter`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Cost_Centre_code": id,
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
          GetCostCentreData({
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
                <div className="coslistFlexBox">
                  <h4 className="text-dark">Cost Centers List</h4>
                  <div className="costCentersearchBox">
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
                <>
                  <Table
                    columns={columns} loading={Red_Cost_centre?.loading}
                    dataSource={Red_Cost_centre?.data?.[0]?.res?.data1}
                    scroll={{ x: 10 }}
                    pagination={{
                      defaultCurrent: page,
                      total: Red_Cost_centre?.data?.[0]?.res?.data3,
                      onChange: (p) => {
                        setPage(p);
                      },
                      pageSize: pageSize,
                    }}
                  />
                </>
              )}
              {mode == "create" && (
                <CostCenterForm cancel={setMode} mode={mode} isCode={null} page={page} />
              )}
              {mode == "Edit" && (
                <CostCenterForm cancel={setMode} isCode={isCode} page={page} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Cost_centre }) {
  return { Red_Cost_centre };
}
export default connect(mapStateToProps, COST_CENTRE_ACTIONS)(CostCentersList) 