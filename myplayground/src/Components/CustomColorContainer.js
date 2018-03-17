/**
 * Created by kate on 3/17/18.
 */
import React, {Component} from 'react';
import {Palette} from './Palette'
import sxConnect from "../Styledux/src/sxConnect"

class CustomColorContainerClass extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style = {{...paletteStyle.paletteLine, backgroundColor:this.props.state.baseColor.HEXString}}></div>
                <Palette/>
            </div>
        );
    }
}

const paletteStyle = {
    paletteLine: {
        height: '100px',
        width: '100px'
    }
}



export const CustomColorContainer = sxConnect(null, ['state.baseColor'])(CustomColorContainerClass);


