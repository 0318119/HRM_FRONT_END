import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button/index";
import { CancelButton } from "../components/basic/button/index";
import "./assets/css/InstitutionsList.css";
import { Space, Table, Pagination, Tag, Tooltip } from "antd";
import * as INSTITUTION_ACTIONS from "../store/actions/HrOperations/Institution/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";
import baseUrl from '../config.json'

const LateArrival = ({ cancel,  Red_LateArrival, GenerateLateArrival }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");
  const EditBack = () => {
    cancel(false)
  };
  



  const columns = [
    {
      title: "Emp Code",
      dataIndex: "Inst_code",
      key: "Inst_code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Emp Name",
      dataIndex: "Inst_name",
      key: "Inst_name",
    },
    {
      title: "Dates",
      dataIndex: "Inst_abbr",
      key: "Inst_abbr",
    },

    {
      title: "Casual",
      dataIndex: "Sort_key",
      key: "Sort_key",
    },
    {
      title: "Leave",
      dataIndex: "Sort_key",
      key: "Sort_key",
    },
    {
      title: "Balance",
      dataIndex: "Sort_key",
      key: "Sort_key",
    },
    {
      title: "Leave Day to Post",
      dataIndex: "Sort_key",
      key: "Sort_key",
    },
    {
      title: "Process",
      key: "Process",
      render: (data) => (
        <Space size="middle">
          <input type="Checkedbox" />
        </Space>
      ),
    },
    {
      title: "Aprove",
      key: "Aprove",
      render: (data) => (
        <Space size="middle">
          <input type="Checkedbox" />
        </Space>
      ),
    },
  ];

  // Institute Delete API CALL ===================================================
  // async function handleConfirmDelete(id) {
  //   await fetch(
  //     `${baseUrl.baseUrl}/institutions/DeleteInstitution`, {
  //     method: "POST",
  //     headers: { "content-type": "application/json", accessToken : `Bareer ${get_access_token}` },
  //     body: JSON.stringify({
  //       "Inst_code": id,
  //     }),
  //   }
  //   ).then((response) => {
  //     return response.json();
  //   }).then(async (response) => {
  //     if (response.success) {
  //         messageApi.open({
  //           type: 'success',
  //           content: "You have successfully deleted",
  //         });
  //         setTimeout(() => {
  //           messageApi.destroy()
  //           GetInstitutionData({ 
  //             pageSize: pageSize,
  //             pageNo: page,
  //             search: null
  //           })
  //         }, 3000);
  //     }
  //     else {
  //       messageApi.open({
  //         type: 'error',
  //         content: response?.message || response?.messsage,
  //       });
  //     }
  //   }).catch((error) => {
  //       messageApi.open({
  //         type: 'error',
  //         content: error?.message || error?.messsage,
  //       });
  //   });
  // }

  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 maringClass">
            {mode == "read" && (
              <>
                <div className="InstitutionFlexBox">
                  <h4 className="text-dark">Late Arrival</h4>
                  <div className="InstitutionsearchBox">
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center">
                      <Button title={'Process'}/>
                      <Button title={'ExportToExcel'}/>
                      <Button title={'Approve'}/>
                      <Button title={'Report'}/>
                </div>
              </>
            )}

            <div>
              {mode == "read" && (
                <Table
                  columns={columns}
                  loading={Red_LateArrival?.loading}
                  dataSource={Red_LateArrival?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
                  pagination={{
                    defaultCurrent: page,
                    total: Red_LateArrival?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              <CancelButton onClick={EditBack} title={"Cancel"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_LateArrival }) {
  return { Red_LateArrival };
}
export default connect(mapStateToProps, INSTITUTION_ACTIONS)(LateArrival);
