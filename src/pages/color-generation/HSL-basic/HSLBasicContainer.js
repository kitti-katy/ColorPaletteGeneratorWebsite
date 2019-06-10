import React, { Component } from "react";
import { connect } from "react-redux";
import Filters from './Filters'
import Tiles from './Tiles'
import { exportJSON } from '../../../utilities/ExportJSON'
import '../HSLFiltersAlternative.css'
import SelectMode from "../SelectMode/SelectMode"
import TryMain from "../../../components/TryIt/TryMain";
import LeftActionsBar from "../LeftActionsBar";

let mapStateToProps = (state) => {
    return {
        // baseColor: state.BaseColorReducer.baseColor
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
        return (
            <div className='horizontal-holder-ls'>

                <div id='palette-container' >
                    <LeftActionsBar exportJSON={this.handleExportJSON_ButtonClick} />
                    <div></div>
                    <Tiles />
                    <div></div>
                </div>

                <div className='vertical-holder-sl'>
                    <div className='filters-part' >
                        <SelectMode history={this.props.history} />
                        <Filters />
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

export default connect(mapStateToProps)(HSLBasicContainer);








