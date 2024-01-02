import React, { useEffect, useState } from "react";
import Header from "../../../../components/Includes/Header";
import Input from "../../../../components/basic/input/index";
import { Button } from "../../../../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import JV_CodesForm from "../../../form/transactionPosting/Setup/JV_CodesForm";
import "../../../assest/css/Jv_code.css";
import * as JV_Code_ACTIONS from "../../../../store/actions/payroll/JV_Codes/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

const JV_Codes = ({ Red_JV_Codes, GetJvCodeData, DeleteJvCode }) => {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (isSearchVal == "") {
      GetJvCodeData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetJvCodeData({
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
      title: "JV Unit",
      dataIndex: "JV_Unit",
      key: "JV_Unit",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "JV Currency",
      dataIndex: "JV_Currency",
      key: "JV_Currency",
    },
    {
      title: "JV Cost Centre",
      dataIndex: "JV_Cost_Centre",
      key: "JV_Cost_Centre",
    },
    {
      title: "JV Main Account",
      dataIndex: "JV_MainAC",
      key: "JV_MainAC",
    },
    {
      title: "JV Sub Account",
      dataIndex: "JV_SubAC",
      key: "JV_SubAC",
    },
    {
      title: "JV Description",
      dataIndex: "JV_Description",
      key: "JV_Description",
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
            onClick={() => EditPage("Edit", data?.JV_Unit)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the JV Code"
            description="Are you sure to delete the JV Code?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              onConfirmDeleteFun(data?.JV_Unit)
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
    const isWaitFun = await DeleteJvCode(e)
    if (isWaitFun?.success) {
      message.success("You have been deleted")
      setTimeout(() => {
        message.destroy();
        GetJvCodeData({
          pageSize: pageSize,
          pageNo: page,
          search: null,
        });
      }, 2000);
    } else {
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
                <div className="JVCodeFlexBox">
                  <h4 className="text-dark">JV Codes</h4>
                  <div className="JVCodesearchBox">
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
                  loading={Red_JV_Codes?.loading}
                  dataSource={Red_JV_Codes?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_JV_Codes?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <JV_CodesForm
                  cancel={setMode}
                  mode={mode}
                  isCode={null}
                  page={page}
                />
              )}
              {mode == "Edit" && (
                <JV_CodesForm
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

function mapStateToProps({ Red_JV_Codes }) {
  return { Red_JV_Codes };
}
export default connect(mapStateToProps, JV_Code_ACTIONS)(JV_Codes);


