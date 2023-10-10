import React, { useState } from "react";
import "../assets/css/AttendanceSummaryTable.css";
import { BsFillCalendarCheckFill as Calender_ico } from "react-icons/bs";

const AttendanceSummaryTable = (Data) => {
  return (
    <>
      <div className="AttendanceSummaryTableContainer">
        <div className="d-flex justify-content-between Attendance_TableHeaderContainer">
          <span className="d-flex align-items-center">
            <Calender_ico /> <p className="m-1">ATTENDANCE SUMMARY</p>
          </span>
        </div>
        <div className="AttendanceSummary_tableMain">
          <table className="AttendanceSummary_table">
            <thead className="AttendanceSummary_tableHeading">
              <tr className="d-flex justify-content-between w-100">
                <th>{Data.Hname}</th>
                <th>{Data.Hname3}</th>
              </tr>
            </thead>
            <tbody className="AttendanceSummaryTablebody">
              <tr className="d-flex justify-content-between">
                <td>{Data.col1}</td>
                <td className="AttendanceSummary_RequestTableValue">
                  {Data.col4}
                </td>
              </tr>
              <tr className="d-flex justify-content-between p-2">
                <td>{Data.col1}</td>
                <td className="AttendanceSummary_RequestTableValue">
                  {Data.col4}
                </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td>{Data.col1}</td>
                <td className="AttendanceSummary_RequestTableValue">
                  {Data.col4}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AttendanceSummaryTable;
