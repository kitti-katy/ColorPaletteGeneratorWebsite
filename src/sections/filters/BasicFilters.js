import React, { useContext } from "react";
import Slider from '@material-ui/core/Slider';
import './Filters.scss'
import SelectBaseColorButton from "../../components/SelectBaseColorButton";
import { StoreContext } from '../../Store';
import Typography from '@material-ui/core/Typography';

const hueDividers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15]
const lightDividers = [1, 2, 4, 5, 10, 20]
const satDividers = [1, 2, 4, 5, 10]

export default function BasicTiles(props) {

    const [state, dispatch] = useContext(StoreContext)
    const { hueSplit, satSplit, lightSplit, filterMode } = state
    const set = (name, value) => dispatch({ name, value })

    let getSliderInput = (value, label, name, dividers) =>
        <div>
            <Typography variant="subtitle2" gutterBottom className="slider-label">
                {label} <span style={{ float: 'right' }}>{value} </span>
            </Typography>
            <Slider
                value={dividers.indexOf(value)}
                min={0}
                max={dividers.length - 1}
                step={1}
                onChange={(e, index) => set(name, dividers[index])}
                tooltipVisible={false}
            />
        </div>

    return (
        <div style={{ height: '100%' }}>
            <div className='filters' >

                {getSliderInput(hueSplit, 'Hues', 'hueSplit', hueDividers)}
                {getSliderInput(satSplit, 'Saturations', 'satSplit', satDividers)}
                {getSliderInput(lightSplit, 'Lights', 'lightSplit', lightDividers)}

                {/* NEED THIS TO AVOID COLOR PICKER GLITCH */}
                {filterMode == 'BASIC' && <SelectBaseColorButton />}
            </div>
        </div>
    );
}