import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
//import Filters from './Filters'
import Tiles from './Tiles'
import DisplayOrderButtons from './DisplayOrderButtons'
import { ExportJSONButton } from '../../components/ExportJSONButton'
import { exportJSON } from '../../utilities/ExportJSON'
import './HSLFiltersAlternative.css'
import SelectMode from "./HSL/components/SelectMode/SelectMode"
import ColorPicker from "../../components/color-picker/ColorPicker";
import { Popover } from 'antd';
import TryMain from "../../components/TryIt/TryMain";

let mapStateToProps = (state) => {
    return {
        selected: state.SelectedColorReducer.selected,
        baseColor: state.BaseColorReducer.baseColor
    }
}

class Generate extends Component {
    // EXPORT JSON HANDLER
    handleExportJSON_ButtonClick = () => {
        let colorElements = document.getElementsByClassName("single-tile-basic")
        let colors = {}
        for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
        exportJSON(colors)
    }

    render() {
        let baseColorFont = this.props.baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'rgb(237, 237, 237)'
        return (
            <div className='horizontal-holder-ls'>
                <div id='palette-container' >
                    <div className=" tiles-actions-bar " >
                        <ExportJSONButton onClick={this.handleExportJSON_ButtonClick} />
                        <DisplayOrderButtons />
                    </div>
                    <Tiles />
                    <div></div>
                </div>


                <div className='vertical-holder-sl'>
                    <div className='filters-part' >
                        <SelectMode />
                        

                    </div>
                    <div>
                        <div className='filters-long-part'>
                            <div style={{ display: 'flex' }}>
                                <Popover content={<ColorPicker />} placement="bottom">
                                    <div className='base-color-select-container' style={{ background: this.props.baseColor.HEXString }} >
                                        <h3 className='select-color-btn' style={{ color: baseColorFont }} >BASE COLOR</h3>
                                    </div>
                                </Popover>
                            </div>
                            <div><TryMain /></div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Generate;


