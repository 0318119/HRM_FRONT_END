import React, { useEffect, useState } from "react";
import "../assets/css/tables.css";
import { Space, Table, Tag, Tooltip } from 'antd';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'
import { Tabs } from 'antd';

const RequestTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isGetMyRequest, setGetMyRequest] = useState([])
  const [isGetMyApprovalsRequest, setGetMyApprovalsRequest] = useState([])

  const [isLoading, setLoading] = useState({
    myReqLoad: false,
    myApprovalLaod: false,
  })

  async function getMyRequestOfLeave() {
    setLoading({
      myReqLoad: true,
    })
    await fetch(
      `${baseUrl.baseUrl}/MyApplication/GetMyLeaveApplications`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setLoading({
          myReqLoad: false,
        })
        setGetMyRequest(response?.data?.[0])
      }
      else {
        setLoading({
          myReqLoad: false,
        })
        messageApi.open({
          type: 'error',
          content: response?.message || response?.messsage,
        });
      }
    }).catch((error) => {
      setLoading({
        myReqLoad: false,
      })
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
    });
  }
  async function getMyRequestOfLeaveApprovals() {
    setLoading({
      myApprovalLaod: true,
    })
    await fetch(
      `${baseUrl.baseUrl}/leaves/GetEssApproval`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setLoading({
          myApprovalLaod: false,
        })
        setGetMyApprovalsRequest(response?.data?.[0])
      }
      else {
        setLoading({
          myApprovalLaod: false,
        })
        messageApi.open({
          type: 'error',
          content: response?.message || response?.messsage,
        });
      }
    }).catch((error) => {
      setLoading({
        myApprovalLaod: false,
      })
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
    });
  }

  useEffect(() => {
    getMyRequestOfLeave()
    getMyRequestOfLeaveApprovals()
  }, [])


  const MyReq = [
    {
      title: 'Name',
      dataIndex: 'Emp_name',
      key: 'Emp_name',
    },
    {
      title: 'Leave name',
      dataIndex: 'Leave_name',
      key: 'Leave_name',
    },
    {
      title : "Leave Days",
      dataIndex: 'LeaveDays',
      key: 'LeaveDays',
    },
    {
      title: 'Pending With',
      dataIndex: 'PendingWith',
      key: 'PendingWith',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Posting Date',
      dataIndex: 'Posting_date',
      key: 'Posting_date',
    },
    {
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: 'End Date',
      dataIndex: 'EndDate',
      key: 'EndDate',
    },
  ];

  const MyReqAppovals = [
    {
      title: 'Name',
      dataIndex: 'EmployeeName',
      key: 'EmployeeName',
    },
    {
      title: 'Leave name',
      dataIndex: 'Leave_name',
      key: 'Leave_name',
    },
    {
      title : "Leave Days",
      dataIndex: 'LeaveDays',
      key: 'LeaveDays',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Reason',
      dataIndex: 'Reason',
      key: 'Reason',
    },
    {
      title: 'Posting Date',
      dataIndex: 'Posting_date',
      key: 'Posting_date',
    },
    {
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: 'End Date',
      dataIndex: 'EndDate',
      key: 'EndDate',
    },
  ];

  const items = [
    {
      key: '1',
      label: 'My Request',
      children: <div className="">
        <h5 className="text-dark mb-2 text-uppercase">My Leave Request</h5>
        <Table
          columns={MyReq}
          loading={isLoading?.myReqLoad}
          pagination={false}
          dataSource={isGetMyRequest?isGetMyRequest : ""}
          scroll={{ x: 10, y: 300 }}
        />
      </div>,
    },
    {
      key: '2',
      label: 'My Approvals',
      children: <div className="">
        <h5 className="text-dark mb-2 text-uppercase">My Leaves Approvals</h5>
        <Table
          columns={MyReqAppovals}
          loading={isLoading?.myApprovalLaod}
          pagination={false}
          dataSource={isGetMyApprovalsRequest ? isGetMyApprovalsRequest : ""}
          scroll={{ x: 10, y: 300 }}
        />
      </div>,
    },
  ];


  console.log("first",isGetMyRequest)

  return (
    <>
      {contextHolder}
      <div className="border p-3 rounded bgTables">
        {/* <Tabs
          defaultActiveKey="1"
          items={items}
          indicatorSize={(origin) => origin - 16}
        /> */}
      </div>
    </>
  );
};

export default RequestTable;