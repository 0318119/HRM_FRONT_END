import React, { useEffect, useState } from "react";
import Header from '../../../../components/Includes/Header';
import Input from "../../../../components/basic/input";
import { Button } from "../../../../components/basic/button";
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import Bankform from "../../../../payroll/form/transactionPosting/Setup/BankForm";
import * as BankActions from "../../../../store/actions/payroll/bank/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../../../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const Bank = ({ Red_Bank, GetBank }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState('')



  const EditPage = (mode, code) => {
    setCode(code)
    setMode(mode)
  }




  const columns = [
    {
      title: 'Bank Code',
      dataIndex: 'Bank_code',
      key: 'Bank_code',
    },
    {
      title: 'Bank Name',
      dataIndex: 'Bank_name',
      key: 'Bank_name',
    },
    {
      title: 'Bank Abbreviation',
      dataIndex: 'Bank_abbr',
      key: 'Bank_abbr',
    },

    {
      title: 'Sort Key',
      dataIndex: 'Sort_key',
      key: 'Sort_key',
    },
    {
      title: 'Bank Address 1',
      dataIndex: 'Bank_Address1',
      key: 'Bank_Address1',
    },
    {
      title: 'Bank Address 2',
      dataIndex: 'Bank_Address2',
      key: 'Bank_Address2',
    },
    {
      title: 'Bank Address 3',
      dataIndex: 'Bank_Address3',
      key: 'Bank_Address3',
    },
    {
      title: 'Current Account',
      dataIndex: 'Current_Account',
      key: 'Current_Account',
    },
    {
      title: 'IMD Code',
      dataIndex: 'Current_Account',
      key: 'Current_Account',
    },
    {
      title: 'Swift',
      dataIndex: 'Swift',
      key: 'Swift',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <>
          <Space size="middle">
            <button onClick={() => EditPage('Edit', data?.Bank_code)} className="editBtn"><FaEdit /></button>
            <Popconfirm
              title="Delete the Bank"
              description="Are you sure to delete the Bank?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                handleConfirmDelete(data?.Bank_code)
              }}
            >
              <button className="deleteBtn"><MdDeleteOutline /></button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  // Payroll Bank FORM DATA DELETE API CALL =========================== 
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/deletebank/DeleteBank`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Bank_code": id,
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
          GetBank({
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
        setTimeout(() => {
          messageApi.destroy()
        }, 3000);
      }
    }).catch((error) => {
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
      setTimeout(() => {
        messageApi.destroy()
      }, 3000);
    });
  }


  useEffect(() => {
    if (isSearchVal == '') {
      GetBank({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetBank({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

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
                  <h4 className="text-dark">Bank</h4>
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
                    columns={columns} loading={Red_Bank?.loading}
                    dataSource={Red_Bank?.data?.[0]?.res?.data1}
                    scroll={{ x: 10 }}
                    pagination={{
                      defaultCurrent: page,
                      total: Red_Bank?.data?.[0]?.res?.data3,
                      onChange: (p) => {
                        setPage(p);
                      },
                      pageSize: pageSize,
                    }}
                  />
                </>
              )}
              {mode == "create" && (
                <Bankform cancel={setMode} mode={mode} isCode={null} page={page} />
              )}
              {mode == "Edit" && (
                <Bankform cancel={setMode} mode={mode} isCode={isCode} page={page} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Bank }) {
  return { Red_Bank };
}
export default connect(mapStateToProps, BankActions)(Bank) 