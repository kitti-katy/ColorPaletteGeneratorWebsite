import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectColor } from "../../redux/SelectedColorReducer";
import { convertToBlind } from "../../utilities/BlindConversion";

let mapStateToProps = state => {
  return {
    palettes: state.PictureReducer.palettes,
    blindness: state.ColorBlindnessReducer.blindness
  };
};
let mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectColor: selectColor }, dispatch);
};

class PictureTiles extends Component {
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
                background: blindedColor, padding: '4.15%', width: '8.3%', height: '8.3%',
                border: 'none'
              }}
              onClick={() => this.handleSelectColor(hex, colorKey)} />
          }
          else {
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
      <div className="tiles-section">
        {palettes.length != 0 && (
          <div style={{ width: '100%', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}> By Hue </h1>
            <h2> Version 1 </h2> <div> {this.getTiles(palettes[0])} </div><br />
            <h2> Version 2 </h2> <div> {this.getTiles(palettes[1])} </div><br />
            <h2> Version 3 </h2> <div> {this.getTiles(palettes[2])} </div><br />
            <h2> Version 4 </h2> <div> {this.getTiles(palettes[3])} </div><br />
            <h1 style={{ textAlign: 'center' }}> By Hue and Light </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(PictureTiles);
