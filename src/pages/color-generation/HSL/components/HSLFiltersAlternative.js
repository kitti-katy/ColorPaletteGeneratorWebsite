import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import { getAdvancedPalette } from "../../../../utilities/HSLPaletteGenerator";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
//import { Label } from '../../../../components/Label'
import { ExportJSONButton } from '../../../../components/ExportJSONButton'
import { SelectedColorPanel } from '../../../../components/SelectedColorPanel'
import { Slider, Tooltip } from 'antd';
import './HSLFiltersAlternative.css'
import './HSLFiltersCommon.css'
import SelectMode from "./SelectMode"
import { Card, Label, Icon } from "@blueprintjs/core";

let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected,
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

const displayOptions = [['h', 's', 'l'], ['h', 'l', 's'], ['s', 'h', 'l'], ['l', 'h', 's'], ['s', 'l', 'h'], ['l', 's', 'h']]
const hueDivisors = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 8: '8', 9: '9', 10: '10', 12: '12', 15: '15', 18: '18', 20: '20', 24: '24', 30: '30' }
const satLightDivisors = { 1: '1', 2: '2', 4: '4', 5: '5', 10: '10', 20: '20' }

class HSLFiltersAlternative extends Component {
  state = {
    hueSplitter: 8, satSplitter: 1, lightSplitter: 10,
    selectedDisplayOption: 0,
    selectedColorId: ''
  };

  componentDidUpdate = () => { }

  getPalette = () => {
    let { hueSplitter, satSplitter, lightSplitter, selectedDisplayOption } = this.state
    let levels = displayOptions[selectedDisplayOption]
    let palette = getAdvancedPalette(this.props.baseColor, hueSplitter, satSplitter, lightSplitter, levels[0], levels[1], levels[2], 0, 0)
    return palette
  }

  // FILTER HANDLERS
  handleHueSliderChange = value => this.setState({ hueSplitter: value })
  handleSatSliderChange = value => this.setState({ satSplitter: value })
  handleLightSliderChange = value => this.setState({ lightSplitter: value })

  // EXPORT JSON HANDLER
  handleExportJSON_ButtonClick = () => {
    let colorElements = document.getElementsByClassName("single-tile-basic")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
    exportJSON(colors)
  }

  // TILES PART
  handleSelectColor = (hex, selectedColorId) => {
    this.setState({ selectedColorId })
    this.props.selectColor(hex)
  }

  handleChangeOrderUpClick = () => {
    let next = this.state.selectedDisplayOption + 1
    next = next == displayOptions.length ? 0 : next
    this.setState({ selectedDisplayOption: next })
  }
  handleChangeOrderDownClick = () => {
    let next = this.state.selectedDisplayOption - 1
    next = next == -1 ? displayOptions.length-1 : next
    this.setState({ selectedDisplayOption: next })
  }

  render() {
    let palette = this.getPalette()

    let selectedColor = this.props.selected
    //let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <Card id="hsl-filters-holder" className="element-holder">
        <div>

          {/* Mode Select */}
          <SelectMode />

          {/* CHANGE FILTERS */}
          {/* Hue */}
          <div id='hsl-container-1'>
            <Label className="slider-label">Number Of Hues</Label>
            <Slider marks={hueDivisors} step={null} defaultValue={12} max={30} min={1} onChange={this.handleHueSliderChange} />

            <div style={{ marginTop: '44px' }}>
              {/* Light */}
              <div style={{ float: 'right', width: '45%' }}>
                <Label className="slider-label">Number Of Lights</Label>
                <Slider marks={satLightDivisors} step={null} defaultValue={5} max={20} min={1} onChange={this.handleLightSliderChange} />
              </div>
              {/* Saturation */}
              <div style={{ width: '45%' }}>
                <Label className="slider-label" >Number Of Saturations</Label>
                <Slider marks={satLightDivisors} step={null} defaultValue={1} max={20} min={1} onChange={this.handleSatSliderChange} />
              </div>
            </div>
          </div>


          {/*} <div className="vertical-padding bottom-bordered"></div>*/}

          {/* SELECTED COLOR VALUE, EXPORT JSON */}
          <div className=" hsl-container-2 bottom-bordered top-bordered">
            {/* Change Order Up */}
            <Icon icon="arrow-up" className="arrow-btn" onClick={this.handleChangeOrderUpClick} />
            {/* Change Order Down*/}
            <Icon icon="arrow-down" className="arrow-btn" onClick={this.handleChangeOrderDownClick} />
            {/* ExportJSON */}
            <ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
            {/* Selected Color Panel */}
            <SelectedColorPanel selectedColor={selectedColor} />
          </div>


          {/* GENERATED TILES */}
          <div class="bottom-bordered tiles-holder generated-tiles">
            {palette.map((satArr, i1) =>
              <div className="level-1-holder" key={i1 + "l1"}>
                {satArr.map((lightArr, i2) =>
                  <div style={{ display: 'block' }} key={i2 + "l2"}>
                    {lightArr.map((lightColor, i3) => {
                      let color = lightColor.HEXString
                      let isSelected = this.state.selectedColorId == color
                      return <div key={i3 + color} id={color}
                        className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')} style={{ background: color }}
                        onClick={() => this.handleSelectColor(color, color)} />
                    }
                    )}
                  </div>
                )}
              </div>)}
          </div>
        </div>
      </Card >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFiltersAlternative);

