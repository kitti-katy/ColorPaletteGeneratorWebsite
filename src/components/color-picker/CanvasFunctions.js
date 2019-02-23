import Color from "../../utilities/Color";
export const getWidthScaler = () => window.innerWidth >= 1920 ? 1 : window.innerWidth / 1920
export const getScaledHueWidth = () => 360 * getWidthScaler()

export const getHeightScaler = () => window.innerWidth >= 1920 ? 1 : window.innerWidth / 1920
export const getScaledHueHeight = () => 200 * getWidthScaler()

export const drawHueCanvas = (baseColor) => {
    let scaler = getWidthScaler() //w >= 1920 ? 1 : w/1920

    let sat = baseColor.hsl.sat;
    let canvas = document.getElementById("main-canvas-color-picker");
    let ctx = canvas.getContext("2d");
    let scaledWidth = getScaledHueWidth()
    for (let i = 0; i < scaledWidth; i += scaler) {
        var gradient = ctx.createLinearGradient(i, 0, i, 200);
        let scaledBackHue = Math.round(i * 360 / scaledWidth)
        gradient.addColorStop(0, "hsl(" + scaledBackHue + "," + sat + "%,0%)");
        gradient.addColorStop(0.5, "hsl(" + scaledBackHue + "," + sat + "%,50%)");
        gradient.addColorStop(1, "hsl(" + scaledBackHue + "," + sat + "%,100%)");
        ctx.fillStyle = gradient;
        ctx.fillRect(i, 0, i, 200);
    }
}

export const drawSaturationCanvas = (baseColor) => {
    let hue = baseColor.hsl.hue;
    let light = baseColor.hsl.light;
    let canvas = document.getElementById("saturation-canvas-color-picker");
    let ctx = canvas.getContext("2d");
    for (let j = 0; j < 202; j += 2) {
        for (let i = 0; i < 10; i += 1) {
            ctx.fillStyle = "hsl(" + hue + ", " + j / 2 + "%, " + light + "%)";
            ctx.fillRect(i, j, i, j + 2);
        }
    }
}

export const getColorHueCanvas = (clientX, clientY, baseColor) => {
    let canvas = document.getElementById("main-canvas-color-picker");
    let rect = canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    let scaledBackX = Math.round(x * 360 / getScaledHueWidth())
    let hue = Math.round(scaledBackX);
    let sat = baseColor.hsl.sat;
    let light = Math.round(y / 2);
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
