/**
 * Created by kate on 3/3/18.
 */
import React, {Component} from 'react';

class PalletePiece extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                ...paletteStyle.paletteLine,
                backgroundColor: this.props.color.HEXString
            }}>

            </div>
        );
    }
}

const paletteStyle = {
    paletteLine: {
        height: '40px',
        width: '10%',
        margin: '10px'
    }
}


export default PalletePiece;