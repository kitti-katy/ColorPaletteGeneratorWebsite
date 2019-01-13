class Color {
  constructor(v1, v2, v3, colorFormat) {
    switch (colorFormat) {
      case "RGB":
        this.setAllFromRGB(v1, v2, v3);
        break;

      case "HSL":
        this.setAllFromHSL(v1, v2, v3);
        break;

      case "Hex":
        this.setAllFromHex(v1);
        break;

      case "ChangeColor":
        this.createChangedHSLColor(v1, v2);
    }
  }

  // create new color from old with the hsl changes
  createChangedHSLColor = (color, changes) => {
    let hueChange = changes.hueChange;
    let satChange = changes.satChange;
    let lightChange = changes.lightChange;
    let hsl = color.hsl;
    let hue = (hsl.hue + hueChange) % 360;
    let sat = hsl.sat + satChange;
    sat = sat == 100 ? sat : sat % 100;
    let light = hsl.light + lightChange;
    light = light == 100 ? light : light % 100;
    this.setAllFromHSL(hue, sat, light);
  };

  // set from
  setAllFromHex = hex => {
    this.HEXString = hex;
    this.rgb = this.HexToRGB();
    this.setAllFromRGB(this.rgb.r, this.rgb.g, this.rgb.b);
  };
  setAllFromRGB = (r, g, b) => {
    this.rgb = { r: r, g: g, b: b };
    this.hsl = this.RGBtoHSL(r, g, b);
    this.setColorCSSStrings();
  };
  setAllFromHSL = (hue, sat, light) => {
    this.hsl = { hue: hue, sat: sat, light: light };
    this.rgb = this.HSLtoRGB(hue, sat, light);
    this.setColorCSSStrings();
  };

  // set strings
  setColorCSSStrings = () => {
    this.setRGBString();
    this.setHSLString();
    this.RGBtoHex();
  };
  setRGBString = () => {
    this.RGBString = "rgb(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ")";
  };
  setHSLString = () => {
    this.HSLString = "hsl(" + this.hsl.hue + ", " + this.hsl.sat + ", " + this.hsl.light + ")";
  };
  RGBtoHex = () => {
    this.HEXString = "#" + this.numberToHex(parseInt(this.rgb.r)) + this.numberToHex(parseInt(this.rgb.g)) + this.numberToHex(parseInt(this.rgb.b));
    return this.HEXString
  };
  numberToHex = n => {
    let hex = n.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  // conversions from RGB
  RGBtoHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
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

    // not sure about this part
    let hsl = { hue: Math.round(h * 360), sat: Math.round(s * 100), light: Math.round(l * 100) }
    hsl.hue = hsl.hue == 360 ? 0 : hsl.hue
    return hsl;
  };

  // conversions from HSL
  HSLtoRGB = (h, s, l) => {
    let r, g, b;
    h /= 360;
    s /= 100;
    l /= 100;

    if (s == 0) {
      r = g = b = l;
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
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };
  HSLtoHex = (h, s, l) => {
    this.rgb = this.HSLtoRGB(h, s, l);
    return this.RGBtoHex();
  };
  extractNumberFromHex = (start, end) => parseInt(this.HEXString.substring(start, end), 16);

  // conversions from Hex
  HexToRGB = () => { return { r: this.extractNumberFromHex(1, 3), g: this.extractNumberFromHex(3, 5), b: this.extractNumberFromHex(5, 7) }; };
  HexToHSL = hexString => {
    this.rgb = this.HexToRGB(hexString);
    return this.RGBtoHex();
  };
}

export default Color;


export let RGBtoHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
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
  let hsl = { hue: Math.round(h * 360), sat: Math.round(s * 100), light: Math.round(l * 100) }
  hsl.hue = hsl.hue == 360 ? 0 : hsl.hue
  return hsl;
};