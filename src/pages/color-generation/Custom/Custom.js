import React, { Component } from "react";
import ColorPicker from "../../../components/color-picker/ColorPicker";
import GeneratedColors from "./components/GeneratedColors";
import TryIt from "../../../components/TryIt";

const backgroundColor= '#f0f0f0'

class Custom extends Component {
  render() {
    return (
      <div style={{ display: "inline-block", margin: "auto" }}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            background: backgroundColor,
            borderBottomLeftRadius: "15px",
            borderTopLeftRadius: "15px",
            padding: "48px",
            height: "840px"
          }}
        >
          <ColorPicker />
          <GeneratedColors />
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            background: backgroundColor,
            borderBottomRightRadius: "15px",
            borderTopRightRadius: "15px",
            padding: "48px",
            height: "840px"
          }}
        >
          <TryIt />
        </div>
      </div>
    );
  }
}

export default Custom;
