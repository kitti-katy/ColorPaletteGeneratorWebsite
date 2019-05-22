import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HSLPaletteGenerator from "../../../../utilities/HSLPaletteGenerator";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
//import { Label } from '../../../../components/Label'
import { ExportJSONButton } from '../../../../components/ExportJSONButton'
import { ResetColorsButton } from '../../../../components/ResetColorsButton'
import { SelectedColorPanel } from '../../../../components/SelectedColorPanel'
import { Slider } from 'antd';
import { Radio } from 'antd';
import '../HSLFilters.scss'
import SelectMode from "./SelectMode/SelectMode"
import { Card, Label } from "@blueprintjs/core";


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
      <Label className="slider-label" style={{textAlign:'right'}}>{label} </Label>
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
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors } = this.state
    let selectedColor = this.props.selected
    //let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <Card id="hsl-filters-holder" className="element-holder" >
        <div>

          {/* Mode Select */}
          <SelectMode />

          {/* HSL FILTERS */}
          <div className='bottom-bordered hsl-advanced-filters'>
            {/* Changes */}
            <div >
              {this.getSliderInput(hueChange, this.handleHueChange, 0, 120, 'Hue Change')}
              {this.getSliderInput(satChange, this.handleSatChange, 0, 100, 'Saturation Change')}
              {this.getSliderInput(lightChange, this.handleLightChange, 0, 100, 'Light Change')}
            </div>
            {/* Steps */}
            <div>
              {this.getSliderInput(hueStep, this.handleHueStepChange, 1, 100, 'Hue Step')}
              {this.getSliderInput(satStep, this.handleSatStepChange, 1, 100, 'Saturation Step')}
              {this.getSliderInput(lightStep, this.handleLightStepChange, 1, 100, 'Light Step')}
            </div>
          </div>

          {/* NUMBER OF COLORS, SELECTED COLOR VALUE, EXPORT JSON, RESET BUTTON */}
          <div className="vertical-padding bottom-bordered" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "12px" }}>
            {/* Number Of Colors */}
            <div id='number-of-colors-input'> {this.getSliderInput(numberOfColors, this.handleNumberOfColorsChange, 6, 181, 'Number of Colors')} </div>

            <div className=" tiles-actions-bar" style={{ marginBottom: "0", padding: "0" }}>
              {/* ExportJSON */}
              < ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
              {/* Reset */}
              <ResetColorsButton onClick={this.handleResetButtonClick} />
              {/* Selected Color Panel */}
              <SelectedColorPanel selectedColor={selectedColor} />
            </div>
          </div>

          {/* GENERATED TILES */}
          <div class="generated-tiles"> {this.getTiles()} </div>
        </div>
      </Card >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLAdvancedContainer);
