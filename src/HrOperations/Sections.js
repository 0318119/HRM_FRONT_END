import React, { useEffect, useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from 'antd';
import SectionForm from './form/SectionForm';
import './assets/css/SectionList.css'
import * as Section_ACTIONS from "../store/actions/HrOperations/Section/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";



import baseUrl from "../../src/config.json";

const Sections = ({ Red_Section, GetSectionData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (isSearchVal == "") {
      GetSectionData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetSectionData({
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
      dataIndex: "Section_code",
      key: "Section_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Section Name",
      dataIndex: "Section_name",
      key: "Section_name",
    },
    {
      title: "Abbrevation",
      dataIndex: "Section_abbr",
      key: "Section_abbr",
    },
    {
      title: "Dept Code",
      dataIndex: "Dept_code",
      key: "Dept_code",
    },
    {
      title: "Section Head",
      dataIndex: "Section_Head",
      key: "Section_Head",
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
            onClick={() => EditPage("Edit", data?.Section_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Section"
            description="Are you sure to delete the Section?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Section_code);
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
    await fetch(`${baseUrl.baseUrl}/employment_section_code/DeleteEmploymentSectionCode`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        Section_code: id,
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
            GetSectionData({
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
                <div className="SectionFlexBox">
                  <h4 className="text-dark">Section</h4>
                  <div className="SectionsearchBox">
                    <Input placeholder={'Search Here...'} type="search" onChange={(e) => {
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
                  loading={Red_Section?.loading}
                  dataSource={Red_Section?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Section?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <SectionForm cancel={setMode}  isCode={null}
                  page={page} />
              )}
              {mode == "Edit" && (
                <SectionForm cancel={setMode} isCode={isCode}
                  page={page} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function mapStateToProps({ Red_Section }) {
  return { Red_Section };
}
export default connect(mapStateToProps, Section_ACTIONS)(Sections);