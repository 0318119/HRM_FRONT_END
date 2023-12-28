import React, { useState , useEffect} from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import "./assets/css/Parameters_Access.css";
import Select from "../components/basic/select";
import  { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import * as DOWNLOAD_ACCESS from '../store/actions/HrOperations/downloadAccess/index'
import { Avatar, Divider, List, Skeleton } from 'antd';
import { Transfer } from 'antd';
import { Checkbox } from 'antd';
import { message } from 'antd';
import baseUrl from '../config.json'
import { set } from "react-hook-form";



const Parameters_Access = ({ Red_Download_Access, GET_DOWNLOAD_ACCESS_DATA }) => {

  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCheckedData, setCheckedData] = useState([])
  const [isAllEmployees, setAllEmployees] = useState([])
  const [isParameter, setParameter] = useState(null)
  const [isAccessPara, setisAccessPara] = useState([])
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [isSetData, setData] = useState([])
  const [getData, setGetData] = useState([])



  async function AllEmployees() {
    await fetch(
      `${baseUrl.baseUrl}/allemployees/GetEmployeesName`, {
      method: "GET",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setAllEmployees(response.data)
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

  async function AccessParameter() {
    var chkData = JSON.stringify({
      "Parameter_code": isParameter,
      "Emp_code": isCheckedData
    })
    console.log("chkData: ", chkData);
    // return
    await fetch(
      `${baseUrl.baseUrl}/refreshable/ParametersAccessUserSubmit`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Parameter_code": isParameter,
        "Emp_code": isCheckedData
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: "Submit Successfully",
        });
        setTimeout(() => {
          window.location.reload()
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
  async function AccessParameterUser() {
<<<<<<< HEAD

=======
    
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    await fetch(
      `${baseUrl.baseUrl}/refreshable/parametersaccessUser`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Parameter_code": isParameter
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        setisAccessPara(response.data)
        console.log("get users", response.data)
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
  async function DeleteAccessParameter() {
    await fetch(
      `${baseUrl.baseUrl}/refreshable/parametersaccessUserDelete`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "Parameter_code": isParameter,
        "Emp_code": isCheckedData
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: "Delete Successfully",
        });
        setTimeout(() => {
          window.location.reload()
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



<<<<<<< HEAD



  const chkData = (e) => {
    if (e.target.checked) {
      setCheckedData((prevCheckedData) => [
        ...prevCheckedData,
        e.target.value,
=======
 

 
const chkData = (e) =>  {
    if (e.target.checked) {
      setCheckedData((prevCheckedData) => [
        ...prevCheckedData,
          e.target.value,
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
      ]);
    } else {
      setCheckedData((prevCheckedData) =>
        prevCheckedData.filter((item) => item !== e.target.value)
      );
    }
<<<<<<< HEAD
  }
=======
}
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23

  useEffect(() => {
    AllEmployees()
    GET_DOWNLOAD_ACCESS_DATA()
  }, []);
  useEffect(() => {
<<<<<<< HEAD
    if (isParameter !== null) {
=======
    if (isParameter !== null){
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
      AccessParameterUser()
    }
  }, [isParameter]);

  return (
    <>
      <div>
        <Header />
      </div>
      {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 maringClass">
            {/* {mode == "read" && (` */}
            <>
              <div className="Parameters_AccessFlexBox">
                <h4 className="text-dark">Access Parameter</h4>
              </div>
              <hr />
            </>

            <div>
              <Select
                label={"Select Expanse"}
                placeholder="Select Access Expanse"
<<<<<<< HEAD
                onChange={(e) => { setParameter(e) }}
=======
                onChange={(e) => { setParameter(e)}}
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                options={Red_Download_Access?.data?.[0]?.res?.data.map(
                  (item) => ({
                    value: item.Parameter_code,
                    label: item.Parameter_Name,
                  })
                )}
              />
              <h4 className="text-dark">Select User</h4>
              <hr />
              <div className="row">
                {/* <div className="col-12">
                    <Transfer 
                        dataSource={isAllEmployees}
                        listStyle={{
                          width: 500,
                          height: 300,
                        }}
                      // targetKeys={targetKeys}
                      // onChange={handleChange}
                    onChange={(item) => {
                      console.log(item.Emp_name)
                    }}
                      render={(item) => item.Emp_name}
                      selectAllLabels={['', '']}
                    />
                  </div>               */}
                <div className="col-5">
<<<<<<< HEAD
                  <h6 style={{ color: "black", }}>All System User</h6>
=======
                   <h6 style={{color:"black",}}>All System User</h6>
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                  <div d="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                    <InfiniteScroll dataLength={''} next={''} hasMore={'data.length < 50'}
                      // loader={
                      //   <Skeleton  avatar
                      //     paragraph={{
                      //       rows: 1,
                      //     }}
                      //     active
                      //   />
                      // }
                      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={isAllEmployees}
<<<<<<< HEAD
                        renderItem={(item, index) => (
=======
                        renderItem={(item,index) => (
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                          <List.Item key={index.Emp_code}>
                            <List.Item.Meta
                              title={<li key={index.Emp_code}>
                                <input type="checkbox" className="mx-2" value={item.Emp_code} name={item.Emp_name}
<<<<<<< HEAD
                                  onChange={(e) => { chkData(e) }}
                                />
                                {
                                }
                                {item.Emp_name}</li>
                              }
=======
                                  onChange={(e) => {chkData(e)}}
                                  />
                                  {
                                  }
                                {item.Emp_name}</li>
                                }
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                            />
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                  <Button title={'Submit'} onClick={AccessParameter} />
                </div>
<<<<<<< HEAD
                <div className="col-2" style={{ height: 400, padding: '0 16px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
=======
                <div className="col-2" style={{ height: 400,  padding: '0 16px',display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                  <Button title={'Include'} onClick={chkData()} />
                  <Button title={'Exclude'} onClick={DeleteAccessParameter} />
                </div>
                <div className="col-5">
<<<<<<< HEAD
                  <h6 style={{ color: "black" }}>All Selected User</h6>
=======
                  <h6 style={{color:"black"}}>All Selected User</h6>
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                  <div d="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                    <InfiniteScroll dataLength={''} next={''} hasMore={'data.length < 50'}
                      // loader={
                      //   <Skeleton avatar
                      //     paragraph={{
                      //       rows: 1,
                      //     }}
                      //     active
                      //   />
                      // }
                      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={isAccessPara}
                        renderItem={(item) => (
                          <List.Item >
                            <List.Item.Meta
                              title={<li>
<<<<<<< HEAD
                                <input type="checkbox" className="mx-2" value={item.Emp_code} onChange={(e) => { chkData(e) }} />
=======
                                <input type="checkbox" className="mx-2" value={item.Emp_code} onChange={(e) => { chkData(e) }}/>
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                                {item.Emp_name}</li>}
                            />
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_Download_Access }) {
  return { Red_Download_Access };
}

export default connect(mapStateToProps, DOWNLOAD_ACCESS)(Parameters_Access) 
