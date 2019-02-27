import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectColor } from '../../../../../redux/SelectedColorReducer'
import { Card, Icon } from "@blueprintjs/core";
import { getAdvancedPalette } from "../../../../../utilities/HSLPaletteGenerator";

let mapStateToProps = (state) => {
    return {
        baseColor: state.BaseColorReducer.baseColor,
        selected: state.SelectedColorReducer.selected,
        hueSplit: state.HSLBasicReducer.hueSplit,
        satSplit: state.HSLBasicReducer.satSplit,
        lightSplit: state.HSLBasicReducer.lightSplit,
        displayOrder: state.HSLBasicReducer.displayOrder,
        l1: state.HSLBasicReducer.l1,
        l2: state.HSLBasicReducer.l2,
        l3: state.HSLBasicReducer.l3
    }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class Tiles extends Component {
    getPalette = () => {
        let { baseColor, hueSplit, satSplit, lightSplit, l1, l2, l3 } = this.props
        let palette = getAdvancedPalette(baseColor, hueSplit, satSplit, lightSplit, l1, l2, l3, 0, 0)
        return palette
    }

    // TILES PART
    handleSelectColor = (hex, selectedColorId) => {
        this.setState({ selectedColorId })
        this.props.selectColor(hex)
    }

    render() {
        let palette = this.getPalette()
        let selectedColor = this.props.selected
        //let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        return (
            <div class="bottom-bordered tiles-holder generated-tiles" >
                {palette.map((satArr, i1) =>
                    <div className="level-1-holder" key={i1 + "l1"}>
                        {satArr.map((lightArr, i2) =>
                            <div style={{ display: 'block' }} key={i2 + "l2"}>
                                {lightArr.map((lightColor, i3) => {
                                    let color = lightColor.HEXString
                                    let isSelected = selectedColor == color
                                    return <div key={i3 + color} id={color}
                                        className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')} style={{ background: color }}
                                        onClick={() => this.handleSelectColor(color, color)} />
                                }
                                )}
                            </div>
                        )}
                    </div>)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);

