import React, { useEffect, useState } from "react";
import Header from "../../../../components/Includes/Header";
import Input from "../../../../components/basic/input/index";
import { Button } from "../../../../components/basic/button";
import { Space, Pagination, Table, Tag, Tooltip } from "antd";
import BankBranchForm from "../../../form/transactionPosting/Setup/Bank_BranchesForm";
// import "../../../../assest/css/IncomeTax_Column.css";
import * as Bank_Branches_ACTIONS from "../../../../store/actions/payroll/Bank_Branches/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";
import "../../../assest/css/IncomeTax_Column.css"

const Bank_Branches = ({ Red_Bank_Branches, GetBankBranchesData, DeleteBankBranch }) => {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");




  useEffect(() => {
    if (isSearchVal == "") {
      GetBankBranchesData({
        pageSize: pageSize,
        pageNo: page,
        search: null,
      });
    } else {
      GetBankBranchesData({
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
      title: "Branch Code",
      dataIndex: "Branch_code",
      key: "Branch_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Branch Name",
      dataIndex: "Branch_name",
      key: "Branch_name",
    },
    {
      title: "abbreviation",
      dataIndex: "Branch_abbr",
      key: "Branch_abbr",
    },
    {
      title: "Branch Address Line1",
      dataIndex: "Branch_address_line1",
      key: "Branch_address_line1",
    },
    {
      title: "Contact No.",
      dataIndex: "Contact",
      key: "Contact",
    },
    {
      title: "Bank Code",
      dataIndex: "Bank_Code",
      key: "Bank_Code",
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
            onClick={() => EditPage("Edit", data?.Branch_code)}
            className="editBtn"
          >
            <FaEdit />
          </button>
          <Popconfirm
            title="Delete the Bank Branch"
            description="Are you sure to delete the Bank Branch?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              onConfirmDeleteFun(data?.Branch_code)
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
    const isWaitFun = await DeleteBankBranch(e)
    if (isWaitFun?.success) {
      message.success("You have been deleted")
      setTimeout(() => {
        message.destroy();
        GetBankBranchesData({
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
                <div className="IncomeTax_ColumnFlexBox">
                  <h4 className="text-dark">Bank Branches</h4>
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
                  loading={Red_Bank_Branches?.loading}
                  dataSource={Red_Bank_Branches?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Bank_Branches?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
                <BankBranchForm
                  cancel={setMode}
                  mode={mode}
                  isCode={null}
                  page={page}
                />
              )}
              {mode == "Edit" && (
                <BankBranchForm
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

function mapStateToProps({ Red_Bank_Branches }) {
  return { Red_Bank_Branches };
}
export default connect(mapStateToProps, Bank_Branches_ACTIONS)(Bank_Branches);


