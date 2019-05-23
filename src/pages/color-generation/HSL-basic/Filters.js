import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import { Slider } from 'antd';
import Slider from '@material-ui/lab/Slider';
import '../HSLFiltersAlternative.css'
import { Card, Label } from "@blueprintjs/core";
import { setHueSplit, setSatSplit, setLightSplit } from '../../../redux/HSLBasicReducer'
import SelectBaseColorButton from "../../../components/SelectBaseColorButton";

let mapDispatchToProps = (dispatch) => { return bindActionCreators({ setHueSplit: setHueSplit, setSatSplit: setSatSplit, setLightSplit: setLightSplit }, dispatch) }
let mapStateToProps = (state) => {
    return {
        hueSplit: state.HSLBasicReducer.hueSplit,
        satSplit: state.HSLBasicReducer.satSplit,
        lightSplit: state.HSLBasicReducer.lightSplit
    }
}
/*
const hueDivisors = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 8: '8', 9: '9', 10: '10', 12: '12', 15: '15' } //, 18: '18', 20: '20', 24: '24', 30: '30' }
const lightDivisors = { 1: '1', 2: '2', 4: '4', 5: '5', 10: '10', 20: '20' }
const satDivisors = { 1: '1', 2: '2', 4: '4', 5: '5', 10: '10' }
*/

const hueDivisors = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15]
const lightDivisors = [1, 2, 4, 5, 10, 20]
const satDivisors = [1, 2, 4, 5, 10]

//const hueMax = 15
//const satMax = 10
//const lightMax = 20

class Filters extends Component {
    // FILTER HANDLERS
    handleHueSliderChange = (e, index) => this.props.setHueSplit(hueDivisors[index])
    handleSatSliderChange = (e, index) => this.props.setSatSplit(satDivisors[index])
    handleLightSliderChange = (e, index) => this.props.setLightSplit(lightDivisors[index])

    render() {
        const { hueSplit, satSplit, lightSplit } = this.props
        return (
            <div>
            <div id='hsl-basic-filters' >

                <div>
                    <Label className="slider-label">Hues <span style={{ float: 'right' }}>{hueSplit}</span></Label>
                    <Slider
                        value={hueDivisors.indexOf(hueSplit)}
                        min={0}
                        max={hueDivisors.length - 1}
                        step={1}
                        onChange={this.handleHueSliderChange}
                    />
                    {/* <Slider marks={hueDivisors} step={null} defaultValue={hueSplit} max={hueMax} min={1} onChange={this.handleHueSliderChange} /> */}
                </div>
                {/* Saturation */}
                <div>
                    <Label className="slider-label" >Saturations <span style={{ float: 'right' }}>{satSplit}</span></Label>
                    <Slider
                        value={satDivisors.indexOf(satSplit)}
                        min={0}
                        max={satDivisors.length - 1}
                        step={1}
                        onChange={this.handleSatSliderChange}
                    />
                    {/*  <Slider marks={satDivisors} step={null} defaultValue={lightSplit} max={satMax} min={1} onChange={this.handleSatSliderChange} /> */}
                </div>
                {/* Light */}
                <div>
                    <Label className="slider-label">Lights <span style={{ float: 'right' }}>{lightSplit}</span></Label>
                    <Slider
                        value={lightDivisors.indexOf(lightSplit)}
                        defaultValue={lightDivisors.indexOf(lightSplit)}
                        min={0}
                        max={lightDivisors.length - 1}
                        step={1}
                        onChange={this.handleLightSliderChange}
                    />
                    {/* <Slider marks={lightDivisors} step={null} defaultValue={satSplit} max={lightMax} min={1} onChange={this.handleLightSliderChange} /> */}
                </div>
                <div>
                    {/*} <Label className="slider-label">Base Color</Label>*/}
                    <SelectBaseColorButton />
                </div>
            </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

