import React, { useState, useContext } from "react";
import { getAdvancedPalette } from "../../utilities/HSLPaletteGenerator";
import { convertToBlind } from "../../utilities/BlindConversion";
import { StoreContext } from '../../Store';

const getPadding = (palette) => {
    let horizontal = palette[0][0].length
    let padding = 100 / (horizontal * 2) // * by 2 because padding takes left and right parts
    return padding //- 0.1
}
const getRowHolderWidth = (palette) => {
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


export default function BasicTiles(props) {

    const [state, dispatch] = useContext(StoreContext)
    const [selectedKey, setSelectedKey] = useState('');
    const { hueSplit, satSplit, lightSplit, baseColor, blindness, filterMode } = state
    const selectColor = (color) => dispatch({ name: 'selected', value: color })


    // TILES PART
    let handleSelectColor = (hexValue, selectedKey) => {
        setSelectedKey(selectedKey)
        selectColor(hexValue)
    }

    let palette = getAdvancedPalette(baseColor, hueSplit, satSplit, lightSplit, 'h', 's', 'l', 0, 0)
    let tilePadding = getPadding(palette)
    let numberOfFractions = getRowHolderWidth(palette)

    return (
            <div className='tiles-section-cell'>
                {palette.map((satArr, i1) =>
                    <div key={i1 + "l1"} style={{ border: 'solid 4px white', width: (100 / numberOfFractions) - 1 + '%' }}>

                        {satArr.map((lightArr, i2) =>
                            <div key={i1 + "-" + i2 + "l2"} style={{ lineHeight: 0 }}>
                                {lightArr.map((lightColor, i3) => {
                                    let color = lightColor.HEXString
                                    let blindedColor = convertToBlind(lightColor, blindness)
                                    let colorKey = i1 + '' + i2 + '' + i3 + color
                                    let isSelected = selectedKey == colorKey
                                    return <div key={colorKey} id={color}
                                        className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                        style={{ background: blindedColor, padding: tilePadding + '%', width: tilePadding * 2 + '%', height: tilePadding * 2 + '%' }}
                                        onClick={() => handleSelectColor(color, colorKey)} />

                                }
                                )}
                            </div>
                        )}
                    </div >
                )}
            </div>
    );
}

