import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeHSLMode } from '../../../../redux/HSLModeReducer'
import { Radio, RadioGroup } from "@blueprintjs/core";


let mapStateToProps = (state) => {
    return {
        isAdvanced: state.HSLModeReducer.isAdvanced
    }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ changeHSLMode: changeHSLMode }, dispatch) }

class SelectMode extends Component {
    render() {
        return (
            <div style={{ paddingBottom: '12px', marginBottom: '24px' }} className="bottom-bordered">
                <RadioGroup className="HSL-mode-select" inline={true} selectedValue={this.props.isAdvanced} onChange={e => this.props.changeHSLMode(e.target.value === 'true')} >
                    <Radio label="Basic" value={false} />
                    <Radio label="Advanced" value={true} />
                </RadioGroup>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMode);