import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import HSLFiltersAlternative from "./components/HSLFiltersAlternative";
import TryIt from "../../../components/TryIt/TryIt";
import { Select } from 'antd';
import { TabMenu } from 'primereact/tabmenu';
import "./HSL.css";

class HSL extends Component {
  state = {
    isAdvanced: false
  }
  handleSelectMode = (bool) => { this.setState({ isAdvanced: bool }) }
  render() {
    return (
      <div className="HSL-page-container">

        {/* Mode Select */}
        <Select className="HSL-mode-select" value={this.state.isAdvanced} onChange={this.handleSelectMode} size="small">
          <Select.Option value={false}> Basic Mode </Select.Option>
          <Select.Option value={true}> Advanced Mode </Select.Option>
        </Select>

        {/* Color Picker */}
        <ColorPicker id="HSL-color-picker-section" />

        {/* HSL Filters */}
        {!this.state.isAdvanced && <HSLFiltersAlternative id="HSL-filters-section-basic"/>}
        {this.state.isAdvanced && <HSLFilters id="HSL-filters-section-advanced" />}

        <div style={{ display: 'inline-block', verticalAlign: 'top', }}> {/*} <TabMenu model={[{label: 'Basic'},{label: 'Advanced'}]} /> */}</div>
        {/* Try It */}
        <TryIt id="HSL-try-it-section" />

      </div>
    );
  }
}

export default HSL;

