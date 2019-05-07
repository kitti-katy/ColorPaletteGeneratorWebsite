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

    getPadding = (palette) => {
        let horizontal = palette[0][0].length
        let padding = 100 / (horizontal * 2) // * by 2 because padding takes left and right parts
        return padding //- 0.1
    }
    getRowHolderWidth = (palette) => {
        let width = palette.length
        let innerWidth = palette[0][0].length
        let vertical = palette[0].length
        let tilesHorizontal = innerWidth * width
        if (width < 5 && vertical == 2 && innerWidth == 1)
            return 4
        if (width < 5 && vertical < 5 && vertical > 2 && innerWidth == 2)
            return 4
        if (width < 5 && vertical < 5 && innerWidth < 6)
            return 2
        if (innerWidth > 10)
            return 1
        if (innerWidth > 7)
            return 2
        if (innerWidth == 6)
            return 3
        if (innerWidth == 5)
            return 4
        if (innerWidth == 4)
            return 5

        let scaler = tilesHorizontal <= 1 ? 0.125 :
            tilesHorizontal <= 2 ? 0.25 :
                tilesHorizontal <= 4 ? 0.5 :
                    tilesHorizontal < 40 ? 1 :
                        tilesHorizontal < 100 ? 2 :
                            tilesHorizontal < 120 ? 3 :
                                tilesHorizontal < 140 ? 4 : 5
        return Math.floor(100 / ((100 / width) * scaler)) //+ '%'
    }
    getFractionNumber = (palette) => {

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
        let wrapperStyle = {
            display: 'grid', gridTemplateColumns: 'repeat(' + l1Width + ', 1fr)',
            gridGap: '2px', width: '100%'
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <div style={wrapperStyle}>
                    {palette.map((satArr, i1) =>
                        <div key={i1 + "l1"}>

                            {satArr.map((lightArr, i2) =>
                                <div key={i2 + "l2"} style={{ lineHeight: 0 }}>
                                    {lightArr.map((lightColor, i3) => {
                                        let color = lightColor.HEXString
                                        let isSelected = selectedColor == color
                                        return <div key={i1 + '' + i2 + '' + i3 + color} id={color}
                                            className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                            style={{
                                                background: color, padding: tilePadding + '%',  minWidth: tilePadding + '%', minHeight: tilePadding + '%',
                                                border: 'none'
                                            }}
                                            onClick={() => this.handleSelectColor(color, color)} />
                                    }
                                    )}
                                </div>
                            )}
                        </div >)}
                </div>
                {/*
                <div style={{ height: '100%', width: '100%', alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {palette.map((satArr, i1) =>
                        <table className="level-1-holder" key={i1 + "l1"} style={{ width: l1Width }}>
                            <tbody>

                                {satArr.map((lightArr, i2) =>
                                    <tr key={i2 + "l2"}>
                                        {lightArr.map((lightColor, i3) => {
                                            let color = lightColor.HEXString
                                            let isSelected = selectedColor == color
                                            return <td key={i1 + '' + i2 + '' + i3 + color} id={color}
                                                className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                                style={{
                                                    background: color, padding: tilePadding + '%', minWidth: tilePadding + '%', minHeight: tilePadding + '%',
                                                    border: 'none'
                                                }}
                                                onClick={() => this.handleSelectColor(color, color)} />
                                        }
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table >)}
                </div>
                                    */}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);

