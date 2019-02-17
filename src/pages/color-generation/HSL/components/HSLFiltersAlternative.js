import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import { getAdvancedPalette } from "../../../../utilities/HSLPaletteGenerator";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import { Label } from '../../../../components/Label'
import { ClipboardCopier } from '../../../../components/ClipboardCopier'
import { Icon, Slider, Tooltip } from 'antd';
import './HSLFiltersAlternative.css'
import './HSLFiltersCommon.css'
import SelectMode from "./SelectMode"

let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLFiltersAlternative extends Component {
  state = {
    hueSplitter: 12,
    satSplitter: 5,
    lightSplitter: 5,
    hueDivisors: {
      1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 8: '8', 9: '9', 10: '10', 12: '12',
      15: '15', 18: '18', 20: '20', 24: '24', 30: '30'
    }, //, 36:'36',40:'40',45:'45',60:'60',72:'72'},//,90:'90',120:'120',180:'180'},
    satLightDivisors: { 1: '1', 2: '2', 4: '4', 5: '5', 10: '10', 20: '20' },

    selectedColorId: ''
  };

  componentDidUpdate = () => { }

  // FILTER HANDLERS
  handleHueSliderChange = value => this.setState({ hueSplitter: value })
  handleSatSliderChange = value => this.setState({ satSplitter: value })
  handleLightSliderChange = value => this.setState({ lightSplitter: value })

  // EXPORT JSON HANDLER
  handleExportJSON_ButtonClick = () => {
    let colorElements = document.getElementsByClassName("single-tile-basic")
    console.log(colorElements)
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].style.backgroundColor
    }
    exportJSON(colors)
  }

  // TILES PART
  handleSelectColor = (hex, selectedColorId) => {
    this.setState({ selectedColorId })
    this.props.selectColor(hex)
  }

  render() {
    let { hueSplitter, satSplitter, lightSplitter } = this.state
    let palette = getAdvancedPalette(this.props.baseColor, hueSplitter, satSplitter, lightSplitter, 0, 0)

    let selectedColor = this.props.selected
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <div id="hsl-filters-holder" className="element-holder">
        <div>

          {/* Mode Select */}
          <SelectMode />

          {/* CHANGE FILTERS */}
          {/* Hue */}
          <div id='hsl-container-1'>
            <label className="slider-label">Number Of Hues</label>
            <Slider marks={this.state.hueDivisors} step={null} defaultValue={12} max={30} min={1} onChange={this.handleHueSliderChange} />

            <div style={{ marginTop: '44px' }}>
              {/* Light */}
              <div style={{ float: 'right', width: '45%' }}>
                <label className="slider-label">Number Of Lights</label>
                <Slider marks={this.state.satLightDivisors} step={null} defaultValue={5} max={20} min={1} onChange={this.handleLightSliderChange} />
              </div>
              {/* Saturation */}
              <div style={{ width: '45%' }}>
                <label className="slider-label" >Number Of Saturations</label>
                <Slider marks={this.state.satLightDivisors} step={null} defaultValue={5} max={20} min={1} onChange={this.handleSatSliderChange} />
              </div>
            </div>
          </div>


          {/*} <div className="vertical-padding bottom-bordered"></div>*/}

          {/* SELECTED COLOR VALUE, EXPORT JSON */}
          <div className=" hsl-container-2 bottom-bordered top-bordered">
            {/* ExportJSON */}
            <Tooltip placement="top" title={"Export JSON"}>
              <Icon type="export" className="export-json-btn" onClick={this.handleExportJSON_ButtonClick} />
            </Tooltip>
            {/* Selected Color Panel */}
            <div id="selected-color-panel" style={{ backgroundColor: selectedColor, color: selectedColorFont, border: '1px solid ' + selectedColorFont }}>
              <label>{selectedColor} <ClipboardCopier value={selectedColor} /> </label>
            </div>
          </div>


          {/* GENERATED TILES */}
          <div class="bottom-bordered tiles-holder">
            {palette.map(satArr =>
              <div className="level-1-holder">
                {satArr.map(lightArr =>
                  <div style={{ display: 'block' }}>
                    {lightArr.map(lightColor => {
                      let color = lightColor.HEXString
                      let isSelected = this.state.selectedColorId == color
                      return <div key={color} id={color}
                        className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')} style={{ background: color }}
                        onClick={() => this.handleSelectColor(color, color)} />
                    }
                    )}
                  </div>
                )}
              </div>)}
          </div>
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFiltersAlternative);

