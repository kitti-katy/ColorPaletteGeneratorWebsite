import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import { Label } from '../../../../components/Label'
import { Input, Button, Icon } from 'antd';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const padding = '8px'

let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLFilters extends Component {
  state = {
    hueChange: 10,
    satChange: 0,
    lightChange: 8,
    hueStep: 10,
    satStep: 1,
    lightStep: 1,
    numberOfColors: 126,

    clickedColor: 0,
    selectedPreset: 'None'
  };
  handleHueChange = e => this.setState({ hueChange: e.target.value, selectedPreset: 'None' })
  handleSatChange = e => this.setState({ satChange: e.target.value, selectedPreset: 'None' })
  handleLightChange = e => this.setState({ lightChange: e.target.value, selectedPreset: 'None' })
  handleHueStepChange = e => this.setState({ hueStep: e.target.value, selectedPreset: 'None' })
  handleSatStepChange = e => this.setState({ satStep: e.target.value, selectedPreset: 'None' })
  handleLightStepChange = e => this.setState({ lightStep: e.target.value, selectedPreset: 'None' })
  handleNumberOfColorsChange = e => {
    let n = e.target.value
    if ((n > 0 && n < 144) || (n == ''))
      this.setState({ numberOfColors: n, selectedPreset: 'None' })
  }

  selectPreset = e => {
    let preset = e.target.value
    this.setState({ selectedPreset: preset })
    switch (preset) {
      case "Analogous": this.setAnalogous();
      case "Adjacent": this.setAdjacent();
      case "Tetrad": this.setTetrad();
      case "Triad": this.setTriad();
    }
  }

  reset = () => {
    this.setState({ selectedPreset: 'None' })
    this.setFilters(10, 0, 8, 1, 1, 1, 126)
  }

  setAnalogous = () => this.setFilters(30, 20, 20, 16, 5, 1, 60)
  setTetrad = () => this.setFilters(30, 20, 20, 16, 5, 1, 60)
  setMonochromatic = () => this.setFilters(30, 20, 20, 16, 5, 1, 60)
  setAdjacent = () => this.setFilters(30, 20, 20, 16, 5, 1, 60)
  setTriad = () => this.setFilters(30, 20, 20, 16, 5, 1, 60)

  setFilters = (hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) => this.setState({ hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors })

  handleSelectColor = (hex, index) => {
    this.setState({ clickedColor: index })
    this.props.selectColor(hex)
  }

  exportJSON = () => {
    let colorElements = document.getElementById("generated-colors").getElementsByTagName("div")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].attributes.backgroundColor
    }
    exportJSON(colors)
  }

  render() {
    let baseColor = this.props.baseColor;
    let hue = baseColor.hsl.hue;
    let sat = baseColor.hsl.sat;
    let light = baseColor.hsl.light;

    let anyColor = new Color(0, 0, 0, 'RGB')

    const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, selectedPreset, numberOfColors, clickedColor } = this.state

    let selectedColor = this.props.selected
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <div style={{ width: '700px' }}>
        <div>

          {/* <h2 style={{ textAlign: 'left' }}> Filters </h2> */}

          <div style={{ borderBottom: '1px solid #e8e8e8', padding: padding + ' 0' }} >
            <RadioGroup value={selectedPreset} onChange={this.selectPreset} style={{ display: 'flex' }} >
              <Radio value={'None'}>None</Radio>
              <Radio value={'Analogous'}>Analogous</Radio>
              <Radio value={'Adjacent'}>Adjacent</Radio>
              <Radio value={'Triad'}>Triad</Radio>
              <Radio value={'Tetrad'}>Tetrad</Radio>
            </RadioGroup>
          </div>

          <div style={{ borderBottom: '1px solid #e8e8e8', padding: padding + ' 0' }}>
            <div >
              <span style={{ float: 'right' }}><div style={{}}>Steps: </div>
                <span style={{ fontSize: '14px', marginLeft: '12px' }}>
                  <span>
                    <Label title="H" />
                    < Input size="small" style={{ width: '60px' }} type="number" min="0" max='360' value={hueStep} onChange={this.handleHueStepChange} />
                  </span>
                  <span style={{ margin: '18px' }}>
                    <Label title="S" style={{ marginLeft: '18px' }} />
                    < Input size="small" style={{ width: '60px' }} type="number" min="0" max='100' value={satStep} onChange={this.handleSatStepChange} />
                  </span>
                  <span>
                    <Label title="L" style={{ marginLeft: '18px' }} />
                    < Input size="small" style={{ width: '60px' }} type="number" min="0" max='100' value={lightStep} onChange={this.handleLightStepChange} />
                  </span>
                </span>
              </span>
            </div>

            <div > <div style={{}}> Changes: </div>
              <span style={{ fontSize: '14px', marginLeft: '12px' }}>
                <span>
                  <Label title="H" />
                  < Input size="small" style={{ width: '60px' }} type="number" min="0" max='100' value={hueChange} onChange={this.handleHueChange} />
                </span>
                <span style={{ margin: '18px' }}>
                  <Label title="S" style={{ margin: '18px' }} />
                  < Input size="small" style={{ width: '60px' }} type="number" min="0" max='100' value={satChange} onChange={this.handleSatChange} />
                </span>
                <span>
                  <Label title="L" style={{ marginLeft: '18px' }} />
                  < Input size="small" style={{ width: '60px' }} type="number" min="0" max='100' value={lightChange} onChange={this.handleLightChange} />
                </span>
              </span>
            </div>
          </div>

          <div style={{ padding: padding + ' 0' }}>
            <Icon type="export" style={{ float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2' }} onClick={this.exportJSON} />
            <Icon type="reload" onClick={this.reset} style={{ float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2' }} />

            <Label title="Number of Colors" style={{ marginLeft: '18px' }} />
            < Input size="small" style={{ width: '60px', marginLeft: '18px' }} type="number" min="0" max='360'
              value={numberOfColors} onChange={this.handleNumberOfColorsChange} />

            <div
              style=
              {{
                backgroundColor: selectedColor, padding: '2px 20px', textAlign: 'center', color: selectedColorFont,
                border: '1px solid ' + selectedColorFont, display: 'inline', fontSize: '14px', float:'right'
              }}>
              {selectedColor}
            </div>

          </div>

        </div>

        <div id="generated-colors" style={{ height: '330px', lineHeight: '1.45' }}>
          {
            Array.apply(null, { length: numberOfColors }).map((el, index) => {
              let h = (parseInt(hue) + (Math.floor(index / hueStep) * hueChange)) % 360
              let s = (parseInt(sat) + (Math.floor(index / satStep) * satChange)) % 101
              let l = (parseInt(light) + (Math.floor(index / lightStep) * lightChange)) % 101
              let newColor = anyColor.HSLtoHex(h, s, l)
              return <div onClick={() => this.handleSelectColor(newColor, index)}
                style={{
                  backgroundColor: newColor, borderRadius: clickedColor == index ? '25px' : '0',
                  padding: '25px', display: 'inline-block', margin: '-2.5px 0'
                }} ></div>
            })
          }
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFilters);
