import React, { useContext } from "react";
import Slider from '@material-ui/core/Slider';
import SelectBaseColorButton from "../../components/SelectBaseColorButton";
import { StoreContext } from '../../Store';
import { SliderLabel } from "../../components/SliderLabel";

export default function HSLFilters(props) {

  const [state, dispatch] = useContext(StoreContext)
  const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors, filterMode } = state
  const set = (name, value) => dispatch({ name, value })

  const getSliderInput = (value, min, max, label, name) =>
    <div className="hsl-slider">
      <SliderLabel value={value} label={label} />
      <Slider className="slider-input" min={min} max={max}
        onChange={(e, val) => set(name, val)} value={value}/>
    </div>

  return (
    <div className=' filters'>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
        {/* Changes */}
        <div className='advanced-hsl-filters-group'>
          {getSliderInput(hueChange, 0, 120, 'Hue Change', 'hueChange')}
          {getSliderInput(satChange, 0, 100, 'Saturation Change', 'satChange')}
          {getSliderInput(lightChange, 0, 100, 'Light Change', 'lightChange')}
        </div>
        {/* Steps */}
        <div className='advanced-hsl-filters-group'>
          {getSliderInput(hueStep, 1, 30, 'Hue Step', 'hueStep')}
          {getSliderInput(satStep, 1, 30, 'Saturation Step', 'satStep')}
          {getSliderInput(lightStep, 1, 30, 'Light Step', 'lightStep')}
        </div>
        {/* Number Of Colors */}
        <div className='advanced-hsl-filters-group' style={{ height: '28%' }}>
          {getSliderInput(numberOfColors, 6, 181, 'Number of Colors', 'numberOfColors')}
        </div>
        <div className='advanced-hsl-filters-group' style={{ height: '28%' }}>
          {/* NEED THIS TO AVOID COLOR PICKER GLITCH */}
          {filterMode == 'ADVANCED' && <SelectBaseColorButton />}
        </div>

      </div>

    </div>
  );
}

