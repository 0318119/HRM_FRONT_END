import React, { useEffect, useState } from "react";
import Header from "../../components/Includes/Header";
import Input from "../../components/basic/input/index";
import { Button } from "../../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import Access_ControlForm from "../../Addministration/Forms/Access_Control_Form";
import "../assest/css/Access_Control.css";
import * as Access_Control_ACTIONS from "../../store/actions/Addministration/Access_Control/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

const Access_Control = ({ Red_Access_Control, GetAccessControlData }) => {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (isSearchVal == "") {
      GetAccessControlData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetAccessControlData({
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
      title: "EMP Code",
      dataIndex: "Emp_code",
      key: "Emp_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "Emp_name",
      key: "Emp_name",
    },

    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <button
            onClick={() => EditPage("Edit", data?.Emp_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
        </Space>
      ),
    },
  ];
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
                <div className="Access_ControlFlexBox">
                  <h4 className="text-dark">User Access To Menu Options</h4>
                  <div className="Access_ControlsearchBox">
                    <Input
                      placeholder={"Search Here..."}
                      type="search"
                      onChange={(e) => {
                        setSearchVal(e.target.value);
                      }}
                    />
                    {/* <Button title="Create" onClick={() => setMode("create")} /> */}
                  </div>
                </div>
                <hr />
              </>
            )}

            <div>
              {mode == "read" && (
                <Table
                  columns={columns}
                  loading={Red_Access_Control?.loading}
                  dataSource={Red_Access_Control?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Access_Control?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "Edit" && (
                <Access_ControlForm
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

function mapStateToProps({ Red_Access_Control }) {
  return { Red_Access_Control };
}
export default connect(mapStateToProps, Access_Control_ACTIONS)(Access_Control);
