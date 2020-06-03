import React, { useContext } from "react";
import { exportJSON } from '../utilities/ExportJSON'
import SelectMode from "../sections/filters/SelectMode"
import TryMain from "../sections/try-it/TryMain";
import { LeftActionsBar } from "../sections/side-bar/LeftActionsBar";
import BasicTiles from "../sections/tiles/BasicTiles";
import AdvancedTiles from "../sections/tiles/AdvancedTiles";
import AITiles from "../sections/tiles/AITiles";
import PictureTiles from "../sections/tiles/PictureTiles";
import AdvancedFilters from "../sections/filters/AdvancedFilters";
import BasicFilters from "../sections/filters/BasicFilters";
import PictureFilters from "../sections/filters/PictureFilters";
import { StoreContext } from '../Store';
import AIFilters from "../sections/filters/AIFilters";
import MainParamHandler from "../components/param-components/MainParamHandler";
import AnimationHandler from "../components/animation-handler/AnimationHandler";
//import GoldenRationFilters from "../sections/filters/GoldenRatioFilters";

export default function MainPage(props) {
    const [state] = useContext(StoreContext)
    const { filterMode } = state

    // EXPORT JSON HANDLER
    const handleExportJSON_ButtonClick = () => {
        let colorElements = document.getElementsByClassName("single-tile-basic")
        let colors = {}
        for (var i = 0; i < colorElements.length; i++) { colors["color" + i] = colorElements[i].style.backgroundColor }
        exportJSON(colors)
    }
    const getDisplayOption = (show) => ({ display: show ? 'block' : 'none', width: '100%' })

    // by hiding components instead of unmounting we will keep thes states saved
    let showBasic = filterMode == 'BASIC'
    let showAdvanced = filterMode == 'ADVANCED'
    let showFromImage = filterMode == 'FROM_IMAGE'
    let showAI = filterMode == 'AI'
    //let showGoldenRatio = filterMode == 'GOLDEN_RATIO'

    return (
        <div className='horizontal-holder-ls'>
            {/*<MainParamHandler params ={props.location.search}/>*/}
            {/*<AnimationHandler/>*/}

            <div id='palette-container' >
                <LeftActionsBar exportJSON={handleExportJSON_ButtonClick} />

                <div className='tiles-section'>

                    <div style={{ ...getDisplayOption(showBasic), margin: 'auto' }} > <BasicTiles /></div>
                    <div style={{ ...getDisplayOption(showAdvanced), margin: 'auto' }} > <AdvancedTiles /></div>
                    <div style={{ ...getDisplayOption(showFromImage), margin: 'auto' }} > <PictureTiles /></div>
                    <div style={{ ...getDisplayOption(showAI), margin: 'auto' }} > <AITiles /></div>
                </div>
            </div>

            <div className='vertical-holder-sl'>
                <div className='filters-part first-step-main-page' >
                    <SelectMode />
                    <div style={getDisplayOption(showBasic)} >  <BasicFilters /></div>
                    <div style={getDisplayOption(showAdvanced)} > <AdvancedFilters /></div>
                   {/* <div style={getDisplayOption(showGoldenRatio)} > <GoldenRationFilters /></div>*/}
                    <div style={getDisplayOption(showFromImage)} > <PictureFilters /></div>
                    <div style={getDisplayOption(showAI)} > <AIFilters /></div>

                </div>
                <div>
                    <div className='filters-long-part'>
                        <div><TryMain /></div>
                    </div>
                </div>
            </div>

        </div>
    );
}



