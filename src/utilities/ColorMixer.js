import Color from './Color.js'

export const mixColors = (colorArr) => {
    let resultR = 0
    let resultG = 0
    let resultB = 0
    colorArr.forEach(color => {
        resultR += color.rgb.r
        resultG += color.rgb.g
        resultB += color.rgb.b    
    });
    let l = colorArr.length
    resultR = resultR/l
    resultG = resultG/l
    resultB = resultB/l  
    return new Color(resultR, resultG, resultB, 'RGB')
}