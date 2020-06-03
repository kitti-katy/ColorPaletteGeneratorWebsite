import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Store";
import queryString from "query-string";
import Color from "../../utilities/Color";

const options = [
  "baseColor",
  "selected",
  "hueSplit",
  "satSplit",
  "lightSplit",
  "blindness",
  "hueChange",
  "satChange",
  "lightChange",
  "hueStep",
  "satStep",
  "lightStep",
  "numberOfColors",
  "filterMode",
];
const subOptions = {
  filterMode: ["BASIC", "ADVANCED", "AI"],
  hueSplit: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15],
  lightSplit: [1, 2, 4, 5, 10, 20],
  satSplit: [1, 2, 4, 5, 10],
  selected: [],
};
const ranges = {
  hueChange: (0, 120),
  satChange: (0, 100),
  lightChange: (0, 100),
  hueStep: (1, 30),
  satStep: (1, 30),
  lightStep: (1, 30),
  numberOfColors: (6, 181),
};

export default function MainParamHandler(props) {
  const [state, dispatch] = useContext(StoreContext);
  const { mainLoaded } = state;

  const set = (name, value) => dispatch({ name, value });


  useEffect(() => {
    if (!mainLoaded) {
      set("mainLoaded", true);
      let params = queryString.parse(props.params);
      for (var key in params) {
        if (options.includes(key)) {
          let value = params[key];
          if (key == "baseColor") {
            let format = value.substring(0, 3);
            let rest = value.substring(3);
            if (format[0] == "#") {
              if (/^#[0-9A-F]{6}$/i.test(value))
                set("baseColor", new Color(value, null, null, "Hex"));
            } else if (format == "RGB") {
              if (rest[0] == "(" && rest[rest.length - 1] == ")") {
                rest = rest.substring(1, rest.length)
                rest = rest.split(",");

                if (rest.length == 3) {
                  let r = parseInt(rest[0]);
                  let g = parseInt(rest[1]);
                  let b = parseInt(rest[2]);
                  if (
                    r >= 0 &&
                    r < 256 &&
                    g >= 0 &&
                    g < 256 &&
                    b >= 0 &&
                    b < 256
                  )
                    set("baseColor", new Color(r, g, b, "RGB"));
                }
              }
            } else if (format == "HSL") {
              if (rest[0] == "(" && rest[rest.length - 1] == ")") {
                rest = rest.substring(1, rest.length)
                rest = rest.split(",");
                if (rest.length == 3) {
                  let h = parseInt(rest[0]);
                  let s = parseInt(rest[1]);
                  let l = parseInt(rest[2]);
                  if (
                    h >= 0 &&
                    h < 360 &&
                    s >= 0 &&
                    s < 101 &&
                    l >= 0 &&
                    l < 101
                  )
                    set("baseColor", new Color(h, s, l, "HSL"));
                }
              }
            }
          } else {
            if (typeof subOptions[key][0] == "number") {
              value = parseInt(value);
            }
            if (subOptions[key].includes(value)) {
              set(key, value);
            }
          }
        }
      }
    }
  });

  return <div style={{ display: "none" }} />;
}
