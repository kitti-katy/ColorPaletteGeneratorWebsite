import React from "react";
import { ClipboardCopier } from './ClipboardCopier'
import Color from "../utilities/Color";
import { Icon } from "@blueprintjs/core";

export const SelectedColorPanel = (props) => {
    let selectedColor = props.selectedColor
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white'

    return (
        <ClipboardCopier value={selectedColor} >
            <div className="selected-color-panel" style={{ backgroundColor: selectedColor, color: selectedColorFont, border: '1px solid ' + selectedColorFont }}>
                <label>{selectedColor}  <Icon id="copy-to-clipboard-icon" icon="duplicate" style={{ verticalAlign: 'bottom', fontSize: '0.8em' }} /> </label>
            </div>
        </ClipboardCopier >
    )
}


