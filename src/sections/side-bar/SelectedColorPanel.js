import React, { useContext } from "react";
import { ClipboardCopier } from '../../components/ClipboardCopier'
import Color from "../../utilities/Color";
import { Icon } from "@blueprintjs/core";

import { StoreContext } from '../../Store';

export const SelectedColorPanel = (props) => {
    const [state] = useContext(StoreContext)
    const { selected } = state

    let selectedColor = selected
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white'

    //<Icon icon="duplicate" style={{ verticalAlign: 'bottom', fontSize: '0.8em' }} />
    return (
        <ClipboardCopier value={selectedColor} >
            <div className="selected-color-panel" style={{ backgroundColor: selectedColor, color: selectedColorFont }}>
                <label> {selectedColor} </label>
            </div>
        </ClipboardCopier >
    )
}


