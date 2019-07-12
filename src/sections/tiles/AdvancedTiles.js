import React, { useContext, useState} from "react";
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
        <div style={{ display: 'table', alignItems: 'center', height: '100%', width: '100%' }} className='tiles-section'>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >

                    {palette.map((color, index) => {
                        let hex = color.HEXString
                        let blindedColor = convertToBlind(color, blindness)
                        let colorKey = index + hex
                        let isSelected = selectedKey == colorKey
                        return <div key={colorKey} id={hex}
                            className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                            style={{
                                background: blindedColor, padding: '5%', width: '10%', height: '10%',
                                border: 'none'
                            }}
                            onClick={() => handleSelectColor(hex, colorKey)} />
                    }
                    )}
                </div>
            </div>
        </div >

    )
}

