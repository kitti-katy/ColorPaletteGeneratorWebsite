import React, { useContext } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import { Popover } from 'antd';
import { StoreContext } from '../Store';
import Button from '@material-ui/core/Button';

export default function SelectBaseColorButton(props) {

    const [state] = useContext(StoreContext)
    let baseColorFont = state.baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'white'

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Popover content={<ColorPicker />} placement="bottom" trigger="click">
                <Button
                    className='base-color-select-container select-color-btn'
                    style={{ background: state.baseColor.HEXString, height: 'fit-content', color: baseColorFont }} size='small' >
                    Select Base Color
                </Button>
            </Popover>

        </div>
    );
}





