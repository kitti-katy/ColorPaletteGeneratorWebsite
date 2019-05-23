import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HSLPaletteGenerator from "../../../../../utilities/HSLPaletteGenerator";
import { selectColor } from '../../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../../utilities/ExportJSON'
//import { Label } from '../../../../components/Label'
import { ExportJSONButton } from '../../../../../components/ExportJSONButton'
import { ResetColorsButton } from '../../../../../components/ResetColorsButton'
import { SelectedColorPanel } from '../../../../../components/SelectedColorPanel'
import { Slider } from 'antd';
import '../HSLFilters.scss'
import SelectMode from "../../../SelectMode/SelectMode"
import { Card, Label } from "@blueprintjs/core";
import AdvancedHSLFilters from './AdvancedHSLFilters'
import TryMain from "../../../../../components/TryIt/TryMain";


let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLAdvancedContainer extends Component {
  state = {
    hueChange: 27, satChange: 0, lightChange: 20,
    hueStep: 1, satStep: 1, lightStep: 1,
    numberOfColors: 72,
    clickedColor: 0
  };

  componentDidUpdate = () => { }

  setFilters = (hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) => this.setState({ hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors })

  // FILTER HANDLERS
  handleHueChange = value => this.setState({ hueChange: value })
  handleSatChange = value => this.setState({ satChange: value })
  handleLightChange = value => this.setState({ lightChange: value })
  handleHueStepChange = value => this.setState({ hueStep: value })
  handleSatStepChange = value => this.setState({ satStep: value })
  handleLightStepChange = value => this.setState({ lightStep: value })
  handleNumberOfColorsChange = n => this.setState({ numberOfColors: n })

  // EXPORT JSON, RESET BUTTONS HANDLERS
  handleResetButtonClick = () => this.setFilters(27, 0, 20, 1, 1, 1, 72)

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
    <div className="hsl-slider">
      <Label className="slider-label" >{label} </Label>
      <Slider className="slider-input" min={min} max={max} onChange={onChange} value={value} />
      <input className="slider-input-txt" type='number' min={min} max={max} onChange={(e) => onChange(e.target.value)} value={value} />
    </div>
  getSliderInputRight = (value, onChange, min, max, label) =>
    <div className="hsl-slider">
      <Label className="slider-label" style={{ textAlign: 'right' }}>{label} </Label>
      <input className="slider-input-txt" type='number' min={min} max={max} onChange={(e) => onChange(e.target.value)} value={value} />
      <Slider className="slider-input" min={min} max={max} onChange={onChange} value={value} />
    </div>

  // TILES PART
  handleSelectColor = (hex, index) => {
    this.setState({ clickedColor: index })
    this.props.selectColor(hex)
  }
  getTilesRow = (colors, rowNumber) => colors.map((color, index) => {
    index = index + colors.length * rowNumber
    return <div className={"single-tile " + (this.state.clickedColor == index ? 'selected-tile' : '')} onClick={() => this.handleSelectColor(color, index)} style={{ backgroundColor: color }} key={index + color} />
  })
  getTiles = () => {
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors } = this.state
    let palette = new HSLPaletteGenerator(this.props.baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette
    return this.getTilesRow(palette, 0)
  }

  render() {
    let baseColorFont = this.props.baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'rgb(237, 237, 237)'
    return (
      <div className='horizontal-holder-ls'>
        <div id='palette-container' >
          <div className=" tiles-actions-bar " >
            <ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
            <SelectedColorPanel selectedColor={this.props.selected} />
          </div>

          <div class="generated-tiles"> {this.getTiles()} </div>

          <div></div>
        </div>

        <div className='vertical-holder-sl'>
          <div className='filters-part' >
            <SelectMode history={this.props.history} />
            <AdvancedHSLFilters />
          </div>
          <div>
            <div className='filters-long-part'>
              <div><TryMain /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HSLAdvancedContainer);


