import React, { useContext } from "react";
import Slider from '@material-ui/core/Slider';
import SelectBaseColorButton from "../../components/SelectBaseColorButton";
import { StoreContext } from '../../Store';
import { SliderLabel } from "../../components/SliderLabel";

const hueDividers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15]
const lightDividers = [1, 2, 4, 5, 10, 20]
const satDividers = [1, 2, 4, 5, 10]

export default function BasicTiles(props) {

    const [state, dispatch] = useContext(StoreContext)
    const { hueSplit, satSplit, lightSplit, filterMode } = state
    const set = (name, value) => dispatch({ name, value })

    let getSliderInput = (value, label, name, dividers) =>
        <div>
            <SliderLabel value={value} label={label} />
            <Slider
                marks
                value={dividers.indexOf(value)}
                min={0}
                max={dividers.length - 1}
                step={1}
                onChange={(e, index) => set(name, dividers[index])}
            />
        </div>

    return (
        <div className='filters'>

            {getSliderInput(hueSplit, 'Hues', 'hueSplit', hueDividers)}
            {getSliderInput(satSplit, 'Saturations', 'satSplit', satDividers)}
            {getSliderInput(lightSplit, 'Lights', 'lightSplit', lightDividers)}

            {/* NEED THIS CHECK TO AVOID COLOR PICKER GLITCH */}
            {filterMode == 'BASIC' && <SelectBaseColorButton />}
        </div>
    );
}