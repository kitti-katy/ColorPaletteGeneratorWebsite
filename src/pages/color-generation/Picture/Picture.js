import PictureUpload from "./components/PictureUpload";
import "./Picture.css"
import React, { Component } from "react";
import { connect } from "react-redux";
import { exportJSON } from '../../../utilities/ExportJSON'
import '../HSLFiltersAlternative.css'
import SelectMode from "../SelectMode/SelectMode"
import TryMain from "../../../components/TryIt/TryMain";
import LeftActionsBar from "../LeftActionsBar";
import GeneratedPalettes from "./components/GeneratedPalettes";

let mapStateToProps = (state) => {
  return {
    // baseColor: state.BaseColorReducer.baseColor
  }
}
class Picture extends Component {

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
          <GeneratedPalettes />
          <div></div>
        </div>

        <div className='vertical-holder-sl'>
          <div className='filters-part' >
            <SelectMode history={this.props.history} />
            <PictureUpload />
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

export default connect(mapStateToProps)(Picture);


