import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Store";
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
//  dd1608 635c7f
const steps = [ ['hueSplit', 2], ['hueSplit', 3], ['hueSplit', 4], ['hueSplit', 5],['hueSplit', 6],
['hueSplit', 1], ['lightSplit', 2], ['lightSplit', 4], 
['satSplit', 2], ['satSplit', 4], ['hueSplit', 2], ['hueSplit', 3], ['hueSplit', 5], ['hueSplit', 6], ['selectionOn', true],
['colorsSelectedToExport',  new Set(["000#d91208"]), 300], ['colorsSelectedToExport',  new Set(["000#d91208","111#bdbea3"]), 300],
['colorsSelectedToExport',  new Set(["000#d91208", "111#bdbea3", "222#ebf7ec"]), 300], ['colorsSelectedToExport',  new Set(["000#d91208", "111#bdbea3", "222#ebf7ec", "333#0f4d50"]), 300],
['landingColors', ["#d91208", "#bdbea3", "#ebf7ec", "#0f4d50"],1000], ['landingColors', [], 1000], 
['colorsSelectedToExport',  new Set(), 0], ['hueSplit', 1, 0],['lightSplit', 1, 0],['satSplit', 1, 0], 
]
const preload = [['hueSplit', 1],['lightSplit', 1],['satSplit', 1], ['baseColor', new Color('#dd1608', '', '', 'Hex')]]
export default function AnimationHandler(props) {
  const [state, dispatch] = useContext(StoreContext);
  const { mainLoaded } = state;

  const set = (name, value) => dispatch({ name, value });
  const animate = (index) => {
    let time = steps[index].length == 3? steps[index][2] : 400
    console.log(time)
    setTimeout(function(){

        set(steps[index][0], steps[index][1])
        if (index+1 != steps.length)
            animate(index+1)
        else 
            animate(0)
   },time); 
  }

  useEffect(() => {
    if (!mainLoaded) {
      preload.forEach(el => set(el[0], el[1]))
      set("mainLoaded", true);
      animate(0)
  }});

  return <div style={{ display: "none" }} />;
}
