import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from "antd";
import { connect } from "react-redux";
import * as REFRESHABLE_DATA_ACTIONS from "../store/actions/HrOperations/RefreshableData/index";
import "./assets/css/RefreshableData.css";
import Select from "../components/basic/select";

const RefreshableData = ({ GetRefreshableData, Red_Refreshable_Data }) => {
  useEffect(() => {
    // Red_Refreshable_Data
    GetRefreshableData();
  }, []);

  console.log(
    "hdtfmrtdrhsgentukrytd",
    Red_Refreshable_Data?.data?.[0]?.res?.data
  );

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
                options={Red_Refreshable_Data?.data?.[0]?.res?.data.map(
                  (item) => ({
                    value: item.Parameter_code,
                    label: item.Parameter_Name,
                  })
                )}
              />
            </div>

            <Button title="Post" />
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
