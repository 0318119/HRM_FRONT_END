import React, { useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import "./assets/css/RefreshableData.css";
import Select from "../components/basic/select";
const RefreshableData = () => {
  //   const [mode, setMode] = useState('read')

  //   const columns = [

  //     {
  //       title: 'Code',
  //       dataIndex: 'code',
  //       key: 'code',
  //       render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'City Name',
  //         dataIndex: 'City Name',
  //         key: 'City Name',
  //       },
  //     {
  //       title: 'City Abbreviation',
  //       dataIndex: 'City Abbreviation',
  //       key: 'City Abbreviation',
  //     },
  //     {
  //       title: 'Province',
  //       dataIndex: 'Province',
  //       key: 'Province',
  //     },
  //     {
  //       title: 'Sort Key',
  //       dataIndex: 'Sort Key',
  //       key: 'Sort Key',
  //     },
  //     {
  //       title: 'Action',
  //       key: 'action',
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <button onClick={() => setMode('Edit')} className="editBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
  //           <button className="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
  //         </Space>
  //       ),
  //     },
  //   ];

  //   const data = [
  //     {
  //       key: '1',
  //       name: 'John Brown',
  //       age: 32,
  //       Abbreviation: 'New York No. 1 Lake Park',
  //     },
  //   ];

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
              <div className="RefreshableDataFlexBox">
                <h4 className="text-dark">Refreshable Data</h4>
              </div>
              <hr />
            </>

            <div>
              <Select
                label={"Report"}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefreshableData;
