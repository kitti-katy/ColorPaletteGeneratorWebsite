import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectColor } from '../../../redux/SelectedColorReducer'
import { setAdvancedHSLInput } from '../../../redux/HSLAdvancedReducer'
import { exportJSON } from '../../../utilities/ExportJSON'
import { Slider } from 'antd';
import { Label } from "@blueprintjs/core";
import SelectBaseColorButton from "../../../components/SelectBaseColorButton";

let mapStateToProps = (state) => {
  return {
    hueChange: state.HSLAdvancedReducer.hueChange,
    satChange: state.HSLAdvancedReducer.satChange,
    lightChange: state.HSLAdvancedReducer.lightChange,
    hueStep: state.HSLAdvancedReducer.hueStep,
    satStep: state.HSLAdvancedReducer.satStep,
    lightStep: state.HSLAdvancedReducer.lightStep,
    numberOfColors: state.HSLAdvancedReducer.numberOfColors
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor, setAdvancedHSLInput }, dispatch) }

class HSLFilters extends Component {

  handleExportJSON_ButtonClick = () => {
    let colorElements = document.getElementById("generated-tiles").getElementsByTagName("div")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].style.backgroundColor
    }
    exportJSON(colors)
  }

  getSliderInput = (value, min, max, label, name) =>
    <div className="hsl-slider">
      <Label className="slider-label">{label} <span style={{ float: 'right' }}>{value}</span></Label>
      <Slider className="slider-input" min={min} max={max}
        onChange={(val) => this.props.setAdvancedHSLInput(this.getEvent(name, val))} value={value} tooltipVisible={false} />
    </div>

  getEvent = (name, value) => ({ target: { value, name } })

  render() {
    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors } = this.props
    return (
      <div>
        <div className=' filters'>
          {/* HSL FILTERS */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Changes */}
            <div >
              {this.getSliderInput(hueChange, 0, 120, 'Hue Change', 'hueChange')}
              {this.getSliderInput(satChange, 0, 100, 'Saturation Change', 'satChange')}
              {this.getSliderInput(lightChange, 0, 100, 'Light Change', 'lightChange')}
            </div>
            {/* Steps */}
            <div>
              {this.getSliderInput(hueStep, 1, 30, 'Hue Step', 'hueStep')}
              {this.getSliderInput(satStep, 1, 30, 'Saturation Step', 'satStep')}
              {this.getSliderInput(lightStep, 1, 30, 'Light Step', 'lightStep')}
            </div>
          </div>

          {/* NUMBER OF COLORS, SELECTED COLOR VALUE, EXPORT JSON, RESET BUTTON */}
          <div className="vertical-padding bottom-bordered" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "12px" }}>
            {/* Number Of Colors */}
            <div id='number-of-colors-input'> {this.getSliderInput(numberOfColors, 6, 181, 'Number of Colors', 'numberOfColors')} </div>
          </div>
          <div>
            <SelectBaseColorButton />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFilters);
