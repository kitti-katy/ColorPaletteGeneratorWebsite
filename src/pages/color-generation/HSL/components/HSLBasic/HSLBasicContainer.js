import React, { Component } from "react";
import { connect } from "react-redux";
import Filters from './Filters'
import Tiles from './Tiles'
import DisplayOrderButtons from './DisplayOrderButtons'
import { ExportJSONButton } from '../../../../../components/ExportJSONButton'
import { exportJSON } from '../../../../../utilities/ExportJSON'
import { SelectedColorPanel } from '../../../../../components/SelectedColorPanel'
import '../HSLFiltersAlternative.css'
import '../HSLFiltersCommon.css'
import SelectMode from "../SelectMode/SelectMode"
import ColorPicker from "../../../../../components/color-picker/ColorPicker";
import TryIt from "../../../../../components/TryIt/TryIt";
import { GoldenRatio } from "../../../../../components/GoldenRatio";
import { borderStyle } from '../../../../../styles'
import { Popover } from 'antd';

let mapStateToProps = (state) => {
    return {
        selected: state.SelectedColorReducer.selected,
        baseColor: state.BaseColorReducer.baseColor
    }
}
class HSLBasicContainer extends Component {

    // EXPORT JSON HANDLER
    handleExportJSON_ButtonClick = () => {
        let colorElements = document.getElementsByClassName("single-tile-basic")
        let colors = {}
        for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
        exportJSON(colors)
    }
    render() {
        console.log(this.props.baseColor)
        let baseColorFont = this.props.baseColor.hsl.light > 60 ? 'rgb(33,33,33)' : 'white'
        console.log(baseColorFont)
        return (
            <GoldenRatio
                direction="horizontal"
                longFirst={true}
                longChild={
                    <GoldenRatio direction="vertical" longFirst={true}
                        longChild={
                            <div style={{
                                background: 'white', borderRight: borderStyle,
                                borderTop: borderStyle, height: '100%'
                            }} id='palette-container'>
                                <div className=" hsl-container-2 " >
                                    <DisplayOrderButtons />
                                    <ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
                                    <SelectedColorPanel selectedColor={this.props.selected} />
                                </div>
                                <Tiles />
                            </div>}
                        shortChild={<TryIt />}
                    />
                }

                shortChild={
                    <div style={{ background: 'white', borderTop: borderStyle, height: 'inherit' }}>
                        <SelectMode />
                        <div style={{height: '100%'}}>
                            <GoldenRatio direction="vertical" longFirst={false}
                                shortChild={<Filters />}
                                longChild={
                                    <div>
                                        <br />

                                        <br />
                                        <Popover content={<ColorPicker />}>
                                            <div style={{ background: this.props.baseColor.HEXString, width: '62%', margin: 'auto' }} id='base-color-select-container'>
                                                <h3 style={{ textAlign: 'center', margin: 'auto', paddingTop: '1em', paddingBottom: '1em', color: baseColorFont }}>SELECT BASE COLOR</h3>
                                            </div>
                                        </Popover>
                                    </div>
                                }
                            />
                        </div>
                    </ div>
                }
            />
        );
    }
}

export default connect(mapStateToProps)(HSLBasicContainer);








