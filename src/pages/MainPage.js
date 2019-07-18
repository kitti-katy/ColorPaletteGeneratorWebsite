import React, { useContext } from "react";
import { exportJSON } from '../utilities/ExportJSON'
import SelectMode from "../sections/filters/SelectMode"
import TryMain from "../sections/try-it/TryMain";
import { LeftActionsBar } from "../sections/side-bar/LeftActionsBar";
import BasicTiles from "../sections/tiles/BasicTiles";
import AdvancedTiles from "../sections/tiles/AdvancedTiles";
import PictureTiles from "../sections/tiles/PictureTiles";
import AdvancedFilters from "../sections/filters/AdvancedFilters";
import BasicFilters from "../sections/filters/BasicFilters";
import PictureFilters from "../sections/filters/PictureFilters";
import { StoreContext } from '../Store';
import { Fade } from '../animations/Fade'

export default function MainPage() {
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

    return (
        <div className='horizontal-holder-ls'>

            <div id='palette-container' >
                <LeftActionsBar exportJSON={handleExportJSON_ButtonClick} />

                <div style={{ width: '300%', marginLeft: showBasic? 0 :showAdvanced? '-100%' : '-200%' }}>
                    <Fade style={{ margin: 'auto' }} in={showBasic} element={<BasicTiles />}></Fade>
                    <Fade style={{  margin: 'auto' }} in={showAdvanced} element={<AdvancedTiles />}></Fade>
                    <Fade style={{  margin: 'auto' }} in={showFromImage} element={<PictureTiles />}></Fade>
                    {         /*           <div style={{ ...getDisplayOption(showBasic), margin: 'auto' }} > 
                     
    </div>
      <div style={{ ...getDisplayOption(showAdvanced), margin: 'auto' }} > <AdvancedTiles /></div>
                    <div style={{ ...getDisplayOption(showFromImage), margin: 'auto' }} > <PictureTiles /></div>
    */}

                </div>
            </div>

            <div className='vertical-holder-sl'>
                <div className='filters-part' >
                    <SelectMode />
                    <div style={getDisplayOption(showBasic)} >  <BasicFilters /></div>
                    <div style={getDisplayOption(showAdvanced)} > <AdvancedFilters /></div>
                    <div style={getDisplayOption(showFromImage)} > <PictureFilters /></div>
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



