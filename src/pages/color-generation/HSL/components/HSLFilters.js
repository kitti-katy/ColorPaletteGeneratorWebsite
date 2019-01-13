import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Color from "../../../../utilities/Color";
import Select from '@material-ui/core/Select';
import { selectColor } from '../../../../redux/SelectedColorReducer'
import MenuItem from '@material-ui/core/MenuItem';
import { exportJSON } from '../../../../utilities/ExportJSON'
import { LabelInput } from '../../../../components/LabelInput'
import { Input, Button, Icon } from 'antd';

let mapStateToProps = (state) => { return { baseColor: state.BaseColorReducer.baseColor } }
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLFilters extends Component {
  state = {
    hueChange: 25,
    satChange: 0,
    lightChange: 1,
    hueStep: 1,
    satStep: 1,
    lightStep: 1,
    numberOfColors: 130,

    clickedColor: 0,
    selectedPreset: 'None'
  };
  handleHueChange = e => this.setState({ hueChange: e.target.value, selectedPreset: 'None' })
  handleSatChange = e => this.setState({ satChange: e.target.value, selectedPreset: 'None' })
  handleLightChange = e => this.setState({ lightChange: e.target.value, selectedPreset: 'None' })
  handleHueStepChange = e => this.setState({ hueStep: e.target.value, selectedPreset: 'None' })
  handleSatStepChange = e => this.setState({ satStep: e.target.value, selectedPreset: 'None' })
  handleLightStepChange = e => this.setState({ lightStep: e.target.value, selectedPreset: 'None' })
  handleNumberOfColorsChange = e => this.setState({ numberOfColors: e.target.value, selectedPreset: 'None' })

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
    this.setFilters(30, 0, 20, 1, 1, 1, 6)
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

    return (
      <div> <h2 style={{textAlign:'left'}}>Apply Filters: <Button style={{float: 'right'}} onClick={this.reset}> <Icon type="reload" /> </Button></h2>
      <Grid container spacing={8} style={{ width: '350px' }}>
        <Grid item xs={12} >Preset: <Select value={selectedPreset} onChange={this.selectPreset} >
          <MenuItem value={'None'}> <em>None</em></MenuItem>
          <MenuItem value={'Analogous'}><em>Analogous</em></MenuItem>
          <MenuItem value={'Adjacent'}><em>Adjacent</em></MenuItem>
          <MenuItem value={'Triad'}><em>Triad</em></MenuItem>
          <MenuItem value={'Tetrad'}><em>Tetrad</em></MenuItem> </Select>
        </Grid>
        <Grid item xs={6} >
          <div style={{ width: '170px' }}>
            <LabelInput label="Hue Change"
              input={< Input size="small" type="number" min="0" max='360' value={hueChange} onChange={this.handleHueChange} />} />
            <LabelInput label="Sat Change"
              input={< Input size="small" type="number" min="0" max='360' value={satChange} onChange={this.handleSatChange} />} />
            <LabelInput label="Light Change"
              input={< Input size="small" type="number" min="0" max='360' value={lightChange} onChange={this.handleLightChange} />} />
          </div>
        </Grid>

        <Grid item xs={6} >
          <div style={{ width: '160px' }}>
            <LabelInput label="Hue Step"
              input={< Input size="small" type="number" min="0" max='360' value={hueStep} onChange={this.handleHueStepChange} />} />
            <LabelInput label="Sat Step"
              input={< Input size="small" type="number" min="0" max='360' value={satStep} onChange={this.handleSatStepChange} />} />
            <LabelInput label="Light Step"
              input={< Input size="small" type="number" min="0" max='360' value={lightStep} onChange={this.handleLightStepChange} />} />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div style={{ width: '200px', marginLeft: '120px' }}>
            <LabelInput label="Number of Colors"
              input={< Input size="small" type="number" min="0" max='360' value={numberOfColors} onChange={this.handleNumberOfColorsChange} />} />
            
          </div>
        </Grid>

        </Grid>

          <h2 style={{ textAlign: 'left' }} >Palette generated: <Button style={{float: 'right'}} onClick={this.exportJSON}> Export JSON</Button></h2>
          <div id="generated-colors" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
              Array.apply(null, { length: numberOfColors }).map((el, index) => {
                let h = (hue + (Math.floor(index / hueStep) * hueChange)) % 360
                let s = (sat + (Math.floor(index / satStep) * satChange)) % 101
                let l = (light + (Math.floor(index / lightStep) * lightChange)) % 101
                let newColor = anyColor.HSLtoHex(h, s, l)
                return <div onClick={() => this.handleSelectColor(newColor, index)}
                  style={{ backgroundColor: newColor, borderRadius: clickedColor == index ? '15px' : '0', padding: '15px', display: 'block' }} ></div>
              })
            }
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFilters);
