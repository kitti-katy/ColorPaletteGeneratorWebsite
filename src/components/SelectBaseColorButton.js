import React, { useContext } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import { Popover } from 'antd';
import { StoreContext } from '../Store';

export default function SelectBaseColorButton(props) {

    const [state] = useContext(StoreContext)
    let baseColorFont = state.baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'white'

    return (
        <div style={{ display: 'grid' }}>
            <Popover content={<ColorPicker />} placement="bottom">
                <div className='base-color-select-container' style={{ background: state.baseColor.HEXString }} >
                    <h3 className='select-color-btn' style={{ color: baseColorFont }} >BASE COLOR</h3>
                </div>
            </Popover>
        </div>

    );
}





