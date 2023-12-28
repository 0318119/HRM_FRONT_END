import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import "./assets/css/CountriesList.css";
import CountryForm from "./form/CountryForm";
import * as COUNTRY_ACTIONS from "../store/actions/HrOperations/Country/index";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';




const Country = ({ Red_Country, GetDataCountry }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null)
  const [mode, setMode] = useState('read')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchVal, setSearchVal] = useState('')
  const EditPage = (mode, code) => {
    setCode(code)
    setMode(mode)
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'Country_Code',
      key: 'Country_Code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Country Name',
      dataIndex: 'Country_Name',
      key: 'Country_Name',
    },
    {
      title: 'Country Abbreviation',
      dataIndex: 'Country_Abbr',
      key: 'Country_Abbr',
    },
    {
      title: 'Sort Key',
      dataIndex: 'SortKey',
      key: 'SortKey',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <button onClick={() => EditPage('Edit', data?.Country_Code)} className="editBtn"><FaEdit/></button>
          <Popconfirm
            title="Delete the Country"
            description="Are you sure to delete the Country?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleConfirmDelete(data?.Country_Code)
            }}
          >
            <button className="deleteBtn"><MdDeleteOutline /></button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  // COST COUNTRY FORM DATA DELETE API CALL =========================== 
  async function handleConfirmDelete(id) {
    await fetch(
      `${baseUrl.baseUrl}/countries/DeleteCountry`, {
      method: "POST",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Country_Code": id,
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
<<<<<<< HEAD
          GetDataCountry({
=======
          GetDataCountry({ 
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
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
<<<<<<< HEAD

  useEffect(() => {
    if (isSearchVal == '') {
      GetDataCountry({
=======
  
  useEffect(() => {
    if(isSearchVal == ''){
      GetDataCountry({ 
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
        pageSize: pageSize,
        pageNo: page,
        search: null
      })
<<<<<<< HEAD
    } else {
      GetDataCountry({
=======
    }else{
      GetDataCountry({ 
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
        pageSize: pageSize,
        pageNo: 1,
        search: isSearchVal
      })
    }
<<<<<<< HEAD
  }, [page, isSearchVal])
=======
  }, [page,isSearchVal])
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23

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
                <div className="CountryFlexBox">
                  <h4 className="text-dark">Country List</h4>
                  <div className="CountrysearchBox">
<<<<<<< HEAD
                    <Input placeholder={'Search Here...'} type="search"
                      onChange={(e) => { setSearchVal(e.target.value) }}
=======
                    <Input placeholder={'Search Here...'} type="search" 
                      onChange={(e) => {setSearchVal(e.target.value)}}
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                    />
                    <Button title="Create" onClick={() => setMode("create")} />
                  </div>
                </div>
                <hr />
              </>
            )}

            <div>
              {mode == "read" && (
<<<<<<< HEAD
                <Table
                  columns={columns}
                  loading={Red_Country?.loading}
                  dataSource={Red_Country?.data?.[0]?.res?.data1}
                  scroll={{ x: 10 }}
=======
                <Table 
                  columns={columns}
                  loading={Red_Country?.loading}
                  dataSource={Red_Country?.data?.[0]?.res?.data1} 
                  scroll={{ x: 10 }} 
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                  pagination={{
                    defaultCurrent: page,
                    total: Red_Country?.data?.[0]?.res?.data3,
                    onChange: (p) => {
                      setPage(p);
                    },
                    pageSize: pageSize,
                  }}
                />
              )}
              {mode == "create" && (
<<<<<<< HEAD
                <CountryForm cancel={setMode} mode={mode} isCode={null} page={page} />
              )}
              {mode == "Edit" && (
                <CountryForm cancel={setMode} isCode={isCode} page={page} />
=======
                <CountryForm cancel={setMode} mode={mode} isCode={null} page={page}/>
              )}
              {mode == "Edit" && (
                <CountryForm cancel={setMode} isCode={isCode} page={page}/>
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Country }) {
  return { Red_Country };
}
export default connect(mapStateToProps, COUNTRY_ACTIONS)(Country)
