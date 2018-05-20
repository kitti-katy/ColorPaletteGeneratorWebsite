import React, {Component} from 'react';
import {ColorPickerCanvas} from "../ColorPickerCanvas"
import CircledPalettePiece from '../CircledPalettePiece'
import PalettePiece from '../PalettePiece'
import * as _ from "lodash";
import Color from "../Color";
import sxConnect from "../../Styledux/src/sxConnect";

class HSLClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorNumber: 4,
            hue: 40,
            sat: 0,
            light: 20,
            angle: 45,
            header: '',
            text: '',
            button: '',
            buttonText: '',
            colors: []
        },


        this.handleHueChange = this.handleHueChange.bind(this)
        this.handleSatChange = this.handleSatChange.bind(this)
        this.handleLightChange = this.handleLightChange.bind(this)
        this.getNextColor = this.getNextColor.bind(this)

    }

    handleHueChange(event) {
        this.setState({hue: event.target.value})
    }

    handleSatChange(event) {
        this.setState({sat: event.target.value})
    }

    handleLightChange(event) {
        this.setState({light: event.target.value})
    }


    setColorNumber(event) {
        this.setState({colorNumber: event.target.value})
    }

    getNextColor(i){
        let color = new Color(this.props.state.baseColor ,
            {   hueChange: this.state.hue * (i) - 360 * (Math.floor( this.state.hue * i / 360)),
                satChange : this.state.sat * (i) - 100 * (Math.floor(this.state.sat * i  / 100)),
                lightChange : this.state.light * (i) - 100 * (Math.floor(this.state.light * i / 100))}
            , 0, 3)

        return color
    }



    render() {
        return (
            <div style={style.mainHolder}>


                <div style={style.colorPicker}>
                    <ColorPickerCanvas/>
                </div>


                <div style={style.colorCircle}>
                    <div >
                        <svg height="150" width="150">
                            {
                                _.range(this.state.colorNumber).map(i =>
                                    <CircledPalettePiece numberOfColor={i}
                                                         angle={360 / this.state.colorNumber}
                                                         color={this.getNextColor(i)}
                                    />)
                            }
                        </svg>
                    </div>
                </div>


                <div style={style.HueFilter}>
                    <div style={paletteStyle.labelAndInput.container}>
                        <div style={paletteStyle.labelAndInput.label}>Hue Change:</div>
                        <input style={paletteStyle.labelAndInput.textInput} type='text' maxLength='3'
                               value={this.state.hue} onChange={(event) => this.handleHueChange(event)}/>
                    <input type="range" style={paletteStyle.labelAndInput.slider}
                           onChange={(event) => this.handleHueChange(event)} min="0" max="359" value={this.state.hue}/>
                    </div>
                </div>


                <div style={style.SatFilter}>
                    <div style={paletteStyle.labelAndInput.container}>
                        <div style={paletteStyle.labelAndInput.label}>Saturation Change:</div>
                        <input style={paletteStyle.labelAndInput.textInput} type='text' maxLength='3'
                               value={this.state.sat} onChange={(event) => this.handleSatChange(event)}/>
                    <input type="range" style={paletteStyle.labelAndInput.slider}
                           onChange={(event) => this.handleSatChange(event)} min="0" max="100" value={this.state.sat}/>
                    </div>
                </div>


                <div style={style.LightFilter}>
                    <div style={paletteStyle.labelAndInput.container}>
                        <div style={paletteStyle.labelAndInput.label}>Light Change:</div>
                        <input style={paletteStyle.labelAndInput.textInput} type='text' maxLength='3'
                               value={this.state.light} onChange={(event) => this.handleLightChange(event)}/>
                    <input type="range" style={paletteStyle.labelAndInput.slider}
                           onChange={(event) => this.handleLightChange(event)} min="0" max="100"
                           value={this.state.light}/>
                    </div>
                </div>


                <div style={style.colorNumber}>
                    <div style={paletteStyle.labelAndInput.container}>
                        <div style={paletteStyle.labelAndInput.label}>Colors Number:</div>
                        <input style={paletteStyle.labelAndInput.textInput} type='text' maxLength='3'
                               value={this.state.colorNumber} onChange={(event) => this.setColorNumber(event)}/>
                    <input type="range" style={paletteStyle.labelAndInput.slider}
                           onChange={(event) => this.setColorNumber(event)} min="0" max="100"
                           value={this.state.colorNumber}/>
                    </div>
                </div>


                <div style={style.colorSquares}>
                    <div style={paletteStyle.paletteLine}>
                        {
                            _.range(this.state.colorNumber).map(i =>
                                <PalettePiece
                                    color={this.getNextColor(i)}/>)
                        }
                    </div>

                </div>

            </div>
        );
    }
}

const style = {
    mainHolder: {
        height: '100%',
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '200px 60px 60px 60px auto ',
        backgroundColor: 'white',
    },
    colorPicker:{
        gridRow: 1,
        gridColumn: '1 / 3' ,
        backgroundColor: 'white',
    },
    colorCircle:{
        gridRow: '2 / 5',
        gridColumn: 2,
        backgroundColor: 'white',
    },
    HueFilter:{
        width:'50%',
        gridRow: 2 / 5,
        gridColumn: 1,
        backgroundColor: 'white',
    },
    SatFilter:{
        width:'50%',
        gridRow: 3,
        gridColumn: 1,
        backgroundColor: 'white',
    },
    LightFilter:{
        width:'50%',
        gridRow: 4,
        gridColumn: 1,
        backgroundColor: 'white',
    },
    colorNumber:{
        gridRow: 4,
        gridColumn: 2,
        backgroundColor: 'white',
    },
    colorSquares:{
        gridRow: 5,
        gridColumn: '1 / 5',
        backgroundColor: 'white',
    },


}

const paletteStyle = {
    paletteLine: {
        height: '100%',
        width: '100%',
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left'
    },
    container: {
        margin: 'auto',
        width: '100%'
    },

    inputsContainer: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '200px'
    },

    textField: {
        width: '30px',
        padding: '1px'
    },
    labelAndInput:{
        container:
            {
                height: '100%',
                display: 'grid',
                gridGap: '2%',
                gridTemplateColumns: '150px 30px',
                gridTemplateRows: '25px 30px',
            },
        label:
            {
                gridRow: 1,
                gridColumn: '1 / 2',
                lineHeight: '25px',
                textAlign: 'left'

        },
        textInput:{
            gridRow: 1,
            gridColumn: 2,
            height:'20px'
        },
        slider:{
            gridRow: 2,
            gridColumn: '1 / 3',
        }

    }
}

export const HSL = sxConnect(null, ['state.baseColor'])(HSLClass);
