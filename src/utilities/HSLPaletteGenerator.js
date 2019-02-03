import Color from './Color'

class HSLPaletteGenerator {
    constructor(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) {
      let {hue, sat, light} = baseColor.hsl;
      this._palette = Array.apply(null, { length: numberOfColors }).map((el, index) => {
        let h = (parseInt(hue) + (Math.floor(index/ hueStep) * hueChange) ) % 360
        let s = (parseInt(sat) + (Math.floor(index / satStep) * satChange)) % 101
        let l = (parseInt(light) + (Math.floor(index / lightStep) * lightChange)) % 101
        return new Color(h, s, l, 'HSL').HEXString
    } )
  }
    get palette(){ return this._palette } 
}
  export default HSLPaletteGenerator;
  
