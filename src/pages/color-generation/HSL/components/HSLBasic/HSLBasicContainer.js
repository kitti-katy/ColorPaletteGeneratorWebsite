import React, { Component } from "react";
import { connect } from "react-redux";
import Filters from './Filters'
import Tiles from './Tiles'
import DisplayOrderButtons from './DisplayOrderButtons'
import { ExportJSONButton } from '../../../../../components/ExportJSONButton'
import { exportJSON } from '../../../../../utilities/ExportJSON'
import '../HSLFiltersAlternative.css'
import SelectMode from "../SelectMode/SelectMode"
import ColorPicker from "../../../../../components/color-picker/ColorPicker";
import { GoldenRatio } from "../../../../../components/GoldenRatio";
import { borderStyle } from '../../../../../styles'
import { Popover } from 'antd';
import TryMain from "../../../../../components/TryIt/TryMain";

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
        let baseColorFont = this.props.baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'white'
        return (
            <div className='horizontal-holder-ls'>
                <div className='vertical-holder-ls'>
                    <div id='palette-container' style={{ borderRight: borderStyle, borderTop: borderStyle, display: 'flex', flexDirection: 'column' }} >
                        <div className=" hsl-container-2 " >
                            <DisplayOrderButtons />
                            <ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
                        </div>
                        <Tiles />
                    </div>
                    <div className='vertical-long'><TryMain /></div>
                </div>



                <div className='vertical-holder-sl'>
                    <div className='filters-part' >
                        <SelectMode />
                        <div className='horizontal-holder-ls filters-short'>
                            <Filters />
                            <Popover content={<ColorPicker />} placement="bottom">
                                <div className='base-color-select-container' style={{ background: this.props.baseColor.HEXString }} >
                                    <h3 className='select-color-btn' style={{ color: baseColorFont }} >SELECT BASE COLOR</h3>
                                </div>
                            </Popover>
                        </div>

                    </div>



                </div>


            </div>
        );
    }
}

export default connect(mapStateToProps)(HSLBasicContainer);








