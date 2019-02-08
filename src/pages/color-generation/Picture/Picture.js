import React, { Component } from "react";
import TryIt from "../../../components/TryIt";
import PictureUpload from "./components/PictureUpload";
import "./Picture.css"


class Picture extends Component {
  render() {
    return (
      <div id="picture-page">
        <div id="picture-upload-section"> <PictureUpload /></div>
        <div id="picture-try-it"> <TryIt /></div>
      </div>
    );
  }
}

export default Picture;
