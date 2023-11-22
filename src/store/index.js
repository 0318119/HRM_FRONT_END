import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import Transition_family from "./reducers/Transition/transition_family/index";
import Red_Cost_centre from "./reducers/HrOperations/Cost_Centre/index";
import Red_Country from "./reducers/HrOperations/Country/index";
import Red_Department from "./reducers/HrOperations/Departments/index";
import Red_Designation from "./reducers/HrOperations/Designations/index";
import Red_Base_City from "./reducers/HrOperations/Base_City/index";
import Red_Division from "./reducers/HrOperations/Divisions/index";
import Red_Education_level from "./reducers/HrOperations/Education_level/index";
import Red_Education from "./reducers/HrOperations/Education/index";
import Red_Employee_type from "./reducers/HrOperations/EmployeeType/index";
import Red_Refreshable_Data from "./reducers/HrOperations/RefreshableData/index";
import Red_Employee_Cat from "./reducers/HrOperations/EmployeeCat/index";
import Red_Position from './reducers/HrOperations/Positions/index';
import Red_Grades from "./reducers/HrOperations/Grades/index";
import oneTimeAllowance from "./reducers/payroll/oneTimeAllowance/index";
import FixedAllowance from "./reducers/payroll/FixedAllowance/index";
import oneTimeDeduction from "./reducers/payroll/OneTImeDeduction/index";
import FixedDeduction from "./reducers/payroll/FixedDeduction/index";
import cashAllowance from "./reducers/payroll/cashAllowance/index";
import advanceSalary from "./reducers/payroll/advanceSalary/index";
import advanceSalaryInstallment from "./reducers/payroll/advanceSalaryInstallment/index";
import Red_Download_Access from './reducers/HrOperations/DownloadAccess/index'
import salaryHold from "./reducers/payroll/salaryHold/index";
import Red_Master_Personal from "./reducers/MasterMaintaince/MasterPersonal/index";
import PayRollUpload from "./reducers/payroll/payrollUpload/index";
import Red_Institution from "./reducers/HrOperations/Institution/index"
import HrStop from "./reducers/payroll/hrStop/index";
import Red_Holidays from "./reducers/HrOperations/Holidays";
import Red_Location from "./reducers/HrOperations/Location";
import undoPayrollCalculation from "./reducers/payroll/undoPayrollCalculation/index";
import addLoans from "./reducers/payroll/addLoans/index";
import addAllowance from "./reducers/payroll/addAllownace/index";
import addDeduction from "./reducers/payroll/addDeduction/index";
import addPayroll from "./reducers/payroll/addPayroll/index";
import Red_MasterEarning from "./reducers/MasterMaintaince/MasterEarning";
import Red_Leave_Category from "./reducers/HrOperations/Leave_Category/index"
import Red_Religion from "./reducers/HrOperations/Religion/index"
import Red_Resignation from "./reducers/HrOperations/Resignation/index"
import Red_Section from "./reducers/HrOperations/Section/index"
import Red_previous_Employee from "./reducers/HrOperations/Previous_Emp/index"
import Red_Leave_Type from "./reducers/HrOperations/LeaveType/index"
import PdfRender from "./reducers/payroll/pdfRender/index"
import Red_MasterActive from "./reducers/MasterMaintaince/MasterActive"; 
import Red_Pay_Slip from "./reducers/payroll/PaySlip/index"
import Red_Attendance_sheet from './reducers/AttendanceSheet/index'
import Red_Manual_Leave_Posting from './reducers/Leave/Manual_Leave_Posting/index'
import Red_JV_Codes from "./reducers/payroll/JV_Codes/index"; 
import Red_IncomeTax_Column from "./reducers/payroll/IncomeTax_Column";
import Red_Bank_Branches from "./reducers/payroll/Bank_Branches";
import Red_MasterActive from "./reducers/MasterMaintaince/MasterActive";
import Red_Appointment from "./reducers/Appointments/Appointment";
import RedMasterPayroll from "./reducers/payroll/masterPayroll";



const reducers = combineReducers({
  Transition_family,
  Red_Cost_centre,
  Red_Country,
  Red_Department,
  Red_Designation,
  Red_Base_City,
  Red_Division,
  Red_Education_level,
  Red_Education,
  Red_Employee_type,
  Red_Refreshable_Data,
  oneTimeDeduction,
  Red_Employee_Cat,
  Red_Position,
  Red_Grades,
  FixedAllowance,
  oneTimeAllowance,
  cashAllowance,
  advanceSalary,
  advanceSalaryInstallment,
  Red_Download_Access,
  FixedDeduction,
  advanceSalaryInstallment,
  salaryHold,
  Red_Master_Personal,
  Red_Institution,
  PayRollUpload,
  HrStop,
  Red_Holidays,
  Red_Location,
  undoPayrollCalculation,
  addLoans,
  addAllowance,
  addDeduction,
  addPayroll,
  Red_MasterEarning,
  Red_Institution,
  Red_Leave_Category,
  Red_Religion,
  Red_Resignation,
  Red_Section,
  Red_previous_Employee,
  Red_Leave_Type,
  PdfRender,
  Red_previous_Employee, 
  Red_MasterActive,
  Red_Pay_Slip,
  Red_Attendance_sheet,
  Red_Manual_Leave_Posting,
  Red_JV_Codes, 
  Red_IncomeTax_Column, 
  Red_Bank_Branches,
  Red_MasterActive, 
  Red_Appointment,
  RedMasterPayroll
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;