import React, { useState,useEffect } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import GradeForm from './form/GradeForm';
import './assets/css/GradeList.css'
import * as GRADES_ACTIONS from "../store/actions/HrOperations/Grades/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';


const Grade = ({GetGradesData, Red_Grades}) => {
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
      title: 'Grade Code',
      dataIndex: 'Grade_code',
      key: 'Grade_code',
    },
    {
      title: 'Name',
      dataIndex: 'Grade_name',
      key: 'Grade_name',
    },
    {
      title: 'Grade Abbr',
      dataIndex: 'Grade_abbr',
      key: 'Grade_abbr',
    },
    {
      title: 'Probation Months',
      dataIndex: 'Probation_Months',
      key: 'Probation_Months',
    },
    {
      title: 'Incentive Rate',
      dataIndex: 'Incentive_Hour_Rate',
      key: 'Incentive_Hour_Rate',
    },
    {
      title: 'Incentive Weekdays (Hours)',
      dataIndex: 'Incentive_Weekdays_Limit_Hour',
      key: 'Incentive_Weekdays_Limit_Hour',
    },
    {
      title: 'Incentive Saturday (Hours)',
      dataIndex: 'Incentive_Saturday_Limit_Hour',
      key: 'Incentive_Saturday_Limit_Hour',
    },
    {
      title: 'Medical Insurance Amount',
      dataIndex: 'Medical_Insurance_Amount',
      key: 'Medical_Insurance_Amount',
    },
    {
      title: 'Division Head',
      dataIndex: 'Division Head',
      key: 'Division Head',
      title: 'Meal Deduction Amount',
      dataIndex: 'Meal_Deduction',
      key: 'Meal_Deduction',
    },
    {
      title: 'Short Key',
      dataIndex: 'Short Key',
      key: 'Short Key',
      title: 'Petrol',
      dataIndex: 'Litres_for_Petrol',
      key: 'Litres_for_Petrol',
    },
    {
      title: 'Next Promotion Grade',
      dataIndex: 'next_promotion_grade',
      key: 'next_promotion_grade',
    },
    {
      title: 'Next Promotion Criteria',
      dataIndex: 'Assigning_Critaria_For_Next_Promotion',
      key: 'Assigning_Critaria_For_Next_Promotion',
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
          <button onClick={() => EditPage('Edit', data?.Grade_code)} className="editBtn"><FaEdit /></button>
          <Popconfirm
            title="Delete the Cost Grade"
            description="Are you sure to delete the Grade?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Grade_code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isSearchVal == '') {
      GetGradesData({
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
    } else {
      GetGradesData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
  }, [page, isSearchVal])

  // GRADES DATA DELETE API CALL ===========================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/grade_code/DeleteGrade`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Grade_code": id,
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
          GetGradesData({
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
      }
    }).catch((error) => {
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
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
                <div className="GradeFlexBox">
                  <h4 className="text-dark">Grade</h4>
                  <div className="GradesearchBox">
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
                <Table
                  columns={columns}
                  scroll={{ x: 10 }}
                  loading={Red_Grades?.loading}
                  dataSource={Red_Grades?.data?.[0]?.res?.data1}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Grades?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
              />
              )}
              {mode == "create" && (
                <GradeForm cancel={setMode}  mode={mode} isCode={null} page={page}/>
              )}
              {mode == "Edit" && (
                <GradeForm cancel={setMode}  mode={mode} isCode={isCode} page={page}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Grades }) {
  return { Red_Grades };
}
export default connect(mapStateToProps, GRADES_ACTIONS)(Grade)