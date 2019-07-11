import React, { useContext } from "react";
import { Slider } from 'antd';
import './Filters.css'
import { Label } from "@blueprintjs/core";
import SelectBaseColorButton from "../../components/SelectBaseColorButton";
import { StoreContext } from '../../Store';

const hueDivisors = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15]
const lightDivisors = [1, 2, 4, 5, 10, 20]
const satDivisors = [1, 2, 4, 5, 10]

export default function BasicTiles(props) {

    const [state, dispatch] = useContext(StoreContext)
    const {hueSplit, satSplit, lightSplit} = state
    const setHueSplit = (v) => dispatch({type: 'setHueSplit', payload: v}) 
    const setSatSplit = (v) => dispatch({type: 'setSatSplit', payload: v}) 
    const setLightSplit = (v) => dispatch({type: 'setLightSplit', payload: v}) 

    let handleHueSliderChange = (index) => setHueSplit(hueDivisors[index])
    let handleSatSliderChange = (index) => setSatSplit(satDivisors[index])
    let handleLightSliderChange = (index) => setLightSplit(lightDivisors[index])

    return (
        <div style={{ height: '100%' }}>
            <div className='filters' >

                <div>
                    <Label className="slider-label">Hues <span style={{ float: 'right' }}>{hueSplit}</span></Label>
                    <Slider
                        value={hueDivisors.indexOf(hueSplit)}
                        min={0}
                        max={hueDivisors.length - 1}
                        step={1}
                        onChange={handleHueSliderChange}
                        tooltipVisible={false}
                    />
                </div>
                {/* Saturation */}
                <div>
                    <Label className="slider-label" >Saturations <span style={{ float: 'right' }}>{satSplit}</span></Label>
                    <Slider
                        value={satDivisors.indexOf(satSplit)}
                        min={0}
                        max={satDivisors.length - 1}
                        step={1}
                        onChange={handleSatSliderChange}
                        tooltipVisible={false}
                    />
                </div>
                {/* Light */}
                <div>
                    <Label className="slider-label">Lights <span style={{ float: 'right' }}>{lightSplit}</span></Label>
                    <Slider
                        value={lightDivisors.indexOf(lightSplit)}
                        defaultValue={lightDivisors.indexOf(lightSplit)}
                        min={0}
                        max={lightDivisors.length - 1}
                        step={1}
                        onChange={handleLightSliderChange}
                        tooltipVisible={false}
                    />
                </div>
                <SelectBaseColorButton />
            </div>
        </div>
    );
}