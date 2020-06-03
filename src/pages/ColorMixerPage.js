import React, { useContext } from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import { StoreContext } from '../StoreColorMixer';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import SelectBaseColorButton from "../components/SelectBaseColorButton";
import Color from '../utilities/Color'
import {mixColors} from '../utilities/ColorMixer'
import { LeftActionsBar } from "../sections/side-bar/LeftActionsBar";
import SelectModeMixer from "../sections/mixer/SelectModeMixer";
import AddColorFilter from "../sections/mixer/filters/AddColorFilter";
import AddColorsTiles from "../sections/mixer/tiles/AddColorsTiles";

export default function ColorMixerPage (props) {
    const [state, dispatch] = useContext(StoreContext)
    const { selectedColorsMixer, firstColorMixer } = state
    const set = (name, value) => dispatch({ name, value })

    return(
    <div className='horizontal-holder-ls'>
            {/*<MainParamHandler params ={props.location.search}/>*/}
            {/*<AnimationHandler/>*/}

            <div id='palette-container' >
                <LeftActionsBar />

                <div className='tiles-section'>
                    <AddColorsTiles/>
                
                </div>
            </div>

            <div className='vertical-holder-ls mixer-holder' >
                <div className='filters-part mixer-filters' >
                    <SelectModeMixer />
                    <AddColorFilter/>


                </div>
                <div>
                    <div className='filters-long-part'>

                    </div>
                </div>
            </div>

        </div>
        )

}
