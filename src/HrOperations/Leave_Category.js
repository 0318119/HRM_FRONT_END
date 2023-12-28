import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Pagination, Tag, Tooltip } from "antd";
import LeaveCategoryForm from "./form/LeaveCategoryForm";
import "./assets/css/LeaveCatLists.css";
import * as Leave_Category_ACTIONS from "../store/actions/HrOperations/Leave_Category/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

import baseUrl from "../../src/config.json";

const Leave_Category = ({ Red_Leave_Category, GetLeaveCategoryData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");


  useEffect(() => {
    if (isSearchVal == "") {
      GetLeaveCategoryData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetLeaveCategoryData({
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
      dataIndex: "Leave_Category_code",
      key: "Leave_Category_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "Leave_Category_name",
      key: "Leave_Category_name",
    },
    {
      title: "Abbrevation",
      dataIndex: "Leave_Category_abbr",
      key: "Leave_Category_abbr",
    },
    {
      title: "Sort Key",
      dataIndex: "Sort_key",
      key: "Sort_key",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <button
            onClick={() => EditPage("Edit", data?.Leave_Category_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Category"
            description="Are you sure to delete the Leave Category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Leave_Category_code);
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

  // Category Delete API CALL ===================================================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/employment_leave_category/DeleteEmploymentLeaveCategory`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          Leave_Category_code: id,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.success) {
          messageApi.open({
            type: "success",
            content: "You have successfully deleted",
          });
          setTimeout(() => {
            messageApi.destroy();
            GetLeaveCategoryData({
              pageSize: pageSize,
              pageNo: page,
              search: null,
            });
          }, 3000);
        } else {
          messageApi.open({
            type: "error",
            content: response?.message || response?.messsage,
          });
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
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
                <div className="LeaveCategoryFlexBox">
                  <h4 className="text-dark">Leave Category</h4>
                  <div className="LeaveCategorysearchBox">
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
                  loading={Red_Leave_Category?.loading}
                  dataSource={Red_Leave_Category?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Leave_Category?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && <LeaveCategoryForm cancel={setMode}  mode={mode} isCode={null} page={page} />}
              {mode == "Edit" && <LeaveCategoryForm cancel={setMode}  mode={mode} isCode={isCode} page={page} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Leave_Category }) {
  return { Red_Leave_Category };
}
export default connect(mapStateToProps, Leave_Category_ACTIONS)(Leave_Category);
