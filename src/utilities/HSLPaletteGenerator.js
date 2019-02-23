import Color from './Color'

class HSLPaletteGenerator {
  constructor(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) {
    let { hue, sat, light } = baseColor.hsl;
    this._palette = Array.apply(null, { length: numberOfColors }).map((el, index) => {
      let h = (parseInt(hue) + (Math.floor(index / hueStep) * hueChange)) % 360
      let s = (parseInt(sat) + (Math.floor(index / satStep) * satChange)) % 100
      let l = (parseInt(light) + (Math.floor(index / lightStep) * lightChange)) % 100
      return new Color(h, s, l, 'HSL').HEXString
    })
  }
  get palette() { return this._palette }
}
export default HSLPaletteGenerator;

export let getAdvancedPalette3 = (baseColor, hueSplitter, satSplitter, lightSplitter, offsetSat, offSetLight) => {
  let { hue, sat, light } = baseColor.hsl;
  let hueChange = 360 / hueSplitter
  let satChange = 100 / satSplitter
  let lightChange = 100 / lightSplitter

  // Level 1: hue
  // Level 2: saturation
  // Level 3: light
  let level1Colors = Array.apply(null, { length: hueSplitter })
  let level2Colors = Array.apply(null, { length: satSplitter })
  let level3Colors = Array.apply(null, { length: lightSplitter })

  let huePalette = [] // 3d array
  level1Colors.forEach((el, indexL1) => {

    let h = (parseInt(hue) + (indexL1 * hueChange)) % 360

    let satPalette = []
    level2Colors.forEach((el, indexL2) => {

      let s = (parseInt(sat) + (indexL2 * satChange)) % 100

      let lightPalette = []
      level3Colors.forEach((el, indexL3) => {
        let l = (parseInt(light) + (indexL3 * lightChange)) % 100
        lightPalette.push(new Color(h, s, l, 'HSL'))
      })
      satPalette.push(lightPalette)
    })
    huePalette.push(satPalette)
  })

  return huePalette
}

export let getAdvancedPalette2 = (baseColor, hueSplitter, satSplitter, lightSplitter, offsetSat, offSetLight) => {
  let { hue, sat, light } = baseColor.hsl;
  let hueChange = 360 / hueSplitter
  let satChange = 100 / satSplitter
  let lightChange = 100 / lightSplitter

  // Level 1: saturation
  // Level 2: hue
  // Level 3: light
  let level1Colors = Array.apply(null, { length: satSplitter })
  let level2Colors = Array.apply(null, { length: hueSplitter })
  let level3Colors = Array.apply(null, { length: lightSplitter })

  let satPalette = [] // 3d array
  level1Colors.forEach((el, indexL1) => {

    let s = (parseInt(sat) + (indexL1 * satChange)) % 100

    let huePalette = []
    level2Colors.forEach((el, indexL2) => {

      let h = (parseInt(hue) + (indexL2 * hueChange)) % 360

      let lightPalette = []
      level3Colors.forEach((el, indexL3) => {
        let l = (parseInt(light) + (indexL3 * lightChange)) % 100
        lightPalette.push(new Color(h, s, l, 'HSL'))
      })
      huePalette.push(lightPalette)
    })
    satPalette.push(huePalette)
  })

  return satPalette
}

let getLevel = (level, h, s, l) => (level == 'h' ? h : level == 's' ? s : l)

export let getAdvancedPalette = (baseColor, hueSplitter, satSplitter, lightSplitter, l1, l2, l3, offsetSat, offSetLight) => {
  let { hue, sat, light } = baseColor.hsl;
  let hueChange = 360 / hueSplitter
  let satChange = 100 / satSplitter
  let lightChange = 100 / lightSplitter

  // Level 1: saturation
  // Level 2: hue
  // Level 3: light
  let level1Colors = Array.apply(null, { length: getLevel(l1, hueSplitter, satSplitter, lightSplitter) })
  let level2Colors = Array.apply(null, { length: getLevel(l2, hueSplitter, satSplitter, lightSplitter) })
  let level3Colors = Array.apply(null, { length: getLevel(l3, hueSplitter, satSplitter, lightSplitter) })

  let l1_change = getLevel(l1, hueChange, satChange, lightChange)
  let l2_change = getLevel(l2, hueChange, satChange, lightChange)
  let l3_change = getLevel(l3, hueChange, satChange, lightChange)

  let l1_divider = getLevel(l1, 360, 100, 100)
  let l2_divider = getLevel(l2, 360, 100, 100)
  let l3_divider = getLevel(l3, 360, 100, 100)

  let generated_color = { h: null, s: null, l: null }

  let l1_Palette = [] // 3d array
  level1Colors.forEach((el, indexL1) => {

    let l1_value = (parseInt(sat) + (indexL1 * l1_change)) % l1_divider

    let l2_palette = []
    level2Colors.forEach((el, indexL2) => {

      let l2_value = (parseInt(hue) + (indexL2 * l2_change)) % l2_divider

      let l3_palette = []
      level3Colors.forEach((el, indexL3) => {
        let l3_value = (parseInt(light) + (indexL3 * l3_change)) % l3_divider

        generated_color[l1] = l1_value
        generated_color[l2] = l2_value
        generated_color[l3] = l3_value
        l3_palette.push(new Color(generated_color.h, generated_color.s, generated_color.l, 'HSL'))
      })
      l2_palette.push(l3_palette)
    })
    l1_Palette.push(l2_palette)
  })

  return l1_Palette
}
