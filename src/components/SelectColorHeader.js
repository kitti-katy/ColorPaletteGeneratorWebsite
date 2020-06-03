import React, { useState, useContext } from "react";
import { StoreContext } from "../Store";
import Typography from "@material-ui/core/Typography";
import { getAdvancedPalette } from "../utilities/HSLPaletteGenerator";
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp'
import ExportColorsDialogue from "./ExportColorsDialogue";
import HSLPaletteGenerator from "../utilities/HSLPaletteGenerator";

export default function SelectColorHeader(props) {
  const [state, dispatch] = useContext(StoreContext);
  const { selectionOn, colorsSelectedToExport, hueSplit, satSplit, lightSplit, baseColor, exportColorsDialogueOpen, filterMode,
    hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors} = state
  const set = (name, value) => dispatch({ name, value });

  let palette = []
  
  if (filterMode == 'BASIC') 
    palette = getAdvancedPalette(baseColor, hueSplit, satSplit, lightSplit, 'h', 's', 'l', 0, 0)
  else if (filterMode == 'ADVANCED')
    palette = new HSLPaletteGenerator(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette

  const selectAll = () => {
        let selectedKeys = new Set()
        if (filterMode == 'BASIC') {
          palette.map((satArr, i1) =>{
              satArr.map((lightArr, i2) => {
                  lightArr.map((lightColor, i3) => {
                      let color = lightColor.HEXString
                      let colorKey = i1 + '' + i2 + '' + i3 + color
                      selectedKeys.add(colorKey)
                              })
                          })
                      })
                  }
        else if (filterMode == 'ADVANCED'){
          palette.map((color, index) =>{
                    let hex = color.HEXString
                    let colorKey = index + hex
                    selectedKeys.add(colorKey)
                            })
        }
        set('colorsSelectedToExport', selectedKeys)
    }

  const selectNone = () => {
    set('colorsSelectedToExport', new Set())
  }
  const openDialogue = () => {
    set('exportColorsDialogueOpen', true)
  }
  const closeDialogue = () => {
    set('exportColorsDialogueOpen', false)
  }

  return (
    selectionOn? 
    <Typography variant="h6" className="select-color-to-export-header">
        <span>Select colors to export:</span>
        <div>
            <Button variant="outlined" size='small' onClick={selectAll} style={{marginRight:'8px'}}>Select All</Button>
            <Button variant="outlined" size='small' onClick={selectNone} style={{marginRight:'8px'}}>Clear All</Button>
            <Button variant="outlined" size='small' onClick={openDialogue} style={{marginRight:'8px'}}> <GetAppIcon fontSize='small'></GetAppIcon> Export</Button>
        </div>
        <ExportColorsDialogue open={exportColorsDialogueOpen} onClose={closeDialogue} />
    </Typography> : <div></div>
  );
}
