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
import SelectMode from "../SelectMode"
import ColorPicker from "../../../../../components/color-picker/ColorPicker";
import TryIt from "../../../../../components/TryIt/TryIt";
import { Card } from "@blueprintjs/core";

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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '100%', display: 'inline-block' }}>
                    <div className=" hsl-container-2 bottom-bordered top-bordered" style={{ background: '#10161A', borderColor: '#30404D' }}>
                        <DisplayOrderButtons />
                        <ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
                        <SelectedColorPanel selectedColor={this.props.selected} />
                    </div>
                    <Tiles />
                </div>

                <Card style={{ display: 'inline-block',  height: '92vh' }}>
                    <SelectMode />
                    <Filters />
                    <ColorPicker />
                </Card>

                {/*  <TryIt /> */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(HSLBasicContainer);








