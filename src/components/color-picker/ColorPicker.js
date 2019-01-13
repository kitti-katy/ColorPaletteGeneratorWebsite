import React, { Component } from "react";
import Color from "../../utilities/Color";
import { changeBaseColor } from "../../redux/BaseColorReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Throttle } from "react-throttle";
import Grid from '@material-ui/core/Grid';
import { LabelInput } from '../LabelInput';
import { Label } from '../Label';
import { Input } from 'antd';

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
    saturationRectPositionY: 0
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
    this.props.changeBaseColor(color);
    this.generateSatCanvas(color);
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
    this.generateMainCanvas(color);
  };

  handleFormInput = color => {
    this.props.changeBaseColor(color);
    this.generateMainCanvas(color);
    this.generateSatCanvas(color);
  };
  getNumberPickerInput = (id, max, val, onChange) =>
    <Input size="small" style={{ width: '60px' }} type="number" id={id} min="0" max={max} value={val} onChange={onChange} />

  render() {
    let baseColor = this.props.baseColor;
    let hue = baseColor.hsl.hue;
    let sat = baseColor.hsl.sat;
    let light = baseColor.hsl.light;
    let r = baseColor.rgb.r;
    let g = baseColor.rgb.g;
    let b = baseColor.rgb.b;
    let hexString = baseColor.HEXString;

    let setFromHue = e => this.handleFormInput(new Color(e.target.value, sat, light, "HSL"))
    let setFromSat = e => this.handleFormInput(new Color(hue, e.target.value, light, "HSL"))
    let setFromLight = e => this.handleFormInput(new Color(hue, sat, e.target.value, "HSL"))
    let setFromRed = e => this.handleFormInput(new Color(e.target.value, g, b, "RGB"))
    let setFromGreen = e => this.handleFormInput(new Color(r, e.target.value, b, "RGB"))
    let setFromBlue = e => this.handleFormInput(new Color(r, g, e.target.value, "RGB"))
    let setFromHex = e => this.handleFormInput(new Color(e.target.value, 0, 0, "Hex"))

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <div style={{ display: "inline-block" }}>
              <div id="pickerCircle"
                style={{
                  width: "16px", height: "16px", border: "1px solid white", borderRadius: "15px",
                  marginLeft: baseColor.hsl.hue - 8 + "px", marginTop: baseColor.hsl.light * 2 - 8 + "px",
                  backgroundColor: hexString, position: "absolute", zIndex: 100
                }}
              />
              <Throttle time="15" handler="onMouseMove">
                <canvas height="200" width="360" id="main-canvas-color-picker"
                  style={{ display: "inline", position: "relative", float: "left" }}
                  onMouseDown={this.handleMouseDownMainCanvas} onMouseMove={this.handleMouseMoveMainCanvas}
                  onMouseLeave={this.disableColorChange} onMouseEnter={this.enableColorChange} />
              </Throttle>
            </div>
            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <div id="saturationCircle"
                style={{
                  position: "absolute", display: "inline", marginLeft: "-6px", width: "20px", height: "7px", border: "2px solid white", borderRadius: "3px",
                  marginTop: baseColor.hsl.sat * 2 - 5 + "px", backgroundColor: hexString
                }} />
              <Throttle time="15" handler="onMouseMove">
                <canvas height="200" width="10" id="saturation-canvas-color-picker" style={{ display: "inline", marginRight: "7px" }}
                  onMouseDown={this.handleMouseDownSatCanvas} onMouseMove={this.handleMouseMoveSatCanvas} onMouseLeave={this.disableColorChange} onMouseEnter={this.enableColorChange} />
              </ Throttle>
            </div>
          </Grid>
          <Grid item xs={3} spacing={8}>
            <div> <Label title="H" /> {this.getNumberPickerInput('H', 359, hue, setFromHue)} </div>
            <div> <Label title="S" />{this.getNumberPickerInput('S', 100, sat, setFromSat)} </div>
            <div> <Label title="L" />{this.getNumberPickerInput('L', 100, light, setFromLight)} </div>
          </Grid>
          <Grid item xs={4} spacing={8}> <div style={{ width: "100%", height: "100%", backgroundColor: hexString, display: "inline-block" }} /> </Grid>
          <Grid item xs={3} spacing={8}>
            <div> <Label title="R" />{this.getNumberPickerInput('R', 255, r, setFromRed)}</div>
            <div> <Label title="G" />{this.getNumberPickerInput('G', 255, g, setFromGreen)}</div>
            <div> <Label title="B" />{this.getNumberPickerInput('B', 255, b, setFromBlue)} </div>
          </Grid>
          <Grid item xs={12}>
            <Label title="Hex" /> <Input size="small" style={{ width: "72px" }} type="text" id="Hex" value={hexString} onChange={setFromHex} /> 
          </Grid>
        </Grid>
      </div >
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
