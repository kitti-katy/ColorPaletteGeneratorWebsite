// reducers/index.js
import { combineReducers } from "redux";
import { BaseColorReducer } from "./BaseColorReducer";
import { SelectedColorReducer } from "./SelectedColorReducer";
const rootReducer = combineReducers({
  BaseColorReducer,
  SelectedColorReducer
});
export default rootReducer;
