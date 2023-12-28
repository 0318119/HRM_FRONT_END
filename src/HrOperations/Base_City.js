import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import Base_CityForm from "./form/Base_CityForm";
import "./assets/css/Base_City.css";
import { connect } from "react-redux";
import * as BASE_CITY_ACTIONS from "../store/actions/HrOperations/Base_CIty/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import { message } from 'antd';
import baseUrl from '../../src/config.json'

const Base_City = ({ GetBaseCityData, Red_Base_City }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [mode, setMode] = useState("read");
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  const EditPage = (mode, code) => {
    setCode(code);
    setMode(mode);
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "City_code",
      key: "City_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "City Name",
      dataIndex: "City_name",
      key: "City_name",
    },
    {
      title: "City Abbreviation",
      dataIndex: "City_abbr",
      key: "City_abbr",
    },
    {
      title: "Province Code",
      dataIndex: "Province_Code",
      key: "Province_Code",
    },
    {
      title: "Region Code",
      dataIndex: "Region_Code",
      key: "Region_Code",
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
            onClick={() => EditPage("Edit", data?.City_code)}
            className="editBtn" 
          >
             <FaEdit />
          </button>

          <Popconfirm
            title="Delete the Cost Centre"
            description="Are you sure to delete the Base City?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.City_code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm>
        
        </Space>
      ),
    },
  ];
  
    // BASE CITY Delete API CALL ===================================================
    async function handleConfirmDelete(id) {
      await fetch(
        `${baseUrl.baseUrl}/cities/DeleteCity`, {
        method: "POST",
        headers: { "content-type": "application/json", accessToken : `Bareer ${get_access_token}` },
        body: JSON.stringify({
          "City_code": id,
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
              GetBaseCityData({ 
                pageSize: pageSize,
                pageNo: page,
                search: null
              })
            }, 5000);
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


  useEffect(() => {
    if (isSearchVal == "") {
      GetBaseCityData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetBaseCityData({
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal,
      });
    }
  }, [page, isSearchVal]);

  console.log("Red_Base_City table page", Red_Base_City?.data?.[0]?.res?.data1);


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
                <div className="Base_CityFlexBox">
                  <h4 className="text-dark">Base City</h4>
                  <div className="Base_CitysearchBox">
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
                  loading={Red_Base_City?.loading}
                  dataSource={Red_Base_City?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Base_City?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                        setPage(p);
                    },
                    pageSize: pageSize,
                }}
                />
              )}
              {mode == "create" && <Base_CityForm cancel={setMode} mode={mode} isCode={null}/>}
              {mode == "Edit" && <Base_CityForm cancel={setMode} mode={mode} isCode={isCode}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
function mapStateToProps({ Red_Base_City }) {
  return { Red_Base_City };
}

export default connect(mapStateToProps, BASE_CITY_ACTIONS)(Base_City);
