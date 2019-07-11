// reducers/index.js
import { combineReducers } from "redux";
import { BaseColorReducer } from "./BaseColorReducer";
import { SelectedColorReducer } from "./SelectedColorReducer";
import { HSLModeReducer } from "./HSLModeReducer";
import { HSLBasicReducer } from "./HSLBasicReducer";
import { ColorBlindnessReducer } from "./ColorBlindnessReducer";
import { ShowExtraToolsReducer } from "./ShowExtraToolsReducer";
import { HSLAdvancedReducer } from "./HSLAdvancedReducer";
import { PictureReducer } from "./PictureReducer";
import { FilterModeReducer } from "./FilterModeReducer";
import { LayoutReducer } from "./LayoutReducer";

const rootReducer = combineReducers({
  BaseColorReducer,
  SelectedColorReducer,
  HSLModeReducer,
  HSLBasicReducer,
  ColorBlindnessReducer,
  ShowExtraToolsReducer,
  HSLAdvancedReducer,
  PictureReducer,
  FilterModeReducer,
  LayoutReducer
});
export default rootReducer;
