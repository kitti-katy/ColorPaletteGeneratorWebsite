import React, { useContext, useState } from "react";
import HSLPaletteGenerator from "../../utilities/HSLPaletteGenerator";
import { convertToBlind } from "../../utilities/BlindConversion";
import { StoreContext } from '../../Store';
import CheckIcon from '@material-ui/icons/Check';
import SelectColorHeader from "../../components/SelectColorHeader";

export default function AdvancedTiles(props) {

    const [selectedKey, setSelectedKey] = useState('');

    const [state, dispatch] = useContext(StoreContext)
    const { baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors, blindness, selectionOn, colorsSelectedToExport } = state
    const set = (name, value) => dispatch({ name, value })

    const handleSelectColor = (hexValue, selectedKey) => {
        if (selectionOn)
        {
            if(colorsSelectedToExport.has(selectedKey))
                colorsSelectedToExport.delete(selectedKey)
            else
                colorsSelectedToExport.add(selectedKey)
            set('colorsSelectedToExport', colorsSelectedToExport)
            
        }
        else {
            setSelectedKey(selectedKey)
            set('selected', hexValue)
        }
}

    let palette = new HSLPaletteGenerator(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette

    return (
        <div className='tiles-section-cell' style={{ justifyContent: 'left' }}>
            <SelectColorHeader/>
            {palette.map((color, index) => {
                let hex = color.HEXString
                let blindedColor = convertToBlind(color, blindness)
                let colorKey = index + hex
                let isSelected = selectedKey == colorKey
                return <div key={colorKey} id={hex}
                    className={"advanced-tile single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                    style={{ background: blindedColor }}
                    onClick={() => handleSelectColor(hex, colorKey)} >
                        {colorsSelectedToExport.has(colorKey) && selectionOn && 
                                            <CheckIcon
                                            style={{position:'absolute', height: 5*4+'%', width: 5*4+'%',
                                        left: 0, top: 0, height: '100%',width: '100%', color: color.hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white'}}/>} 
                    </div>
            }
            )}
        </div>
    )
}

