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
    state = { containerWidth: 0 }

    componentDidMount = () => {
        this.setState({ containerWidth: document.getElementById('palette-container').clientWidth })
    }
    getPadding = (palette) => {
        let width = palette.length
        let height = palette[0].length
        let innerWidth = palette[0][0].length
        let containerWidth = this.state.containerWidth
        let tileWidth = containerWidth / (width * innerWidth)
        let scaler = innerWidth * width >= 40 ? 1 : 2
        let padding = 100 / (innerWidth * 2) + '%'
        console.log(padding)
        return padding
    }
    getRowHolderWidth = (palette) => {
        let width = palette.length
        let innerWidth = palette[0][0].length
        let tilesHorizontal = innerWidth * width
        let scaler = tilesHorizontal <= 1 ? 0.125 :
                     tilesHorizontal <= 2 ? 0.25 :
                     tilesHorizontal <= 4 ? 0.5 :
                     tilesHorizontal < 40 ? 1 :
                     tilesHorizontal < 100 ? 2 :
                     tilesHorizontal < 120 ? 3 :
                     tilesHorizontal < 140 ? 4 : 5
        return (100 / width) * scaler + '%'
    }
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

        let tilePadding = this.getPadding(palette)
        let l1Width = this.getRowHolderWidth(palette)
        //let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        return (
            <div class="bottom-bordered tiles-holder generated-tiles" >
                {palette.map((satArr, i1) =>
                    <div className="level-1-holder" key={i1 + "l1"} style={{ width: l1Width }}>
                        {satArr.map((lightArr, i2) =>
                            <div style={{ display: 'block' }} key={i2 + "l2"}>
                                {lightArr.map((lightColor, i3) => {
                                    let color = lightColor.HEXString
                                    let isSelected = selectedColor == color
                                    return <div key={i1 + '' + i2 + '' + i3 + color} id={color}
                                        className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')} style={{ background: color, padding: tilePadding }}
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

