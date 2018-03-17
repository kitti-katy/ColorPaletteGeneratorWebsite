/**
 * Created by kate on 3/10/18.
 */

class Color {

    constructor(v1, v2, v3, i) {
        this.createChangedHSLColor = this.createChangedHSLColor.bind(this)
        this.setAllFromHex = this.setAllFromHex.bind(this)
        this.setAllFromRGB = this.setAllFromRGB.bind(this)
        this.setAllFromHSL = this.setAllFromHSL.bind(this)

        this.setColorCSSStrings = this.setColorCSSStrings.bind(this)
        this.setRGBString = this.setRGBString.bind(this)
        this.setHSLString = this.setHSLString.bind(this)
        this.setHexStringFromRGB = this.setHexStringFromRGB.bind(this)

        this.RGBtoHSL = this.RGBtoHSL.bind(this)
        this.HSLtoHex = this.HSLtoHex.bind(this)
        this.HSLtoRGB = this.HSLtoRGB.bind(this)
        this.RGBtoHex = this.RGBtoHex.bind(this)
        this.HexToHSL = this.HexToHSL.bind(this)
        this.HexToRGB = this.HSLtoRGB.bind(this)

        let constructors = [this.setAllFromRGB, this.setAllFromHSL, this.setAllFromHex, this.createChangedHSLColor]
        constructors[i](v1, v2, v3)


    }


    createChangedHSLColor( color, changes, v3) {
        let hueChange = changes.hueChange
        let satChange = changes.satChange
        let lightChange = changes.lightChange
        let hsl = color.hsl
        let hue = (hsl.hue + hueChange) % 360
        let sat = hsl.sat + satChange
        sat = sat == 100 ? sat : sat % 100
        let light = hsl.light + lightChange
        light = light == 100 ? light : light % 100
        this.setAllFromHSL(hue, sat, light)

    }

    setAllFromHex(hex, v2, v3) {
        this.rgb = this.HexToRGB(hex)
        this.setAllFromRGB(this.rgb.r, this.rgb.g, this.rgb.b)

    }

    setAllFromRGB(r, g, b) {
        this.rgb = {r: r, g: g, b: b}
        this.hsl = this.RGBtoHSL(r, g, b)
        this.setColorCSSStrings()
    }


    setAllFromHSL(hue, sat, light) {
        this.hsl = {hue: hue, sat: sat, light: light}
        this.rgb = this.HSLtoRGB(hue, sat, light)
        this.setColorCSSStrings()
    }


    setColorCSSStrings() {
        this.setRGBString()
        this.setHSLString()
        this.setHexStringFromRGB(this.rgb.r, this.rgb.g, this.rgb.b)
    }

    setRGBString() {
        this.RGBString = 'rgb(' + this.rgb.r + ', ' + this.rgb.g + ', ' + this.rgb.b + ')'
    }

    setHSLString() {
        this.HSLString = 'hsl(' + this.hsl.hue + ', ' + this.hsl.sat + ', ' + this.hsl.light + ')'
    }

    setHexStringFromRGB(r, g, b) {
        this.HEXString = this.RGBtoHex(r, g, b)
    }

    RGBtoHSL(r, g, b) {

        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }
        return {hue: h * 360, sat: s * 100, light: l * 100};
    }

    HSLtoRGB(h, s, l) {
        let r, g, b;
        h /= 360
        s /= 100
        l /= 100

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

      //  console.log('RGB')
      //  console.log( r * 255, g * 255,  b * 255)

        return {r: r * 255, g: g * 255, b: b * 255};
    }


    RGBtoHex(r, g, b) {
    //    console.log(r,g,b)
        let hexR = Math.round(r).toString(16)
        hexR = hexR.length ==1? hexR + '0': hexR
        let hexG = Math.round(g).toString(16)
        hexG = hexG.length ==1? hexG + '0': hexG
        let hexB = Math.round(b).toString(16)
        hexB = hexB.length ==1? hexB + '0': hexB
//        console.log('#' + hexR + hexB + hexG)
        return '#' + hexR + hexB + hexG
    }

    HSLtoHex(h, s, l) {

        let rgb = this.HSLtoRGB(h, s, l)
        return this.RGBtoHex(rgb.r, rgb.g, rgb.b)

    }

    HexToRGB(hexString) {
        let r = hexString.substring(1, 3)
        let g = hexString.substring(3, 5)
        let b = hexString.substring(5, 7)
        return {r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16)};
    }

    HexToHSL(hexString) {
        let rgb = this.HexToRGB(hexString)
        return this.RGBtoHex(rgb.r, rgb.g, rgb.b)
    }


}


export default Color;