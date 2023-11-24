import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import Select from "../components/basic/select/index";
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

const GanerateLateArrival = ({ Red_Institution, GetInstitutionData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");

  console.log("Red_Institution table page", Red_Institution)

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

  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/institutions/DeleteInstitution`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
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
            <h4 className="text-dark">Generate Late Arrivals</h4>
            <div className="d-flex align-items-center">
              <Input
                label={'Payroll Year'}
                placeholder={"2023"}
                type="search" />
              <Input
                label={'Payroll Month'}
                placeholder={"November"}
                type="search" />

                <Button title={'Generate Data'}/>
            </div>
          </div>


          <div className="col-lg-12 maringClass">
            <h4 className="text-dark">Download</h4>
            <div className="d-flex align-items-center">
              <Input
                label={'Payroll Year'}
                placeholder={"2023"}
                type="search" />
              <Input
                label={'Payroll Month'}
                placeholder={"November"}
                type="search" />
            </div>

            <div className="d-flex align-items-center">
              <Input
                label={'Location'}
                placeholder={"Location"}
                type="search" />
            </div>

            <div className="d-flex align-items-center">
              <Input
                label={'Departments'}
                placeholder={"Departments"}
                type="search" />
            </div>


            <div className="d-flex align-items-center">
              <Input
                label={'Units'}
                placeholder={"Units"}
                type="search" />
            </div>
          </div>

          <div>
            <Button title={'ExportToExcel'}/>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Institution }) {
  return { Red_Institution };
}
export default connect(mapStateToProps, INSTITUTION_ACTIONS)(GanerateLateArrival);
