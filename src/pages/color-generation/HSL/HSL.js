import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import TryIt from "../../../components/TryIt";

class HSL extends Component {
  render() {
    return (
      <div style={{ display: 'inline-block', margin: 'auto' }}>
        <div style={{
          display: 'inline-block', verticalAlign: 'top', background: 'white',
          borderBottomLeftRadius: '15px', borderTopLeftRadius: '15px', padding: '48px', height: '840px'
        }}>
          <ColorPicker /> </div>
        <div style={{
          display: 'inline-block', verticalAlign: 'top', background: 'white',
          borderRadius: '0px', marginLeft: '6px', padding: '48px 0 48px 48px', height: '840px'
        }}>
          <HSLFilters /> </div>
        <div
          style={{
            display: 'inline-block', verticalAlign: 'top',
            background: 'white', borderBottomRightRadius: '15px', borderTopRightRadius: '15px', padding: '48px', height: '840px'
          }}>
          <TryIt /></div>
      </div>
    );
  }
}

export default HSL;
