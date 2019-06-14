import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color, { RGBtoHSL } from "../../utilities/Color";
import { setPalettes } from "../../redux/PictureReducer";


let mapStateToProps = state => {
  return { baseColor: state.BaseColorReducer.baseColor };
};
let mapDispatchToProps = dispatch => {
  return bindActionCreators({ setPalettes }, dispatch);
};

class PictureFilters extends Component {
  state = {
    palette1: [],
    palette2: [],
    palette3: [],
    palette4: [],
    palette5: [],
    palette6: [],
    palette7: [],
    palette8: [],
    clickedColor: 0,
    image: "",
    imagePreviewUrl: "",
    generated: false
  };

  handleSubmit = e => {
    //e.preventDefault();
    let img = new Image();
    img.src = this.state.imagePreviewUrl;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      let pixelArray = ctx.getImageData(0, 0, img.width, img.height).data;

      // By Hue Version
      let pushVersion1Function = (arr, n) => { for (var i = 0; i < n; i++) { arr.push({ totalHue: 0, totalSat: 0, totalLight: 0, number: 0 }); } };
      let arr12Colors = [];
      let arr24Colors1 = [];
      let arr48Colors1 = [];
      let arr72Colors1 = [];
      pushVersion1Function(arr12Colors, 12);
      pushVersion1Function(arr24Colors1, 24);
      pushVersion1Function(arr48Colors1, 48);
      pushVersion1Function(arr72Colors1, 72);
      let version1Function = (hsl, arr, divider) => {
        let bucketNumber = hsl.hue != 0 ? Math.floor(hsl.hue / divider) : 0;
        arr[bucketNumber].totalHue += hsl.hue;
        arr[bucketNumber].totalSat += hsl.sat;
        arr[bucketNumber].totalLight += hsl.light;
        arr[bucketNumber].number += 1;
      };

      // By Hue and Light Version
      let pushVersion2Function = (arr, n) => {
        for (var i = 0; i < n; i++) {
          arr.push({
            light: { totalHue: 0, totalSat: 0, totalLight: 0, number: 0 },
            dark: { totalHue: 0, totalSat: 0, totalLight: 0, number: 0 }
          });
        }
      };
      let arr12Colors2 = [];
      let arr24Colors2 = [];
      let arr48Colors2 = [];
      let arr72Colors2 = [];
      pushVersion2Function(arr12Colors2, 12);
      pushVersion2Function(arr24Colors2, 24);
      pushVersion2Function(arr48Colors2, 48);
      pushVersion2Function(arr72Colors2, 72);
      let version2Function = (hsl, arr, divider) => {
        let bucketNumber = hsl.hue != 0 ? Math.floor(hsl.hue / divider) : 0;
        let bucket = hsl.light > 50 ? arr[bucketNumber].light : arr[bucketNumber].dark;
        bucket.totalHue += hsl.hue;
        bucket.totalSat += hsl.sat;
        bucket.totalLight += hsl.light;
        bucket.number += 1;
      };

      for (let i = 0; i < pixelArray.length - 4; i += 4) {
        let r = pixelArray[i];
        let g = pixelArray[i + 1];
        let b = pixelArray[i + 2];
        let hsl = RGBtoHSL(r, g, b);
        // By Hue Version
        version1Function(hsl, arr12Colors, 30);
        version1Function(hsl, arr24Colors1, 15);
        version1Function(hsl, arr48Colors1, 7.5);
        version1Function(hsl, arr72Colors1, 5);

        // By Hue and Light Version
        version2Function(hsl, arr12Colors2, 30);
        version2Function(hsl, arr24Colors2, 15);
        version2Function(hsl, arr48Colors2, 7.5);
        version2Function(hsl, arr72Colors2, 5);
      }

      // By Hue Version
      let extractColorsFunction = obj => new Color(obj.totalHue / obj.number, obj.totalSat / obj.number, obj.totalLight / obj.number, 'HSL')
      let palette1 = arr12Colors.map(extractColorsFunction);
      let palette2 = arr24Colors1.map(extractColorsFunction);
      let palette3 = arr48Colors1.map(extractColorsFunction);
      let palette4 = arr72Colors1.map(extractColorsFunction);

      // By Hue and Light Version
      let extractColorsFunction2 = arr => {
        //looks better when dark goes first
        let darkLightArr = arr.map(obj => {
          let light = obj.light;
          let lightStr = new Color(light.totalHue / light.number, light.totalSat / light.number, light.totalLight / light.number, 'HSL')
          let dark = obj.dark;
          let darkStr = new Color(dark.totalHue / dark.number, dark.totalSat / dark.number, dark.totalLight / dark.number, 'HSL')
          return { dark: darkStr, light: lightStr };
        });
        let darks = darkLightArr.map(obj => obj.dark);
        let lights = darkLightArr.map(obj => obj.light);
        let palette = [];
        palette = palette.concat(darks);
        palette = palette.concat(lights);
        return palette;
      };
      let palette5 = extractColorsFunction2(arr12Colors2);
      let palette6 = extractColorsFunction2(arr24Colors2);
      let palette7 = extractColorsFunction2(arr48Colors2);
      let palette8 = extractColorsFunction2(arr72Colors2);

      this.setState({ palette1, palette2, palette3, palette4, palette5, palette6, palette7, palette8, generated: true });

      let palettes = [palette1, palette2, palette3, palette4, palette5, palette6, palette7, palette8]
      this.props.setPalettes(palettes)
    }
  };

  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = (obj) => {
      this.setState({ image: file, imagePreviewUrl: reader.result }, this.handleSubmit);
    }
    reader.readAsDataURL(file);
  };

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img id="uploaded-image" src={imagePreviewUrl} style={{ maxHeight: '145pt' }} />);
    }

    return (
      <div style={{ height: '100%' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
          {$imagePreview}
          <div>
            <label htmlFor="upload-photo" style={{ cursor: 'pointer' }} className="upload-photo-label">
              Upload image...
            </label>
            <input type="file" name="photo" id="upload-photo"
              className='upload-image-input'
              onChange={this.handleImageChange}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureFilters);
