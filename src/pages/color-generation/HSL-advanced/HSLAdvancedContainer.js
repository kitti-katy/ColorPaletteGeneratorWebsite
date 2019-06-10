import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectColor } from '../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../utilities/ExportJSON'
import { ExportJSONButton } from '../../../components/ExportJSONButton'
import { SelectedColorPanel } from '../../../components/SelectedColorPanel'
import './HSLFilters.scss'
import SelectMode from "../SelectMode/SelectMode"
import AdvancedHSLFilters from './AdvancedHSLFilters'
import TryMain from "../../../components/TryIt/TryMain";
import AdvancedTiles from "./AdvancedTiles";
import LeftActionsBar from "../LeftActionsBar";


let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLAdvancedContainer extends Component {

  // EXPORT JSON, RESET BUTTONS HANDLERS

  handleExportJSON_ButtonClick = () => {
    let colorElements = document.getElementById("generated-tiles").getElementsByTagName("div")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].style.backgroundColor
    }
    exportJSON(colors)
  }



  render() {
    return (
      <div className='horizontal-holder-ls'>

        <div id='palette-container' >
          <LeftActionsBar exportJSON = {this.handleExportJSON_ButtonClick}/>
          <div></div>
          <div class="generated-tiles"> <AdvancedTiles /> </div>
          <div></div>
        </div>

        <div className='vertical-holder-sl'>
          <div className='filters-part' >
            <SelectMode history={this.props.history} />
            <AdvancedHSLFilters />
          </div>
          <div>
            <div className='filters-long-part'>
              <div><TryMain /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HSLAdvancedContainer);


