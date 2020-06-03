import React, { useContext } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import { Popover } from 'antd';
import { StoreContext } from '../Store';
import Button from '@material-ui/core/Button';

export default function SelectBaseColorButton(props) {

    const [state] = useContext(StoreContext)
    const { baseColor } = props.baseColor == null? state : {baseColor: props.baseColor }
    let baseColorFont = baseColor.hsl.light > 40 ? 'rgb(33,33,33)' : 'white'

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Popover content={<ColorPicker baseColor={baseColor} onChange={props.onChange} id={props.id} />} placement="bottom" trigger="click" destroyTooltipOnHide>
                <Button
                    className='base-color-select-container select-color-btn'
                    style={{ background: baseColor.HEXString, height: 'fit-content', color: baseColorFont , ...props.style}} size='small' >
                        {props.text || "Select Base Color"}
                    
                </Button>
            </Popover>

        </div>
    );
}





