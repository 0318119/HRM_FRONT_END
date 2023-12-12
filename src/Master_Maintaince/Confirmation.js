import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import "./assets/css/TransactionConfirmation.css";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import ConfirmationForm from "./form/Confirmationform";
import * as ConfirmarionAction from "../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const Confirmation = ({ Red_Confirmation, Getconfirmation }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState('')
  

  useEffect(() => {
    if (isSearchVal == '') {
      Getconfirmation({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      Getconfirmation({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

  console.log(Red_Confirmation , "Red_Confirmation")

  const EditPage = (mode, code) => {
    setCode(code)
    setMode(mode)
  }


  const columns = [
    {
      title: 'Emp Code',
      dataIndex: 'Emp_code',
      key: 'Emp_code',
    },
    {
      title: 'Emp Name',
      dataIndex: 'Emp_name',
      key: 'Emp_name',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <button onClick={() => EditPage('Edit', data?.Emp_code)} className="editBtn"><FaEdit /></button>
          <Popconfirm
            title="Delete the Cost Centre"
            description="Are you sure to delete the Cost Centre?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Cost_Centre_code)
            }}
          >
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
          Getconfirmation({
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
                <div className="ConfirmationFlexBox">
                  <h4 className="text-dark">Confirmation</h4>
                  <div className="ConfirmationsearchBox">
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
                    columns={columns} loading={Red_Confirmation?.loading}
                    dataSource={Red_Confirmation?.data?.[0]?.res?.data1}
                    scroll={{ x: 10 }}
                    pagination={{
                      defaultCurrent: page,
                      total: Red_Confirmation?.data?.[0]?.res?.data3,
                      onChange: (p) => {
                        setPage(p);
                      },
                      pageSize: pageSize,
                    }}
                  />
                </>
              )}
              {mode == "create" && (
                <ConfirmationForm cancel={setMode} mode={mode} isCode={null} page={page}/>
              )}
              {mode == "Edit" && (
                <ConfirmationForm cancel={setMode} isCode={isCode} page={page}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Confirmation }) {
  return { Red_Confirmation };
}
export default connect(mapStateToProps, ConfirmarionAction)(Confirmation);