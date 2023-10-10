import React, { useState } from "react";
import "../assets/css/tables.css";
import { BsFillEyeFill as Eye_ico } from "react-icons/bs";
import { BsFolderFill as Folder_ico } from "react-icons/bs";

const RequestTable = (Data) => {
  const [tab, setTab] = useState(true);
  const [tab2, setTab2] = useState(false);
  const handleTab = () => {
    setTab2(false);
    setTab(true);
  };
  const handleTab2 = () => {
    setTab2(true);
    setTab(false);
  };
  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center" onClick={handleTab}>
            <Folder_ico /> <p className="m-1">MY REQUEST</p>
          </span>
          <span className="d-flex align-items-center" onClick={handleTab2}>
            <Eye_ico /> <p className="m-1">MY APPROVALS</p>
          </span>
        </div>
        {tab ? (
          <div className="OverFlowtble">
          <table class="table table-striped">
            <thead>
              <tr>
                <td>Type</td>
                <td></td>
                <td></td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>List Appointment</th>
                <th></th>
                <th></th>
                <th>0</th>
              </tr>
              <tr>
                <th>List Appointment</th>
                <th></th>
                <th></th>
                <th>0</th>
              </tr>

            </tbody>
          </table>
          </div>
        ) : (
          ""
        )}
        {tab2 ? (
          <div className="OverFlowtble">
          <table class="table table-striped">
            <thead>
              <tr>
                <td>S:No</td>
                <td>Monthly</td>
                <td>Leave / Attendance</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>good</th>
              </tr>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>good</th>
              </tr>
            </tbody>
          </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RequestTable;