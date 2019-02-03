import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import TryIt from "../../../components/TryIt";

const backgroundColor= '#f0f0f0' //'#f5f5f5' // '#cccccc' 

class HSL extends Component {
  render() {
    return (
      <div style={{ display: 'inline-block', margin: 'auto' }} className="container">
        <div style={{
          display: 'inline-block', verticalAlign: 'top', background: backgroundColor, padding: '1.2vw',
          borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px', height: '82vh',
          boxShadow: '#00000059 1px 1px 10px 1px', width: '100vw'
        }}>
          <ColorPicker style={{ display: 'inline-block', verticalAlign: 'top'}}/> 
          <HSLFilters style={{ display: 'inline-block', verticalAlign: 'top'}}/>
          <div style={{width:'150px', display: 'inline-block', verticalAlign: 'top',}}></div>
          <TryIt style={{ display: 'inline-block', verticalAlign: 'top', padding: '0 48px'}}/> 
          </div>
      </div>
    );
  }
}

export default HSL;
