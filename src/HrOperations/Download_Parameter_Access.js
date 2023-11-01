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



const Parameters_Access = ({ Red_Download_Access, GET_DOWNLOAD_ACCESS_DATA }) => {


  console.log(Red_Download_Access,'Red_Download_Access')

  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
    GET_DOWNLOAD_ACCESS_DATA()
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>
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
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
              <h4 className="text-dark">Select User</h4>
              <hr />
              <div className="row">
                <div className="col-5">
                   <h6 style={{color:"black",}}>All System User</h6>
                  <div d="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                    <InfiniteScroll dataLength={data.length} next={loadMoreData} hasMore={data.length < 50}
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
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item key={item.email}>
                            <List.Item.Meta
                              // avatar={<Avatar src={item.picture.large} />}
                              title={<a href="https://ant.design">{item.name.last}</a>}
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
                  <Button title={'Include'} />
                  <Button title={'Exclude'} />
                </div>
                <div className="col-5">
                  <h6 style={{color:"black"}}>All Selected User</h6>
                  <div d="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                    <InfiniteScroll dataLength={data.length} next={loadMoreData} hasMore={data.length < 50}
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
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item key={item.email}>
                            <List.Item.Meta
                              // avatar={<Avatar src={item.picture.large} />}
                              title={<a href="https://ant.design">{item.name.last}</a>}
                              // description={item.email}
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
