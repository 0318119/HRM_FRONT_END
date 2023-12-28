import React from "react";
import "./employeeVisualize.css";
import EmployeeAttendanceVisualizeChart from "../chart/EmployeAttendanceVisualizeChart";
import { BiLineChart as Dashboard_ico } from "react-icons/bi";

const EmployeeVisualize = (Data) => {
  return (
    <div className="container1">
      <div className="row ChartRow  mt-1">
        <div className="d-flex  headvisual">
          <div className="Employee_ChartHeader">
            <span className="">
              <Dashboard_ico className="Dashboard_ico" /> EMPLOYEE ATTENDANCE
              VISUALIZATION
            </span>
            <select name="" id="">
              <option value="">Sammad(6516)</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
        </div>
        <div className="EmployeeAttendanceVisualizeChart">
          <EmployeeAttendanceVisualizeChart />
        </div>
        <div className="Employee_tableMain mt-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <td>Week</td>
                <td>Description</td>
                <td>Scheduled Hours</td>
                <td>Worked Hours</td>
                <td>Average Hours</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>1</th>
                <th>2</th>
              </tr>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>1</th>
                <th>3</th>
              </tr>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>1</th>
                <th>2</th>
              </tr>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>1</th>
                <th>3</th>
              </tr>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>1</th>
                <th>2</th>
              </tr>
              <tr>
                <th>14</th>
                <th>july</th>
                <th>1</th>
                <th>1</th>
                <th>3</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeVisualize;
