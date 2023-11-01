import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import Transition_family from "./reducers/Transition/transition_family/index";
import Red_Cost_centre from "./reducers/HrOperations/Cost_Centre/index";
import oneTimeAllowance from "./reducers/payroll/oneTimeAllowance/index";
import FixedAllowance from "./reducers/payroll/FixedAllowance/index";
import oneTimeDeduction from "./reducers/payroll/OneTImeDeduction/index";
import Red_Country from "./reducers/HrOperations/Country/index";
import FixedDeduction from "./reducers/payroll/FixedDeduction/index";
import cashAllowance from "./reducers/payroll/cashAllowance/index";


const reducers = combineReducers({
  Transition_family,
  Red_Cost_centre,
  oneTimeAllowance,
  FixedAllowance,
  Red_Country,
  oneTimeDeduction,
  FixedDeduction,
  cashAllowance
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;
