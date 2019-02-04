import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import HSLPaletteGenerator from "../../../../utilities/HSLPaletteGenerator";
import {getChunks} from "../../../../utilities/ArrayMethods";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import { Label } from '../../../../components/Label'
import { ClipboardCopier } from '../../../../components/ClipboardCopier' 
import { Input, Button, Icon, Slider, Select   } from 'antd';
import { Radio } from 'antd';

const Option = Select.Option;

const RadioGroup = Radio.Group;
const padding = '8px'
const selectedColorStyle = {padding: '2px 20px', textAlign: 'center', display: 'inline', fontSize: '14px', float:'right'}
const selectedTileStyle = {}
const tileStyle = {  padding: '0.5cm'}
const exportJSONButtonStyle = {float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2' }
const reloadButtonStyle = {float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2'}

// variations: hueChange: 30, satChange: 20, lightChange:20, h step, s step, l step, number of colors
const presets = { 
  analogous : { name:'Analogous', variations: [ [30, 0, 10, 10, 1, 1, 30], [30, 20, 20, 25, 5, 1, 75], [30, 0, 20, 5, 1, 1, 15] ]}, 
  square: { name:'Square', variations: [ [60, 0, 10, 10, 1, 1, 40] , [60, 20, 20, 25, 5, 1, 100], [60, 0, 20, 5, 1, 1, 20]] }, 
  triad: { name:'Triad', variations: [ [120, 0, 10, 10, 1, 1, 30], [120, 20, 20, 25, 5, 1, 75], [120, 0, 20, 5, 1, 1, 15] ] }, 
  _12Colors: {name:'12 Colors', variations: [ [30, 0, 10, 10, 5, 1, 120], [30, 0, 20, 5, 1, 1, 60] ] }
}

let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLFilters extends Component {
  state = {
    hueChange: 10, satChange: 0, lightChange: 8,
    hueStep: 10, satStep: 1, lightStep: 1,
    numberOfColors: 126,
    clickedColor: 0,
    selectedPreset: 'None',
    selectedVariation: 0
  };

  componentDidUpdate = () => {}

  // PRESETS HANDLERS
  selectPreset = e => {
    let selectedPreset = e.target.value
    this.setState({ selectedPreset: selectedPreset, selectedVariation: 0 }, ()=> {
      if(selectedPreset == 'None') return
      this.resetFilters(0)
    })
  }
  resetFilters = (selectedVariation) => {
    let selectedOptions = presets[this.state.selectedPreset].variations[selectedVariation]
    let hueChange = selectedOptions[0], satChange = selectedOptions[1]
    let lightChange = selectedOptions[2], hueStep = selectedOptions[3]
    let satStep = selectedOptions[4], lightStep = selectedOptions[5]
    let numberOfColors = selectedOptions[6]
    this.setFilters(hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors)
  }
  setFilters = (hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) => this.setState({ hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors })
  setVariation = (val) => { console.log(val); this.setState({selectedVariation: val}, this.resetFilters(val))}

  // FILTER HANDLERS
  handleHueChange = value => this.setState({ hueChange: value, selectedPreset: 'None' })
  handleSatChange = value => this.setState({ satChange: value, selectedPreset: 'None' })
  handleLightChange = value => this.setState({ lightChange: value, selectedPreset: 'None' })
  handleHueStepChange = value => this.setState({ hueStep: value, selectedPreset: 'None' })
  handleSatStepChange = value => this.setState({ satStep: value, selectedPreset: 'None' })
  handleLightStepChange = value => this.setState({ lightStep: value, selectedPreset: 'None' })
  handleNumberOfColorsChange = n => this.setState({ numberOfColors: n, selectedPreset: 'None' })
  
  getSliderInput = (value, onChange, min, max, label) => 
  <div> <Label title={label} /> 
    <Slider min={min} max={max} onChange={onChange} value={value} style={{ width: '120px', display:'inline-block', verticalAlign:'bottom' }}/> 
    <input type='number' style={{ width: '40px', border:'none', backgroundColor:'transparent', marginLeft:'6px' }} min={min} max={max} onChange={(e) => onChange(e.target.value)} value={value}/>
  </div>

  // EXPORT JSON, RESET BUTTONS HANDLERS
  reset = () => {
    this.setState({ selectedPreset: 'None' })
    this.setFilters(10, 0, 8, 1, 1, 1, 126)
  }
  exportJSON = () => {
    let colorElements = document.getElementById("generated-colors").getElementsByTagName("div")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].style.backgroundColor
    }
    exportJSON(colors)
  }

  // TILES PART
  handleSelectColor = (hex, index) => {
    this.setState({ clickedColor: index })
    this.props.selectColor(hex)
  }
  getTilesRow = (colors, rowNumber) => colors.map((color, index) => {
      index = index + colors.length*rowNumber
      return <div key={index + color} onClick={() => this.handleSelectColor(color, index  )} style={{ ...tileStyle, backgroundColor: color, borderRadius: this.state.clickedColor == index  ? '25px' : '0'}}/>  } ) 
  
  getTiles = () => {
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, selectedPreset, numberOfColors} = this.state
    let palette = new HSLPaletteGenerator(this.props.baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette
    let splitter = selectedPreset != 'None' ? hueStep : numberOfColors
    let rows = getChunks(palette, splitter)
    let rowNumber = rows.length
      if(rowNumber == 0)
        return this.getTilesRow(rows[0], 0)
      else 
        return Array.apply(null, { length: rowNumber }).map(
          (el, rowNumber) =>( <div style={{ padding:'8px 0', display: 'flex', justifyContent: 'center',flexWrap: 'wrap', justifyItems: 'flex-start'}} 
          key={'presetgenerated' + rowNumber}>{this.getTilesRow(rows[rowNumber], rowNumber)} </div> ) )
    }

  render() {
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, selectedPreset, numberOfColors, clickedColor, selectedVariation } = this.state

    let selectedColor = this.props.selected
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <div style={{  width: '40vw', height:'100%'}} className="element-holder">
        <div>
          {/* PRESETS */}
          <div style={{ borderBottom: '1px solid #e8e8e8', padding: padding + ' 0' }} >
          <div style={{display:'inline-block'}}>
            <RadioGroup value={selectedPreset} onChange={this.selectPreset} style={{ display: 'flex' }} >
              <Radio value={'None'}>None</Radio>
              {Object.keys(presets).map(key => <Radio key={key} value={key}>{presets[key].name}</Radio> )}
            </RadioGroup>
            </div>
            { selectedPreset != 'None' &&
            <span style={{float:'right'}}> 
                <Select value={selectedVariation} style={{ width: 120 }} onChange={this.setVariation} size="small">
                  {presets[selectedPreset].variations.map( (v, i)=> <Option key={'varOption' + selectedPreset + i} value={i}>Style {i}</Option> )}
                </Select>
            </span>
            }
          </div>
          {/* CHANGE FILTERS */}
          <div style={{ borderBottom: '0px solid #e8e8e8', padding: padding + ' 0' }}>
            <div >
              <span style={{ float: 'right' }}>
                {this.getSliderInput(hueStep, this.handleHueStepChange, 1, 100, 'Hue Step')}
                {this.getSliderInput(satStep, this.handleSatStepChange, 1, 100, 'Saturation Step')}
                {this.getSliderInput(lightStep, this.handleLightStepChange, 1, 100, 'Light Step')}
              </span>
            </div>
            <div >
                {this.getSliderInput(hueChange, this.handleHueChange, 0, 120, 'Hue Change')}
                {this.getSliderInput(satChange, this.handleSatChange, 0, 100, 'Saturation Change')}
                {this.getSliderInput(lightChange, this.handleLightChange, 0, 100, 'Light Change')}
            </div>
          </div>
          {/* GENERATED TILES */}
          <div id="generated-colors" style={{ height: 'max-content', lineHeight: '1.45', height:"40vh", boxShadow: '0px 0px 2px #00000026', background: '#3d3d3d0a' }}> {this.getTiles()} </div>
          <br/>
          {/* NUMBER OF COLORS, SELECTED COLOR VALUE, EXPORT JSON, RESET BUTTON */}
          <div style={{ padding: padding + ' 0' }}>
            <Icon type="export" style={exportJSONButtonStyle} onClick={this.exportJSON} /> <Icon type="reload" onClick={this.reset} style={reloadButtonStyle} />
            <div style={{display:'inline-block'}}> {this.getSliderInput(numberOfColors, this.handleNumberOfColorsChange, 6, 181, 'Number of Colors')} </div>
            {/* Selected Color Square */}
            <div style = {{...selectedColorStyle,backgroundColor: selectedColor,  color: selectedColorFont, border: '1px solid ' + selectedColorFont }}>
              {selectedColor} <ClipboardCopier value={selectedColor} />
            </div>
          </div>
        </div>
        
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFilters);
