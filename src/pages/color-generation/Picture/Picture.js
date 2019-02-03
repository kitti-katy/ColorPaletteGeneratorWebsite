import React, { Component } from "react";
import TryIt from "../../../components/TryIt";
import PictureUpload from "./components/PictureUpload";
const backgroundColor= '#f0f0f0'

class Picture extends Component {
  render() {
    return (
      <div style={{ display: "inline-block", margin: "auto" }}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            background: backgroundColor,
            borderBottomLeftRadius: "5px",
            borderTopLeftRadius: "5px",
            padding: "48px",
            height: "840px"
          }}
        >
          <PictureUpload />
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            background: backgroundColor,
            borderBottomRightRadius: "5px",
            borderTopRightRadius: "5px",
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

export default Picture;
