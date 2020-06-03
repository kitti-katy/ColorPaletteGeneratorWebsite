import React, { useContext } from "react";
import Slider from '@material-ui/core/Slider';
import SelectBaseColorButton from "../../components/SelectBaseColorButton";
import { StoreContext } from '../../Store';
import { SliderLabel } from "../../components/SliderLabel";
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';

export default function GoldenRationFilters(props) {

    const [state, dispatch] = useContext(StoreContext)
    const { GRNumberOfColorsIndex, filterMode } = state
    const set = (name, value) => dispatch({ name, value })
    const numberOfColors = [3, 4, 5, 6, 8, 10]
    const getSliderInput = (value, min, max, label, name) =>
        <div>
            <SliderLabel value={numberOfColors[value]} label={label} />
            <Slider className="slider-input" min={min} max={max}
                onChange={(e, val) => set(name, val)} value={value} />
        </div>



    return (
        <div className='filters'>
            {/* Number Of Colors */}
            <div style={{ height: '28%', marginTop: '8px' }}>
                {getSliderInput(GRNumberOfColorsIndex, 0, 5, 'Number of Colors', 'GRNumberOfColorsIndex')}
            </div>
            {/* NEED THIS CHECK TO AVOID COLOR PICKER GLITCH */}
            {filterMode == 'GOLDEN_RATIO' && <SelectBaseColorButton />}
        </div>
    );
}