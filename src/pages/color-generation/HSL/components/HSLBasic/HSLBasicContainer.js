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
import {borderStyle} from '../../../../../styles'

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }

class HSLBasicContainer extends Component {

    // EXPORT JSON HANDLER
    handleExportJSON_ButtonClick = () => {
        let colorElements = document.getElementsByClassName("single-tile-basic")
        let colors = {}
        for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
        exportJSON(colors)
    }
    render() {
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
                    <div style={{ background: 'white', borderTop: borderStyle, height: '100%' }}>
                        <SelectMode />
                        <div style={{ height: 'inherit' }}>
                            <GoldenRatio direction="vertical" longFirst={false} style={{ height: 'inherit' }}
                                shortChild={<Filters />}
                                longChild={<ColorPicker />}
                            />
                        </div>
                    </ div>
                }
            />
        );
    }
}

export default connect(mapStateToProps)(HSLBasicContainer);








