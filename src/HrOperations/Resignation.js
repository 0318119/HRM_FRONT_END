import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import ResignationForm from "./form/ResignationForm";
import "./assets/css/ResignationsList.css";
import * as Resignation_ACTIONS from "../store/actions/HrOperations/Resignation/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

import baseUrl from "../../src/config.json";

const Resignation = ({ Red_Resignation, GetResignationData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (isSearchVal == "") {
      GetResignationData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetResignationData({
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
      dataIndex: "Resign_code",
      key: "Resign_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Resign Reason",
      dataIndex: "Resign_reason",
      key: "Resign_reason",
    },
    {
      title: "Abbrevation",
      dataIndex: "Resign_abbr",
      key: "Resign_abbr",
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
            onClick={() => EditPage("Edit", data?.Resign_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Resignation"
            description="Are you sure to delete the Resignation?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Resign_code);
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
  // Resignation Delete API CALL ===================================================
  async function handleConfirmDelete(id) {
    await fetch(`${baseUrl.baseUrl}/employee_resignation/DeleteResignation`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Resign_code: id,
      }),
    })
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
            GetResignationData({
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
        {contextHolder}
        <Header />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 maringClass">
            {mode == "read" && (
              <>
                <div className="ResiginationFlexBox">
                  <h4 className="text-dark">Resignation</h4>
                  <div className="ResignationsearchBox">
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
                  loading={Red_Resignation?.loading}
                  dataSource={Red_Resignation?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Resignation?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <ResignationForm
                  cancel={setMode}
                  mode={mode}
                  isCode={null}
                  page={page}
                />
              )}
              {mode == "Edit" && (
                <ResignationForm
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

function mapStateToProps({ Red_Resignation }) {
  return { Red_Resignation };
}
export default connect(mapStateToProps, Resignation_ACTIONS)(Resignation);
