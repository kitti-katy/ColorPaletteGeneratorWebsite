import Color from "../../utilities/Color";
export const getScaler = () => window.innerWidth >= 2400 ? 1 : window.innerWidth / 2400
export const getScaledHueWidth = () => 360 * getScaler()
export const getScaledHeight = () => 200 * getScaler()

export const drawHueCanvas = (baseColor) => {
    let scaler = getScaler()
    let sat = baseColor.hsl.sat;
    let canvas = document.getElementById("main-canvas-color-picker");
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
    let canvas = document.getElementById("saturation-canvas-color-picker");
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

export const getColorHueCanvas = (clientX, clientY, baseColor) => {
    let canvas = document.getElementById("main-canvas-color-picker");
    let rect = canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    let scaledBackX = Math.round(x * 360 / getScaledHueWidth())
    let scaledBackY = Math.round(y * 200 / getScaledHeight())
    let hue = Math.round(scaledBackX);
    let sat = baseColor.hsl.sat;
    let light = Math.round(scaledBackY / 2);
    let color = new Color(hue, sat, light, "HSL");
    return color
}

export const getColorSaturationCanvas = (clientY, baseColor) => {
    let canvas = document.getElementById("saturation-canvas-color-picker");
    let rect = canvas.getBoundingClientRect();
    let y = clientY - rect.top;
    if (y < 0 || y > 200) return;
    let hsl = baseColor.hsl;
    let hue = hsl.hue;
    let sat = Math.round(y / 2);
    let light = hsl.light;
    let color = new Color(hue, sat, light, "HSL");
    return color
}

let setHuePickerStyle = (color) => {
    let circle = document.getElementById('pickerCircle')
    let scaler = getScaler()
    let scaledPositionTop =  (color.hsl.light * 2 ) * scaler - 8
    circle.style.marginTop = scaledPositionTop + "px"
    let scaledPositionLeft = (color.hsl.hue ) * scaler - 8
    circle.style.marginLeft = scaledPositionLeft + "px"
} 

let setSaturationPickerStyle = (color) => {
    let circle = document.getElementById('saturationCircle')
    let scaler = getScaler()
    let scaledPositionTop =  (color.hsl.sat * 2 ) * scaler - 8
    circle.style.marginTop = scaledPositionTop + "px"
} 