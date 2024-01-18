import React, { useEffect, useState } from "react";
import "../assets/css/tables.css";
import { Space, Table, Tag, Tooltip } from 'antd';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'


const AttendanceSmmy = () => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isSummry, setSummry] = useState([])
    const [isLoading, setLoading] = useState(false)
  
  
    async function getSummry() {
      setLoading(true)
      await fetch(
        `${baseUrl.baseUrl}/dashboard/LeaveBalancesDashboard`, {
        method: "GET",
        headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      }
      ).then((response) => {
        return response.json();
      }).then(async (response) => {
        if (response.success) {
            setLoading(false)
            setSummry(response?.data)
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
        getSummry()
    }, [])
  
  
    const columns = [
      {
        title: 'Name',
        dataIndex: 'Emp_name',
        key: 'Emp_name',
      },
      {
        title: 'Code',
        dataIndex: 'Emp_code',
        key: 'Emp_code',
      },
      {
        title: 'Leave',
        dataIndex: 'Leave_Balance_days',
        key: 'Leave_Balance_days',
      },
    ];

    return (
        <>
              {contextHolder}
                <div className="border p-3 rounded bgTables">
                    <div>
                      <h5 className="text-dark mb-2 text-uppercase">Leave Balance</h5>
                      <Table
                          columns={columns}
                          loading={isLoading}
                          pagination={false}
                          dataSource={isSummry?isSummry : ""}
                      />
                    </div>
                </div>
        </>
    );
};

export default AttendanceSmmy;
