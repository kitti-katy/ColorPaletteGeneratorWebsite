// reducers/index.js
import { combineReducers } from "redux";
import { BaseColorReducer } from "./BaseColorReducer";
import { SelectedColorReducer } from "./SelectedColorReducer";
import { HSLModeReducer } from "./HSLModeReducer";
import { HSLBasicReducer } from "./HSLBasicReducer";
const rootReducer = combineReducers({
  BaseColorReducer,
  SelectedColorReducer,
  HSLModeReducer,
  HSLBasicReducer
});
export default rootReducer;
