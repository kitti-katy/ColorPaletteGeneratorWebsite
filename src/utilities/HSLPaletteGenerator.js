import Color from './Color'

class HSLPaletteGenerator {
  constructor(baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors) {
    let { hue, sat, light } = baseColor.hsl;
    light = parseInt(light)
    let lightOffset = light == 0 ? 0 : 1
    this._palette = Array.apply(null, { length: numberOfColors }).map((el, index) => {
      let h = (parseInt(hue) + (Math.floor(index / hueStep) * hueChange)) % 360
      let s = (parseInt(sat) + (Math.floor(index / satStep) * satChange)) % 100
      let l = light == 100 && index == 0 ? 100 : (light + (Math.floor(index / lightStep) * lightChange)) % (100 + lightOffset)
      return new Color(h, s, l, 'HSL')
    })
  }
  get palette() { return this._palette }
}
export default HSLPaletteGenerator;



export let getBasicPalette = (baseColor, hueSplitter, satSplitter, lightSplitter) => {
  let { hue, sat, light } = baseColor.hsl;
  let hueChange = 360 / hueSplitter
  let satChange = 100 / satSplitter
  let lightChange = 100 / lightSplitter

  // Level 1: saturation
  // Level 2: hue
  // Level 3: light
  let saturations = Array.apply(null, { length: satSplitter })
  let hues = Array.apply(null, { length: hueSplitter })
  let lights = Array.apply(null, { length: lightSplitter })

  let l1_change = satChange
  let l2_change = hueChange
  let l3_change = lightChange

  let l1_divider = 100
  let l2_divider = 360
  let l3_divider = 100

  let l1_v = sat
  let l2_v = hue
  let l3_v = light

  let generated_color = { h: null, s: null, l: null }

  let l1_Palette = [] // 3d array
  saturations.forEach((el, indexL1) => {

    let l1_value = (parseInt(l1_v) + (indexL1 * l1_change)) % l1_divider

    let l2_palette = []
    hues.forEach((el, indexL2) => {

      let l2_value = (parseInt(l2_v) + (indexL2 * l2_change)) % l2_divider

      let l3_palette = []
      lights.forEach((el, indexL3) => {
        let l3_value = (parseInt(l3_v) + (indexL3 * l3_change)) % l3_divider

        generated_color['s'] = l1_value
        generated_color['h'] = l2_value
        generated_color['l'] = l3_value
        l3_palette.push(new Color(generated_color.h, generated_color.s, generated_color.l, 'HSL'))
      })
      l2_palette.push(l3_palette)
    })
    l1_Palette.push(l2_palette)
  })

  return l1_Palette
}




let getLevel = (level, h, s, l) => (level == 'h' ? h : level == 's' ? s : l)

export let getAdvancedPalette = (baseColor, hueSplitter, satSplitter, lightSplitter, l1, l2, l3, offsetSat, offSetLight) => {
  let { hue, sat, light } = baseColor.hsl;
  let hueChange = 360 / hueSplitter
  let satChange = 101 / satSplitter
  let lightChange = 101 / lightSplitter

  // Level 1: saturation
  // Level 2: hue
  // Level 3: light
  let level1Colors = Array.apply(null, { length: getLevel(l1, hueSplitter, satSplitter, lightSplitter) })
  let level2Colors = Array.apply(null, { length: getLevel(l2, hueSplitter, satSplitter, lightSplitter) })
  let level3Colors = Array.apply(null, { length: getLevel(l3, hueSplitter, satSplitter, lightSplitter) })

  let l1_change = getLevel(l1, hueChange, satChange, lightChange)
  let l2_change = getLevel(l2, hueChange, satChange, lightChange)
  let l3_change = getLevel(l3, hueChange, satChange, lightChange)

  let l1_divider = getLevel(l1, 360, 101, 101)
  let l2_divider = getLevel(l2, 360, 101, 101)
  let l3_divider = getLevel(l3, 360, 101, 101)

  let l1_v = getLevel(l1, hue, sat, light)
  let l2_v = getLevel(l2, hue, sat, light)
  let l3_v = getLevel(l3, hue, sat, light)

  let generated_color = { h: null, s: null, l: null }

  let l1_Palette = [] // 3d array
  level1Colors.forEach((el, indexL1) => {

    let l1_value = (parseInt(l1_v) + (indexL1 * l1_change)) % l1_divider

    let l2_palette = []
    level2Colors.forEach((el, indexL2) => {

      let l2_value = (parseInt(l2_v) + (indexL2 * l2_change)) % l2_divider

      let l3_palette = []
      level3Colors.forEach((el, indexL3) => {
        let l3_value = (parseInt(l3_v) + (indexL3 * l3_change)) % l3_divider

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
