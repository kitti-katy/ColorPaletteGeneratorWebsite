import React from "react";
import { ClipboardCopier } from './ClipboardCopier'
import Color from "../utilities/Color";

export const SelectedColorPanel = (props) => {
    let selectedColor = props.selectedColor
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
        <div className="selected-color-panel" style={{ backgroundColor: selectedColor, color: selectedColorFont, border: '1px solid ' + selectedColorFont }}>
            <label>{selectedColor} <ClipboardCopier value={selectedColor} /> </label>
        </div>)
}
