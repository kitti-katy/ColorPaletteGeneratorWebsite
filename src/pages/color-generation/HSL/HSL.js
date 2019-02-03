import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import TryIt from "../../../components/TryIt";

const backgroundColor= '#f0f0f0' //'#f5f5f5' // '#cccccc' 

class HSL extends Component {
  render() {
    return (
      <div style={{ display: 'inline-block', margin: 'auto' }}>
        <div style={{
          display: 'inline-block', verticalAlign: 'top', background: backgroundColor,
          borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px', padding: '48px', height: '840px',
          boxShadow: '#00000059 1px 1px 10px 1px'
        }}>
          <ColorPicker /> </div>
          <div style={{
          display: 'inline-block', verticalAlign: 'top', background: backgroundColor,
          borderBottomRightRadius: '5px', borderTopRightRadius: '5px', marginLeft: '6px', padding: '48px 0 48px 48px', height: '840px',
          boxShadow: '#00000059 1px 1px 10px 1px'
        }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top'}}>
          <HSLFilters /> </div>
        <div
          style={{ display: 'inline-block', verticalAlign: 'top', padding: '0 48px'}}>
          <TryIt /></div>
      </div>
      </div>
    );
  }
}

export default HSL;
