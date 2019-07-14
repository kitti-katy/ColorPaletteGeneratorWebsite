import React, { useContext } from 'react';
import PaletteIcon from '@material-ui/icons/Palette'
import BrushIcon from '@material-ui/icons/Brush'
import ImageIcon from '@material-ui/icons/Image'
import { StoreContext } from '../../Store';

const iconStyle = { verticalAlign: 'sub', marginRight: '4px' }

export default function SelectMode() {
    const [state, dispatch] = useContext(StoreContext)
    const { filterMode } = state

    const getTab = (mode, icon, text) =>
        <div className={filterMode == mode ? 'selected-mode' : ''} onClick={() => dispatch({ name: 'filterMode', value: mode })} ><div> {icon} {text} </div></div>

    return (
        <div className="select-mode-table">
            {getTab('BASIC', <PaletteIcon style={iconStyle} fontSize="small" />, 'BASIC')}
            {getTab('ADVANCED', <BrushIcon style={iconStyle} fontSize="small" />, 'ADVANCED')}
            {getTab('FROM_IMAGE', <ImageIcon style={iconStyle} fontSize="small" />, 'FROM IMAGE')}
        </div>
    );
}

