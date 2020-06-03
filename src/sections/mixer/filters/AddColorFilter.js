import React, { useContext } from "react";
import { StoreContext } from '../../../StoreColorMixer';
import Button from '@material-ui/core/Button';
import SelectBaseColorButton from "../../../components/SelectBaseColorButton";
import Color from '../../../utilities/Color'
import {mixColors} from '../../../utilities/ColorMixer'
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

export default function AddColorFilter (props) {
    const [state, dispatch] = useContext(StoreContext)
    const { selectedColorsMixer, firstColorMixer } = state
    const set = (name, value) => dispatch({ name, value })
    const handleSelectedColorChange = (color, index) => {
        let selectedColors_ = selectedColorsMixer 
        selectedColors_[index] = color
        set('selectedColorsMixer', selectedColors_)}
    const handleAddNewColorClick = (color) => {
        let selectedColors_ = selectedColorsMixer 
        selectedColors_.push(color) 
        set('selectedColorsMixer', selectedColors_)
    }
    const mixedColor = mixColors(selectedColorsMixer)
    const buttonStyle = {width:'120px', height:'120px', marginBottom:'24px'}
    const whiteColor = new Color(281,49,100, 'HSL')

    return (<div className='' style={{overflow: 'auto', height: '100%',width: '100%'}}>
        
            <Typography variant="h5" style={{textAlign:'center', marginBottom:'12px', marginTop:'12px'}}>
                Click on buttons to select colors
            </Typography>

         <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
         {selectedColorsMixer.concat([whiteColor]).map((color, index) => 
                <div style={{width: '50%',  justifyContent: 'center', display:'flex'}} key={'-mixer-' + index} >
                    <div style={{position:'relative'}}>
                    <IconButton aria-label="delete" variant='contained' 
                    style={{position:'absolute', zIndex:'5', top: '-12px', right: '-12px', background:'white', border:'1px solid rgb(212,212,212)'}}>
                        <ClearIcon  fontSize='small'/>
                    </IconButton>
                    {index < selectedColorsMixer.length &&
                        <SelectBaseColorButton  style={{...buttonStyle, border: color.hsl.light > 95 ? 'solid 2px rgb(212, 212, 212)' : 'none'}}
                        onChange={(val)=>handleSelectedColorChange(val, index)} baseColor={color} id={'-mixer-' + index} text={color.HEXString}/>}
                    {index == selectedColorsMixer.length &&
                        <SelectBaseColorButton  style={{...buttonStyle, border: color.hsl.light > 95 ? 'solid 2px rgb(212, 212, 212)' : 'none'}}
                        onChange={(val)=>handleAddNewColorClick(val)} baseColor={color} id={'-mixer-' + index} text={"Add Color"}/>}
                    </div>
                </div>
                
                )}
                <div style={{ width: '50%', flexDirection:'row', flexWrap:'wrap',  justifyContent: 'center', display:'flex'}}>
                    <Button style={buttonStyle} variant="outlined" onClick={handleAddNewColorClick}>Add Color</Button>
                </div>
               

         </div>

     </div>)

}
