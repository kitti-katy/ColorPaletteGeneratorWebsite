import React, { Component } from "react";
import ColorPicker from "../../../components/color-picker/ColorPicker";
import GeneratedColors from "./components/GeneratedColors";
import TryIt from "../../../components/TryIt/TryIt";
import { connect } from "react-redux";

let mapStateToProps = (state) => { return { baseColor: state.BaseColorReducer.baseColor } }

class Custom extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <ColorPicker />
        <GeneratedColors />
        <TryIt selectedColor={this.props.baseColor.HEXString} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Custom);
