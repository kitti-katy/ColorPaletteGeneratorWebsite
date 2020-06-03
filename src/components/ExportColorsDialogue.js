import React, { useState, useContext } from "react";
import { StoreContext } from "../Store";
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { getAdvancedPalette } from "../utilities/HSLPaletteGenerator";
import HSLPaletteGenerator from "../utilities/HSLPaletteGenerator";
import { downloadFile } from "../utilities/ExportJSON";
import { DialogContent } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { ClipboardCopier } from "./ClipboardCopier";
import Slider from '@material-ui/core/Slider';
import { SliderLabel } from "./SliderLabel";


    
const colorFormats = ["Hex #", "RGB", "HSL"]
const exportFormats = ['None', 'JSON', 'CSS', 'SCSS', 'CSV', 'Array']
const imageFormats = ['PNG','SVG','PDF']
const getStringFunctions = {
    'None': (colors)=> colors.join('\n'), 
    'JSON': (colors)=>{ let str = '{\n'; colors.forEach((color, i)=> str+= 'color_' + i + ': "' + color + '",\n'); return str + '}' }, 
    'CSS': (colors)=> 'color' + ': ' + colors.join(';\ncolor:') + '";\n',  
    'SCSS': (colors)=> { let str = ''; colors.forEach((color, i)=> str+= '$color_' + i + ': ' + color + ',\n'); return str },  
    'CSV': (colors)=> colors.join(','), 
    'Array': (colors)=> '["' + colors.join('","') + '"]'
}

const getColorsDictionaryFunctions = {
    'BASIC': (baseColor,hueSplit, satSplit, lightSplit, colorsSelectedToExport )=> {
        let palette = getAdvancedPalette(baseColor, hueSplit, satSplit, lightSplit, 'h', 's', 'l', 0, 0)
        let hexColors = []
        let rgbColors = []
        let hslColors = []
        let colorsToExport = []
        palette.map((satArr, i1) =>{
            satArr.map((lightArr, i2) => {
                    lightArr.map((lightColor, i3) => {
                        let color = lightColor.HEXString
                        let colorKey = i1 + '' + i2 + '' + i3 + color
                        if (colorsSelectedToExport.has(colorKey)){
                            colorsToExport.push(lightColor)
                            hexColors.push(color) 
                            rgbColors.push(lightColor.RGBString)
                            hslColors.push(lightColor.HSLString )
                        }
                                    })
                                })
                            })
        let formatsDictionary = {"Hex #": hexColors, "RGB": rgbColors, "HSL":hslColors} 
        return [formatsDictionary, colorsToExport]
    },
    'ADVANCED': (baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors, colorsSelectedToExport) => {
        let palette = new HSLPaletteGenerator(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette
        let hexColors = []
        let rgbColors = []
        let hslColors = []
        let colorsToExport = []
        palette.map((color, index) =>{
                let hex = color.HEXString
                let colorKey = index + hex
                if (colorsSelectedToExport.has(colorKey)){
                    colorsToExport.push(color)
                    hexColors.push(hex) 
                    rgbColors.push(color.RGBString)
                    hslColors.push(color.HSLString )
                }
                            })
        let formatsDictionary = {"Hex #": hexColors, "RGB": rgbColors, "HSL":hslColors} 
        return [formatsDictionary, colorsToExport]
    },
    'AI': {}
}

export default function ExportColorsDialogue(props) {
  const [state, dispatch] = useContext(StoreContext);
  const { colorsSelectedToExport,exportColorsDialogueOpen, baseColor, hueSplit, satSplit, lightSplit, exportSelectedColorFormat, exportFormat, exportTileWidth,
                             hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors, filterMode} = state
  const set = (name, value) => dispatch({ name, value });

  const getColorString = (dictionary) => {
      return getStringFunctions[exportFormat](dictionary[exportSelectedColorFormat])
  }

  let colorsToExport = []
  let formatsDictionary= {}

  if (filterMode == 'BASIC') {
        let color_tuple = getColorsDictionaryFunctions['BASIC'](baseColor, hueSplit, satSplit, lightSplit, colorsSelectedToExport)
        formatsDictionary = color_tuple[0]
        colorsToExport = color_tuple[1]
  }
  else if (filterMode == 'ADVANCED'){
        let color_tuple = getColorsDictionaryFunctions['ADVANCED'](baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors, colorsSelectedToExport)
        formatsDictionary = color_tuple[0]
        colorsToExport = color_tuple[1]
  }

  let colorsString = getColorString(formatsDictionary)

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleClickColorFormat = (value) => {
    set('exportSelectedColorFormat', value)
  }
  const handleClickExportFormat = (value) => {
    set('exportFormat', value)
  }
  const handleClickDownload = (string) => {
    let format = exportFormat == 'None' || exportFormat == 'Array'? 'txt' : exportFormat.toLowerCase()
    downloadFile('palette.'+format,  string)
  }

  let getSliderInput = (value, label, name, dividers) =>
        <div>
            <SliderLabel value={value+'%'} label={label} />
            <Slider
                marks
                value={dividers.indexOf(value)}
                min={0}
                max={dividers.length - 1}
                step={1}
                onChange={(e, index) => set(name, dividers[index])}
            />
        </div>


  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className='export-dialogue' 
                fullWidth={true} height={'80%'} maxWidth={'md'}>
    <DialogTitle id="simple-dialog-title">Export Colors</DialogTitle>
      <DialogContent className='horizontal-holder-sl'>
        <div id="dialogue-group-container">
            <ButtonGroup fullWidth className="color-formats-group" aria-label="select color format buttons">
                {colorFormats.map(format => 
                <Button onClick={()=>handleClickColorFormat(format)} className={'dialogue-color-format-button'+ (format==exportSelectedColorFormat? '-selected': '')}>{format}</Button>
                )}
            </ButtonGroup>
            
            <ButtonGroup fullWidth aria-label="select export format buttons">
                {exportFormats.map(format => 
                <Button onClick={()=>handleClickExportFormat(format)} className={'dialogue-color-format-button'+ (format==exportFormat? '-selected': '')} size='small'>{format}</Button>
                )}
            </ButtonGroup>    
      
            <TextField className="dialogue-color-values" variant="outlined" rows="8" multiline value={colorsString} disabled/>
            <div className='copy-download-buttons'>
                <ClipboardCopier value={colorsString}> 
                    <Button variant='outlined'> <span className='sidebar-button'> <FileCopyIcon/> <span>Copy</span></span></Button>
                </ClipboardCopier>
                <Button variant='outlined' onClick={()=>handleClickDownload(colorsString)}> <GetAppIcon/> Download</Button>
            </div>
            {/*<div>
            {getSliderInput(exportTileWidth, 'Square Width', 'exportTileWidth', [2.5,5,10,20,25])}
                <ButtonGroup fullWidth className="color-formats-group" aria-label="select color format buttons">
                    {imageFormats.map(format => 
                    <Button onClick={()=>handleClickColorFormat(format)} className={'dialogue-color-format-button'+ (format==exportSelectedColorFormat? '-selected': '')}>{format}</Button>
                    )}
                </ButtonGroup>
                    </div>*/}
      </div>
      <div style={{ overflow:'auto', height:'600px', display:'grid', marginLeft:'12px'}}>
      <div className='tiles-dialogue'>
        {colorsToExport.map((color,i)=> <div key={'color-'+i} 
                                            className={"single-tile-basic "}
                                            style={{ background: color.HEXString, padding: exportTileWidth + '%', width: exportTileWidth*2 + '%', height: exportTileWidth*2 + '%', 
                                            position: 'relative'}}></div>
        )}
        </div>
       
        </div>
        
        </DialogContent>
    </Dialog>
  );
}

