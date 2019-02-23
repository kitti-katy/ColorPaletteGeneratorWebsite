
import React, { Component } from "react";
import Color from "../../utilities/Color";
import { changeBaseColor } from "../../redux/BaseColorReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './ColorPicker.css'
import { Card, Label, NumericInput } from "@blueprintjs/core";
import ColorPickerCanvas from './ColorPickerCanvas'
import { drawHueCanvas, drawSaturationCanvas } from './CanvasFunctions'


let mapStateToProps = (state) => { return { baseColor: state.BaseColorReducer.baseColor }; }
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch); }

class ColorPicker extends Component {
  state = {
    selectedColor: new Color('#edb407', 0, 0, 'Hex'),
    hexValue: 'edb407'
  };
  componentDidMount = () => {
  };

  handleFormInput = color => {
    this.props.changeBaseColor(color);
    drawHueCanvas(color);
    drawSaturationCanvas(color);
    this.setHexInput(color.HEXString.substring(1))
  };
  setHexInput = (val) => { this.setState({ hexValue: val }); }
  getNumberPickerInput = (id, max, val, onChange) =>
    <NumericInput buttonPosition="none" size={true} style={{ width: '50px', display: 'inline', marginLeft: '2px' }} id={id} min="0" max={max} value={val} onValueChange={onChange} />

  // Input Setters
  setFromHue = value => this.handleFormInput(new Color(value, this.props.baseColor.hsl.sat, this.props.baseColor.hsl.light, "HSL"))
  setFromSat = value => this.handleFormInput(new Color(this.props.baseColor.hsl.hue, value, this.props.baseColor.hsl.light, "HSL"))
  setFromLight = value => this.handleFormInput(new Color(this.props.baseColor.hsl.hue, this.props.baseColor.hsl.sat, value, "HSL"))
  setFromRed = value => this.handleFormInput(new Color(value, this.props.baseColor.rgb.g, this.props.baseColor.rgb.b, "RGB"))
  setFromGreen = value => this.handleFormInput(new Color(this.props.baseColor.rgb.r, value, this.props.baseColor.rgb.b, "RGB"))
  setFromBlue = value => this.handleFormInput(new Color(this.props.baseColor.rgb.r, this.props.baseColor.rgb.g, value, "RGB"))
  setFromHex = e => {
    let val = e.target.value
    if (val.length < 7) {
      this.setState({ hexValue: val })
      var re = /[0-9A-Fa-f]{6}/g;
      if (re.test(val)) {
        this.handleFormInput(new Color('#' + e.target.value, 0, 0, "Hex"))
      }
    }
  }

  render() {
    let baseColor = this.props.baseColor;
    const { hue, sat, light } = baseColor.hsl
    const { r, g, b } = baseColor.rgb
    let hexString = '#' + this.state.hexValue;

    return (
      <Card className="element-holder">

        <div id="color-picker">
          <ColorPickerCanvas onChange={this.props.changeBaseColor} baseColor={baseColor} setHexInput={this.setHexInput} />
          <div id="canvases-container">
          </div>

          <div id="color-inputs-container">
            <div className="input-boxes">
              <div> <Label>H: </Label> {this.getNumberPickerInput('H', 359, hue, this.setFromHue)} </div>
              <div> <Label>S: </Label> {this.getNumberPickerInput('S', 100, sat, this.setFromSat)} </div>
              <div> <Label>L: </Label> {this.getNumberPickerInput('L', 100, light, this.setFromLight)} </div>
            </div>

            <div className="input-boxes">
              <div> <Label>R: </Label> {this.getNumberPickerInput('R', 255, r, this.setFromRed)}</div>
              <div> <Label>G: </Label> {this.getNumberPickerInput('G', 255, g, this.setFromGreen)}</div>
              <div> <Label>B: </Label> {this.getNumberPickerInput('B', 255, b, this.setFromBlue)} </div>
            </div>

            <div style={{ display: 'inline-block', verticalAlign: 'top', margin: '0px', width: '100%' }}>
              <div id='picked-color' style={{ backgroundColor: hexString }} />
              <div className="input-boxes">
                <div>
                  <Label style={{ marginBottom:'0', whiteSpace:'nowrap' }}>Hex: #</Label> 
                  <input id='hex-intput-txt-box' style={{ width: "82px", marginLeft: '2px' }} class="bp3-input" value={this.state.hexValue} onChange={this.setFromHex} />
                </div>
              </div>
            </div>

          </div>

        </div>
      </Card>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);