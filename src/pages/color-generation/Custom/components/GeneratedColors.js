import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { changeBaseColor } from '../../../../redux/BaseColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import { Icon, Tooltip } from 'antd'
import { ExportJSONButton } from '../../../../components/ExportJSONButton'
import { ResetColorsButton } from '../../../../components/ResetColorsButton'
import { SelectedColorPanel } from '../../../../components/SelectedColorPanel'

import '../../../../Common.css'


let mapStateToProps = (state) => { return { baseColor: state.BaseColorReducer.baseColor } }
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor, changeBaseColor: changeBaseColor }, dispatch) }

class GeneratedColors extends Component {
    state = { colors: [], clickedColor: 0 };
    componentDidMount = () => this.setState({ colors: [this.props.baseColor.HEXString] })

    handleColorClick = (selectedHex, index, previousIndex) => {
        let newColors = this.state.colors
        // set previously selected color to the picked color
        newColors[previousIndex] = this.props.baseColor.HEXString
        this.selectColor(selectedHex, newColors, index)
    }

    selectColor = (hex, colors, clickedColor) => {
        this.setState({ colors, clickedColor })
        this.props.selectColor(hex)
        this.props.changeBaseColor(new Color(hex, 0, 0, 'Hex'))
    }
    addNewColor = (hex, previousSelectedColorIndex) => {
        let newColors = this.state.colors
        // set previously selected color to the picked color
        newColors[previousSelectedColorIndex] = hex
        // add a new color same as the picked color
        newColors.push(hex)
        this.selectColor(hex, newColors, newColors.length - 1)
    }
    handleExportJSON_ButtonClick = () => exportJSON(this.state.colors)
    handleResetButtonClick = () => { this.setState({ colors: [this.props.baseColor.HEXString], clickedColor: 0 }) }

    render() {
        let baseColor = this.props.baseColor.HEXString;
        let selectedColorIndex = this.state.clickedColor
        let selectedColorFont = new Color(baseColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'
        return (
            <div style={{ width: '400px', width: '41vw' }} className="element-holder">

                <div className=" hsl-container-2 bottom-bordered top-bordered" style={{}}>
                    {/* ExportJSON */}
                    < ExportJSONButton onClick={this.exportJSON} />
                    {/* Reset */}
                    <ResetColorsButton onClick={this.handleResetButtonClick} />
                    {/* Selected Color Panel */}
                    <SelectedColorPanel selectedColor={baseColor} />
                </div>

                <div id="generated-colors" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.colors.map((color, index) =>
                        <div onClick={() => this.handleColorClick(color, index, selectedColorIndex)}
                        className={"single-tile " + (selectedColorIndex == index ? 'selected-tile' : '')}
                            style={{
                                backgroundColor: selectedColorIndex == index ? baseColor : color,
                                padding: '30px', display: 'block'
                            }} />)
                    }
                    <div onClick={() => this.addNewColor(baseColor, selectedColorIndex)}
                        style={{ border: 'gray solid 1px', display: 'grid', verticalAlign: 'center', borderRadius: '50%' }} >
                        <Icon type="plus" style={{ fontSize: '24px', padding: '20px' }} />
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneratedColors);
