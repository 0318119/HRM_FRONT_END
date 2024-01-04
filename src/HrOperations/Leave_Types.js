import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import LeaveTypeForm from "./form/LeaveTypeForm";
import "./assets/css/LeaveTypeList.css";
import * as Leave_Type_ACTIONS from "../store/actions/HrOperations/LeaveType/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import baseUrl from "../../src/config.json";
import { message } from "antd";

const Leave_Types = ({ Red_Leave_Type, GetLeaveTypeData,DeleteFunLeaveType }) => {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (isSearchVal == "") {
      GetLeaveTypeData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetLeaveTypeData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal,
      });
    }
  }, [page, isSearchVal]);

  const EditPage = (mode, code) => {
    setCode(code);
    setMode(mode);
  };



  const columns = [
    {
      title: "Code",
      dataIndex: "Leave_type_code",
      key: "Leave_type_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Leave Name",
      dataIndex: "Leave_name",
      key: "Leave_name",
    },
    // {
    //   title: "Contact Name",
    //   dataIndex: "Contact_Name",
    //   key: "Contact_Name",
    // },
    {
      title: "Abbrevation",
      dataIndex: "Leave_type_abbr",
      key: "Leave_type_abbr",
    },
    {
      title: "Leave Category Code",
      dataIndex: "Leave_Category_code",
      key: "Leave_Category_code",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <button
            onClick={() => EditPage("Edit", data?.Leave_type_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Leave Type"
            description="Are you sure to delete the Leave Type?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              onConfirmDeleteFun(data?.Leave_type_code)
            }}
          >
            <button className="deleteBtn">
              <MdDeleteOutline />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onConfirmDeleteFun = async (e) => {
    const isWaitFun = await DeleteFunLeaveType(e)
    if(isWaitFun?.success){
        message.success("You have been deleted")
        setTimeout(() => {
          message.destroy();
          GetLeaveTypeData({
            pageSize: pageSize,
            pageNo: page,
            search: null,
          });
        }, 2000);
    }else{
      message.error(isWaitFun?.message || isWaitFun?.messsage)
    }
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 maringClass">
            {mode == "read" && (
              <>
                <div className="LeaveTypeFlexBox">
                  <h4 className="text-dark">Leave Type</h4>
                  <div className="LeaveTypesearchBox">
                    <Input
                      placeholder={"Search Here..."}
                      type="search"
                      onChange={(e) => {
                        setSearchVal(e.target.value);
                      }}
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
                  loading={Red_Leave_Type?.loading}
                  dataSource={Red_Leave_Type?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Leave_Type?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <LeaveTypeForm
                  cancel={setMode}
                  mode={mode}
                  isCode={null}
                  page={page}
                />
              )}
              {mode == "Edit" && (
                <LeaveTypeForm
                  cancel={setMode}
                  mode={mode}
                  isCode={isCode}
                  page={page}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Leave_Type }) {
  return { Red_Leave_Type };
}
export default connect(mapStateToProps, Leave_Type_ACTIONS)(Leave_Types);
