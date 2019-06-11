import React, { Component } from "react";
import { connect } from "react-redux";
import ColorPicker from "./color-picker/ColorPicker";
import { Popover } from 'antd';

let mapStateToProps = (state) => {
    return {
        baseColor: state.BaseColorReducer.baseColor
    }
}
class SelectBaseColorButton extends Component {

    render() {
        let baseColorFont = this.props.baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'white'
        return (
            <div style={{display:'grid'}}> 
            <Popover content={<ColorPicker />} placement="bottom">
                <div className='base-color-select-container' style={{ background: this.props.baseColor.HEXString }} >
                    <h3 className='select-color-btn' style={{ color: baseColorFont }} >BASE COLOR</h3>
                </div>
            </Popover>
            </div>

        );
    }
}

export default connect(mapStateToProps)(SelectBaseColorButton);



