import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Slider } from 'antd';
import '../HSLFiltersAlternative.css'
import { Label } from "@blueprintjs/core";
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

const hueDivisors = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15]
const lightDivisors = [1, 2, 4, 5, 10, 20]
const satDivisors = [1, 2, 4, 5, 10]


class Filters extends Component {
    handleHueSliderChange = (index) => this.props.setHueSplit(hueDivisors[index])
    handleSatSliderChange = (index) => this.props.setSatSplit(satDivisors[index])
    handleLightSliderChange = (index) => this.props.setLightSplit(lightDivisors[index])

    render() {
        const { hueSplit, satSplit, lightSplit } = this.props
        return (
            <div>
                <div className='filters' >

                    <div>
                        <Label className="slider-label">Hues <span style={{ float: 'right' }}>{hueSplit}</span></Label>
                        <Slider
                            value={hueDivisors.indexOf(hueSplit)}
                            min={0}
                            max={hueDivisors.length - 1}
                            step={1}
                            onChange={this.handleHueSliderChange}
                            tooltipVisible={false}
                        />
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
                            tooltipVisible={false}
                        />
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
                            tooltipVisible={false}
                        />
                    </div>
                    <SelectBaseColorButton />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

