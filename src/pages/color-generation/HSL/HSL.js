import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import SelectMode from "./components/SelectMode"
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
    return (
      <div className="HSL-page-container">

        {/* Color Picker */}
        <ColorPicker id="HSL-color-picker-section" />

        {/* HSL Filters */}
        {!this.props.isAdvanced && <HSLFiltersAlternative id="HSL-filters-section-basic" />}
        {this.props.isAdvanced && <HSLFilters id="HSL-filters-section-advanced" />}

        <div style={{ display: 'inline-block', verticalAlign: 'top', }}> {/*} <TabMenu model={[{label: 'Basic'},{label: 'Advanced'}]} /> */}</div>
        {/* Try It */}
        <TryIt id="HSL-try-it-section" />

      </div>
    );
  }
}

export default connect(mapStateToProps)(HSL);

