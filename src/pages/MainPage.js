import React, { Component } from "react";
import { connect } from "react-redux";
import { exportJSON } from '../utilities/ExportJSON'
import SelectMode from "../sections/filters/SelectMode"
import TryMain from "../sections/try-it/TryMain";
import {LeftActionsBar} from "../sections/side-bar/LeftActionsBar";
import BasicTiles from "../sections/tiles/BasicTiles";
import AdvancedTiles from "../sections/tiles/AdvancedTiles";
import PictureTiles from "../sections/tiles/PictureTiles";
import AdvancedFilters from "../sections/filters/AdvancedFilters";
import BasicFilters from "../sections/filters/BasicFilters";
import PictureFilters from "../sections/filters/PictureFilters";

let mapStateToProps = (state) => {
    return {
        filterMode: state.FilterModeReducer.filterMode
    }
}

class MainPage extends Component {

    // EXPORT JSON HANDLER
    handleExportJSON_ButtonClick = () => {
        let colorElements = document.getElementsByClassName("single-tile-basic")
        let colors = {}
        for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
        exportJSON(colors)
    }
    getDisplayOption = (show) => ({ display: show ? 'block' : 'none', width: '100%' })
    render() {
        let filterMode = this.props.filterMode
        // by hiding components instead of unmounting we will keep thes states saved
        let showBasic = filterMode == 'BASIC'
        let showAdvanced = filterMode == 'ADVANCED'
        let showFromImage = filterMode == 'FROM_IMAGE'

        return (
            <div className='horizontal-holder-ls'>

                <div id='palette-container' >
                    <LeftActionsBar exportJSON={this.handleExportJSON_ButtonClick} />
                    <div>
                        <div style={{ ...this.getDisplayOption(showBasic), margin: 'auto'}} > <BasicTiles /></div>
                        <div style={{ ...this.getDisplayOption(showAdvanced), margin: 'auto' }} > <AdvancedTiles /></div>
                        <div style={{ ...this.getDisplayOption(showFromImage), margin: 'auto' }} > <PictureTiles /></div>
                    </div>

                </div>

                <div className='vertical-holder-sl'>
                    <div className='filters-part' >
                        <SelectMode history={this.props.history} />
                        <div style={this.getDisplayOption(showBasic)} > <BasicFilters /></div>
                        <div style={this.getDisplayOption(showAdvanced)} > <AdvancedFilters /></div>
                        <div style={this.getDisplayOption(showFromImage)} > <PictureFilters /></div>
                    </div>
                    <div>
                        <div className='filters-long-part'>
                            <div><TryMain /></div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps)(MainPage);



