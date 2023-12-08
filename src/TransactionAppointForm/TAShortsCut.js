import React, { useEffect, useState } from "react";
import "./assets/css/TAShortsCut.css";
import Header from "../components/Includes/Header";
import { Link, useNavigate } from "react-router-dom";
import { BsPlus as Plus_ico } from 'react-icons/bs'
import { RxDashboard as RxDashboard_ico } from 'react-icons/rx'
import { Space, Table, Pagination, Tag, Tooltip } from 'antd';
import { FaListAlt } from "react-icons/fa";
import { RiFileListFill } from "react-icons/ri";
import { message } from 'antd';
const config = require('../config.json')



function TAShortsCut() {
  const [isTaskData, setTaskData] = useState([])
  const [isLoading, setLoading] = useState(false)

  async function GetTask() {
    setLoading(true)
    await fetch(`${config['baseUrl']}/dashboard/TasksDashboard`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${localStorage.getItem("access_token")}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response?.success) {
        setLoading(false)
        setTaskData(response.data[0])
      }
      else {
        setLoading(false)
        message.error(response?.message || response?.messsage)
      }
    }).catch((error) => {
      setLoading(false)
      message.error(error?.message || error?.messsage)
    })
  }

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'TaskName',
      key: 'TaskName',
    },
    {
      title: 'Application',
      dataIndex: 'ApplicationName',
      key: 'ApplicationName',
    },
    {
      title: 'Emp Code',
      dataIndex: 'Emp_Code',
      key: 'Emp_Code',
    },
    {
      title: 'Created Date',
      dataIndex: 'Created_Date',
      key: 'Created_Date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <Link to={`/LeaveSummary?userId=${data.Tran_Code}`} target="_blank" 
            style={{ color: "white",background: "#014F86",borderRadius: "5px",padding: "8px 20px" }}>View
          </Link>
        </Space>
      ),
    }
  ];

  useEffect(() => {
    GetTask()
  }, [])
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container maringClass tranAppointBgColor mb-5">
        <div className="row">
          <div className="col-md-6 p-0"><h5 className="text-dark"><b>Dashboard</b></h5></div>
          {
            localStorage.getItem("User_Type") == 2 ?
            <div className="col-md-6 d-flex justify-content-end align-item-center">
              <Link to="/payroll/report/attendanceReport" className="text-dark" style={{
                    background: "rgb(229 221 221)",
                    padding: "6px 6px",
                    borderRadius: "4px",
                    fontSize: "14px",
              }}><b>Attendance excel report</b></Link>
            </div> : null
          }
          
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-lg-3 mt-5">
            <Link to={'/Dashboard'} className="dashBoxes">
                <RxDashboard_ico />
                <span>Attendance</span>
            </Link>
          </div>
          <div className="col-lg-3 mt-5">
            <Link to="/Leave_Applications" className="dashBoxes">
              <Plus_ico />
              <span>Leave</span>
            </Link>
          </div>
          {/* <div className="col-lg-3 mt-5">
            <Link to="/payroll/report/taxReport" className="dashBoxes">
              <FaListAlt />
              <span>Tax Slip</span>
            </Link>
          </div> */}
          {/* <div className="col-lg-3 mt-5">
            <Link to="/Pay/PaySlip" className="dashBoxes">
              <RiFileListFill />
              <span>Pay Slip</span>
            </Link>
          </div> */}
        </div>
        <hr />
        <div className="row mt-5"><h5 className="text-dark"><b>Leave Applications</b></h5></div>
        <div className="row">
          <div className="col-lg-12">
            <div>
                <Table 
                  columns={columns} 
                  loading={isLoading}
                  dataSource={isTaskData}
                  scroll={{ x: 10 }}
                  pagination={false}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TAShortsCut;
