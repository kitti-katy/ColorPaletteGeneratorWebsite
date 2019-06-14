import React from "react";
import { ClipboardCopier } from '../../components/ClipboardCopier'
import Color from "../../utilities/Color";
import { Icon } from "@blueprintjs/core";

export const SelectedColorPanel = (props) => {
    //<Icon icon="duplicate" style={{ verticalAlign: 'bottom', fontSize: '0.8em' }} />
    let selectedColor = props.selectedColor
let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white'

    return (
        <ClipboardCopier value={selectedColor} >
            <div className="selected-color-panel" style={{ backgroundColor: selectedColor, color: selectedColorFont}}>
                <label>{selectedColor}   </label>
            </div>
        </ClipboardCopier >
    )
}


