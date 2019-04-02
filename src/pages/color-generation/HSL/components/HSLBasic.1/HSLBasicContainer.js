import React, { Component } from "react";
//import { bindActionCreators } from "redux";
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
import { Card, Button } from "@blueprintjs/core";
import { GoldenRatio } from "../../../../../components/GoldenRatio";

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }

class HSLBasicContainer extends Component {
    state = {
        displayTryPanel: true,
    }

    // EXPORT JSON HANDLER
    handleExportJSON_ButtonClick = () => {
        let colorElements = document.getElementsByClassName("single-tile-basic")
        let colors = {}
        for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
        exportJSON(colors)
    }
    setDisplayTryPanel = () => this.setState({ displayTryPanel: !this.state.displayTryPanel })
    render() {
        return (
            <GoldenRatio
                direction="horizontal"
                longFirst={true}
                longChild={
                    <GoldenRatio direction="vertical" longFirst={true}
                        longChild={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: '#10161A' }} id='palette-container'>
                                <div className=" hsl-container-2 bottom-bordered top-bordered" style={{ borderColor: '#30404D' }}>
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
                    <Card style={{ height: '92vh' }}>
                        <SelectMode />
                        <Filters />
                        <ColorPicker />
                        <Button onClick={this.setDisplayTryPanel}>Try Colors</Button>
                    </Card>
                }
            />
        );
    }
}

export default connect(mapStateToProps)(HSLBasicContainer);








