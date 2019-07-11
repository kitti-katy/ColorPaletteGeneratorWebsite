import React, { Component } from "react";
import { ExportJSONButton } from '../../components/ExportJSONButton'
import SelectedColorPanel from "./SelectedColorPanel";
import SelectBlindness from "./SelectBlindness";

class LeftActionsBar extends Component {

    render() {
        return (
            <div className=" tiles-actions-bar " >
                <div>
                    <SelectBlindness />
                </div>
                <div>
                    <ExportJSONButton onClick={this.props.exportJSON} />
                </div>
                {/*
                        <div>
                            <DisplayOrderButtons />
                        </div>
                        */}
                <div>
                    <SelectedColorPanel />
                </div>
            </div>
        );
    }
}

export default LeftActionsBar;

