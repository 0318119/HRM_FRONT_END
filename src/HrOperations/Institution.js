import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import InstitutionForm from "./form/InstitutionForm";
import "./assets/css/InstitutionsList.css";
import { Space, Table, Pagination, Tag, Tooltip } from "antd";
import * as INSTITUTION_ACTIONS from "../store/actions/HrOperations/Institution/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

import baseUrl from '../../src/config.json'

const Institution = ({ Red_Institution, GetInstitutionData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  console.log("Red_Institution table page" ,Red_Institution)

  useEffect(() => {
    if (isSearchVal == "") {
      GetInstitutionData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetInstitutionData({
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
      dataIndex: "Inst_code",
      key: "Inst_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "Inst_name",
      key: "Inst_name",
    },
    {
      title: "Institution Abbrevation",
      dataIndex: "Inst_abbr",
      key: "Inst_abbr",
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
            onClick={() => EditPage("Edit", data?.Inst_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Institution"
            description="Are you sure to delete the Institution?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Inst_code);
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

  // Institute Delete API CALL ===================================================
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/institutions/DeleteInstitution`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken : `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Inst_code": id,
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
            messageApi.destroy()
            GetInstitutionData({ 
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
                <div className="InstitutionFlexBox">
                  <h4 className="text-dark">Institutions</h4>
                  <div className="InstitutionsearchBox">
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
                  loading={Red_Institution?.loading}
                  dataSource={Red_Institution?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Institution?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && <InstitutionForm cancel={setMode} mode={mode} isCode={null} page={page} />}
              {mode == "Edit" && <InstitutionForm cancel={setMode} mode={mode} isCode={isCode} page={page} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Institution }) {
  return { Red_Institution };
}
export default connect(mapStateToProps, INSTITUTION_ACTIONS)(Institution);
