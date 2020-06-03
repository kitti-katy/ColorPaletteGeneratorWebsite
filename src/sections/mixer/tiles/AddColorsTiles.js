import React, { useContext } from "react";
import { StoreContext } from '../../../StoreColorMixer';
import Button from '@material-ui/core/Button';
import SelectBaseColorButton from "../../../components/SelectBaseColorButton";
import Color from '../../../utilities/Color'
import {mixColors} from '../../../utilities/ColorMixer'

export default function AddColorsTiles (props) {
    const [state, dispatch] = useContext(StoreContext)
    const { selectedColorsMixer, firstColorMixer } = state
    const set = (name, value) => dispatch({ name, value })

    const mixedColor = mixColors(selectedColorsMixer)

    return (<div className='tiles-section-cell' style={{margin:'auto'}}>

         <br/><h2>Result: </h2><br/>
         <div style={{width:'200px',height:'100px', background:mixedColor.HEXString}}>
             <span style={{textAlign:'center'}}>{mixedColor.HEXString}</span> </div>

         
         </div>
)

}
