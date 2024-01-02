import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import PreEmployerForm from "./form/PreEmployerForm";
import "./assets/css/PreEmployerList.css";
import * as Previous_Employers_ACTIONS from "../store/actions/HrOperations/Previous_Emp/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

import baseUrl from "../../src/config.json";


const Previous_Employers = ({ Red_previous_Employee, GetPreviousEmpData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (isSearchVal == "") {
      GetPreviousEmpData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetPreviousEmpData({
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
      dataIndex: "Employer_Code",
      key: "Employer_Code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employer Name",
      dataIndex: "Employer_Name",
      key: "Employer_Name",
    },
    {
      title: "Contact Name",
      dataIndex: "Contact_Name",
      key: "Contact_Name",
    },
    {
      title: "Contact Title",
      dataIndex: "Contact_Title",
      key: "Contact_Title",
    },
    {
      title: "Telephone Number",
      dataIndex: "Telephone_number",
      key: "Telephone_number",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <button
            onClick={() => EditPage("Edit", data?.Employer_Code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Employer"
            description="Are you sure to delete the Previous Employer?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Employer_Code);
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
  // Pre-Emp Delete API CALL ===================================================
  async function handleConfirmDelete(id) {
    await fetch(`${baseUrl.baseUrl}/allemployer/DeleteEmployer`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Employer_Code: id,
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
            GetPreviousEmpData({
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
                <div className="PreEmployerFlexBox">
                  <h4 className="text-dark">Previous Employer</h4>
                  <div className="PreEmployersearchBox">
                    <Input placeholder={"Search Here..."} type="search" onChange={(e) => {
                      setSearchVal(e.target.value);
                    }} />
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
                  loading={Red_previous_Employee?.loading}
                  dataSource={Red_previous_Employee?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_previous_Employee?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <PreEmployerForm cancel={setMode} mode={mode} isCode={null} page={page} />
              )}
              {mode == "Edit" && (
                <PreEmployerForm cancel={setMode} mode={mode} isCode={isCode} page={page} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_previous_Employee }) {
  return { Red_previous_Employee };
}
export default connect(mapStateToProps, Previous_Employers_ACTIONS)(Previous_Employers);