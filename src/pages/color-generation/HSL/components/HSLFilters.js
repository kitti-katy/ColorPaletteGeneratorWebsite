import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import HSLPaletteGenerator from "../../../../utilities/HSLPaletteGenerator";
import { getChunks } from "../../../../utilities/ArrayMethods";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import { Label } from '../../../../components/Label'
import { ClipboardCopier } from '../../../../components/ClipboardCopier'
import { Icon, Slider, Select } from 'antd';
import { Radio } from 'antd';
import './HSLFilters.css'
import './HSLFiltersCommon.css'
const Option = Select.Option;
const RadioGroup = Radio.Group;

// variations: hueChange: 30, satChange: 20, lightChange:20, h step, s step, l step, number of colors
const presets = {
  analogous: { name: 'Analogous', variations: [[30, 0, 10, 10, 1, 1, 30], [30, 20, 20, 25, 5, 1, 75], [30, 0, 20, 5, 1, 1, 15]] },
  square: { name: 'Square', variations: [[60, 0, 10, 10, 1, 1, 40], [60, 20, 20, 25, 5, 1, 100], [60, 0, 20, 5, 1, 1, 20]] },
  triad: { name: 'Triad', variations: [[120, 0, 10, 10, 1, 1, 30], [120, 20, 20, 25, 5, 1, 75], [120, 0, 20, 5, 1, 1, 15]] },
  _12Colors: { name: '12 Colors', variations: [[30, 0, 10, 10, 5, 1, 120], [30, 0, 20, 5, 1, 1, 60]] }
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
    hueChange: 27, satChange: 0, lightChange: 50,
    hueStep: 1, satStep: 1, lightStep: 2,
    numberOfColors: 72,
    clickedColor: 0,
    selectedPreset: 'None',
    selectedVariation: 0
  };

  componentDidUpdate = () => { }

  // PRESETS HANDLERS
  handleSelectPreset = e => {
    let selectedPreset = e.target.value
    this.setState({ selectedPreset: selectedPreset, selectedVariation: 0 }, () => {
      if (selectedPreset == 'None') return
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
  handleSelectVariation = (val) => { console.log(val); this.setState({ selectedVariation: val }, this.resetFilters(val)) }

  // FILTER HANDLERS
  handleHueChange = value => this.setState({ hueChange: value, selectedPreset: 'None' })
  handleSatChange = value => this.setState({ satChange: value, selectedPreset: 'None' })
  handleLightChange = value => this.setState({ lightChange: value, selectedPreset: 'None' })
  handleHueStepChange = value => this.setState({ hueStep: value, selectedPreset: 'None' })
  handleSatStepChange = value => this.setState({ satStep: value, selectedPreset: 'None' })
  handleLightStepChange = value => this.setState({ lightStep: value, selectedPreset: 'None' })
  handleNumberOfColorsChange = n => this.setState({ numberOfColors: n, selectedPreset: 'None' })

  // EXPORT JSON, RESET BUTTONS HANDLERS
  handleResetButtonClick = () => {
    this.setState({ selectedPreset: 'None' })
    this.setFilters(27, 0, 50, 2, 1, 1, 72)
  }
  handleExportJSON_ButtonClick = () => {
    let colorElements = document.getElementById("generated-tiles").getElementsByTagName("div")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].style.backgroundColor
    }
    exportJSON(colors)
  }

  // SLIDER INPUT
  getSliderInput = (value, onChange, min, max, label) =>
    <div> <Label class="slider-label" title={label} />
      <Slider class="slider-input" min={min} max={max} onChange={onChange} value={value} />
      <input class="slider-input-txt" type='number' min={min} max={max} onChange={(e) => onChange(e.target.value)} value={value} />
    </div>

  // TILES PART
  handleSelectColor = (hex, index) => {
    this.setState({ clickedColor: index })
    this.props.selectColor(hex)
  }
  getTilesRow = (colors, rowNumber) => colors.map((color, index) => {
    index = index + colors.length * rowNumber
    return <div className={"single-tile" + this.state.clickedColor == index ? 'selected-tile' : ''} onClick={() => this.handleSelectColor(color, index)} style={{ backgroundColor: color }} key={index + color} />
  })
  getTiles = () => {
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, selectedPreset, numberOfColors } = this.state
    let palette = new HSLPaletteGenerator(this.props.baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette
    let splitter = selectedPreset != 'None' ? hueStep : numberOfColors
    let rows = getChunks(palette, splitter)
    let rowNumber = rows.length
    if (rowNumber == 0)
      return this.getTilesRow(rows[0], 0)
    else
      return Array.apply(null, { length: rowNumber }).map((el, rowNumber) => (<div class="tiles-row" key={'presetgenerated' + rowNumber}>{this.getTilesRow(rows[rowNumber], rowNumber)} </div>))
  }

  render() {
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, selectedPreset, numberOfColors, selectedVariation } = this.state
    let selectedColor = this.props.selected
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <div id="hsl-filters-holder" className="element-holder">
        <div>

          {/* PRESETS */}
          <div className='bottom-bordered' >
            {/* Presets Radio Group */}
            <RadioGroup id='presets-group' value={selectedPreset} onChange={this.handleSelectPreset}>
              <Radio value={'None'}>None</Radio>
              {Object.keys(presets).map(key => <Radio key={key} value={key}>{presets[key].name}</Radio>)}
            </RadioGroup>
            {/* Preset Style */}
            {selectedPreset != 'None' &&
              <Select id="select-preset-style" value={selectedVariation} onChange={this.handleSelectVariation} size="small">
                {presets[selectedPreset].variations.map((v, i) => <Option key={'varOption' + selectedPreset + i} value={i}>Style {i}</Option>)}
              </Select>
            }
          </div>

          {/* HSL FILTERS */}
          <div className='bottom-bordered'>
            <div >
              {/* Steps */}
              <span style={{ float: 'right' }}>
                {this.getSliderInput(hueStep, this.handleHueStepChange, 1, 100, 'Hue Step')}
                {this.getSliderInput(satStep, this.handleSatStepChange, 1, 100, 'Saturation Step')}
                {this.getSliderInput(lightStep, this.handleLightStepChange, 1, 100, 'Light Step')}
              </span>
            </div>
            {/* Changes */}
            <div >
              {this.getSliderInput(hueChange, this.handleHueChange, 0, 120, 'Hue Change')}
              {this.getSliderInput(satChange, this.handleSatChange, 0, 100, 'Saturation Change')}
              {this.getSliderInput(lightChange, this.handleLightChange, 0, 100, 'Light Change')}
            </div>
          </div>

          {/* NUMBER OF COLORS, SELECTED COLOR VALUE, EXPORT JSON, RESET BUTTON */}
          <div className="vertical-padding">
            {/* ExportJSON */}
            <Icon type="export" className="export-json-btn" onClick={this.handleExportJSON_ButtonClick} />
            {/* Reset */}
            <Icon type="reload" onClick={this.handleResetButtonClick} id="reset-btn" />
            {/* Number Of Colors */}
            <div id='number-of-colors-input'> {this.getSliderInput(numberOfColors, this.handleNumberOfColorsChange, 6, 181, 'Number of Colors')} </div>
            {/* Selected Color Panel */}
            <div id="selected-color-panel" style={{ backgroundColor: selectedColor, color: selectedColorFont, border: '1px solid ' + selectedColorFont }}>
              {selectedColor} <ClipboardCopier value={selectedColor} />
            </div>
          </div>

          {/* GENERATED TILES */}
          <div id="generated-tiles"> {this.getTiles()} </div>
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFilters);
