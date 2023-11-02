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

  useEffect(() => {
    GET_DOWNLOAD_ACCESS_DATA()
  },[])



  const [isAllEmployees, setAllEmployees] = useState([])
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
        messageApi.open({
          type: 'success',
          content: "Get Data Successfully",
        });
        setAllEmployees(response.data)
        console.log(response.data, 'response.')
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


  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  useEffect(() => {
    AllEmployees()

  }, []);

 
const [isCheckedData, setCheckedData] = useState([])

// const [isName,setName] = useState();
// const [isValue,setValue] = useState();  
// const chkData = (e) =>  {
//     if (e.target.checked) {
//       setCheckedData((prevCheckedData) => [
//         ...prevCheckedData,
//         { [e.target.name]: e.target.value },
        
        
//       ]);
//     } else {
//       setCheckedData((prevCheckedData) =>
//         prevCheckedData.filter(
//           (item) => Object.keys(item)[0] !== e.target.name
//         )
//       );
//     }
// }


const [isSetData,setData] = useState([])
const [getData,setGetData] = useState([])

const CheckData = (e) => {
  if (isSetData) {
    getData.push('isSetData')
    console.log(getData, ';l;llllS555')

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
            {/* {mode == "read" && (` */}
            <>
              <div className="Parameters_AccessFlexBox">
                <h4 className="text-dark">Access Parameter</h4>
              </div>
              <hr />
            </>

            <div>
              <Select
                label={"Select Expense"}
                placeholder="Please to Select"
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
                   <h6 style={{color:"black",}}>All System User</h6>
                  <div d="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                    <InfiniteScroll dataLength={''} next={''} hasMore={'data.length < 50'}
                      loader={
                        <Skeleton  avatar
                          paragraph={{
                            rows: 1,
                          }}
                          active
                        />
                      }
                      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={isAllEmployees}
                        renderItem={(item,index) => (
                          <List.Item key={item.email}>
                            <List.Item.Meta
                              // avatar={<Avatar src={item.picture.large} />}
                              title={<li value={item.Emp_code}>
                                {/* <Checkbox.Group options={isAllEmployees} defaultValue={item.Emp_code}  /> */}
                                <input type="checkbox" value={item.Emp_code} name={item.Emp_name} 
                                  // onChange={(e) => {chkData(e)}}
                                  onChange={(e) => setData(e.target.name && e.target.value)}
                                  />
                                {console.log(isSetData, "kkkkkkk")}
                                  {
                                  }
                                {item.Emp_name}</li>
                                }
                              // description={item.email}
                            />
                            {/* <div>Content</div> */}
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                  <Button title={'Submit'} />
                </div>
                <div className="col-2" style={{ height: 400,  padding: '0 16px',display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
                  <Button title={'Include'}  />
                  <Button title={'Exclude'} />
                </div>
                <div className="col-5">
                  <h6 style={{color:"black"}}>All Selected User</h6>
                  <div d="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                    <InfiniteScroll dataLength={''} next={''} hasMore={'data.length < 50'}
                      loader={
                        <Skeleton avatar
                          paragraph={{
                            rows: 1,
                          }}
                          active
                        />
                      }
                      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={"data"}
                        renderItem={(item) => (
                          <List.Item key={item.email}>
                            <List.Item.Meta
                              // avatar={<Avatar src={item.picture.large} />}
                              // title={<a href="https://ant.design">{item.name.last}</a>}
                              description={item.email}
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
