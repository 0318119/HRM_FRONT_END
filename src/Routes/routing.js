import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import '../../src/Assets/css/main.css'
import { Login } from '../LoginScreens/Login';
import  Dashboard   from '../dashboard/dashboard';
import Appointment from '../TransactionAppointment/Appointment';
import TAPersonalform from '../TransactionAppointForm/TAPersonalform';
import TAEducationForm from '../TransactionAppointForm/TAEducationForm';
import TAExprienceForm from '../TransactionAppointForm/TAExprienceForm';
import TASalaryForm from '../TransactionAppointForm/TASalaryForm';
import TAppointmentMasterPayroll from  '../TransactionAppointForm/TAppointmentMasterPayroll';
import TACheckList from '../TransactionAppointForm/TACheckList'
import TAFamilyForm from '../TransactionAppointForm/TAFamilyForm';
import TAShortsCut from '../TransactionAppointForm/TAShortsCut'
import Employment_Type from '../HrOperations/Employment_Type';
import Divisions from '../HrOperations/Divisions'
import Departments from '../HrOperations/Departments';
import EmpListForm from '../HrOperations/form/EmpListForm'
import Sections from "../HrOperations/Sections";
import Cost_Centre from "../HrOperations/Cost_Centre";
import Education_Levels from "../HrOperations/Education_Levels";
import Employee_Category from "../HrOperations/Employee_Category";
import Country from "../HrOperations/Country";
import Grade from "../HrOperations/Grade";
import Education from '../HrOperations/Education';
import Designation from '../HrOperations/Designation';
import Leave_Category from '../HrOperations/Leave_Category'
import Leave_Types from '../HrOperations/Leave_Types'
import Previous_Employers from '../HrOperations/Previous_Employers'
import Transportation from '../HrOperations/Transportation'
import Institution from '../HrOperations/Institution'
import Resignation from '../HrOperations/Resignation';
import Religion from '../HrOperations/Religion';
import Locations from '../HrOperations/Locations';
import MasterData_Sec from '../Master_Maintaince/MasterData_Sec'
import MasterData_Leaves from '../Master_Maintaince/MasterData_Leaves';
import MasterPersonal from '../Master_Maintaince/MasterPersonal'
import Confirmation from '../Master_Maintaince/Confirmation'
import Confirmation_Extensio from '../Master_Maintaince/Confirmation_Extensio';
import Increment from '../Master_Maintaince/Increment'
import Get_Attendance from '../Attendance/Get_Attendance'
import Attendance_Check from '../Attendance/Attendance_Check'
import Manual_Leave_Deletio from '../Master_Maintaince/Manual_Leave_Deletio';
import Marriage from '../Master_Maintaince/Marriage';
import Promotion from '../Master_Maintaince/Promotion'
import Holidays from '../HrOperations/Holidays'
import Leave_Applications from '../LeavesModule/Leave_Applications'
import Transaction_Leave from '../LeavesModule/Transaction_Leave';
import Transaction_Appointment_personal from '../Master_Maintaince/form/Transaction_Appointment_personal'
import Transaction_confirmation_form from '../Master_Maintaince/form/transaction_confirmation_form'
import Leave_Year_End from '../LeavesModule/Leave_Year_End'
import Leave_Report_Detail from '../LeavesModule/Leave_Report_Detail';
import Leave_Report_Balance from '../LeavesModule/Leave_Report_Balance';
import Leave_Balance_Upload from '../LeavesModule/Leave_Balance_Upload';
import Manual_leave_posting from '../LeavesModule/Manual_leave_posting'
import Transaction_Education_form from '../Master_Maintaince/form/Transaction_Education';
import LeaveSummary from '../LeavesModule/components/LeaveSummary';


const routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Appointment" element={<Appointment />}/>
          <Route path="/TAPersonalform" element={<TAPersonalform />} />
          <Route path="/TAEducationForm" element={<TAEducationForm />} />
          <Route path="/TAExprienceForm" element={<TAExprienceForm />} />
          <Route path="/TASalaryForm" element={<TASalaryForm />} />
          <Route path="/TAppointmentMasterPayroll" element={<TAppointmentMasterPayroll />} />
          <Route path="/TACheckList" element={<TACheckList />} />
          <Route path="/TAFamilyForm" element={<TAFamilyForm />} />
          <Route path="/TAShortsCut" element={<TAShortsCut />} />
          <Route path="/Employment_Type" element={<Employment_Type />} />
          <Route path="/Divisions" element={<Divisions />} />
          <Route path="/Departments" element={<Departments />} />
          <Route path="/EmpListForm" element={<EmpListForm />} />
          <Route path="/Sections" element={<Sections />} />
          <Route path="/Cost_Centre" element={<Cost_Centre />} />
          <Route path="/Education_Levels" element={<Education_Levels />} />
          <Route path="/Employee_Category" element={<Employee_Category />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/Grade" element={<Grade />} />
          <Route path="/Education" element={<Education />} />
          <Route path="/Designation" element={<Designation />} />
          <Route path="/Leave_Category" element={<Leave_Category />} />
          <Route path="/Leave_Types" element={<Leave_Types />} />
          <Route path="/Previous_Employers" element={<Previous_Employers />} />
          <Route path="/Transportation" element={<Transportation />} />
          <Route path="/Institution" element={<Institution />} />
          <Route path="/Resignation" element={<Resignation />} />
          <Route path="/Religion" element={<Religion />} />
          <Route path="/Locations" element={<Locations />} />
          <Route path="/MasterData_Sec" element={<MasterData_Sec />} />
          <Route path="/MasterData_Leaves" element={<MasterData_Leaves />} />
          <Route path="/MasterPersonal" element={<MasterPersonal />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/Increment" element={<Increment />} />
          <Route path="/Get_Attendance" element={<Get_Attendance />} />
          <Route path="/Attendance_Check" element={<Attendance_Check />} />
          <Route path="/Confirmation_Extensio" element={<Confirmation_Extensio />} />
          <Route path="/Manual_Leave_Deletio" element={<Manual_Leave_Deletio />} />
          <Route path="/Marriage" element={<Marriage />} />
          <Route path="/Promotion" element={<Promotion />} />
          <Route path="/Holidays" element={<Holidays />} />
          <Route path="/Leave_Applications" element={<Leave_Applications />} />
          <Route path="/Transaction_Leave" element={<Transaction_Leave />} />
          <Route path="/Transaction_Appointment_personal" element={<Transaction_Appointment_personal />} />
          <Route path="/Transaction_confirmation_form" element={<Transaction_confirmation_form />} />
          <Route path="/Transaction_Education_form" element={<Transaction_Education_form />} />
          <Route path="/Leave_Year_End" element={<Leave_Year_End />} />
          <Route path="/Leave_Report_Detail" element={<Leave_Report_Detail />} />
          <Route path="/Leave_Report_Balance" element={<Leave_Report_Balance />} />
          <Route path="/Leave_Balance_Upload" element={<Leave_Balance_Upload />} />
          <Route path="/Manual_leave_posting" element={<Manual_leave_posting />} />
          <Route path="/LeaveSummary" element={<LeaveSummary />} />
        </Routes>
      </Router>
    </>
  );
}

export default routing