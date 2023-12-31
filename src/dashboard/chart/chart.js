import React from 'react'
import '../assets/css/chart.css'
import Attendancechart from '../chart/Attendancechart';
import { BsFillCalendar2CheckFill as Calender_ico } from "react-icons/bs";
import Table from "../Tables/tables";
import EntryTable from "../Tables/entryTable";
import SummaryTable from "../Tables/SummaryTable";
import RequestTable from "../Tables/RequestTable";
import EmployeeVisualize from "../EmployeeVisualize/EmployeeVisualize";
import AttendanceSummaryTable from '../Tables/AttendanceSummaryTable'
import Employee_PaySlip from '../Tables/Employee_PaySlip';
import AttendanceSmmy from '../Tables/AttendanceSmmy';
import MyTeamMnge from '../Tables/myTeamMnge';
import HrPolicy from '../Tables/HrPolicy';
import { Link } from 'react-router-dom';

const chart = () => {
  return (
    <div className="container-fluid px-5 py-2">
      <div className="row ChartRow">
        <div className="col-lg-12 col-md-12 col-sm-12 p-0 ChartRow">
          <div className="ChartHeader">
            <span className="ChartHeadDetailHeading">
              <p>Attendance Summary</p>
            </span>
            <span>
              <Link className="ChartAttendance" to={'/Get_Attendance'} style={{textDecoration: "underline"}}>Attendance Sheet</Link>
            </span>
            {/* <select name="" id="" className="chartSelectTag">
              <option value="current_month">Current Month</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select> */}
          </div>
        </div>
        <div className="ChartCont mt-5">
          <Attendancechart />
        </div>
      </div>
      <div className="row d-flex mt-1 p-1 ChartRow">
        <div className=" col-lg-6  TableCont">
          <Table  />
        </div>
        <div className=" col-lg-6  TableCont">
          <EntryTable />
        </div>
      </div>
      <div className="row d-flex mt-1 p-1 ChartRow">
        <div className="col-lg-6 mt-3 TableCont">
          <SummaryTable  />
        </div>
        <div className="col-lg-6 mt-3  TableCont">
          <RequestTable />
        </div>
      </div>
      <div className="row d-flex mt-1 p-1 ChartRow">
        <div className="col-lg-6 TableCont">
          <AttendanceSmmy />
        </div>
        <div className="col-lg-6 TableCont">
          <Employee_PaySlip />
        </div>
      </div>
      <div className="row d-flex mt-1 p-1 ChartRow">
        <div className="col-lg-6 TableCont">
          <MyTeamMnge />
        </div>
        <div className="col-lg-6  TableCont">
          <HrPolicy />
        </div>
      </div>
    </div>
  );
}

export default chart