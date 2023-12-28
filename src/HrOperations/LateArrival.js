import React, { useEffect, useState } from "react";
import { Button } from "../components/basic/button/index";
import { CancelButton } from "../components/basic/button/index";
import "./assets/css/LateArrivel.css";
import { Space, Table, Pagination, Checkbox, Tag, Tooltip } from "antd";
import * as LATEARRIVALS_ACTION from "../store/actions/HrOperations/Late_Arrivals/index";
import { connect } from "react-redux";
import { message } from "antd";
import baseUrl from '../config.json'

const LateArrival = ({ cancel, isGeneratedData, Red_LateArrival  }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [page, setPage] = useState(1);
  const [apiData2, setApiData2] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const EditBack = () => {
    cancel(false)
  };

  
  const handleCheckboxChange = (index) => {
    const selectedItem = apiData[index];
    const updatedItems = selectedItems.some((item) => item.index === index)
      ? selectedItems.filter((item) => item.index !== index) 
      : [...selectedItems, { index, item: selectedItem }]; 
    setSelectedItems(updatedItems);
  };

  
  const handleCheckboxChange2 = (index) => {
    const selectedItem2 = apiData2[index];
    const updatedItems2 = selectedItems2.some((item) => item.index === index)
      ? selectedItems2.filter((item) => item.index !== index)
      : [...selectedItems2, { index, item: selectedItem2 }];
    setSelectedItems2(updatedItems2);
  };


  async function ApprovedData() {
    await fetch(
      `${baseUrl.baseUrl}/lateArrival/LateArrivalDataApprove`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
        body: JSON.stringify({
          "LateArrivalData": [...selectedItems2.map(item => ({
            "Emp_code": item?.index?.emp_code,
            "Dates": item?.index?.dates,
            "LeaveDate": item?.index?.leave_day_to_post
          })),
          ]
        }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: "You have successfully Approved",
        });
        setTimeout(() => {
          messageApi.destroy();
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
  async function ProcessData() {
    await fetch(
      `${baseUrl.baseUrl}/lateArrival/LateArrivalDataProcess`, {
      method: "POST",
      headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
      body: JSON.stringify({
        "LateArrivalData": [...selectedItems.map(item => ({
          "Emp_code": item?.index?.emp_code,
          "Dates": item?.index?.dates,
          "LeaveDate": item?.index?.leave_day_to_post
        })),
        ]
      }),
    }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: "You have successfully Process",
        });
        setTimeout(() => {
          messageApi.destroy();
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



  const columns = [
    {
      title: "Emp Code",
      dataIndex: "emp_code",
      key: "emp_code",
    },
    {
      title: "Emp Name",
      dataIndex: "emp_name",
      key: "emp_name",
    },
    {
      title: "Dates",
      dataIndex: "dates",
      key: "dates",
    },

    {
      title: "Casual",
      dataIndex: "Casual",
      key: "Casual",
    },
    {
      title: "Leave",
      dataIndex: "Leave",
      key: "Leave",
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      key: "Balance",
    },
    {
      title: "Leave Day",
      dataIndex: "leave_day_to_post",
      key: "leave_day_to_post",
    },
    {
      title: "Process",
      key: "Process",
      render: (_, index) => (
        <Space size="middle">
              <li key={index}>
                <Checkbox
                  type="checkbox"
                  onChange={() => handleCheckboxChange2(index)}
                  checked={selectedItems2.some((selectedItem2) => selectedItem2.index === index)}
                >
              </Checkbox>
              </li>
        </Space>
      ),
    },
    {
      title: "Aprove",
      key: "Aprove",
      render: (_, index) => (
        <Space size="middle">
          <li key={index}>
            <Checkbox
              type="checkbox"
              onChange={() => handleCheckboxChange(index)}
              checked={selectedItems.some((selectedItem) => selectedItem.index === index)}
            >
            </Checkbox>
          </li>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 maringClass">
            {mode == "read" && (
              <>
                <div className="LateArrivalFlexBox">
                  <h4 className="text-dark">Late Arrival</h4>
                  <div className="LateArrivalsearchBox">
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center">
                  <Button title={'Process'} onClick={ProcessData} />
                  <Button title={'Approve'} onClick={ApprovedData} />
                </div>
              </>
            )}

            <div>
              {mode == "read" && (
                <Table
                  columns={columns}
                  loading={isGeneratedData?.loading}
                  dataSource={isGeneratedData}
                  // scroll={{ x: 10 }}
                // pagination={{
                //   defaultCurrent: page,
                //   total: Red_LateArrival?.data?.[0]?.res?.data3,
                //   onChange: (p) => {
                //     setPage(p);
                //   },
                //   pageSize: pageSize,
                // }}
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
export default connect(mapStateToProps, LATEARRIVALS_ACTION)(LateArrival);
