import React, { useEffect, useState } from "react";
import "../assets/css/tables.css";
import { Space, Table, Tag, Tooltip } from 'antd';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function AttendanceWeekly() {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isAttendanceWeekly, setAttendanceWeekly] = useState([])
  const [isLoading, setLoading] = useState(false)


  async function GetData() {
    setLoading(true)
    await fetch(
      `${baseUrl.baseUrl}/dashboard/WeeklyAttendanceSummary`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setLoading(false)
        setAttendanceWeekly(response?.data)
      }
      else {
        setLoading(false)
        messageApi.open({
          type: 'error',
          content: response?.message || response?.messsage,
        });
      }
    }).catch((error) => {
      setLoading(false)
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
    });
  }

  useEffect(() => {
    GetData()
  }, [])


  const columns = [
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


  return (
    <>
      {contextHolder}
      <div className="border p-3 rounded bgTables">
        <h5 className="text-dark mb-2 text-uppercase">Attendance</h5>
        <Table
          columns={columns}
          loading={isLoading}
          pagination={false}
          dataSource={isAttendanceWeekly?isAttendanceWeekly : ""}
          scroll={{ x: 10, y: 385 }}
        />
      </div>
    </>
  );
}

export default AttendanceWeekly;
