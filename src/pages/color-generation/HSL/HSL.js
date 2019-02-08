import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import HSLFiltersAlternative from "./components/HSLFiltersAlternative";
import TryIt from "../../../components/TryIt";
import {  Select   } from 'antd';
import {TabMenu} from 'primereact/tabmenu';

const backgroundColor= '#f0f0f0' //'#f5f5f5' // '#cccccc' 

class HSL extends Component {
  state ={
    isAdvanced:false
  }
  handleSelectMode =(bool) => {this.setState({isAdvanced:bool})}
  render() {
    return (
      <div style={{ display: 'inline-block', margin: 'auto' }} className="container">

        <div style={{
          display: 'inline-block', verticalAlign: 'top', background: backgroundColor, padding: '1.2vw',
          borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px',
          boxShadow: '#00000059 1px 1px 10px 1px', width: '100vw'
        }}>
        
          <Select value={this.state.isAdvanced} style={{ width: 120, float:'right' }} onChange={this.handleSelectMode} size="small">
                <Select.Option  value={false}> Basic Mode </Select.Option> 
                <Select.Option  value={true}> Advanced Mode </Select.Option> 
          </Select>
          <ColorPicker style={{ display: 'inline-block', verticalAlign: 'top'}}/> 
{ !this.state.isAdvanced &&  <HSLFiltersAlternative/> }
{ this.state.isAdvanced && <HSLFilters style={{ display: 'inline-block', verticalAlign: 'top'}}/> }
          <div style={{ display: 'inline-block', verticalAlign: 'top',}}>
           {/*} <TabMenu model={[{label: 'Basic'},{label: 'Advanced'}]} /> */}
            </div>
          <TryIt style={{ display: 'inline-block', verticalAlign: 'top', padding: '0 48px'}}/> 
          </div>
      </div>
    );
  }
}

export default HSL;
