import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Color from "../../../../utilities/Color";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { changeBaseColor } from '../../../../redux/BaseColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import {Icon} from 'antd'


let mapStateToProps = (state) => { return { baseColor: state.BaseColorReducer.baseColor } }
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor, changeBaseColor: changeBaseColor }, dispatch) }

class GeneratedColors extends Component {
    state = { colors: [], clickedColor: 0};
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
    exportJSON = () => exportJSON(this.state.colors)

    render() {
        console.log(this.state.colors)
        let baseColor = this.props.baseColor.HEXString;
        let selectedColorIndex = this.state.clickedColor
        return (
            <Grid container spacing={8} style={{ width: '400px' }}>
                <Grid item xs={12} ><button onClick={this.exportJSON}> Export JSON</button></Grid>
                <Grid item xs={12} >
                    <div id="generated-colors" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.state.colors.map((color, index) =>
                            <div onClick={() => this.handleColorClick(color, index, selectedColorIndex)}
                                style={{
                                    backgroundColor: selectedColorIndex == index ? baseColor : color,
                                    borderRadius: selectedColorIndex == index ? '30px' : '0', padding: '30px', display: 'block'
                                }} ></div>)
                        }
                        <div onClick={() => this.addNewColor(baseColor, selectedColorIndex)} 
                        style={{ border: 'gray solid 1px', display: 'grid', verticalAlign:'center' }} >
                        <Icon type="plus" style = {{fontSize:'24px', padding:'20px'}} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneratedColors);
