// reducers/index.js
import { combineReducers } from "redux";
import { BaseColorReducer } from "./BaseColorReducer";
import { SelectedColorReducer } from "./SelectedColorReducer";
import { HSLModeReducer } from "./HSLModeReducer";
const rootReducer = combineReducers({
  BaseColorReducer,
  SelectedColorReducer,
  HSLModeReducer
});
export default rootReducer;
