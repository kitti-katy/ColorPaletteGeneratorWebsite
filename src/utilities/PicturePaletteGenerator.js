class HSLPaletteGenerator {
    constructor(v1, v2, v3, colorFormat) {
      switch (colorFormat) {
        case "RGB":
          this.setAllFromRGB(v1, v2, v3);
          break;
  
        case "HSL":
          this.setAllFromHSL(v1, v2, v3);
          break;
  
        case "Hex":
          this.setAllFromHex(v1);
          break;
  
        case "ChangeColor":
          this.createChangedHSLColor(v1, v2);
      }
    }
  
}
  export default HSLPaletteGenerator;
  
