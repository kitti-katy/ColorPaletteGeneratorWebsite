
import React, { useState, useContext } from "react";
import Color from "../../utilities/Color";
import './ColorPicker.css'
import { Label, NumericInput } from "@blueprintjs/core";
import ColorPickerCanvas from './ColorPickerCanvas'
import { drawHueCanvas, drawSaturationCanvas } from './CanvasFunctions'
import { StoreContext } from '../../Store';

export default function ColorPicker(props) {
  

  const [state, dispatch] = useContext(StoreContext)
  const { baseColor } = props.baseColor == null? state : {baseColor: props.baseColor }
  const [hexValue, setHexValue] = useState(baseColor.HEXString.substring(1));
  const changeBaseColor = (value) => {
    if (props.onChange != null){
      props.onChange(value)
    }
    else {
      dispatch({ name: 'baseColor', value })
    }
  }

  let handleFormInput = color => {
    changeBaseColor(color);
    drawHueCanvas(color, props.id);
    drawSaturationCanvas(color, props.id);
    setHexValue(color.HEXString.substring(1))
  };
  let getNumberPickerInput = (id, max, val, onChange) =>
    <NumericInput style={{ height: '1.4em', width: '50px', marginLeft: '2px' }} buttonPosition="none" size={true} id={id} min="0" max={max} value={val} onValueChange={onChange} />

  // Input Setters
  let setFromHue = value => handleFormInput(new Color(value, baseColor.hsl.sat, baseColor.hsl.light, "HSL"))
  let setFromSat = value => handleFormInput(new Color(baseColor.hsl.hue, value, baseColor.hsl.light, "HSL"))
  let setFromLight = value => handleFormInput(new Color(baseColor.hsl.hue, baseColor.hsl.sat, value, "HSL"))
  let setFromRed = value => { if (value > 0 || value < 256) handleFormInput(new Color(value, baseColor.rgb.g, baseColor.rgb.b, "RGB")) }
  let setFromGreen = value => handleFormInput(new Color(baseColor.rgb.r, value, baseColor.rgb.b, "RGB"))
  let setFromBlue = value => handleFormInput(new Color(baseColor.rgb.r, baseColor.rgb.g, value, "RGB"))
  let setFromHex = e => {
    let val = e.target.value
    if (val.length < 7) {
      setHexValue(val)
      var re = /[0-9A-Fa-f]{6}/g;
      if (re.test(val)) {
        handleFormInput(new Color('#' + e.target.value, 0, 0, "Hex"))
      }
    }
  }
  const { hue, sat, light } = baseColor.hsl
  const { r, g, b } = baseColor.rgb
  let hexString = baseColor.HEXString;
  let hexValue_ = hexString.substring(1)
  //console.log(baseColor.HEXString)

  return (
    <div id={"color-picker"+props.id}>
      <ColorPickerCanvas onChange={changeBaseColor} baseColor={baseColor} setHexInput={setHexValue} id={props.id} />

      <div id={"color-inputs-container"+props.id}>
        <div className="input-boxes">
          <div> <Label>H: </Label> {getNumberPickerInput('H', 359, hue, setFromHue)} </div>
          <div> <Label>S: </Label> {getNumberPickerInput('S', 100, sat, setFromSat)} </div>
          <div> <Label>L: </Label> {getNumberPickerInput('L', 100, light, setFromLight)} </div>
        </div>

        <div className={"input-boxes"}>
          <div> <Label>R: </Label> {getNumberPickerInput('R', 255, r, setFromRed)}</div>
          <div> <Label>G: </Label> {getNumberPickerInput('G', 255, g, setFromGreen)}</div>
          <div> <Label>B: </Label> {getNumberPickerInput('B', 255, b, setFromBlue)} </div>
        </div>

        <div style={{ display: 'inline-block', verticalAlign: 'top', margin: '0px', width: '100%' }}>
          <div className="input-boxes" >
            <div>
              <Label style={{ marginBottom: '0', whiteSpace: 'nowrap' }}>Hex: #</Label>
              <input id={'hex-intput-txt-box'+props.id} className="bp3-input" value={hexValue} onChange={setFromHex}  onBlur={()=>setHexValue(hexValue_)}/>
            </div>
          </div>
          <div id={'picked-color'+ props.id} style={{ backgroundColor: hexString }} />
        </div>

      </div>

    </div>
  );
}
