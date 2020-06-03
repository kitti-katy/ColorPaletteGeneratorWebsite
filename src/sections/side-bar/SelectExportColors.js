import React, { useContext } from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import { StoreContext } from '../../Store';
import CloseIcon from '@material-ui/icons/Close';

export const SelectExportColors = (props) => {
    const [state, dispatch] = useContext(StoreContext)
    const { selectionOn, colorsSelectedToExport, filterMode } = state
    const set = (name, value) => dispatch({ name, value })

    const handleClick = () => {
        if (selectionOn){
            set('colorsSelectedToExport', new Set())
            set('selectionOn', false)
            set('selectedExportAll', false)
        }
        else
            set('selectionOn', true)
    }
    if (filterMode!= 'AI')
        return (
                <div className="selected-color-panel sidebar-button" style={{ backgroundColor: selectionOn? 'rgb(66, 66, 66)': 'rgb(33, 33, 33)', color: 'white'}} onClick={handleClick}>
                {selectionOn? <CloseIcon fontSize='small'/>:<GetAppIcon fontSize='small'/>} <label style={{cursor:'pointer'}}> {selectionOn? 'Cancel Select':'Select Export'}  </label>
                </div>
        )
    else return <div/>
}
