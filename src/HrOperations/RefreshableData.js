import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import { connect } from "react-redux";
import * as REFRESHABLE_DATA_ACTIONS from "../store/actions/HrOperations/RefreshableData/index";
import "./assets/css/RefreshableData.css";
import Select from "../components/basic/select";
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { message } from 'antd';
import baseUrl from '../config.json'


const RefreshableData = ({ GetRefreshableData, Red_Refreshable_Data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");

  const [isRefreshable, setRefreshable] = useState([])
  const [isParameter, setParameter] = useState('')


  async function DownLoadReport() {

    await fetch(
      `${baseUrl.baseUrl}/refreshable/getRefreshableDownloadByCode`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Parameter_code": isParameter,
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: "Get Data Successfully",
        });
        DownloadExcel(response.data[0])
        console.log(response.data[0], 'response.')
        setTimeout(() => {
          messageApi.destroy()
        }, 5000);
      }
      else {
        messageApi.open({
          type: 'error',
          content: response?.message || response?.messsage,
        });
        setTimeout(() => {
          messageApi.destroy()
        }, 5000);
      }
    }).catch((error) => {
      messageApi.open({
        type: 'error',
        content: error?.message || error?.messsage,
      });
      setTimeout(() => {
        messageApi.destroy()
      }, 5000);
    });
  }

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  const fileExtension = '.xlsx';

  const DownloadExcel = async (hjh) => {
    const ws = XLSX.utils.json_to_sheet(hjh);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "data" + fileExtension);

  }



  useEffect(() => {

    GetRefreshableData();
  }, []);


  return (
    <>
      <div>
        <Header />
      </div>
      {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 maringClass">

            <>
              <div className="RefreshableDataFlexBox">
                <h4 className="text-dark">Refreshable Data</h4>
              </div>
              <hr />
            </>

            <div>
              <Select
                label={"Report"}
                placeholder="Please to Select"
                onChange={(e) => setParameter(e)}
                options={Red_Refreshable_Data?.data?.[0]?.res?.data.map(
                  (item) => ({
                    value: item.Parameter_code,
                    label: item.Parameter_Name,
                  })
                )}
              />
            </div>

            <Button title="Post" onClick={DownLoadReport} />
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Refreshable_Data }) {
  return { Red_Refreshable_Data };
}
export default connect(
  mapStateToProps,
  REFRESHABLE_DATA_ACTIONS
)(RefreshableData);
