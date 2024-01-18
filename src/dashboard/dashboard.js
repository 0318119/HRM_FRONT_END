import React, { useEffect, useState } from 'react';
import Header from "../components/Includes/Header";
import  Tabs from '../dashboard/tabs/tabs'
import '../dashboard/assets/css/dashboard.css'
import Attendancechart from './chart/Attendancechart';
import AttendanceWeekly from "./Tables/AttendanceWeekly";
import SummaryTable from "./Tables/SummaryTable";
import AttendanceSmmy from "./Tables/AttendanceSmmy";
import RequestTable from "./Tables/RequestTable";




  
const Dashboard = (props) => {
    //  const tabs = [
    //    { title: "Dashboard", content: <Attendancechart  /> },
    //    { title: "Attendance Dashboard", content: "Attendance Dashboard" },
    //    { title: "Payroll Dashboard", content: "Payroll" },
    //    { title: "Recruitment Dashboard", content: "recruitment" },
    //    { title: "Employee Dashboard", content: "employee" },
    //  ];
  return (
    <>
    <div className="Dashboard">
        <Header />
    </div>
    <div className="mt-5 py-1">
        <Attendancechart />
    </div>
    <div className="container mt-3">
    <hr />
      <div className="row">
        <div className="col-12">
          <AttendanceWeekly />
        </div>
        <div className="col-12 mt-4">
          <SummaryTable />
        </div>
        <div className="col-12 mt-4">
          <AttendanceSmmy />
        </div>
        <div className="col-12 mt-4">
          {/* <RequestTable /> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
