import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import { Input } from "../components/basic/input/formInput";
import { Button } from "../components/basic/button";
import Select from "../components/basic/select/index";
import "./assets/css/InstitutionsList.css";
import { Space, Table, Pagination, Tag, Tooltip } from "antd";
import * as LATEArrival from "../store/actions/HrOperations/Late_Arrivals/index";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";
import baseUrl from '../../src/config.json'
import { set } from "react-hook-form";
import LateArrivals from './LateArrival'

const GanerateLateArrival = ({ Red_LateArrival, GenerateLateArrivals }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState("");
  const [isPayrollMonth, setPayrollMonth] = useState(null)
  const [isPayrollYear, setPayrollYear] = useState(null)
  const [GenerateTable, setGenerateTable] = useState(false)
  const [Generate, setGenerate] = useState({
    Month: isPayrollMonth,
    Year: isPayrollYear
  })
  const EditPage = (mode) => {
    setGenerateTable(mode)
  }


  const GenerateData = async () => {
    const GenerateCreate = await GenerateLateArrivals({
      Month: isPayrollMonth,
      Year: isPayrollYear
    })
    setGenerateTable(true)
    if (GenerateCreate.success) {
      messageApi.open({
        type: 'success',
        content: "You have successfully Generated",
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: GenerateCreate?.message || GenerateCreate?.message,
      });
    }
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
                id={"Year"}
                name={"Year"}
                type="number"
                value={Generate.Year}
                placeholder={"2023"}
                onChange={(e) => setPayrollYear(e.target.value)}

              />
              <Input
                label={'Payroll Month'}
                placeholder={"November"}
                type="number"
                name={"Month"}
                id={"Month"}
                value={Generate.Month}
                onChange={(e) => setPayrollMonth(e.target.value)}
              />

              <Button title={'Generate Data'} onClick={GenerateData} />
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
            <Button title={'ExportToExcel'} />
          </div>
          {GenerateTable ? <div>
            <LateArrivals cancel={EditPage} mode={mode} />
          </div> : " "}

        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_LateArrival }) {
  return { Red_LateArrival };
}
export default connect(mapStateToProps, LATEArrival)(GanerateLateArrival);
