import React, { useEffect, useState } from "react";
import Header from "../../../../components/Includes/Header";
import Input from "../../../../components/basic/input/index";
import { Button } from "../../../../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import IncomeTaxForm from "../../../form/transactionPosting/Setup/IncomeTaxForm"
import "../../../assest/css/IncomeTax_Column.css";
import * as IncomeTax_Column_ACTIONS from "../../../../store/actions/payroll/IncomeTax_Column/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";

const IncomeTax_Column = ({ Red_IncomeTax_Column, GetIncomeTaxData,DeleteIncomeTax }) => {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");


 

  useEffect(() => {
    if (isSearchVal == "") {
        GetIncomeTaxData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
        GetIncomeTaxData({
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
      title: "Column No",
      dataIndex: "Column_No",
      key: "Column_No",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Column Name",
      dataIndex: "Column_name",
      key: "Column_name",
    },
    {
      title: "Colunm Type",
      dataIndex: "Colunm_Type",
      key: "Colunm_Type",
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
            onClick={() => EditPage("Edit", data?.Column_No)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Income Tax Column"
            description="Are you sure to delete the Income Tax Column?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              onConfirmDeleteFun(data?.Column_No)
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
    const isWaitFun = await DeleteIncomeTax(e)
    if(isWaitFun?.success){
        message.success("You have been deleted")
        setTimeout(() => {
          message.destroy();
          GetIncomeTaxData({
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
                <div className="IncomeTax_ColumnFlexBox">
                  <h4 className="text-dark">Income Tax Columns</h4>
                  <div className="IncomeTax_ColumnsearchBox">
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
                  loading={Red_IncomeTax_Column?.loading}
                  dataSource={Red_IncomeTax_Column?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_IncomeTax_Column?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <IncomeTaxForm
                  cancel={setMode}
                  mode={mode}
                  isCode={null}
                  page={page}
                />
              )}
              {mode == "Edit" && (
                <IncomeTaxForm
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

function mapStateToProps({ Red_IncomeTax_Column }) {
  return { Red_IncomeTax_Column };
}
export default connect(mapStateToProps, IncomeTax_Column_ACTIONS)(IncomeTax_Column);


