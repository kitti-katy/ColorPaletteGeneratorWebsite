import React, { useContext, useState } from "react";
import HSLPaletteGenerator from "../../utilities/HSLPaletteGenerator";
import { convertToBlind } from "../../utilities/BlindConversion";
import { StoreContext } from '../../Store';

export default function AdvancedTiles(props) {

    const [selectedKey, setSelectedKey] = useState('');

    const [state, dispatch] = useContext(StoreContext)
    const { baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors, blindness } = state
    const set = (name, value) => dispatch({ name, value })

    const handleSelectColor = (hexValue, selectedKey) => {
        setSelectedKey({ selectedKey })
        set('selected', hexValue)
    }

    let palette = new HSLPaletteGenerator(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette

    return (
            <div className='tiles-section-cell' style={{ justifyContent: 'left' }}>

                {palette.map((color, index) => {
                    let hex = color.HEXString
                    let blindedColor = convertToBlind(color, blindness)
                    let colorKey = index + hex
                    let isSelected = selectedKey == colorKey
                    return <div key={colorKey} id={hex}
                        className={"advanced-tile single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                        style={{ background: blindedColor }}
                        onClick={() => handleSelectColor(hex, colorKey)} />
                }
                )}
            </div>
    )
}

