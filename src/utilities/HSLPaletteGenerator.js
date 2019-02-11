import Color from './Color'

class HSLPaletteGenerator {
    constructor(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) {
      let {hue, sat, light} = baseColor.hsl;
      this._palette = Array.apply(null, { length: numberOfColors }).map((el, index) => {
        let h = (parseInt(hue) + (Math.floor(index/ hueStep) * hueChange) ) % 360
        let s = (parseInt(sat) + (Math.floor(index / satStep) * satChange)) % 100
        let l = (parseInt(light) + (Math.floor(index / lightStep) * lightChange)) % 100
        return new Color(h, s, l, 'HSL').HEXString
    } )
  }
    get palette(){ return this._palette } 
}
  export default HSLPaletteGenerator;
  
  export let getAdvancedPalette = (baseColor, hueSplitter, satSplitter, lightSplitter, offsetSat,offSetLight) => {
      let {hue, sat, light} = baseColor.hsl;
      let hueChange = 360/hueSplitter
      let satChange = 100/satSplitter
      let lightChange = 100/lightSplitter

      // Level 1: hue
      // Level 2: saturation
      // Level 3: light
      let level1Colors = Array.apply(null, { length: hueSplitter })
      let level2Colors = Array.apply(null, { length: satSplitter })
      let level3Colors = Array.apply(null, { length: lightSplitter })
      
      let huePalette = [] // 3d array
      level1Colors.forEach((el, indexL1) => {

        let h = (parseInt(hue) + (indexL1 * hueChange) ) % 360

        let satPalette = []
        level2Colors.forEach((el, indexL2) => {
          
          let s = (parseInt(sat) + (indexL2 * satChange)) % 100

          let lightPalette = []
          level3Colors.forEach((el, indexL3) => {
            let l = (parseInt(light) + (indexL3 * lightChange)) % 100
            lightPalette.push( new Color(h, s, l, 'HSL') )
          })
          satPalette.push(lightPalette)
        } )
        huePalette.push(satPalette)
    } )

    return huePalette
  }



