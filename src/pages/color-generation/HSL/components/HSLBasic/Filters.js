import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Slider } from 'antd';
import '../HSLFiltersAlternative.css'
import '../HSLFiltersCommon.css'
import { Card, Label } from "@blueprintjs/core";
import { setHueSplit, setSatSplit, setLightSplit } from '../../../../../redux/HSLBasicReducer'

let mapDispatchToProps = (dispatch) => { return bindActionCreators({ setHueSplit: setHueSplit, setSatSplit: setSatSplit, setLightSplit: setLightSplit }, dispatch) }
let mapStateToProps = (state) => {
    return {
        hueSplit: state.HSLBasicReducer.hueSplit,
        satSplit: state.HSLBasicReducer.satSplit,
        lightSplit: state.HSLBasicReducer.lightSplit
    }
}
const hueDivisors = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 8: '8', 9: '9', 10: '10', 12: '12', 15: '15' } //, 18: '18', 20: '20', 24: '24', 30: '30' }
const lightDivisors = { 1: '1', 2: '2', 4: '4', 5: '5', 10: '10', 20: '20' }
const satDivisors = { 1: '1', 2: '2', 4: '4', 5: '5', 10: '10' }
const hueMax = 15
const satMax = 10
const lightMax = 20

class Filters extends Component {
    // FILTER HANDLERS
    handleHueSliderChange = value => this.props.setHueSplit(value)
    handleSatSliderChange = value => this.props.setSatSplit(value)
    handleLightSliderChange = value => this.props.setLightSplit(value)

    render() {
        const {hueSplit, satSplit, lightSplit} = this.props
        return (
                <div id='hsl-container-1' style={{ paddingBottom: '48px', marginBottom: '24px' }} className="bottom-bordered">
                    <Label className="slider-label">Hues</Label>
                    <Slider marks={hueDivisors} step={null} defaultValue={hueSplit} max={hueMax} min={1} onChange={this.handleHueSliderChange} />
                    {/* Light */}
                    <div style={{ marginTop: '44px' }}>
                        <Label className="slider-label">Lights</Label>
                        <Slider marks={lightDivisors} step={null} defaultValue={satSplit} max={lightMax} min={1} onChange={this.handleLightSliderChange} />
                    </div>
                    {/* Saturation */}
                    <div style={{ marginTop: '44px' }}>
                        <Label className="slider-label" >Saturations</Label>
                        <Slider marks={satDivisors} step={null} defaultValue={lightSplit} max={satMax} min={1} onChange={this.handleSatSliderChange} />
                    </div>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

