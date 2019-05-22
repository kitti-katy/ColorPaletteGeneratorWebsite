import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectColor } from '../../../redux/SelectedColorReducer'
import { getAdvancedPalette } from "../../../utilities/HSLPaletteGenerator";

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
        let outer = palette.length
        let width = palette[0][0].length
        let vertical = palette[0].length

        // 1
        if (width == 1) {
            if (vertical == 1)
                return 6
            if (vertical == 10)
                return 12
            if (vertical == 5 & outer > 6)
                return 12
            if (vertical > 1)
                return 8
        }

        // 2
        if (width == 2) {
            if (vertical == 5 && outer == 1)
                return 3
            if (vertical == 5 && outer > 4 && outer < 9)
                return 5
            if (vertical == 5 && outer == 15)
                return 8
            if (vertical < 10 && outer < 9)
                return 4
            if (vertical < 10 && outer > 8 && outer < 12)
                return 5
            if (vertical < 10 && outer >= 12)
                return 6
            if (vertical >= 10 && outer >= 6)
                return 10
            if (vertical >= 10 && outer < 6)
                return 5
        }

        // 4
        if (width == 4) {
            if (vertical == 1 && outer > 1)
                return 2
            if (vertical == 4 && outer > 9)
                return 4
            if (vertical > 4 && outer == 4)
                return 4

            if (vertical == 5 && outer == 1)
                return 2
            if (vertical == 5 && outer > 7)
                return 4
            if (vertical == 5 && outer == 15)
                return 5

            if (vertical >= 10 && outer < 3)
                return 3
            if (vertical >= 10 && outer == 5)
                return 5
            if (vertical >= 10 && outer == 6)
                return 6
            if (vertical >= 10 && outer > 7)
                return 7

        }
        // 5
        if (width == 5) {
            if (vertical == 1 && outer < 7)
                return 1
            if (vertical == 1 && outer > 6)
                return 2
            if (vertical == 2 && outer > 9)
                return 3
            if (vertical == 2 && outer < 9)
                return 2
            if (vertical == 4 && outer <= 2)
                return 2
            if (vertical == 4 && outer == 4)
                return 2
            if (vertical == 5 && outer <= 2)
                return 2
            if (vertical >= 10 && outer > 7)
                return 6
            if (outer > 9)
                return 4
        }

        // 4 5
        if (width > 3 && width < 6) {
            if (vertical > 3 && outer == 3)
                return 3
            if (vertical == 2 && outer > 4)
                return 3
            if (vertical > 2 && vertical < 6 && outer > 4)// && outer < 10)
                return 3
            if (vertical >= 10 && outer == 1)
                return 2
        }

        // 10 12 15
        if (width >= 10 && width < 20) {
            if (vertical == 1)
                return 1
            if (vertical == 2 && outer < 6)
                return 1
            if (outer == 1)
                return 1
            if (outer >= 2)
                return 2
        }
        // 20
        if (width == 20)
            return 1

        return 2
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
        let numberOfFractions = this.getRowHolderWidth(palette)
        //let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'
        let wrapperStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'

            // display: 'grid', gridTemplateColumns: 'repeat(' + numberOfFractions + ', 1fr)',
            // gridGap: '2px', width: '100%'
        }

        return (
            <div style={{ display: 'table', alignItems: 'center', height: '100%' }}>
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>

                    <div style={wrapperStyle}>
                        {palette.map((satArr, i1) =>
                            <div key={i1 + "l1"} style={{ border: 'solid 4px white', width: (100 / numberOfFractions) - 1 + '%' }}>

                                {satArr.map((lightArr, i2) =>
                                    <div key={i1 + "-" + i2 + "l2"} style={{ lineHeight: 0 }}>
                                        {lightArr.map((lightColor, i3) => {
                                            let color = lightColor.HEXString
                                            let isSelected = selectedColor == color
                                            return <div key={i1 + '' + i2 + '' + i3 + color} id={color}
                                                className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                                style={{
                                                    background: color, padding: tilePadding + '%', width: tilePadding * 2 + '%', height: tilePadding * 2 + '%',
                                                    border: 'none'
                                                }}
                                                onClick={() => this.handleSelectColor(color, color)} />
                                        }
                                        )}
                                    </div>
                                )}
                            </div >)}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);

