import React, { useState } from "react";
import "../assets/css/tables.css";
import {MdSummarize as Summary_ico} from 'react-icons/md'
const SummaryTable = (Data) => {


  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center">
            <Summary_ico /> <p className="m-1">LEAVE SUMMARY</p>
          </span>
        </div>
        <div className="OverFlowtble">
          <table class="table table-striped">
            <thead>
              <tr>
                <td>Title</td>
                <td></td>
                <td></td>
                <td>Balance</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>private leave</th>
                <th></th>
                <th></th>
                <th>20.1</th>
              </tr>
              <tr>
                <th>private leave</th>
                <th></th>
                <th></th>
                <th>20.1</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SummaryTable;
