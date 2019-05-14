import React, { Component } from "react";
import TryIt from "../../../components/TryIt/TryIt";
import PictureUpload from "./components/PictureUpload";
import "./Picture.css"


class Picture extends Component {
  render() {
    return (
      <div id="picture-page">
        <PictureUpload /><TryIt />
      </div>
    );
  }
}

export default Picture;
