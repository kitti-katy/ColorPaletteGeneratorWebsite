import React, { useContext } from 'react';
import { StoreContext } from '../../StoreColorMixer';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
const iconStyle = { verticalAlign: 'sub', marginRight: '4px' }

export default function SelectModeMixer() {
    const [state, dispatch] = useContext(StoreContext)
    const { mixerMode } = state
    const set = (name, value) => dispatch({ name, value })
    
    const handleTabSwitch = (mode) => {
        set('mixerMode', mode)
    }

    const getTab = (mode, icon, text) =>
        <div className={mixerMode == mode ? 'selected-mode' : ''} onClick={() => handleTabSwitch(mode) }><div> {icon} {text} </div></div>

    return (
        <div className="select-mode-table">
            {getTab('MIX COLORS', <AddToPhotosIcon style={iconStyle} fontSize="small" />, 'MIX COLORS')}
            {getTab('FIND COMBINATION', <ImportContactsIcon style={iconStyle} fontSize="small" />, 'FIND COMBINATION')}
        </div>
    );
}

