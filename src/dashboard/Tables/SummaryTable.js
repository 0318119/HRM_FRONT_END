import React, { useEffect, useState } from "react";
import "../assets/css/tables.css";
import { Space, Table, Tag, Tooltip } from 'antd';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'
import { Tabs } from 'antd';

const SummaryTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isMisEntry, setMisEntry] = useState([])
  const [isLoading, setLoading] = useState({
    missingEntry: false,
    absentEntry: false,
  })



  async function MisEntryData() {
    setLoading({
      missingEntry: true,
    })
    await fetch(
      `${baseUrl.baseUrl}/dashboard/MonthlyMissingAttendanceEntries`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setLoading({
          missingEntry: false,
        })
        setMisEntry(response?.data)
      }
      else {
        setLoading({
          missingEntry: false,
        })
        messageApi.open({
          type: 'error',
          content: response?.message || response?.messsage,
        });
      }
    }).catch((error) => {
      setLoading({
        missingEntry: false,
      })
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
    });
  }

  useEffect(() => {
    MisEntryData()
  }, [])


  const misEntrycolumns = [
    {
      title: 'Name',
      dataIndex: 'Emp_name',
      key: 'Emp_name',
    },
    {
      title: 'Code',
      dataIndex: 'Emp_Code',
      key: 'Emp_Code',
    },
    {
      title : "Day",
      dataIndex: 'Day',
      key: 'Day',
    },
    {
      title: 'Time In',
      dataIndex: 'Time_In',
      key: 'Time_In',
    },
    {
      title: 'Time Out',
      dataIndex: 'Time_Out',
      key: 'Time_Out',
    },
    {
      title: 'Date',
      dataIndex: 'Attendance_Date',
      key: 'Attendance_Date',
    },
  ];

  const items = [
    {
      key: '1',
      label: 'Missing Entry',
      children: <div className="">
        <h5 className="text-dark mb-2 text-uppercase">Missing Entry</h5>
        <Table
          columns={misEntrycolumns}
          loading={isLoading.missingEntry}
          pagination={false}
          dataSource={isMisEntry?isMisEntry : ""}
          scroll={{ x: 10, y: 300 }}
        />
      </div>,
    },
    {
      key: '2',
      label: 'Absent Entry',
      children: <div className="">
        <h5 className="text-dark mb-2 text-uppercase">Absent Entry</h5>
        <Table
          columns={misEntrycolumns}
          loading={0}
          pagination={false}
          dataSource={isMisEntry?isMisEntry : ""}
          scroll={{ x: 10, y: 300 }}
        />
      </div>,
    },
  ];



  return (
    <>
      {contextHolder}
      <div className="border p-3 rounded bgTables">
        <Tabs
          defaultActiveKey="1"
          items={items ? items : ""}
          indicatorSize={(origin) => origin - 16}
        />
      </div>
    </>
  );
};

export default SummaryTable;
