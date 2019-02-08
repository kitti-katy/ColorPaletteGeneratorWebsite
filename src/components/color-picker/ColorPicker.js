import React, { Component } from "react";
import Color from "../../utilities/Color";
import { changeBaseColor } from "../../redux/BaseColorReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Throttle } from "react-throttle";
import { Label } from '../Label';
import { Input, Card } from 'antd';

let mapStateToProps = (state) => { return { baseColor: state.BaseColorReducer.baseColor }; }
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch); }

class ColorPicker extends Component {
  state = {
    allowClrChange: false,
    allowSatChange: false,
    mouseDownMainCanvas: false,
    mouseDownSatCanvas: false,

    pickerCirclePositionX: 0,
    pickerCirclePositionY: 0,
    saturationRectPositionY: 0,

    selectedColor: new Color('#edb407', 0, 0, 'Hex'),
    hexValue: 'edb407'
  };
  componentDidMount = () => {
    this.generateMainCanvas(this.props.baseColor);
    this.generateSatCanvas(this.props.baseColor);
    document.addEventListener("mouseup", this.setMouseDownToFalse, false);
    document.addEventListener("mouseup", this.setSatMouseDownToFalse, false);
  };

  generateMainCanvas = baseColor => {
    let sat = baseColor.hsl.sat;
    let canvas = document.getElementById("main-canvas-color-picker");
    let ctx = canvas.getContext("2d");
    for (let i = 0; i < 360; i += 1) {
      var gradient = ctx.createLinearGradient(i, 0, i, 200);
      gradient.addColorStop(0, "hsl(" + i + "," + sat + "%,0%)");
      gradient.addColorStop(0.5, "hsl(" + i + "," + sat + "%,50%)");
      gradient.addColorStop(1, "hsl(" + i + "," + sat + "%,100%)");
      ctx.fillStyle = gradient;
      ctx.fillRect(i, 0, i, 200);
    }
  };
  generateSatCanvas = baseColor => {
    let hue = baseColor.hsl.hue;
    let light = baseColor.hsl.light;
    let canvas = document.getElementById("saturation-canvas-color-picker");
    let ctx = canvas.getContext("2d");
    for (let j = 0; j < 202; j += 2) {
      for (let i = 0; i < 10; i += 1) {
        ctx.fillStyle = "hsl(" + hue + ", " + j / 2 + "%, " + light + "%)";
        ctx.fillRect(i, j, i, j + 2);
      }
    }
  };

  enableColorChange = () => this.setState({ allowClrChange: true });
  disableColorChange = () => this.setState({ allowClrChange: false });

  handleMouseDownMainCanvas = evt => {
    this.setMouseDownToTrue();
    this.enableColorChange();
    this.setColorFromMainCanvas(evt.clientX, evt.clientY);
  };
  handleMouseMoveMainCanvas = evt => {
    if (this.state.mouseDownMainCanvas && this.state.allowClrChange)
      this.setColorFromMainCanvas(evt.clientX, evt.clientY);
  };
  setMouseDownToTrue = () => this.setState({ mouseDownMainCanvas: true });
  setMouseDownToFalse = () => this.setState({ mouseDownMainCanvas: false });

  setColorFromMainCanvas = (clientX, clientY) => {
    let canvas = document.getElementById("main-canvas-color-picker");
    let rect = canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    let hue = Math.round(x);
    let sat = this.props.baseColor.hsl.sat;
    let light = Math.round(y / 2);
    let color = new Color(hue, sat, light, "HSL");
    this.setState({ selectedColor: color })
    this.props.changeBaseColor(color);
    this.generateSatCanvas(color);
    this.setHexInput(color.HEXString.substring(1))
  };

  handleMouseDownSatCanvas = evt => {
    this.setSatMouseDownToTrue();
    this.enableColorChange();
    this.setColorFromSatCanvas(evt.clientY);
  };
  handleMouseMoveSatCanvas = evt => {
    if (this.state.mouseDownSatCanvas && this.state.allowClrChange)
      this.setColorFromSatCanvas(evt.clientY);
  };
  setSatMouseDownToTrue = () => this.setState({ mouseDownSatCanvas: true });
  setSatMouseDownToFalse = () => this.setState({ mouseDownSatCanvas: false });

  setColorFromSatCanvas = clientY => {
    let canvas = document.getElementById("saturation-canvas-color-picker");
    let rect = canvas.getBoundingClientRect();
    let y = clientY - rect.top;
    if (y < 0 || y > 200) return;
    let hsl = this.props.baseColor.hsl;
    let hue = hsl.hue;
    let sat = Math.round(y / 2);
    let light = hsl.light;
    let color = new Color(hue, sat, light, "HSL");
    this.props.changeBaseColor(color);
    this.setState({ selectedColor: color })
    this.generateMainCanvas(color);
    this.setHexInput(color.HEXString.substring(1))
  };

  handleFormInput = color => {
    this.props.changeBaseColor(color);
    this.generateMainCanvas(color);
    this.generateSatCanvas(color);
    this.setHexInput(color.HEXString.substring(1))
  };
  setHexInput = (val) => { this.setState({ hexValue: val }); this.setAppBackground('#' + val) }
  setAppBackground = (hexValue) => { //document.getElementsByTagName('body')[0].style.backgroundColor = hexValue
}
  getNumberPickerInput = (id, max, val, onChange) =>
    <Input size="small" style={{ width: '60px' }} type="number" id={id} min="0" max={max} value={val} onChange={onChange} />

  // Input Setters
  setFromHue = e => this.handleFormInput(new Color(e.target.value, this.props.baseColor.hsl.sat, this.props.baseColor.hsl.light, "HSL"))
  setFromSat = e => this.handleFormInput(new Color(this.props.baseColor.hsl.hue, e.target.value, this.props.baseColor.hsl.light, "HSL"))
  setFromLight = e => this.handleFormInput(new Color(this.props.baseColor.hsl.hue, this.props.baseColor.hsl.sat, e.target.value, "HSL"))
  setFromRed = e => this.handleFormInput(new Color(e.target.value, this.props.baseColor.rgb.g, this.props.baseColor.rgb.b, "RGB"))
  setFromGreen = e => this.handleFormInput(new Color(this.props.baseColor.rgb.r, e.target.value, this.props.baseColor.rgb.b, "RGB"))
  setFromBlue = e => this.handleFormInput(new Color(this.props.baseColor.rgb.r, this.props.baseColor.rgb.g, e.target.value, "RGB"))
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
      <div className="element-holder">

        <div style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 2px', background: 'rgba(61, 61, 61, 0.04)', padding:'1vw'}}>
          {/*<h2 style={{ textAlign: 'left' }} >Pick Color</h2>*/}
          <div style={{ display: "inline-block" }}>
            <div id="pickerCircle"
              style={{
                width: "16px", height: "16px", border: "1px solid", borderColor: light > 50 ? "#757575" : "white", borderRadius: "15px",
                marginLeft: hue - 8 + "px", marginTop: light * 2 - 8 + "px",
                backgroundColor: hexString, position: "absolute", zIndex: 100
              }}
            />
            <Throttle time="20" handler="onMouseMove">
              <canvas height="200" width="360" id="main-canvas-color-picker"
                style={{ display: "inline", position: "relative", float: "left", border: 'solid 1px #0000001c' }}
                onMouseDown={this.handleMouseDownMainCanvas} onMouseMove={this.handleMouseMoveMainCanvas}
                onMouseLeave={this.disableColorChange} onMouseEnter={this.enableColorChange} />
            </Throttle>
          </div>
      
            <div style={{ display: "inline-block", marginLeft: "10px" }}
              onMouseDown={this.handleMouseDownSatCanvas} onMouseMove={this.handleMouseMoveSatCanvas}
              onMouseLeave={this.disableColorChange} onMouseEnter={this.enableColorChange}>
              <div id="saturationCircle"
                style={{
                  backgroundColor: hexString,
                  position: "absolute", display: "inline", marginLeft: "-5.5px", width: "24px", height: "7px",
                  border: "1px solid", borderColor: light > 50 ? "#757575" : "#d9d9d9", borderRadius: "3px",
                  marginTop: sat * 2 - 5 + "px"
                }} />
              <canvas height="200" width="10" id="saturation-canvas-color-picker"
                style={{ display: "inline", marginRight: "7px", border: "1px solid #d9d9d9" }}
              />
            </div>
         
          <div style={{ display: 'grid', justifyContent: 'space-between' }}>
            <div style={{ width: '400px' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'top', width: '87px', marginRight: '16px' }}>
                <div> <Label title="H" />{this.getNumberPickerInput('H', 359, hue, this.setFromHue)} </div>
                <div> <Label title="S" />{this.getNumberPickerInput('S', 100, sat, this.setFromSat)} </div>
                <div> <Label title="L" />{this.getNumberPickerInput('L', 100, light, this.setFromLight)} </div>
              </div>

              <div style={{ display: 'inline-block', verticalAlign: 'top', width: '87px', marginRight: '16px' }}>
                <div> <Label title="R" />{this.getNumberPickerInput('R', 255, r, this.setFromRed)}</div>
                <div> <Label title="G" />{this.getNumberPickerInput('G', 255, g, this.setFromGreen)}</div>
                <div> <Label title="B" />{this.getNumberPickerInput('B', 255, b, this.setFromBlue)} </div>
              </div>

              <div style={{ display: 'inline-block', verticalAlign: 'top', margin: '0px', width: '152px' }}>
                <div style={{ padding: '35px 56px', backgroundColor: hexString, display: 'inline-block', borderRadius: '3px', marginTop: '6px' }} />
                <div style={{ display: 'inline-block' }}>
                  <Label title="Hex #" />
                  <Input size="small" style={{ width: "82px" }} type="text" id="Hex" value={this.state.hexValue} onChange={this.setFromHex} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
