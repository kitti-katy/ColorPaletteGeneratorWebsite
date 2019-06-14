import * as _ from 'lodash'
export const changeColorsInPixelArray = (pixelArray, oldRGBColor, newRGBColor) => {

        for (let i = 0; i < pixelArray.length - 4; i += 4) {
            let rgb = getRGBColor(pixelArray, i)

            if (_.isEqual(rgb, oldRGBColor)) {
                pixelArray[i] = newRGBColor.r
                pixelArray[i + 1] = newRGBColor.g
                pixelArray[i + 2] = newRGBColor.b
            }
        }
        return pixelArray
}

const getRGBColor = (arr, i) => ({r: arr[i], g: arr[i+1], b: arr[i+2]})