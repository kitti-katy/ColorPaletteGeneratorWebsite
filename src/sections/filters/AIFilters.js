import React, { useContext } from "react";
import Slider from '@material-ui/core/Slider';
import SelectBaseColorButton from "../../components/SelectBaseColorButton";
import { StoreContext } from '../../Store';
import { SliderLabel } from "../../components/SliderLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox_ } from "../../components/Checkbox";
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from "@material-ui/core";


export default function AIFilters(props) {

    const [state, dispatch] = useContext(StoreContext)
    const { aiNumberOfColorsIndex, categories, withBaseColorAi, filterMode, aiAlgorithm, selectedAIDataset } = state
    const set = (name, value) => dispatch({ name, value })
    const numberOfColors = [3, 4, 5, 6, 8, 10]
    const getSliderInput = (value, min, max, label, name) =>
        <div>
            <SliderLabel value={numberOfColors[value]} label={label} />
            <Slider className="slider-input" min={min} max={max}
                onChange={(e, val) => set(name, val)} value={value} />
        </div>

    const dropDownItems = ['Autoencoder', 'K-means Clustering', 'Agglomerative Clustering']
    const datasets = ['Landscape', 'Wildlife', 'Coast', 'Forest', 'Mountain', 'Open Country']

    const getDropDownSelect = (value, value_str, items, label, float) =>
        <div style={{width:'50%%'}}>
        <SliderLabel label={label} style={{fontWeight: "bold", float: float}}/>
            <Select value={value} onChange={event => set(value_str, event.target.value)} variant="outlined" margin='dense' >
                {items.map(item => <MenuItem value={item} key = {item}>{item}</MenuItem>)}
            </Select>
            </div>

    const getCheckbox = () => <h6 className="hsl-slider">
        <Checkbox_
            checked={withBaseColorAi}
            onChange={(e, val) => set("withBaseColorAi", val)}
            label={"Use Select Base Color"} 
        />
    </h6 >

    return (
        <div className='filters-deep-learning'>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                {getDropDownSelect(selectedAIDataset, "selectedAIDataset", datasets, 'SET', 'left')}
                {getDropDownSelect(aiAlgorithm, "aiAlgorithm", dropDownItems, 'ALGORITHM', 'right')}
            </div>
            {/* Number Of Colors */}
            <div>
                {getSliderInput(aiNumberOfColorsIndex, 0, 5, 'Number of Colors', 'aiNumberOfColorsIndex')}
            </div>
            {getCheckbox()}
            {/* NEED THIS CHECK TO AVOID COLOR PICKER GLITCH */}
            {filterMode == 'AI' && withBaseColorAi && <SelectBaseColorButton />}
        </div>
    );
}