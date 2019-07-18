import React, { useContext, useState } from "react";
import { convertToBlind } from "../../utilities/BlindConversion";
import { StoreContext } from '../../Store';

export default function PictureTiles(props) {
  const [selectedKey, setSelectedKey] = useState('');
  const [state, dispatch] = useContext(StoreContext)
  const { blindness, picturePalettes } = state
  const selectColor = (value) => dispatch({ name: 'selected', value })

  const getTiles = palette => {
    let palettePieces = "";
    if (palette.length != 0) {
      palettePieces = palette.map(
        (color, index) => {
          let hex = color.HEXString
          if (hex != '#NaNNaNNaN') {
            let blindedColor = convertToBlind(color, blindness)
            let colorKey = index + hex
            let isSelected = selectedKey == colorKey
            return <div
              key={colorKey} id={hex}
              className={"picture-tile single-tile-basic " + (isSelected ? 'selected-tile' : '')}
              style={{ background: blindedColor }}
              onClick={() => handleSelectColor(hex, colorKey)} />
          }
          else { }
        }
      )
    }
    return palettePieces;
  };


  const handleSelectColor = (hexValue, selectedKey) => {
    setSelectedKey(selectedKey)
    selectColor(hexValue)
  }
  return (
    <div className="tiles-section">
      {picturePalettes.length != 0 && (
        <div style={{ width: '100%', margin: 'auto' }}>
          <h1 style={{ textAlign: 'center' }}> By Hue </h1>
          <h2> Version 1 </h2> <div> {getTiles(picturePalettes[0])} </div><br />
          <h2> Version 2 </h2> <div> {getTiles(picturePalettes[1])} </div><br />
          <h2> Version 3 </h2> <div> {getTiles(picturePalettes[2])} </div><br />
          <h2> Version 4 </h2> <div> {getTiles(picturePalettes[3])} </div><br />
          <h1 style={{ textAlign: 'center' }}> By Hue and Light </h1>
          <h2> Version 1 </h2> <div> {getTiles(picturePalettes[4])} </div><br />
          <h2> Version 2 </h2> <div> {getTiles(picturePalettes[5])} </div><br />
          <h2> Version 3 </h2> <div> {getTiles(picturePalettes[6])} </div><br />
          <h2> Version 4 </h2> <div> {getTiles(picturePalettes[7])} </div>
        </div>
      )}
    </div>
  );
}
