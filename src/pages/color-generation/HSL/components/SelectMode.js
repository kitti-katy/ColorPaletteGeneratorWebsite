import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeHSLMode } from '../../../../redux/HSLModeReducer'
import { Radio } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
                <RadioGroup className="HSL-mode-select" value={this.props.isAdvanced} onChange={(e) => this.props.changeHSLMode(e.target.value)}>
                    <Radio value={false}> Basic </Radio>
                    <Radio value={true}> Advanced </Radio>
                </RadioGroup>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMode);