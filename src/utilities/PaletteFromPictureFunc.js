
import Color from "./Color"
import * as skmeans  from "skmeans"
/*
let getColorArrFromPixelArr = (pixelArray) => {
  let colors = []
  for (let i = 0; i < pixelArray.length - 4; i += 4) {
    let r = pixelArray[i];
    let g = pixelArray[i + 1];
    let b = pixelArray[i + 2];
    colors.push(new Color(r, g, b, "RGB"))
  }
  return colors
}

// hueArr = [[colors within the first hue slice], [colors within the second hue slice], [], [], [] ]
let throwIntoHueSlicesArr = (colorArr, sliceSize, sliceSplitter) => {
  let hueArr = []
  hueArr.length = sliceSplitter
  hueArr.forEach((arr, i) => arr.push([]))
  colorArr.forEach(color => {
    let hue = color.hsl.h
    let arrIndex = Math.floor(hue / sliceSize)
    hueArr[arrIndex].push(color)
  }
  )
  return hueArr;
}
// satArr = [[colors within the first hue slice], [colors within the second hue slice], [], [], [] ]
let throwHueIntoSatArr = (hueArr, sliceSize, sliceSplitter) => {
  let satArr = []
  satArr.length = sliceSplitter
  satArr.forEach((arr, i) => arr.push([]))
  hueArr.forEach(color => {
    let sat = color.hsl.s
    let arrIndex = Math.floor(sat / sliceSize)
    satArr[arrIndex].push(color)
  }
  )
  return satArr;
}

// satArr = [[colors within the first hue slice], [colors within the second hue slice], [], [], [] ]
let throwHueSatIntoLightArr = (satArr, sliceSize, sliceSplitter) => {
  let lightArr = []
  lightArr.length = sliceSplitter
  lightArr.forEach((arr, i) => arr.push([]))
  satArr.forEach(color => {
    let light = color.hsl.l
    let arrIndex = Math.floor(light / sliceSize)
    lightArr[arrIndex].push(color)
  }
  )
  return lightArr;
}


export let getPaletteFromPicture = (pixelArray, hueSplitter, satSplitter, lightSplitter, offsetSat, offSetLight) => {

  let hueSliceSize = 360 / hueSplitter
  let satSliceSize = 100 / satSplitter
  let lightSliceSize = 100 / lightSplitter

  let colors = getColorArrFromPixelArr(pixelArray)
  
  // level 1
  let hueSlicedColors = throwIntoHueSlicesArr(colors, hueSliceSize, hueSplitter)
  // level 2
  let hueSatSlicedColors = hueSlicedColors.map( arr => throwHueIntoSatArr(hueSlicedColors, satSliceSize, satSplitter) )
  // level 3
  let hueSatLightSlicedColors = hueSatSlicedColors.map( satArr => satArr.map(arr=> throwHueSatIntoLightArr(hueSatSlicedColors, lightSliceSize, lightSplitter) ) )

  return hueSatLightSlicedColors;
}
*/
export let quantiziedPalette = (arrayOfPixels, maximumColorCount) => {
  let palette = skmeans(arrayOfPixels,maximumColorCount).centroids
  palette = palette.map(arr => [parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2])] )
  console.log(palette)
  return palette.map(rgb => new Color(rgb[0], rgb[1], rgb[2], "RGB"))
}
