import React, { useContext } from 'react';
import PaletteIcon from '@material-ui/icons/Palette'
import BrushIcon from '@material-ui/icons/Brush'
import ImageIcon from '@material-ui/icons/Image'
import { StoreContext } from '../../Store';

const iconStyle = { verticalAlign: 'sub', marginRight: '4px' }

export default function SelectMode() {
    const [state, dispatch] = useContext(StoreContext)
    const { filterMode, selectionOn, colorsSelectedToExport } = state
    const set = (name, value) => dispatch({ name, value })

    const handleTabSwitch = (mode) => {
        set('selectionOn', false)
        set('filterMode', mode)
        set('colorsSelectedToExport', new Set())
    }

    const getTab = (mode, icon, text) =>
        <div className={filterMode == mode ? 'selected-mode' : ''} onClick={() => handleTabSwitch(mode) }><div> {icon} {text} </div></div>

    return (
        <div className="select-mode-table">
            {getTab('BASIC', <PaletteIcon style={iconStyle} fontSize="small" />, 'BASIC')}
            {getTab('ADVANCED', <BrushIcon style={iconStyle} fontSize="small" />, 'ADVANCED')}
            {/*{getTab('GOLDEN_RATIO', <ImageIcon style={iconStyle} fontSize="small" />, 'GOLDEN RATIO')}*/}
            {/*getTab('FROM_IMAGE', <ImageIcon style={iconStyle} fontSize="small" />, 'FROM IMAGE')*/}
            
            {getTab('AI', <ImageIcon style={iconStyle} fontSize="small" />, 'DEEP LEARNING')}
        </div>
    );
}

