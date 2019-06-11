import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectColor } from "../../../../redux/SelectedColorReducer";
import "./PictureUpload.css"
import Color from "../../../../utilities/Color";
import { convertToBlind } from "../../../../utilities/BlindConversion";

let mapStateToProps = state => {
  return {
    palettes: state.PictureReducer.palettes,
    blindness: state.ColorBlindnessReducer.blindness
  };
};
let mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectColor: selectColor }, dispatch);
};

class GeneratedPalettes extends Component {
  state = {
    selectedKey: ''
  };

  getTiles = palette => {
    let palettePieces = "";
    if (palette.length != 0) {
      palettePieces = palette.map(
        (color, index) => {
          let hex = color.HEXString
          if (hex != '#NaNNaNNaN') {
            let blindedColor = convertToBlind(color, this.props.blindness)
            let colorKey = index + hex
            let isSelected = this.state.selectedKey == colorKey
            return <div key={colorKey} id={hex}
              className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
              style={{
                background: blindedColor, padding: '5%', width: '10%', height: '10%',
                border: 'none'
              }}
              onClick={() => this.handleSelectColor(hex, colorKey)} />
          }
          else {
            /*return <div key={index + 'N/A'} 
               className={"single-tile-basic"}
               style={{
                  width: '10%', height: '10%',
                 border: 'none'
               }}>N/A</div>*/
          }
        }
      )
    }

    return palettePieces;
  };


  handleSelectColor = (hexValue, selectedKey) => {
    this.setState({ selectedKey })
    this.props.selectColor(hexValue)
  }

  render() {
    const palettes = this.props.palettes
    return (
      <div className="previewComponent element-holder" style={{ overflowY: 'auto' }}>
        {palettes.length != 0 && (
          <div>
            <h1 style={{textAlign:'center'}}> By Hue </h1>
            <h2> Version 1 </h2> <div> {this.getTiles(palettes[0])} </div><br />
            <h2> Version 2 </h2> <div> {this.getTiles(palettes[1])} </div><br />
            <h2> Version 3 </h2> <div> {this.getTiles(palettes[2])} </div><br />
            <h2> Version 4 </h2> <div> {this.getTiles(palettes[3])} </div><br />
            <h1 style={{textAlign:'center'}}> By Hue and Light </h1>
            <h2> Version 1 </h2> <div> {this.getTiles(palettes[4])} </div><br />
            <h2> Version 2 </h2> <div> {this.getTiles(palettes[5])} </div><br />
            <h2> Version 3 </h2> <div> {this.getTiles(palettes[6])} </div><br />
            <h2> Version 4 </h2> <div> {this.getTiles(palettes[7])} </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneratedPalettes);

/*
 <h2> 12 Colors, by Hue </h2> <div> {this.getTiles(palettes[0])} </div><br />
            <h2> 24 Colors, by Hue </h2> <div> {this.getTiles(palettes[1])} </div><br />
            <h2> 48 Colors, by Hue </h2> <div> {this.getTiles(palettes[2])} </div><br />
            <h2> 72 Colors, by Hue </h2> <div> {this.getTiles(palettes[3])} </div><br />
            <h2> 12 Colors, by Hue and Light </h2> <div> {this.getTiles(palettes[4])} </div><br />
            <h2> 24 Colors, by Hue and Light </h2> <div> {this.getTiles(palettes[5])} </div><br />
            <h2> 48 Colors, by Hue and Light </h2> <div> {this.getTiles(palettes[6])} </div><br />
            <h2> 72 Colors, by Hue and Light </h2> <div> {this.getTiles(palettes[7])} </div>
            */