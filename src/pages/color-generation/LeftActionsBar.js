import React, { Component } from "react";
import { connect } from "react-redux";
import { ExportJSONButton } from '../../components/ExportJSONButton'
import { SelectedColorPanel } from "../../components/SelectedColorPanel";
import SelectBlindness from "../../components/SelectBlindness";

let mapStateToProps = (state) => {
    return {
        selected: state.SelectedColorReducer.selected
    }
}
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
                    <SelectedColorPanel selectedColor={this.props.selected} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(LeftActionsBar);

