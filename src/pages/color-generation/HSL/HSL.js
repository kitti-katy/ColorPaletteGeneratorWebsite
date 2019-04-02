import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import HSLBasicContainer from "./components/HSLBasic/HSLBasicContainer";
import HSLFiltersAlternative from "./components/HSLFiltersAlternative";
import TryIt from "../../../components/TryIt/TryIt";
import { Select } from 'antd';
import { TabMenu } from 'primereact/tabmenu';
import "./HSL.css";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    isAdvanced: state.HSLModeReducer.isAdvanced
  }
}
class HSL extends Component {
  state = {
    isAdvanced: false
  }
  handleSelectMode = (bool) => { this.setState({ isAdvanced: bool }) }
  render() {
    return (<HSLBasicContainer />);
  }
}

export default connect(mapStateToProps)(HSL);

