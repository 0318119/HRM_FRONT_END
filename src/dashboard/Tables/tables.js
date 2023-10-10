import React from "react";
import "../assets/css/tables.css";
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData } from '../../redux/slices/GetSlice';
import { BsClock as Time_ico } from "react-icons/bs";
const config = require('../../config.json')

function Table(Data) {
  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center">
            <Time_ico /> <p className="m-1">ATTENDANCE</p>
          </span>
        </div>
        <div className="OverFlowtble">
          <table class="table table-striped">
            <thead>
              <tr>
                <td>name</td>
                <td>name</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>name</th>
                <th>name</th>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  );
}

export default Table;
