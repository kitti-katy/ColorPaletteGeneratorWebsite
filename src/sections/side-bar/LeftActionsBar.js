import React from "react";
import { ExportJSONButton } from '../../components/ExportJSONButton'
import {SelectedColorPanel} from "./SelectedColorPanel";
import SelectBlindness from "./SelectBlindness";
import MainPageTour from "../../components/tours/MainPageTour";
import { SelectExportColors } from "./SelectExportColors";

export const LeftActionsBar = (props) => {

        return (
            <div className=" tiles-actions-bar " >
                
                <div><MainPageTour/></div>
                <div>
                    <SelectBlindness />
                </div>
                <div>
                    <SelectedColorPanel />
                </div>
                <div>
                    <SelectExportColors />
                </div>
                {/*<div>
                    <ExportJSONButton onClick={props.exportJSON} />
                </div>*/}
               
            </div>
        );
    }


