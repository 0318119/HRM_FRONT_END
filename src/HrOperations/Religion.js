import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import ReligionForm from "./form/ReligionForm";
import "./assets/css/ReligionList.css";
import * as Religion_ACTIONS from "../store/actions/HrOperations/Religion/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";


import baseUrl from "../../src/config.json";


const Religion = ({ Red_Religion, GetReligionData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");


  useEffect(() => {
    if (isSearchVal == "") {
      GetReligionData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetReligionData({
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
      dataIndex: "Religion_code",
      key: "Religion_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Religion Name",
      dataIndex: "Religion_name",
      key: "Religion_name",
    },
    {
      title: "Abbrevation",
      dataIndex: "Religion_abbr",
      key: "Religion_abbr",
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
            onClick={() => EditPage("Edit", data?.Religion_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Religion"
            description="Are you sure to delete the Religion?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Religion_code);
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

  // Religion Delete API CALL ===================================================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/religion_code/DeleteReligion`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          Religion_code: id,
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
            GetReligionData({
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
                <div className="ReligionFlexBox">
                  <h4 className="text-dark">Religion</h4>
                  <div className="ReligionsearchBox">
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
                  loading={Red_Religion?.loading}
                  dataSource={Red_Religion?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Religion?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && <ReligionForm cancel={setMode} mode={mode} isCode={null} page={page} />}
              {mode == "Edit" && <ReligionForm cancel={setMode} mode={mode} isCode={isCode} page={page} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Religion }) {
  return { Red_Religion };
}
export default connect(mapStateToProps, Religion_ACTIONS)(Religion);
