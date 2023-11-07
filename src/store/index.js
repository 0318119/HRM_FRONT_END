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
  PayRollUpload
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;