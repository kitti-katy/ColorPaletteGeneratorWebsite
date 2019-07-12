import React from "react";
import { ExportJSONButton } from '../../components/ExportJSONButton'
import {SelectedColorPanel} from "./SelectedColorPanel";
import SelectBlindness from "./SelectBlindness";

export const LeftActionsBar = (props) => {

        return (
            <div className=" tiles-actions-bar " >
                <div>
                    <SelectBlindness />
                </div>
                <div>
                    <ExportJSONButton onClick={props.exportJSON} />
                </div>
                <div>
                    <SelectedColorPanel />
                </div>
            </div>
        );
    }


