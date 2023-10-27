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
  Red_Employee_type
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;
