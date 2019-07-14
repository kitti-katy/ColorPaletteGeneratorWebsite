import Color from "../../utilities/Color";
export const getScaler = () => window.innerWidth >= 2400 ? 1 : window.innerWidth / 2400
export const getScaledHueWidth = () => 360 * getScaler()
export const getScaledHeight = () => 200 * getScaler()
export const getMainCanvas = () => (document.getElementById("main-canvas-color-picker"))
export const getSaturationCanvas = () => (document.getElementById("saturation-canvas-color-picker"))

export const drawHueCanvas = (baseColor) => {
    let scaler = getScaler()
    let sat = baseColor.hsl.sat;
    let canvas = getMainCanvas()
    let ctx = canvas.getContext("2d");
    let scaledWidth = getScaledHueWidth()
    let scaledHeight = getScaledHeight()
    canvas.setAttribute("width", scaledWidth)
    canvas.setAttribute("height", scaledHeight)
    for (let i = 0; i < scaledWidth; i += scaler) {
        var gradient = ctx.createLinearGradient(i, 0, i, scaledHeight);
        let scaledBackHue = Math.round(i * 360 / scaledWidth)
        gradient.addColorStop(0, "hsl(" + scaledBackHue + "," + sat + "%,0%)");
        gradient.addColorStop(0.5, "hsl(" + scaledBackHue + "," + sat + "%,50%)");
        gradient.addColorStop(1, "hsl(" + scaledBackHue + "," + sat + "%,100%)");
        ctx.fillStyle = gradient;
        ctx.fillRect(i, 0, i, scaledHeight);
    }
    setSaturationPickerStyle(baseColor)
}

export const drawSaturationCanvas = (baseColor) => {
    let scaler = getScaler()
    let hue = baseColor.hsl.hue;
    let light = baseColor.hsl.light;
    let canvas = getSaturationCanvas()
    let scaledHeight = getScaledHeight()
    canvas.setAttribute("height", scaledHeight)
    let ctx = canvas.getContext("2d");
    for (let j = 0; j < 202 * scaler; j += 2) {
        let scaledBackSat = Math.round(j * 200 / scaledHeight)
        for (let i = 0; i < 10; i += 1) {
            ctx.fillStyle = "hsl(" + hue + ", " + scaledBackSat / 2 + "%, " + light + "%)";
            ctx.fillRect(i, j, i, j + 2);
        }
    }
    setHuePickerStyle(baseColor)
}

const getValueAdjustedIntoBoundaries = (val, min, max) => val < min ? min : val > max ? max : val

export const getColorFromHueCanvas = (clientX, clientY, baseColor) => {
    let rect = getMainCanvasRectangle()
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    let scaledBackX = Math.round(x * 360 / getScaledHueWidth())
    let scaledBackY = Math.round(y * 200 / getScaledHeight())
    // when mouse is out of canvas but is down
    scaledBackX = getValueAdjustedIntoBoundaries(scaledBackX, 0, 360)
    scaledBackY = getValueAdjustedIntoBoundaries(scaledBackY, 0, 200)
    let hue = Math.round(scaledBackX);
    let sat = baseColor.hsl.sat;
    let light = Math.round(scaledBackY / 2);
    let color = new Color(hue, sat, light, "HSL");
    return color
}

export const getColorFromSaturationCanvas = (clientY, baseColor) => {
    let rect = getSaturationCanvasRectangle()
    let y = clientY - rect.top;
    let scaledBackY = Math.round(y * 200 / getScaledHeight())
    // when mouse is out of canvas but is down
    scaledBackY = getValueAdjustedIntoBoundaries(scaledBackY, 0, 200)
    let { hue, light } = baseColor.hsl;
    let sat = Math.round(scaledBackY / 2);
    let color = new Color(hue, sat, light, "HSL");
    return color
}

let setHuePickerStyle = (color) => {
    let circle = document.getElementById('pickerCircle')
    let scaler = getScaler()
    let scaledPositionTop = (color.hsl.light * 2) * scaler - 8
    circle.style.marginTop = scaledPositionTop + "px"
    let scaledPositionLeft = (color.hsl.hue) * scaler - 8
    circle.style.marginLeft = scaledPositionLeft + "px"
}

let setSaturationPickerStyle = (color) => {
    let circle = document.getElementById('saturationCircle')
    let scaledPositionTop = (color.hsl.sat * 2) * getScaler() - 3.5
    circle.style.marginTop = scaledPositionTop + "px"
}

export const getMainCanvasRectangle = () =>
    (getMainCanvas().getBoundingClientRect())

export const getSaturationCanvasRectangle = () =>
    (getSaturationCanvas().getBoundingClientRect())